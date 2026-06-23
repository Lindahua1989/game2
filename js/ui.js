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
            if (enemy.status.poison > 0) statusHtml += `<span class="status-badge status-poison">☢️${enemy.status.poison}</span>`;
            if (enemy.status.weak > 0) statusHtml += `<span class="status-badge status-weak">💫${enemy.status.weak}</span>`;
            if (enemy.status.strength > 0) statusHtml += `<span class="status-badge status-strength">💪${enemy.status.strength}</span>`;

            div.innerHTML = `
                <div class="enemy-intent">${intentText}</div>
                <div class="enemy-sprite">
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

    showRewardScreen(gold, cards) {
        Game.showScreen('screen-reward');
        document.getElementById('reward-gold').textContent = `💰 获得 ${gold} 金币`;

        const container = document.getElementById('reward-cards');
        container.innerHTML = '';

        cards.forEach((card, idx) => {
            const cardDiv = this.createCardElement(card, idx, (c) => {
                Game.state.player.deck.push(c);
                Game.continueAfterReward();
            });
            cardDiv.classList.remove('unplayable');
            cardDiv.style.cursor = 'pointer';
            cardDiv.onclick = () => {
                Game.state.player.deck.push(card);
                Game.continueAfterReward();
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

            if (!shopData.purchased.has('card_' + idx)) {
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

    showDamageNumber(element, value, type) {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const num = document.createElement('div');
        num.className = `damage-number ${type}`;
        num.textContent = type === 'heal' ? `+${value}` : type === 'block' ? `+${value}🛡️` : `-${value}`;
        num.style.left = (rect.left + rect.width / 2 - 20 + Utils.randomInt(-15, 15)) + 'px';
        num.style.top = (rect.top + Utils.randomInt(-10, 10)) + 'px';
        document.body.appendChild(num);
        setTimeout(() => num.remove(), 800);
    },

    showEnemyDamage(enemyUid, value, hitLevel) {
        const el = document.querySelector(`[data-enemy-uid="${enemyUid}"]`);
        if (el) {
            this.showDamageNumber(el, value, 'damage');
            const sprite = el.querySelector('.enemy-sprite');
            if (sprite) {
                const level = hitLevel || 'light';
                const allHits = ['hit', 'hit-light', 'hit-medium', 'hit-heavy', 'hit-poison', 'hit-aoe'];
                allHits.forEach(c => sprite.classList.remove(c));
                void sprite.offsetWidth;
                sprite.classList.add('hit-' + level);

                const overlay = document.createElement('div');
                overlay.className = `hit-flash-overlay hit-flash-${level === 'poison' || level === 'aoe' ? 'medium' : level}`;
                sprite.appendChild(overlay);
                setTimeout(() => overlay.remove(), 700);

                if (level === 'heavy') {
                    const combat = document.getElementById('screen-combat');
                    combat.classList.add('screen-heavy-hit');
                    setTimeout(() => combat.classList.remove('screen-heavy-hit'), 500);
                }
            }
        }
    },

    showEnemyDeath(enemyUid) {
        const el = document.querySelector(`[data-enemy-uid="${enemyUid}"]`);
        if (el) {
            el.classList.add('enemy-dying');
        }
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
    },

    showPlayerHeal(value) {
        const playerArea = document.getElementById('player-area');
        this.showDamageNumber(playerArea, value, 'heal');
        playerArea.classList.add('heal-glow');
        setTimeout(() => playerArea.classList.remove('heal-glow'), 500);
    },

    showBlockGain(value) {
        const blockEl = document.getElementById('player-block');
        this.showDamageNumber(document.getElementById('player-area'), value, 'block');
        blockEl.parentElement.classList.add('block-glow');
        setTimeout(() => blockEl.parentElement.classList.remove('block-glow'), 500);
    },

    showEnergyPulse() {
        const el = document.querySelector('.player-energy');
        if (el) {
            el.classList.add('energy-pulse');
            setTimeout(() => el.classList.remove('energy-pulse'), 400);
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

    animateCardPlay(cardIndex) {
        const handArea = document.getElementById('hand-area');
        const cards = handArea.querySelectorAll('.card');
        if (cards[cardIndex]) {
            cards[cardIndex].classList.add('card-playing');
        }
    },

    animateCardDraw() {
        const handArea = document.getElementById('hand-area');
        const lastCard = handArea.lastElementChild;
        if (lastCard) {
            lastCard.classList.add('card-drawing');
            setTimeout(() => lastCard.classList.remove('card-drawing'), 300);
        }
    }
};
