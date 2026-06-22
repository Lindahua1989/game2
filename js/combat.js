const Combat = {
    state: null,

    startCombat(enemies) {
        this.state = {
            enemies: enemies,
            drawPile: Utils.shuffle([...Game.state.player.deck]),
            discardPile: [],
            hand: [],
            playerBlock: 0,
            energy: 3 + Relics.getExtraEnergy(Game.state.player.relics),
            maxEnergy: 3 + Relics.getExtraEnergy(Game.state.player.relics),
            turn: 1,
            playerPowers: {
                strength: 0,
                blockPerTurn: 0,
                damagePerTurn: 0,
                energyPerTurn: 0,
                damagePerTurnSelf: 0,
                attackBonus: 0,
                blockOnAttack: 0,
                thorns: 0,
                nextTurnBlock: 0
            },
            targetingCard: null,
            firstAttackUsed: false,
            firstAttackBonus: 0,
            cardsPlayedThisTurn: 0,
            extraDraw: 0,
            discardCount: 0,
            combatOver: false,
            enemyTier: enemies[0]?.tier || 'normal'
        };

        Relics.onCombatStart(Game.state.player.relics, this.state);
        this.startPlayerTurn();
    },

    startPlayerTurn() {
        this.state.playerBlock = 0;
        this.state.firstAttackUsed = false;
        this.state.firstAttackBonus = 0;
        this.state.cardsPlayedThisTurn = 0;

        this.state.energy = this.state.maxEnergy + this.state.playerPowers.energyPerTurn;

        if (this.state.playerPowers.blockPerTurn > 0) {
            this.state.playerBlock += this.state.playerPowers.blockPerTurn;
        }
        if (this.state.playerPowers.nextTurnBlock > 0) {
            this.state.playerBlock += this.state.playerPowers.nextTurnBlock;
            this.state.playerPowers.nextTurnBlock = 0;
        }
        if (this.state.playerPowers.damagePerTurnSelf > 0) {
            Game.state.player.hp -= this.state.playerPowers.damagePerTurnSelf;
            if (Game.state.player.hp <= 0) {
                this.onPlayerDeath();
                return;
            }
        }

        Relics.onTurnStart(Game.state.player.relics, this.state);

        let drawCount = 5 + this.state.extraDraw;
        this.state.extraDraw = 0;
        this.drawCards(drawCount);

        UI.renderCombat();
    },

    drawCards(count) {
        for (let i = 0; i < count; i++) {
            if (this.state.drawPile.length === 0) {
                if (this.state.discardPile.length === 0) return;
                this.state.drawPile = Utils.shuffle([...this.state.discardPile]);
                this.state.discardPile = [];
            }
            this.state.hand.push(this.state.drawPile.pop());
        }
        setTimeout(() => UI.animateCardDraw(), 50);
    },

    cancelTargeting() {
        if (this.state && this.state.targetingCard !== null) {
            this.state.targetingCard = null;
            UI.renderCombat();
        }
    },

    async playCard(cardIndex, targetIndex) {
        if (this.state.combatOver) return;

        const card = this.state.hand[cardIndex];
        if (!card) return;

        let cost = card.cost;
        if (cost === -1) cost = this.state.energy;
        if (cost > this.state.energy) return;

        if (card.target === 'single' && targetIndex === undefined) {
            this.state.targetingCard = cardIndex;
            UI.renderCombat();
            return;
        }

        this.state.targetingCard = null;
        UI.animateCardPlay(cardIndex);
        await Utils.delay(250);
        this.state.energy -= cost;
        this.state.hand.splice(cardIndex, 1);

        Relics.onCardPlayed(Game.state.player.relics, card, this.state);

        await this.executeCard(card, targetIndex);

        if (this.state.playerPowers.blockOnAttack > 0 && card.type === 'attack') {
            this.state.playerBlock += this.state.playerPowers.blockOnAttack;
        }

        this.state.discardPile.push(card);

        if (this.checkCombatEnd()) return;

        UI.renderCombat();
    },

    async executeCard(card, targetIndex) {
        let bonusDmg = this.state.playerPowers.strength + this.state.playerPowers.attackBonus + this.state.firstAttackBonus;

        if (card.damage) {
            let dmg = card.damage + (card.type === 'attack' ? bonusDmg : 0);
            if (dmg < 0) dmg = 0;
            const hits = card.hits || 1;

            if (card.target === 'all') {
                for (const enemy of this.state.enemies) {
                    for (let h = 0; h < hits; h++) {
                        this.dealDamageToEnemy(enemy, dmg, card.ignoreBlock);
                    }
                }
            } else if (card.target === 'random') {
                for (let h = 0; h < hits; h++) {
                    const alive = this.state.enemies.filter(e => e.hp > 0);
                    if (alive.length > 0) {
                        this.dealDamageToEnemy(Utils.randomChoice(alive), dmg, card.ignoreBlock);
                    }
                }
            } else {
                const target = this.state.enemies[targetIndex];
                if (target) {
                    for (let h = 0; h < hits; h++) {
                        this.dealDamageToEnemy(target, dmg, card.ignoreBlock);
                    }
                }
            }
        }

        if (card.cost === -1) {
            const spentEnergy = this.state.maxEnergy;
            const dmg = spentEnergy * (card.damagePerEnergy || 5) + bonusDmg;
            const target = this.state.enemies[targetIndex];
            if (target) this.dealDamageToEnemy(target, dmg);
        }

        if (card.block) {
            this.state.playerBlock += card.block;
            UI.showBlockGain(card.block);
        }

        if (card.heal) {
            Game.state.player.hp = Math.min(Game.state.player.maxHp, Game.state.player.hp + card.heal);
            UI.showPlayerHeal(card.heal);
        }

        if (card.draw) {
            this.drawCards(card.draw);
        }

        if (card.energy) {
            this.state.energy += card.energy;
            UI.showEnergyPulse();
        }

        if (card.selfDamage) {
            Game.state.player.hp -= card.selfDamage;
            if (Game.state.player.hp <= 0) {
                this.onPlayerDeath();
                return;
            }
        }

        if (card.poison && card.target === 'single') {
            const target = this.state.enemies[targetIndex];
            if (target) target.status.poison += card.poison;
        }

        if (card.weak && card.target === 'single') {
            const target = this.state.enemies[targetIndex];
            if (target) target.status.weak += card.weak;
        }

        if (card.weakAll) {
            this.state.enemies.forEach(e => { e.status.weak += card.weakAll; });
        }

        if (card.strength) {
            this.state.playerPowers.strength += card.strength;
        }

        if (card.blockPerTurn) {
            this.state.playerPowers.blockPerTurn += card.blockPerTurn;
        }

        if (card.damagePerTurn) {
            this.state.playerPowers.damagePerTurn += card.damagePerTurn;
        }

        if (card.energyPerTurn) {
            this.state.playerPowers.energyPerTurn += card.energyPerTurn;
        }

        if (card.damagePerTurnSelf) {
            this.state.playerPowers.damagePerTurnSelf += card.damagePerTurnSelf;
        }

        if (card.attackBonus) {
            this.state.playerPowers.attackBonus += card.attackBonus;
        }

        if (card.blockOnAttack) {
            this.state.playerPowers.blockOnAttack += card.blockOnAttack;
        }

        if (card.thorns) {
            this.state.playerPowers.thorns += card.thorns;
        }

        if (card.nextTurnBlock) {
            this.state.playerPowers.nextTurnBlock += card.nextTurnBlock;
        }

        if (card.reboot) {
            const count = this.state.hand.length;
            this.state.discardPile.push(...this.state.hand);
            this.state.hand = [];
            this.drawCards(count + 2);
        }

        if (card.freeCard && this.state.hand.length > 0) {
            const idx = Utils.randomInt(0, this.state.hand.length - 1);
            this.state.hand[idx].tempCostZero = true;
        }

        this.state.firstAttackBonus = 0;
    },

    dealDamageToEnemy(enemy, damage, ignoreBlock = false) {
        let remaining = damage;

        if (!ignoreBlock && enemy.block > 0) {
            if (enemy.block >= remaining) {
                enemy.block -= remaining;
                remaining = 0;
            } else {
                remaining -= enemy.block;
                enemy.block = 0;
            }
        }

        enemy.hp -= remaining;

        if (remaining > 0) {
            UI.showEnemyDamage(enemy.uid, remaining);
            UI.showCombatLog(`对 ${enemy.name} 造成 ${remaining} 伤害`);
        }

        if (enemy.hp <= 0) {
            enemy.hp = 0;
            UI.showEnemyDeath(enemy.uid);
            UI.showCombatLog(`${enemy.name} 被消灭了！`);
        }
    },

    async endTurn() {
        if (this.state.combatOver) return;

        this.state.discardPile.push(...this.state.hand);
        this.state.hand = [];

        await this.enemyTurn();

        if (this.checkCombatEnd()) return;

        this.state.turn++;
        this.startPlayerTurn();
    },

    async enemyTurn() {
        for (const enemy of this.state.enemies) {
            if (enemy.hp <= 0) continue;

            if (enemy.status.poison > 0) {
                const poisonDmg = enemy.status.poison;
                enemy.hp -= poisonDmg;
                enemy.status.poison = Math.max(0, enemy.status.poison - 1);
                UI.showEnemyDamage(enemy.uid, poisonDmg);
                UI.showCombatLog(`${enemy.name} 受到 ${poisonDmg} 腐蚀伤害`);
                if (enemy.hp <= 0) {
                    enemy.hp = 0;
                    UI.showEnemyDeath(enemy.uid);
                    await Utils.delay(400);
                    continue;
                }
                await Utils.delay(300);
            }

            if (this.state.playerPowers.damagePerTurn > 0) {
                this.dealDamageToEnemy(enemy, this.state.playerPowers.damagePerTurn);
                if (enemy.hp <= 0) {
                    enemy.hp = 0;
                    continue;
                }
            }

            const intent = enemy.intent;
            if (!intent) continue;

            let atkValue = intent.value || 0;
            if (enemy.status.strength > 0) atkValue += enemy.status.strength;
            if (enemy.status.weak > 0) {
                atkValue = Math.floor(atkValue * 0.75);
                enemy.status.weak--;
            }

            await this.executeEnemyAction(enemy, intent, atkValue);

            Enemies.advancePattern(enemy);
            Enemies.rollIntent(enemy);

            if (Game.state.player.hp <= 0) {
                this.onPlayerDeath();
                return;
            }

            UI.renderCombat();
            await Utils.delay(300);
        }

        this.state.enemies = this.state.enemies.filter(e => e.hp > 0);
    },

    async executeEnemyAction(enemy, intent, atkValue) {
        const isAttack = ['attack', 'attack_poison', 'attack_weak', 'attack_all', 'block_attack'].includes(intent.type);
        if (isAttack) {
            UI.showEnemyAttack(enemy.uid);
            await Utils.delay(200);
        }

        switch (intent.type) {
            case 'attack':
                const hits = intent.hits || 1;
                for (let i = 0; i < hits; i++) {
                    this.dealDamageToPlayer(atkValue);
                    if (hits > 1) await Utils.delay(150);
                }
                if (this.state.playerPowers.thorns > 0) {
                    enemy.hp -= this.state.playerPowers.thorns;
                    UI.showEnemyDamage(enemy.uid, this.state.playerPowers.thorns);
                }
                break;

            case 'attack_poison':
                this.dealDamageToPlayer(atkValue);
                Game.state.player.poison = (Game.state.player.poison || 0) + (intent.poison || 0);
                UI.showCombatLog(`${enemy.name} 施加了 ${intent.poison} 腐蚀`);
                break;

            case 'attack_weak':
                this.dealDamageToPlayer(atkValue);
                break;

            case 'attack_all':
                this.dealDamageToPlayer(atkValue);
                break;

            case 'block':
                enemy.block += intent.value;
                UI.showCombatLog(`${enemy.name} 获得了 ${intent.value} 护甲`);
                break;

            case 'block_attack':
                enemy.block += intent.block;
                this.dealDamageToPlayer(atkValue);
                if (this.state.playerPowers.thorns > 0) {
                    enemy.hp -= this.state.playerPowers.thorns;
                    UI.showEnemyDamage(enemy.uid, this.state.playerPowers.thorns);
                }
                break;

            case 'charge':
                UI.showCombatLog(`${enemy.name} 正在蓄力...`);
                break;

            case 'heal':
                enemy.hp = Math.min(enemy.maxHp, enemy.hp + intent.value);
                UI.showCombatLog(`${enemy.name} 回复了 ${intent.value} HP`);
                break;

            case 'summon':
                const summonCount = intent.value || 1;
                for (let i = 0; i < summonCount && this.state.enemies.length < 5; i++) {
                    const minion = Enemies.createEnemy('nano_swarm_enemy');
                    if (minion) this.state.enemies.push(minion);
                }
                UI.showCombatLog(`${enemy.name} 召唤了增援！`);
                break;
        }
    },

    dealDamageToPlayer(damage) {
        let remaining = damage;
        let blocked = 0;

        if (this.state.playerBlock > 0) {
            if (this.state.playerBlock >= remaining) {
                this.state.playerBlock -= remaining;
                blocked = remaining;
                remaining = 0;
            } else {
                remaining -= this.state.playerBlock;
                blocked = this.state.playerBlock;
                this.state.playerBlock = 0;
            }
        }

        Game.state.player.hp -= remaining;

        if (remaining > 0) {
            UI.showPlayerHit();
            const playerArea = document.getElementById('player-area');
            UI.showDamageNumber(playerArea, remaining, 'damage');
            UI.showCombatLog(`你受到了 ${remaining} 点伤害`);
        } else if (blocked > 0) {
            UI.showCombatLog(`护甲抵挡了 ${blocked} 点伤害`);
        }

        if (Game.state.player.hp <= 0) {
            Game.state.player.hp = 0;
        }
    },

    checkCombatEnd() {
        if (Game.state.player.hp <= 0) {
            this.state.combatOver = true;
            this.onPlayerDeath();
            return true;
        }

        const alive = this.state.enemies.filter(e => e.hp > 0);
        if (alive.length === 0) {
            this.state.combatOver = true;
            this.onVictory();
            return true;
        }

        return false;
    },

    onVictory() {
        Relics.onCombatEnd(Game.state.player.relics, this.state);

        let goldReward = Enemies.getGoldReward(this.state.enemyTier);
        Game.state.player.gold += goldReward;

        Game.state.stats.battlesWon = (Game.state.stats.battlesWon || 0) + 1;

        const rewards = Cards.getRandomRewards(3);
        UI.showRewardScreen(goldReward, rewards);
    },

    onPlayerDeath() {
        this.state.combatOver = true;
        Game.showScreen('screen-gameover');
        const stats = document.getElementById('gameover-stats');
        stats.innerHTML = `
            <p>到达层数：${Game.state.currentFloor}</p>
            <p>战斗胜利：${Game.state.stats.battlesWon || 0}</p>
            <p>获得金币：${Game.state.player.gold}</p>
        `;
    }
};
