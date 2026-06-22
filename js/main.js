const SAVE_KEY = 'star_spire_save';

const Game = {
    state: null,
    currentShopData: null,

    init() {
        this.updateContinueButton();
    },

    startNewRun() {
        this.deleteSave();
        this.state = {
            player: {
                hp: 80,
                maxHp: 80,
                gold: 0,
                deck: Cards.getInitialDeck(),
                relics: []
            },
            currentFloor: 1,
            currentNode: null,
            stats: {
                battlesWon: 0,
                floorsCleared: 0
            }
        };

        Map.generate(1);
        this.showScreen('screen-map');
        Map.render();
        UI.updateMapStats();
        this.save();
    },

    continueRun() {
        if (this.load()) {
            this.showScreen('screen-map');
            Map.render();
            UI.updateMapStats();
        }
    },

    save() {
        if (!this.state) return;
        const saveData = {
            player: Utils.deepClone(this.state.player),
            currentFloor: this.state.currentFloor,
            currentNode: this.state.currentNode,
            stats: Utils.deepClone(this.state.stats),
            mapData: Map.data,
            timestamp: Date.now()
        };
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
            const indicator = document.getElementById('save-indicator');
            if (indicator) {
                indicator.textContent = '✓ 已保存';
                indicator.classList.add('show');
                setTimeout(() => indicator.classList.remove('show'), 1500);
            }
        } catch (e) {
            console.warn('存档失败:', e);
        }
    },

    load() {
        try {
            const raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return false;
            const saveData = JSON.parse(raw);
            this.state = {
                player: saveData.player,
                currentFloor: saveData.currentFloor,
                currentNode: saveData.currentNode,
                stats: saveData.stats
            };
            Map.data = saveData.mapData;
            return true;
        } catch (e) {
            console.warn('读档失败:', e);
            return false;
        }
    },

    hasSave() {
        return !!localStorage.getItem(SAVE_KEY);
    },

    deleteSave() {
        localStorage.removeItem(SAVE_KEY);
    },

    updateContinueButton() {
        const btn = document.getElementById('continue-btn');
        if (btn) {
            if (this.hasSave()) {
                btn.style.display = 'block';
                try {
                    const saveData = JSON.parse(localStorage.getItem(SAVE_KEY));
                    const date = new Date(saveData.timestamp);
                    btn.textContent = `继续征程 (${saveData.currentFloor}层 ${date.toLocaleDateString()})`;
                } catch (e) {
                    btn.textContent = '继续征程';
                }
            } else {
                btn.style.display = 'none';
            }
        }
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    },

    handleNodeEvent(node) {
        switch (node.type) {
            case 'combat':
                const enemies = Enemies.getEncounter(this.state.currentFloor, 'normal');
                this.showScreen('screen-combat');
                Combat.startCombat(enemies);
                break;

            case 'elite':
                const eliteEnemies = Enemies.getEncounter(this.state.currentFloor, 'elite');
                this.showScreen('screen-combat');
                Combat.startCombat(eliteEnemies);
                break;

            case 'boss':
                const boss = Enemies.getEncounter(this.state.currentFloor, 'boss');
                this.showScreen('screen-combat');
                Combat.startCombat(boss);
                break;

            case 'event':
                const event = Events.getRandom();
                UI.showEvent(event);
                break;

            case 'shop':
                this.currentShopData = Shop.generateShop(this.state);
                UI.showShop(this.currentShopData);
                break;

            case 'rest':
                this.showScreen('screen-rest');
                break;

            case 'treasure':
                const relics = Relics.getRandom(1, this.state.player.relics.map(r => r.id));
                if (relics.length > 0) {
                    this.state.player.relics.push(relics[0]);
                    alert(`获得科技模块：${relics[0].name}！\n${relics[0].description}`);
                }
                this.continueAfterEvent();
                break;
        }
    },

    continueAfterReward() {
        this.returnToMap();
    },

    skipReward() {
        this.returnToMap();
    },

    continueAfterEvent() {
        this.returnToMap();
    },

    leaveShop() {
        this.returnToMap();
    },

    restHeal() {
        const healAmount = Math.floor(this.state.player.maxHp * 0.3);
        this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + healAmount);
        this.continueAfterRest();
    },

    restUpgrade() {
        UI.showUpgradeCards();
    },

    cancelUpgrade() {
        this.continueAfterRest();
    },

    continueAfterRest() {
        this.returnToMap();
    },

    returnToMap() {
        if (this.state.currentNode && this.state.currentNode.type === 'boss') {
            if (this.state.currentFloor >= 3) {
                this.deleteSave();
                this.showVictory();
                return;
            }
            this.state.currentFloor++;
            this.state.stats.floorsCleared++;
            Map.generate(this.state.currentFloor);
        }

        this.showScreen('screen-map');
        Map.render();
        UI.updateMapStats();
        this.save();
    },

    showVictory() {
        this.showScreen('screen-victory');
        const stats = document.getElementById('victory-stats');
        stats.innerHTML = `
            <p>战斗胜利：${this.state.stats.battlesWon || 0}</p>
            <p>获得金币：${this.state.player.gold}</p>
            <p>卡组大小：${this.state.player.deck.length}</p>
            <p>科技模块：${this.state.player.relics.length}</p>
        `;
    },

    toTitle() {
        this.showScreen('screen-title');
        this.updateContinueButton();
    }
};

document.addEventListener('DOMContentLoaded', () => Game.init());
