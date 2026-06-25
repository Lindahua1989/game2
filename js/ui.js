const UI = {
    renderCombat() {
        const state = Combat.state;
        if (!state) return;

        document.getElementById('combat-hp').textContent = Game.state.player.hp;
        document.getElementById('combat-max-hp').textContent = Game.state.player.maxHp;
        document.getElementById('combat-gold').textContent = Game.state.player.gold;
        document.getElementById('combat-floor-info').textContent = `第 ${Game.state.currentFloor} 层`;

        const enemyArea = document.getElementById('enemy-area');
        enemyArea.innerHTML = '';

        state.enemies.forEach((enemy, idx) => {
            if (enemy.hp <= 0) return;

            const div = document.createElement('div');
            div.className = 'enemy';
            div.setAttribute('data-enemy-uid', enemy.uid);

            if (state.targetingCard !== null) {
                div.classList.add('targetable');
                div.onclick = (e) => {
                    e.stopPropagation();
                    const cardIdx = state.targetingCard;
                    state.targetingCard = null;
                    Combat.playCard(cardIdx, idx);
                };
            }

            const hpPercent = (enemy.hp / enemy.maxHp * 100).toFixed(0);
            const intentText = Enemies.getIntentText(enemy.intent);

            let statusHtml = '';
            if (enemy.status.poison > 0) statusHtml += `<span class="status-badge status-poison">☢️${enemy.status.poison}<span class="status-tooltip">腐蚀：每回合受到 ${enemy.status.poison} 点伤害<br>每回合减少 1 层</span></span>`;
            if (enemy.status.weak > 0) statusHtml += `<span class="status-badge status-weak">💫${enemy.status.weak}<span class="status-tooltip">虚弱：攻击伤害降低四分之一<br>每回合减少 1 层</span></span>`;
            if (enemy.status.strength > 0) statusHtml += `<span class="status-badge status-strength">💪${enemy.status.strength}<span class="status-tooltip">力量：攻击伤害 +${enemy.status.strength}</span></span>`;

            let spriteAura = '';
            if (enemy.status.poison > 0) spriteAura += ' status-aura-poison';
            if (enemy.status.weak > 0) spriteAura += ' status-aura-weak';
            if (enemy.status.strength > 0) spriteAura += ' status-aura-strength';

            div.innerHTML = `
                <div class="enemy-intent">${intentText}</div>
                <div class="enemy-sprite${spriteAura}">
                    ${enemy.icon}
                    ${enemy.block > 0 ? `<span class="enemy-block">${enemy.block}</span>` : ''}
                </div>
                <div class="enemy-name">${enemy.name}</div>
                <div class="enemy-hp-bar">
                    <div class="enemy-hp-fill" style="width: ${hpPercent}%"></div>
                </div>
                <div class="enemy-hp-text">${enemy.hp}/${enemy.maxHp}</div>
                <div class="enemy-status">${statusHtml}</div>
            `;

            enemyArea.appendChild(div);
        });

        document.getElementById('player-block').textContent = state.playerBlock;
        document.getElementById('energy-current').textContent = state.energy;
        document.getElementById('energy-max').textContent = state.maxEnergy;

        const playerStatus = document.getElementById('player-status');
        let playerStatusHtml = '';
        if (state.playerPoison > 0) {
            playerStatusHtml += `<span class="status-badge status-poison">☢️${state.playerPoison}<span class="status-tooltip">腐蚀：每回合受到 ${state.playerPoison} 点伤害<br>每回合减少 1 层</span></span>`;
        }
        if (state.playerPowers.strength > 0) {
            playerStatusHtml += `<span class="status-badge status-strength">💪${state.playerPowers.strength}<span class="status-tooltip">力量：攻击伤害 +${state.playerPowers.strength}</span></span>`;
        }
        if (state.playerPowers.blockPerTurn > 0) {
            playerStatusHtml += `<span class="status-badge status-block-per-turn">🛡️${state.playerPowers.blockPerTurn}<span class="status-tooltip">每回合开始获得 ${state.playerPowers.blockPerTurn} 护甲</span></span>`;
        }
        if (state.playerPowers.damagePerTurn > 0) {
            playerStatusHtml += `<span class="status-badge status-damage-per-turn">🐝${state.playerPowers.damagePerTurn}<span class="status-tooltip">纳米蜂群：每回合对随机敌人造成 ${state.playerPowers.damagePerTurn} 伤害</span></span>`;
        }
        if (state.playerPowers.attackBonus > 0) {
            playerStatusHtml += `<span class="status-badge status-attack-bonus">🎯${state.playerPowers.attackBonus}<span class="status-tooltip">自动瞄准：攻击牌伤害 +${state.playerPowers.attackBonus}</span></span>`;
        }
        if (state.playerPowers.thorns > 0) {
            playerStatusHtml += `<span class="status-badge status-thorns">🌵${state.playerPowers.thorns}<span class="status-tooltip">荆棘：受到攻击时反弹 ${state.playerPowers.thorns} 伤害</span></span>`;
        }
        if (state.playerPowers.blockOnAttack > 0) {
            playerStatusHtml += `<span class="status-badge status-block-on-attack">🔧${state.playerPowers.blockOnAttack}<span class="status-tooltip">机械强化：每打出攻击牌获得 ${state.playerPowers.blockOnAttack} 护甲</span></span>`;
        }
        if (state.playerPowers.energyPerTurn > 0) {
            playerStatusHtml += `<span class="status-badge status-energy-per-turn">⚡${state.playerPowers.energyPerTurn}<span class="status-tooltip">过载协议：每回合 +${state.playerPowers.energyPerTurn} 能量</span></span>`;
        }
        if (state.playerPowers.healPerTurn > 0) {
            playerStatusHtml += `<span class="status-badge status-heal-per-turn">💚${state.playerPowers.healPerTurn}<span class="status-tooltip">修复无人机：每回合回复 ${state.playerPowers.healPerTurn} HP</span></span>`;
        }
        if (state.playerPowers.armorOnHit > 0) {
            playerStatusHtml += `<span class="status-badge status-armor-on-hit">🔰${state.playerPowers.armorOnHit}<span class="status-tooltip">自适应装甲：每次受伤时获得 ${state.playerPowers.armorOnHit} 护甲</span></span>`;
        }
        if (state.playerPowers.berserkerBonus > 0) {
            playerStatusHtml += `<span class="status-badge status-berserker">😤${state.playerPowers.berserkerBonus}<span class="status-tooltip">狂战士之怒：HP越低伤害越高（最多 +${state.playerPowers.berserkerBonus}）</span></span>`;
        }
        playerStatus.innerHTML = playerStatusHtml;

        const handArea = document.getElementById('hand-area');
        handArea.innerHTML = '';

        state.hand.forEach((card, idx) => {
            const cardDiv = this.createCardElement(card, idx);
            handArea.appendChild(cardDiv);
        });

        document.getElementById('draw-count').textContent = state.drawPile.length;
        document.getElementById('discard-count').textContent = state.discardPile.length;

        const endBtn = document.getElementById('end-turn-btn');
        endBtn.disabled = state.combatOver;
    },

    createCardElement(card, index, onClick) {
        const div = document.createElement('div');
        div.className = `card ${card.type}`;

        if (card.upgraded) div.classList.add('upgraded');

        let cost = card.cost;
        if (cost === -1) cost = Combat.state ? Combat.state.energy : 'X';
        if (card.tempCostZero) {
            cost = 0;
            card.tempCostZero = false;
        }

        const canPlay = Combat.state && cost <= Combat.state.energy && !Combat.state.combatOver;
        if (!canPlay && Combat.state) div.classList.add('unplayable');

        div.innerHTML = `
            <div class="card-cost">${cost}</div>
            <div class="card-icon">${card.icon}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-desc">${card.description}</div>
            <div class="card-type">${this.getCardTypeName(card.type)}</div>
        `;

        if (onClick) {
            div.onclick = (e) => { e.stopPropagation(); onClick(card, index); };
        } else if (canPlay && Combat.state) {
            div.onclick = (e) => {
                e.stopPropagation();
                Combat.playCard(index);
            };
        }

        return div;
    },

    getCardTypeName(type) {
        switch (type) {
            case 'attack': return '攻击';
            case 'skill': return '技能';
            case 'power': return '能力';
            default: return type;
        }
    },

    showRewardScreen(gold, cards, specialRewards = { cards: [], relics: [] }, enemyTier = 'normal') {
        Game.showScreen('screen-reward');
        document.getElementById('reward-gold').textContent = `💰 获得 ${gold} 金币`;

        const container = document.getElementById('reward-cards');
        container.innerHTML = '';

        if (specialRewards.cards.length > 0 || specialRewards.relics.length > 0) {
            const specialHeader = document.createElement('div');
            specialHeader.style.cssText = 'width: 100%; text-align: center; margin-bottom: 16px;';
            const tierText = enemyTier === 'boss' ? '👑 Boss专属奖励' : '💀 精英专属奖励';
            specialHeader.innerHTML = `<h3 style="color: ${enemyTier === 'boss' ? '#ffaa00' : '#b44aff'}; margin: 0;">${tierText}</h3>`;
            container.appendChild(specialHeader);

            specialRewards.cards.forEach((card, idx) => {
                const cardDiv = this.createCardElement(card, idx);
                cardDiv.classList.remove('unplayable');
                cardDiv.classList.add('card-reveal');
                cardDiv.style.cursor = 'pointer';
                cardDiv.style.border = `3px solid ${enemyTier === 'boss' ? '#ffaa00' : '#b44aff'}`;
                cardDiv.style.boxShadow = `0 0 20px ${enemyTier === 'boss' ? 'rgba(255, 170, 0, 0.6)' : 'rgba(180, 74, 255, 0.6)'}`;
                cardDiv.style.animationDelay = `${idx * 0.2}s`;
                
                const canAdd = Cards.canAddToDeck(Game.state.player.deck, card);
                if (!canAdd) {
                    cardDiv.style.opacity = '0.5';
                    cardDiv.style.cursor = 'not-allowed';
                    const badge = document.createElement('div');
                    badge.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 68, 102, 0.9); padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;';
                    badge.textContent = '已拥有';
                    cardDiv.appendChild(badge);
                }
                
                cardDiv.onclick = () => {
                    if (Cards.addToDeck(Game.state.player.deck, card)) {
                        Game.continueAfterReward();
                    }
                };
                container.appendChild(cardDiv);
            });

            specialRewards.relics.forEach((relic, idx) => {
                const relicDiv = document.createElement('div');
                relicDiv.style.cssText = `
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 16px;
                    margin: 8px;
                    background: rgba(20, 20, 50, 0.9);
                    border: 3px solid ${enemyTier === 'boss' ? '#ffaa00' : '#b44aff'};
                    border-radius: 12px;
                    cursor: pointer;
                    box-shadow: 0 0 20px ${enemyTier === 'boss' ? 'rgba(255, 170, 0, 0.6)' : 'rgba(180, 74, 255, 0.6)'};
                    transition: all 0.3s;
                    width: 140px;
                    height: 196px;
                    justify-content: center;
                `;
                relicDiv.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 8px;">${relic.icon}</div>
                    <div style="font-size: 14px; font-weight: bold; color: #fff; margin-bottom: 4px;">${relic.name}</div>
                    <div style="font-size: 11px; color: #aaa; text-align: center; line-height: 1.4;">${relic.description}</div>
                `;
                relicDiv.onmouseenter = () => {
                    relicDiv.style.transform = 'translateY(-10px) scale(1.05)';
                };
                relicDiv.onmouseleave = () => {
                    relicDiv.style.transform = 'translateY(0) scale(1)';
                };
                relicDiv.onclick = () => {
                    Game.state.player.relics.push(relic);
                    Game.continueAfterReward();
                };
                container.appendChild(relicDiv);
            });

            const separator = document.createElement('div');
            separator.style.cssText = 'width: 100%; text-align: center; margin: 16px 0;';
            separator.innerHTML = '<h3 style="color: #00d4ff; margin: 0;">普通奖励</h3>';
            container.appendChild(separator);
        }

        cards.forEach((card, idx) => {
            const cardDiv = this.createCardElement(card, idx, (c) => {
                Cards.addToDeck(Game.state.player.deck, c);
                Game.continueAfterReward();
            });
            cardDiv.classList.remove('unplayable');
            cardDiv.classList.add('card-reveal');
            cardDiv.style.cursor = 'pointer';
            cardDiv.style.animationDelay = `${(specialRewards.cards.length + idx) * 0.15 + 0.3}s`;
            
            const canAdd = Cards.canAddToDeck(Game.state.player.deck, card);
            if (!canAdd) {
                cardDiv.style.opacity = '0.5';
                cardDiv.style.cursor = 'not-allowed';
                const badge = document.createElement('div');
                badge.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 68, 102, 0.9); padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;';
                badge.textContent = '已拥有';
                cardDiv.appendChild(badge);
            }
            
            cardDiv.onclick = () => {
                if (Cards.addToDeck(Game.state.player.deck, card)) {
                    Game.continueAfterReward();
                }
            };
            container.appendChild(cardDiv);
        });
    },

    showEvent(event) {
        Game.showScreen('screen-event');
        document.getElementById('event-icon').textContent = event.icon;
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-description').textContent = event.description;

        const choicesDiv = document.getElementById('event-choices');
        choicesDiv.innerHTML = '';

        event.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.textContent = choice.text;
            btn.onclick = () => {
                const result = choice.effect(Game.state);
                btn.textContent = result;
                btn.disabled = true;
                choicesDiv.querySelectorAll('.btn').forEach(b => {
                    if (b !== btn) b.disabled = true;
                });
                setTimeout(() => Game.continueAfterEvent(), 1500);
            };
            choicesDiv.appendChild(btn);
        });
    },

    showShop(shopData) {
        Game.showScreen('screen-shop');
        document.getElementById('shop-gold').textContent = Game.state.player.gold;

        const cardsDiv = document.getElementById('shop-cards');
        cardsDiv.innerHTML = '';
        shopData.cards.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'shop-item';
            if (shopData.purchased.has('card_' + idx)) div.classList.add('sold');

            const cardEl = this.createCardElement(item.card, idx);
            cardEl.style.cursor = 'default';
            cardEl.classList.remove('unplayable');

            div.innerHTML = cardEl.innerHTML;
            div.innerHTML += `<div class="shop-price">💰 ${item.price}</div>`;

            const canAdd = Cards.canAddToDeck(Game.state.player.deck, item.card);
            if (!canAdd) {
                div.classList.add('sold');
                div.innerHTML += '<div style="color: #ff4466; font-size: 12px; margin-top: 4px;">已拥有</div>';
            }

            if (!shopData.purchased.has('card_' + idx) && canAdd) {
                div.onclick = () => {
                    if (Shop.buyCard(idx, shopData, Game.state)) {
                        div.classList.add('sold');
                        document.getElementById('shop-gold').textContent = Game.state.player.gold;
                    }
                };
            }
            cardsDiv.appendChild(div);
        });

        const relicsDiv = document.getElementById('shop-relics');
        relicsDiv.innerHTML = '';
        shopData.relics.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'shop-item';
            if (shopData.purchased.has('relic_' + idx)) div.classList.add('sold');

            div.innerHTML = `
                <div style="font-size:32px">${item.relic.icon}</div>
                <div style="font-size:14px;color:#fff;margin:4px 0">${item.relic.name}</div>
                <div style="font-size:11px;color:#aaa">${item.relic.description}</div>
                <div class="shop-price">💰 ${item.price}</div>
            `;

            if (!shopData.purchased.has('relic_' + idx)) {
                div.onclick = () => {
                    if (Shop.buyRelic(idx, shopData, Game.state)) {
                        div.classList.add('sold');
                        document.getElementById('shop-gold').textContent = Game.state.player.gold;
                    }
                };
            }
            relicsDiv.appendChild(div);
        });

        const servicesDiv = document.getElementById('shop-services');
        servicesDiv.innerHTML = '';
        shopData.services.forEach(service => {
            const div = document.createElement('div');
            div.className = 'shop-item';
            if (shopData.purchased.has('service_' + service.id)) div.classList.add('sold');

            div.innerHTML = `
                <div style="font-size:32px">${service.icon}</div>
                <div style="font-size:14px;color:#fff;margin:4px 0">${service.name}</div>
                <div style="font-size:11px;color:#aaa">${service.description}</div>
                <div class="shop-price">💰 ${service.price}</div>
            `;

            if (!shopData.purchased.has('service_' + service.id)) {
                div.onclick = () => {
                    if (Shop.buyService(service.id, shopData, Game.state)) {
                        div.classList.add('sold');
                        document.getElementById('shop-gold').textContent = Game.state.player.gold;
                    }
                };
            }
            servicesDiv.appendChild(div);
        });
    },

    showDeck() {
        this.openModal('卡组', Game.state.player.deck);
    },

    showRelics() {
        const relics = Game.state.player.relics;
        const body = document.getElementById('modal-body');
        body.innerHTML = '';

        if (relics.length === 0) {
            body.innerHTML = '<p style="color:#888">还没有获得任何科技模块</p>';
        } else {
            relics.forEach(r => {
                body.innerHTML += `
                    <div style="display:flex;align-items:center;gap:12px;margin:8px 0;padding:8px;border:1px solid rgba(0,212,255,0.2);border-radius:8px">
                        <span style="font-size:24px">${r.icon}</span>
                        <div>
                            <div style="color:#fff;font-weight:bold">${r.name}</div>
                            <div style="color:#aaa;font-size:12px">${r.description}</div>
                        </div>
                    </div>
                `;
            });
        }

        this.openModal('科技模块');
    },

    showPile(type) {
        const pile = type === 'draw' ? Combat.state.drawPile : Combat.state.discardPile;
        const title = type === 'draw' ? '抽牌堆' : '弃牌堆';
        this.openModal(title, pile);
    },

    showRemoveCard() {
        Game.showScreen('screen-upgrade');
        const container = document.getElementById('upgrade-cards');
        container.innerHTML = '<h3 style="width:100%;color:#ff4466;margin-bottom:12px">选择要移除的卡牌：</h3>';

        Game.state.player.deck.forEach((card, idx) => {
            const cardDiv = this.createCardElement(card, idx);
            cardDiv.classList.remove('unplayable');
            cardDiv.style.cursor = 'pointer';
            cardDiv.onclick = () => {
                Game.state.player.deck.splice(idx, 1);
                Game.showScreen('screen-shop');
            };
            container.appendChild(cardDiv);
        });
    },

    showUpgradeCards() {
        Game.showScreen('screen-upgrade');
        const container = document.getElementById('upgrade-cards');
        container.innerHTML = '';

        const upgradeable = Game.state.player.deck.filter(c => !c.upgraded);
        if (upgradeable.length === 0) {
            container.innerHTML = '<p style="color:#888">没有可升级的卡牌</p>';
            return;
        }

        upgradeable.forEach((card) => {
            const idx = Game.state.player.deck.indexOf(card);
            const cardDiv = this.createCardElement(card, idx);
            cardDiv.classList.remove('unplayable');
            cardDiv.style.cursor = 'pointer';
            cardDiv.onclick = () => {
                Cards.upgradeCard(card);
                Game.continueAfterRest();
            };
            container.appendChild(cardDiv);
        });
    },

    openModal(title, cards) {
        document.getElementById('modal-title').textContent = title;
        const body = document.getElementById('modal-body');

        if (cards) {
            body.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexWrap = 'wrap';
            wrapper.style.gap = '8px';
            wrapper.style.justifyContent = 'center';

            cards.forEach((card, idx) => {
                const cardDiv = this.createCardElement(card, idx);
                cardDiv.classList.remove('unplayable');
                cardDiv.style.cursor = 'default';
                wrapper.appendChild(cardDiv);
            });

            body.appendChild(wrapper);
        }

        document.getElementById('modal-overlay').classList.add('active');
    },

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('active');
    },

    updateMapStats() {
        document.getElementById('map-hp').textContent = Game.state.player.hp;
        document.getElementById('map-max-hp').textContent = Game.state.player.maxHp;
        document.getElementById('map-gold').textContent = Game.state.player.gold;
        document.getElementById('map-floor').textContent = Game.state.currentFloor;
    },

    showDamageNumber(element, value, type, isCritical = false) {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const num = document.createElement('div');
        num.className = `damage-number ${type}${isCritical ? ' critical' : ''}`;
        num.textContent = type === 'heal' ? `+${value}` : type === 'block' ? `+${value}🛡️` : `-${value}`;
        num.style.left = (rect.left + rect.width / 2 - 20 + Utils.randomInt(-15, 15)) + 'px';
        num.style.top = (rect.top + Utils.randomInt(-10, 10)) + 'px';
        document.body.appendChild(num);
        setTimeout(() => num.remove(), isCritical ? 1200 : 800);
    },

    showCriticalEffect(element) {
        const flash = document.createElement('div');
        flash.className = 'critical-flash';
        document.getElementById('game-container').appendChild(flash);
        setTimeout(() => flash.remove(), 300);

        if (element) {
            const rect = element.getBoundingClientRect();
            const text = document.createElement('div');
            text.className = 'critical-text';
            text.textContent = '暴击!';
            text.style.left = (rect.left + rect.width / 2 - 40) + 'px';
            text.style.top = (rect.top - 30) + 'px';
            document.body.appendChild(text);
            setTimeout(() => text.remove(), 1000);
        }
    },

    showEnemyDamage(enemyUid, value, hitLevel, isCritical = false) {
        const el = document.querySelector(`[data-enemy-uid="${enemyUid}"]`);
        if (el) {
            this.showDamageNumber(el, value, 'damage', isCritical);
            if (isCritical) {
                this.showCriticalEffect(el);
            }
            const sprite = el.querySelector('.enemy-sprite');
            if (sprite) {
                const level = isCritical ? 'heavy' : (hitLevel || 'light');
                const allHits = ['hit', 'hit-light', 'hit-medium', 'hit-heavy', 'hit-poison', 'hit-aoe'];
                allHits.forEach(c => sprite.classList.remove(c));
                void sprite.offsetWidth;
                sprite.classList.add('hit-' + level);

                const overlay = document.createElement('div');
                overlay.className = `hit-flash-overlay hit-flash-${level === 'poison' || level === 'aoe' ? 'medium' : level}`;
                sprite.appendChild(overlay);
                setTimeout(() => overlay.remove(), 700);

                const particleCount = level === 'heavy' ? 16 : level === 'medium' ? 12 : 8;
                Particles.spawn(sprite, 'damage', particleCount);

                if (level === 'heavy') {
                    const combat = document.getElementById('screen-combat');
                    combat.classList.add('screen-heavy-hit');
                    setTimeout(() => combat.classList.remove('screen-heavy-hit'), 500);
                }
            }
        }
    },

    showEnemyDeath(enemyUid, tier = 'normal') {
        const el = document.querySelector(`[data-enemy-uid="${enemyUid}"]`);
        if (!el) return;

        if (tier === 'boss') {
            el.classList.add('enemy-dying-boss');
            this.showBossDeathEffect(el);
        } else if (tier === 'elite') {
            el.classList.add('enemy-dying-elite');
            this.showEliteDeathEffect(el);
        } else {
            el.classList.add('enemy-dying');
            Particles.spawn(el, 'damage', 15);
        }
    },

    showEliteDeathEffect(el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle particle-elite-death particle-animate';
            const size = 6 + Math.random() * 10;
            const angle = (Math.PI * 2 * i) / 25 + (Math.random() - 0.5) * 0.5;
            const distance = 50 + Math.random() * 80;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const duration = 0.6 + Math.random() * 0.4;
            p.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: ${cx - size / 2}px; top: ${cy - size / 2}px;
                --tx: ${tx}px; --ty: ${ty}px; --duration: ${duration}s;
            `;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), duration * 1000);
        }

        const text = document.createElement('div');
        text.className = 'kill-text elite-kill';
        text.textContent = '精英击杀!';
        text.style.left = (rect.left + rect.width / 2 - 60) + 'px';
        text.style.top = (rect.top - 20) + 'px';
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 1500);
    },

    showBossDeathEffect(el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const combat = document.getElementById('screen-combat');
        combat.classList.add('screen-heavy-hit');
        setTimeout(() => combat.classList.remove('screen-heavy-hit'), 500);

        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 25; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle particle-boss-death particle-animate';
                    const size = 8 + Math.random() * 14;
                    const angle = (Math.PI * 2 * i) / 25 + (Math.random() - 0.5) * 0.5;
                    const distance = 60 + Math.random() * 120;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    const duration = 0.8 + Math.random() * 0.6;
                    p.style.cssText = `
                        width: ${size}px; height: ${size}px;
                        left: ${cx - size / 2}px; top: ${cy - size / 2}px;
                        --tx: ${tx}px; --ty: ${ty}px; --duration: ${duration}s;
                    `;
                    document.body.appendChild(p);
                    setTimeout(() => p.remove(), duration * 1000);
                }
            }, wave * 200);
        }

        const text = document.createElement('div');
        text.className = 'kill-text boss-kill';
        text.textContent = 'Boss 击杀!';
        text.style.left = (rect.left + rect.width / 2 - 80) + 'px';
        text.style.top = (rect.top - 30) + 'px';
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 2000);
    },

    showEnemyAttack(enemyUid) {
        const el = document.querySelector(`[data-enemy-uid="${enemyUid}"]`);
        if (el) {
            el.classList.add('enemy-attacking');
            setTimeout(() => el.classList.remove('enemy-attacking'), 500);
        }
    },

    showPlayerHit() {
        const combat = document.getElementById('screen-combat');
        combat.classList.remove('player-hit-flash');
        void combat.offsetWidth;
        combat.classList.add('player-hit-flash');
        setTimeout(() => combat.classList.remove('player-hit-flash'), 400);

        const playerArea = document.getElementById('player-area');
        this.showDamageNumber(playerArea, 0, 'damage');
        Particles.spawn(playerArea, 'damage', 10);
    },

    showPlayerHeal(value) {
        const playerArea = document.getElementById('player-area');
        this.showDamageNumber(playerArea, value, 'heal');
        playerArea.classList.add('heal-glow');
        setTimeout(() => playerArea.classList.remove('heal-glow'), 500);
        Particles.spawn(playerArea, 'heal', 15);
    },

    showBlockGain(value) {
        const blockEl = document.getElementById('player-block');
        this.showDamageNumber(document.getElementById('player-area'), value, 'block');
        blockEl.parentElement.classList.add('block-glow');
        setTimeout(() => blockEl.parentElement.classList.remove('block-glow'), 500);
        Particles.spawn(blockEl.parentElement, 'block', 12);
    },

    showEnergyPulse() {
        const el = document.querySelector('.player-energy');
        if (el) {
            el.classList.add('energy-pulse');
            setTimeout(() => el.classList.remove('energy-pulse'), 400);
            Particles.spawn(el, 'energy', 12);
        }
    },

    showCombatLog(text, type) {
        const log = document.getElementById('combat-log');
        const entry = document.createElement('div');
        entry.className = 'log-entry log-new';
        if (type) entry.classList.add('log-' + type);
        entry.textContent = text;
        log.insertBefore(entry, log.firstChild);
        const entries = log.querySelectorAll('.log-entry');
        entries.forEach((e, i) => {
            if (i > 0) e.classList.remove('log-new');
            if (i > 30) e.remove();
        });
    },

    animateCardPlay(cardIndex, cardType, targetIndex) {
        const handArea = document.getElementById('hand-area');
        const cards = handArea.querySelectorAll('.card');
        const cardEl = cards[cardIndex];
        if (!cardEl) return;

        const cardRect = cardEl.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        let targetX, targetY;

        if (cardType === 'attack' && targetIndex !== undefined) {
            const enemyEls = document.querySelectorAll('.enemy');
            const enemyEl = enemyEls[targetIndex];
            if (enemyEl) {
                const enemyRect = enemyEl.getBoundingClientRect();
                targetX = enemyRect.left + enemyRect.width / 2;
                targetY = enemyRect.top + enemyRect.height / 2;
            }
        } else if (cardType === 'skill') {
            const playerArea = document.getElementById('player-area');
            if (playerArea) {
                const playerRect = playerArea.getBoundingClientRect();
                targetX = playerRect.left + playerRect.width / 2;
                targetY = playerRect.top + playerRect.height / 2;
            }
        }

        cardEl.classList.add('card-playing');

        if (cardType === 'attack' && targetX !== undefined) {
            const dx = targetX - cardCenterX;
            const dy = targetY - cardCenterY;
            cardEl.style.setProperty('--fly-x', dx + 'px');
            cardEl.style.setProperty('--fly-y', dy + 'px');
            cardEl.classList.add('card-fly-attack');
        } else if (cardType === 'skill' && targetX !== undefined) {
            const dx = targetX - cardCenterX;
            const dy = targetY - cardCenterY;
            cardEl.style.setProperty('--fly-x', dx + 'px');
            cardEl.style.setProperty('--fly-y', dy + 'px');
            cardEl.classList.add('card-fly-skill');
        } else if (cardType === 'power') {
            cardEl.classList.add('card-fly-power');
        } else {
            cardEl.style.setProperty('--fly-x', '0px');
            cardEl.style.setProperty('--fly-y', '-120px');
            cardEl.classList.add('card-fly-skill');
        }

        Particles.spawn(cardEl, 'card', 12);
    },

    animateCardDraw() {
        const handArea = document.getElementById('hand-area');
        const lastCard = handArea.lastElementChild;
        if (lastCard) {
            lastCard.classList.add('card-drawing');
            setTimeout(() => lastCard.classList.remove('card-drawing'), 300);
        }
    },

    showBossDialogue(enemyName, text) {
        const dialogue = document.createElement('div');
        dialogue.className = 'boss-dialogue';
        dialogue.innerHTML = `
            <div class="boss-dialogue-name">${enemyName}</div>
            <div class="boss-dialogue-text">"${text}"</div>
        `;
        document.getElementById('game-container').appendChild(dialogue);
        
        setTimeout(() => dialogue.classList.add('show'), 50);
        setTimeout(() => {
            dialogue.classList.remove('show');
            setTimeout(() => dialogue.remove(), 500);
        }, 3000);
    },

    showBossEntrance(bossName, bossIcon) {
        const overlay = document.createElement('div');
        overlay.className = 'boss-entrance-overlay';
        overlay.innerHTML = `
            <div class="boss-entrance-icon">${bossIcon}</div>
            <div class="boss-entrance-name">${bossName}</div>
        `;
        document.getElementById('game-container').appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('active'), 50);
        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        }, 1800);
    },

    showPhaseTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'phase-transition-overlay';
        document.getElementById('game-container').appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('active'), 50);
        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        }, 1500);
    },

    showNotification(text, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `game-notification notification-${type}`;
        notification.textContent = text;
        document.getElementById('game-container').appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 50);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    },

    renderModeSelection() {
        const container = document.getElementById('mode-grid');
        container.innerHTML = '';

        Object.values(GameModes.modes).forEach(mode => {
            const div = document.createElement('div');
            div.className = 'mode-option';
            div.onclick = () => Game.selectMode(mode.id);

            let rulesHtml = '';
            if (mode.specialRules && mode.specialRules.length > 0) {
                rulesHtml = '<div class="mode-rules">';
                mode.specialRules.forEach(rule => {
                    const ruleText = this.getRuleText(rule);
                    rulesHtml += `<span class="rule-tag">${ruleText}</span>`;
                });
                rulesHtml += '</div>';
            }

            div.innerHTML = `
                <div class="mode-icon">${mode.icon}</div>
                <div class="mode-name">${mode.name}</div>
                <div class="mode-desc">${mode.description}</div>
                ${rulesHtml}
            `;
            container.appendChild(div);
        });
    },

    getRuleText(rule) {
        const ruleTexts = {
            'scaling_enemies': '敌人逐渐增强',
            'no_final_boss': '无最终Boss',
            'time_limit': '限时挑战',
            'speed_bonus': '速度奖励',
            'boss_only': '仅Boss战',
            'no_rest': '无休息点',
            'no_shop': '无商店',
            'heal_between': '战后回复'
        };
        return ruleTexts[rule] || rule;
    },

    startTimer() {
        const timerDisplay = document.getElementById('map-timer');
        const timerText = document.getElementById('timer-display');
        
        if (timerDisplay) {
            timerDisplay.style.display = 'inline';
        }

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            GameModes.updateTimer();
            const remaining = GameModes.getTimeRemaining();
            
            if (remaining !== null) {
                timerText.textContent = GameModes.formatTime(remaining);
                
                if (remaining <= 60) {
                    timerText.style.color = '#ff4444';
                } else if (remaining <= 180) {
                    timerText.style.color = '#ffaa00';
                } else {
                    timerText.style.color = '#00d4ff';
                }

                if (GameModes.isTimeUp()) {
                    clearInterval(this.timerInterval);
                    Game.onTimeUp();
                }
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    renderDeckEdit() {
        const deck = Game.state.player.deck;
        const editState = Game.deckEditState;
        const minDeckSize = 25;
        const maxRemovable = deck.length > minDeckSize ? deck.length - minDeckSize : 1;
        
        const upgradeContainer = document.getElementById('deck-edit-upgrade-cards');
        const removeContainer = document.getElementById('deck-edit-remove-cards');
        const removeInfo = document.getElementById('deck-edit-remove-info');
        
        upgradeContainer.innerHTML = '';
        removeContainer.innerHTML = '';
        
        const upgradeableCards = deck.filter(c => !c.upgraded);
        upgradeableCards.forEach(card => {
            const cardDiv = this.createCardElement(card, 0);
            cardDiv.classList.add('deck-edit-card');
            if (editState.upgradeCard === card.uid) {
                cardDiv.classList.add('selected');
                const badge = document.createElement('div');
                badge.className = 'card-badge';
                badge.textContent = '升级';
                cardDiv.appendChild(badge);
            }
            cardDiv.onclick = () => Game.selectUpgradeCard(card.uid);
            upgradeContainer.appendChild(cardDiv);
        });
        
        if (upgradeableCards.length === 0) {
            upgradeContainer.innerHTML = '<p style="color: #888;">所有卡牌已升级</p>';
        }
        
        removeInfo.textContent = `(可选 ${editState.removeCards.length}/${maxRemovable}，卡组最少保留 ${minDeckSize} 张)`;
        
        deck.forEach(card => {
            const cardDiv = this.createCardElement(card, 0);
            cardDiv.classList.add('deck-edit-card');
            if (editState.removeCards.includes(card.uid)) {
                cardDiv.classList.add('removed');
                const badge = document.createElement('div');
                badge.className = 'card-badge remove-badge';
                badge.textContent = '移除';
                cardDiv.appendChild(badge);
            }
            cardDiv.onclick = () => Game.selectRemoveCard(card.uid);
            removeContainer.appendChild(cardDiv);
        });
    }
};
