const Combat = {
    state: null,

    startCombat(enemies) {
        document.getElementById('combat-log').innerHTML = '';
        Particles.startAmbient('screen-combat');
        this.state = {
            enemies: enemies,
            drawPile: Utils.shuffle([...Game.state.player.deck]),
            discardPile: [],
            hand: [],
            playerBlock: 0,
            playerPoison: 0,
            energy: 3 + Relics.getExtraEnergy(Game.state.player.relics),
            maxEnergy: 3 + Relics.getExtraEnergy(Game.state.player.relics),
            hEnergy: 0,
            maxHEnergy: 10,
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
                nextTurnBlock: 0,
                hEnergyPerTurn: 1
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
        
        const boss = enemies.find(e => e.tier === 'boss');
        if (boss) {
            UI.showBossEntrance(boss.name, boss.icon);
            setTimeout(() => {
                if (boss.dialogue && boss.dialogue.entry) {
                    UI.showBossDialogue(boss.name, boss.dialogue.entry);
                }
                this.startPlayerTurn();
            }, 2000);
        } else {
            this.startPlayerTurn();
        }
    },

    startPlayerTurn() {
        this.state.playerBlock = 0;
        this.state.firstAttackUsed = false;
        this.state.firstAttackBonus = 0;
        this.state.cardsPlayedThisTurn = 0;

        this.state.energy = this.state.maxEnergy + this.state.playerPowers.energyPerTurn;

        // H能量每回合增长
        const hEnergyGain = this.state.playerPowers.hEnergyPerTurn;
        this.state.hEnergy = Math.min(this.state.maxHEnergy, this.state.hEnergy + hEnergyGain);
        UI.showHEnergyGain(hEnergyGain);

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

        if (this.state.playerPowers.healPerTurn > 0) {
            const healAmount = Math.min(this.state.playerPowers.healPerTurn, Game.state.player.maxHp - Game.state.player.hp);
            if (healAmount > 0) {
                Game.state.player.hp += healAmount;
                UI.showCombatLog(`修复无人机回复 ${healAmount} HP`, 'heal');
                UI.showPlayerHeal(healAmount);
            }
        }

        if (this.state.playerPoison > 0) {
            const poisonDmg = this.state.playerPoison;
            Game.state.player.hp -= poisonDmg;
            this.state.playerPoison = Math.max(0, this.state.playerPoison - 1);
            UI.showCombatLog(`你受到 ${poisonDmg} 点腐蚀伤害`, 'damage');
            const playerArea = document.getElementById('player-area');
            UI.showDamageNumber(playerArea, poisonDmg, 'damage');
            Particles.spawn(playerArea, 'damage', 8);
            Sound.play('damage');
            if (Game.state.player.hp <= 0) {
                Game.state.player.hp = 0;
                this.onPlayerDeath();
                return;
            }
        }

        Relics.onTurnStart(Game.state.player.relics, this.state);

        let drawCount = 5 + this.state.extraDraw;
        
        const hasBossVoidCrown = Game.state.player.relics.some(r => r.id === 'boss_void_crown');
        if (hasBossVoidCrown) {
            drawCount = 7;
        }
        
        const hasBossDivineSpark = Game.state.player.relics.some(r => r.id === 'boss_divine_spark');
        if (hasBossDivineSpark) {
            drawCount = 8;
        }
        
        this.state.extraDraw = 0;
        this.drawCards(drawCount);

        UI.showCombatLog(`--- 第 ${this.state.turn} 回合 ---`, 'system');
        UI.renderCombat();
    },

    drawCards(count) {
        let drawn = 0;
        for (let i = 0; i < count; i++) {
            if (this.state.drawPile.length === 0) {
                if (this.state.discardPile.length === 0) break;
                this.state.drawPile = Utils.shuffle([...this.state.discardPile]);
                this.state.discardPile = [];
            }
            this.state.hand.push(this.state.drawPile.pop());
            drawn++;
        }
        if (drawn > 0) {
            setTimeout(() => {
                UI.animateCardDraw();
                Sound.play('draw');
            }, 50);
        }
    },

    cancelTargeting() {
        if (this.state && this.state.targetingCard !== null) {
            this.state.targetingCard = null;
            Targeting.stopTargeting();
            UI.renderCombat();
        }
    },

    async playCard(cardIndex, targetIndex) {
        if (this.state.combatOver) return;
        if (this.state.animating) return;

        const card = this.state.hand[cardIndex];
        if (!card) return;

        let cost = card.cost;
        if (cost === -1) cost = this.state.energy;
        
        if (this.state.firstCardDiscount && cost > 0) {
            cost = Math.max(0, cost - 1);
            this.state.firstCardDiscount = false;
        }
        
        if (this.state.costReduction && cost > 0) {
            cost = Math.max(0, cost - this.state.costReduction);
        }
        
        if (cost > this.state.energy) return;

        if (card.requireHEnergy && this.state.hEnergy < card.requireHEnergy) {
            UI.showCombatLog(`需要至少 ${card.requireHEnergy} 点H能量`, 'system');
            return;
        }

        if (card.target === 'single' && targetIndex === undefined) {
            this.state.targetingCard = cardIndex;
            Targeting.startTargeting(cardIndex, card.type);
            UI.renderCombat();
            return;
        }

        this.state.animating = true;
        this.state.targetingCard = null;
        this.state.energy -= cost;
        this.state.hand.splice(cardIndex, 1);

        UI.animateCardPlay(cardIndex, card.type, targetIndex);
        UI.showCombatLog(`使用 ${card.name}`, 'system');
        Sound.play('card_play');
        GameStats.recordCardPlayed();
        UI.renderCombat();

        await Utils.delay(300);

        Relics.onCardPlayed(Game.state.player.relics, card, this.state);

        await this.executeCard(card, targetIndex);

        if (this.state.playerPowers.blockOnAttack > 0 && card.type === 'attack') {
            this.state.playerBlock += this.state.playerPowers.blockOnAttack;
        }

        this.state.discardPile.push(card);
        this.state.animating = false;

        if (this.checkCombatEnd()) return;

        UI.renderCombat();
    },

    async executeCard(card, targetIndex) {
        let bonusDmg = this.state.playerPowers.strength + this.state.playerPowers.attackBonus + this.state.firstAttackBonus;
        const cardBonus = Relics.getCardBonus(Game.state.player.relics);
        
        if (this.state.playerPowers.berserkerBonus && card.type === 'attack') {
            const hpPercent = Game.state.player.hp / Game.state.player.maxHp;
            const berserkerDmg = Math.floor(this.state.playerPowers.berserkerBonus * (1 - hpPercent));
            bonusDmg += berserkerDmg;
        }

        if (card.minDamage && card.maxDamage) {
            const hits = card.hits || 1;
            const avgDmg = Math.floor((card.minDamage + card.maxDamage) / 2) + (card.type === 'attack' ? bonusDmg : 0) + cardBonus;
            const totalDmg = avgDmg * hits;

            let hitLevel;
            if (card.poison) {
                hitLevel = 'poison';
            } else if (card.target === 'all' || card.target === 'random') {
                hitLevel = 'aoe';
            } else if (totalDmg >= 20) {
                hitLevel = 'heavy';
            } else if (totalDmg >= 10) {
                hitLevel = 'medium';
            } else {
                hitLevel = 'light';
            }

            const rollDamage = () => {
                const base = Utils.randomInt(card.minDamage, card.maxDamage);
                return base + (card.type === 'attack' ? bonusDmg : 0) + cardBonus;
            };

            if (card.target === 'all') {
                for (const enemy of this.state.enemies) {
                    for (let h = 0; h < hits; h++) {
                        this.dealDamageToEnemy(enemy, rollDamage(), card.ignoreBlock, hitLevel);
                        if (hits > 1) await Utils.delay(100);
                    }
                }
            } else if (card.target === 'random') {
                for (let h = 0; h < hits; h++) {
                    const alive = this.state.enemies.filter(e => e.hp > 0);
                    if (alive.length > 0) {
                        this.dealDamageToEnemy(Utils.randomChoice(alive), rollDamage(), card.ignoreBlock, hitLevel);
                        if (hits > 1) await Utils.delay(100);
                    }
                }
            } else {
                const target = this.state.enemies[targetIndex];
                if (target) {
                    for (let h = 0; h < hits; h++) {
                        this.dealDamageToEnemy(target, rollDamage(), card.ignoreBlock, hitLevel);
                        if (hits > 1) await Utils.delay(100);
                    }
                }
            }
        } else if (card.damage) {
            let dmg = card.damage + (card.type === 'attack' ? bonusDmg : 0) + cardBonus;
            if (dmg < 0) dmg = 0;
            const hits = card.hits || 1;
            const totalDmg = dmg * hits;

            let hitLevel;
            if (card.poison) {
                hitLevel = 'poison';
            } else if (card.target === 'all' || card.target === 'random') {
                hitLevel = 'aoe';
            } else if (totalDmg >= 20) {
                hitLevel = 'heavy';
            } else if (totalDmg >= 10) {
                hitLevel = 'medium';
            } else {
                hitLevel = 'light';
            }

            if (card.target === 'all') {
                for (const enemy of this.state.enemies) {
                    for (let h = 0; h < hits; h++) {
                        this.dealDamageToEnemy(enemy, dmg, card.ignoreBlock, hitLevel);
                        if (hits > 1) await Utils.delay(100);
                    }
                }
            } else if (card.target === 'random') {
                for (let h = 0; h < hits; h++) {
                    const alive = this.state.enemies.filter(e => e.hp > 0);
                    if (alive.length > 0) {
                        this.dealDamageToEnemy(Utils.randomChoice(alive), dmg, card.ignoreBlock, hitLevel);
                        if (hits > 1) await Utils.delay(100);
                    }
                }
            } else {
                const target = this.state.enemies[targetIndex];
                if (target) {
                    for (let h = 0; h < hits; h++) {
                        this.dealDamageToEnemy(target, dmg, card.ignoreBlock, hitLevel);
                        if (hits > 1) await Utils.delay(100);
                    }
                }
            }
        }

        if (card.cost === -1) {
            const spentHEnergy = this.state.hEnergy;
            const dmg = spentHEnergy * (card.damagePerEnergy || 5) + bonusDmg;
            this.state.hEnergy = 0;
            UI.showHEnergyConsume(spentHEnergy);
            const target = this.state.enemies[targetIndex];
            if (target) this.dealDamageToEnemy(target, dmg, false, 'heavy');
        }

        if (card.block) {
            const blockValue = card.block + cardBonus;
            this.state.playerBlock += blockValue;
            UI.showBlockGain(blockValue);
            Sound.play('block');
        }

        if (card.heal) {
            Game.state.player.hp = Math.min(Game.state.player.maxHp, Game.state.player.hp + card.heal);
            UI.showPlayerHeal(card.heal);
            Sound.play('heal');
        }

        if (card.draw) {
            this.drawCards(card.draw);
        }

        if (card.energy) {
            this.state.energy += card.energy;
            UI.showEnergyPulse();
            Sound.play('energy');
        }

        if (card.energyCost) {
            this.state.energy = Math.max(0, this.state.energy - card.energyCost);
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
            Sound.play('buff');
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

        if (card.hEnergyGain) {
            const oldHEnergy = this.state.hEnergy;
            this.state.hEnergy = Math.min(this.state.maxHEnergy, this.state.hEnergy + card.hEnergyGain);
            const gained = this.state.hEnergy - oldHEnergy;
            if (gained > 0) {
                UI.showHEnergyGain(gained);
            }
        }

        if (card.hEnergyPerTurn) {
            this.state.playerPowers.hEnergyPerTurn = (this.state.playerPowers.hEnergyPerTurn || 1) + card.hEnergyPerTurn;
            UI.showCombatLog(`每回合H能量 +${card.hEnergyPerTurn}`, 'system');
        }

        if (card.hEnergyCost) {
            if (this.state.hEnergy >= card.hEnergyCost) {
                this.state.hEnergy -= card.hEnergyCost;
                UI.showHEnergyConsume(card.hEnergyCost);
            }
        }

        if (card.blockPerHEnergy) {
            const spentHEnergy = this.state.hEnergy;
            const blockValue = spentHEnergy * card.blockPerHEnergy;
            this.state.hEnergy = 0;
            this.state.playerBlock += blockValue;
            UI.showHEnergyConsume(spentHEnergy);
            UI.showBlockGain(blockValue);
            Sound.play('block');
        }

        if (card.healPerHEnergy) {
            const spentHEnergy = this.state.hEnergy;
            const healValue = spentHEnergy * card.healPerHEnergy;
            this.state.hEnergy = 0;
            Game.state.player.hp = Math.min(Game.state.player.maxHp, Game.state.player.hp + healValue);
            UI.showHEnergyConsume(spentHEnergy);
            UI.showPlayerHeal(healValue);
            Sound.play('heal');
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

        if (card.shieldBash) {
            const dmg = this.state.playerBlock + bonusDmg;
            const target = this.state.enemies[targetIndex];
            if (target) this.dealDamageToEnemy(target, dmg, false, 'medium');
        }

        if (card.extraTurn) {
            this.state.extraTurns = (this.state.extraTurns || 0) + 1;
        }

        if (card.poisonAll) {
            this.state.enemies.forEach(e => { e.status.poison += card.poisonAll; });
        }

        if (card.copyCard && this.state.hand.length > 0) {
            const lowestCostCard = this.state.hand.reduce((min, c) => c.cost < min.cost ? c : min);
            const copiedCard = Cards.createCard(lowestCostCard.id, lowestCostCard.upgraded);
            this.state.hand.push(copiedCard);
        }

        if (card.minAoeDamage && card.maxAoeDamage) {
            this.state.enemies.forEach(enemy => {
                const aoeDmg = Utils.randomInt(card.minAoeDamage, card.maxAoeDamage);
                this.dealDamageToEnemy(enemy, aoeDmg, false, 'light');
            });
        } else if (card.aoeDamage) {
            this.state.enemies.forEach(enemy => {
                this.dealDamageToEnemy(enemy, card.aoeDamage, false, 'light');
            });
        }

        if (card.armorOnHit) {
            this.state.playerPowers.armorOnHit = (this.state.playerPowers.armorOnHit || 0) + card.armorOnHit;
        }

        if (card.costReduction) {
            this.state.costReduction = (this.state.costReduction || 0) + card.costReduction;
        }

        if (card.critChance && card.minDamage && card.maxDamage) {
            if (Math.random() < card.critChance) {
                const target = this.state.enemies[targetIndex];
                if (target) {
                    const baseDmg = Utils.randomInt(card.minDamage, card.maxDamage);
                    const critDmg = (baseDmg + bonusDmg) * 2;
                    this.dealDamageToEnemy(target, critDmg, card.ignoreBlock, 'heavy', true);
                    UI.showCombatLog(`暴击！造成 ${critDmg} 伤害`, 'damage');
                }
            }
        }

        if (card.handDamage) {
            const dmg = this.state.hand.length + bonusDmg;
            const target = this.state.enemies[targetIndex];
            if (target) this.dealDamageToEnemy(target, dmg, false, 'medium');
        }

        if (card.berserkerBonus) {
            this.state.playerPowers.berserkerBonus = (this.state.playerPowers.berserkerBonus || 0) + card.berserkerBonus;
        }

        if (card.healPerTurn) {
            this.state.playerPowers.healPerTurn = (this.state.playerPowers.healPerTurn || 0) + card.healPerTurn;
        }

        this.state.firstAttackBonus = 0;
    },

    dealDamageToEnemy(enemy, damage, ignoreBlock = false, hitLevel, isCritical = false) {
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
            UI.showEnemyDamage(enemy.uid, remaining, hitLevel || 'light', isCritical);
            if (!isCritical) {
                UI.showCombatLog(`对 ${enemy.name} 造成 ${remaining} 伤害`, 'damage');
            }
            Sound.play('damage');
            GameStats.recordDamage(remaining);
            Relics.onDamageDealt(Game.state.player.relics, remaining, this.state);
        }

        if (enemy.hp <= 0) {
            enemy.hp = 0;
            UI.showEnemyDeath(enemy.uid, enemy.tier);
            UI.showCombatLog(`${enemy.name} 被消灭了！`, 'system');
        }
    },

    async endTurn() {
        if (this.state.combatOver) return;

        const discardedCount = this.state.hand.length;
        this.state.discardPile.push(...this.state.hand);
        this.state.hand = [];

        const hasEnergyRecycler = Game.state.player.relics.some(r => r.id === 'energy_recycler');
        if (hasEnergyRecycler && discardedCount > 0) {
            const energyGained = Math.floor(discardedCount / 3);
            if (energyGained > 0) {
                this.state.energy += energyGained;
                UI.showCombatLog(`能量回收器：回收 ${discardedCount} 张牌，获得 ${energyGained} 能量`, 'system');
            }
        }

        const hasOverclockEngine = Game.state.player.relics.some(r => r.id === 'overclock_engine');
        let carriedEnergy = 0;
        if (hasOverclockEngine && this.state.energy > 0) {
            carriedEnergy = Math.min(1, this.state.energy);
        }

        if (this.state.extraTurns && this.state.extraTurns > 0) {
            this.state.extraTurns--;
            this.state.turn++;
            UI.showCombatLog(`额外回合！`, 'system');
            this.startPlayerTurn();
            return;
        }

        await this.enemyTurn();

        if (this.checkCombatEnd()) return;

        this.state.turn++;
        this.state.costReduction = 0;
        this.startPlayerTurn();

        if (carriedEnergy > 0) {
            this.state.energy += carriedEnergy;
            UI.showCombatLog(`超频引擎：保留 ${carriedEnergy} 能量`, 'system');
            UI.renderCombat();
        }
    },

    async enemyTurn() {
        for (const enemy of this.state.enemies) {
            if (enemy.hp <= 0) continue;

            if (enemy.status.poison > 0) {
                const poisonDmg = enemy.status.poison;
                enemy.hp -= poisonDmg;
                enemy.status.poison = Math.max(0, enemy.status.poison - 1);
                UI.showEnemyDamage(enemy.uid, poisonDmg);
                UI.showCombatLog(`${enemy.name} 受到 ${poisonDmg} 腐蚀伤害`, 'damage');
                if (enemy.hp <= 0) {
                    enemy.hp = 0;
                    UI.showEnemyDeath(enemy.uid, enemy.tier);
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

        this.state.currentAttacker = enemy;

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
                this.state.playerPoison = (this.state.playerPoison || 0) + (intent.poison || 0);
                UI.showCombatLog(`${enemy.name} 施加了 ${intent.poison} 腐蚀`, 'enemy');
                const playerAreaPoison = document.getElementById('player-area');
                Particles.spawn(playerAreaPoison, 'damage', 6);
                break;

            case 'attack_weak':
                this.dealDamageToPlayer(atkValue);
                break;

            case 'attack_all':
                this.dealDamageToPlayer(atkValue);
                break;

            case 'block':
                enemy.block += intent.value;
                UI.showCombatLog(`${enemy.name} 获得了 ${intent.value} 护甲`, 'block');
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
                UI.showCombatLog(`${enemy.name} 正在蓄力...`, 'enemy');
                break;

            case 'heal':
                enemy.hp = Math.min(enemy.maxHp, enemy.hp + intent.value);
                UI.showCombatLog(`${enemy.name} 回复了 ${intent.value} HP`, 'heal');
                break;

            case 'summon':
                const summonCount = intent.value || 1;
                for (let i = 0; i < summonCount && this.state.enemies.length < 5; i++) {
                    const minion = Enemies.createEnemy('nano_swarm_enemy');
                    if (minion) this.state.enemies.push(minion);
                }
                UI.showCombatLog(`${enemy.name} 召唤了增援！`, 'enemy');
                break;
        }
        
        this.state.currentAttacker = null;
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
            UI.showCombatLog(`你受到了 ${remaining} 点伤害`, 'damage');
            Sound.play('enemy_attack');
            
            if (this.state.playerPowers.armorOnHit > 0) {
                this.state.playerBlock += this.state.playerPowers.armorOnHit;
                UI.showCombatLog(`自适应装甲获得 ${this.state.playerPowers.armorOnHit} 护甲`, 'block');
            }
            
            const reflectedDamage = Relics.onPlayerDamaged(Game.state.player.relics, remaining, this.state);
            if (reflectedDamage > 0 && this.state.currentAttacker) {
                this.dealDamageToEnemy(this.state.currentAttacker, reflectedDamage, false, 'light');
                UI.showCombatLog(`荆棘反弹了 ${reflectedDamage} 伤害`, 'damage');
            }
        } else if (blocked > 0) {
            UI.showCombatLog(`护甲抵挡了 ${blocked} 点伤害`, 'block');
            Sound.play('block');
        }

        if (Game.state.player.hp <= 0) {
            Relics.onPlayerDamaged(Game.state.player.relics, remaining, this.state);
            if (Game.state.player.hp <= 0) {
                Game.state.player.hp = 0;
            }
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
        Particles.stopAmbient();
        Relics.onCombatEnd(Game.state.player.relics, this.state);

        let goldReward = Enemies.getGoldReward(this.state.enemyTier);
        Game.state.player.gold += goldReward;

        Game.state.stats.battlesWon = (Game.state.stats.battlesWon || 0) + 1;
        GameStats.recordBattle(Game.state.currentFloor, this.state.enemyTier);

        const rewards = Cards.getRandomRewards(3);
        let specialRewards = { cards: [], relics: [] };

        if (this.state.enemyTier === 'elite') {
            specialRewards.cards = Cards.getEliteRewards(2);
            const ownedRelicIds = Game.state.player.relics.map(r => r.id);
            specialRewards.relics = Relics.getElitePool(ownedRelicIds);
        } else if (this.state.enemyTier === 'boss') {
            const bossId = this.state.enemies[0]?.id;
            specialRewards.cards = Cards.getBossRewards(2, bossId);
            const ownedRelicIds = Game.state.player.relics.map(r => r.id);
            specialRewards.relics = Relics.getBossPool(ownedRelicIds, bossId);
        }

        UI.showRewardScreen(goldReward, rewards, specialRewards, this.state.enemyTier);
        Sound.play('victory');
    },

    onPlayerDeath() {
        Particles.stopAmbient();
        this.state.combatOver = true;
        GameStats.recordRunEnd(Game.state.currentFloor, Game.state.stats.battlesWon || 0, false);
        DailyChallenge.endDailyChallenge(false);
        Game.showScreen('screen-gameover');
        const stats = document.getElementById('gameover-stats');
        stats.innerHTML = `
            <p>到达层数：${Game.state.currentFloor}</p>
            <p>战斗胜利：${Game.state.stats.battlesWon || 0}</p>
            <p>获得金币：${Game.state.player.gold}</p>
        `;
        Sound.play('defeat');
    }
};
