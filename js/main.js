const SAVE_PREFIX = 'star_spire_slot_';
const SAVE_INDEX_KEY = 'star_spire_slot_index';
const OLD_SAVE_KEY = 'star_spire_save';

const SaveManager = {
    getNextId() {
        return parseInt(localStorage.getItem(SAVE_INDEX_KEY) || '0', 10);
    },

    setNextId(id) {
        localStorage.setItem(SAVE_INDEX_KEY, String(id));
    },

    getAllSaves() {
        const saves = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(SAVE_PREFIX) && key !== SAVE_INDEX_KEY) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.slotId !== undefined && data.player) {
                        data._key = key;
                        saves.push(data);
                    }
                } catch (e) {}
            }
        }
        saves.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        return saves;
    },

    saveGame(name) {
        if (!Game.state || !Map.data) return false;
        const id = this.getNextId();
        this.setNextId(id + 1);
        const saveData = {
            slotId: id,
            name: name || ('存档 ' + (id + 1)),
            timestamp: Date.now(),
            player: Utils.deepClone(Game.state.player),
            currentFloor: Game.state.currentFloor,
            currentNode: Game.state.currentNode ? Utils.deepClone(Game.state.currentNode) : null,
            stats: Utils.deepClone(Game.state.stats),
            mapData: Utils.deepClone(Map.data),
            gameModeId: GameModes.getMode().id
        };
        try {
            localStorage.setItem(SAVE_PREFIX + id, JSON.stringify(saveData));
            Game.currentSaveKey = SAVE_PREFIX + id;
            Game.currentSaveName = saveData.name;
            return true;
        } catch (e) {
            console.warn('存档失败:', e);
            return false;
        }
    },

    autoSave() {
        if (!Game.state || !Map.data) return;
        if (Game.currentSaveKey) {
            const saveData = {
                slotId: parseInt(Game.currentSaveKey.replace(SAVE_PREFIX, ''), 10),
                name: Game.currentSaveName || '自动存档',
                timestamp: Date.now(),
                player: Utils.deepClone(Game.state.player),
                currentFloor: Game.state.currentFloor,
                currentNode: Game.state.currentNode ? Utils.deepClone(Game.state.currentNode) : null,
                stats: Utils.deepClone(Game.state.stats),
                mapData: Utils.deepClone(Map.data),
                gameModeId: GameModes.getMode().id
            };
            try {
                localStorage.setItem(Game.currentSaveKey, JSON.stringify(saveData));
            } catch (e) {}
        } else {
            this.saveGame('自动存档');
        }
    },

    loadGame(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return false;
            const d = JSON.parse(raw);
            Game.state = {
                player: d.player,
                currentFloor: d.currentFloor,
                currentNode: d.currentNode,
                stats: d.stats
            };
            Map.data = d.mapData;
            Game.currentSaveKey = key;
            Game.currentSaveName = d.name;
            if (d.gameModeId && GameModes.modes[d.gameModeId]) {
                GameModes.setMode(d.gameModeId);
            }
            return true;
        } catch (e) {
            console.warn('读档失败:', e);
            return false;
        }
    },

    deleteSave(key) {
        localStorage.removeItem(key);
    },

    deleteOldSave() {
        localStorage.removeItem(OLD_SAVE_KEY);
    },

    getSlotSummary(save) {
        const date = new Date(save.timestamp);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const hp = save.player ? save.player.hp : '?';
        const maxHp = save.player ? save.player.maxHp : '?';
        const gold = save.player ? save.player.gold : 0;
        const deckSize = save.player && save.player.deck ? save.player.deck.length : 0;
        const relicCount = save.player && save.player.relics ? save.player.relics.length : 0;
        return {
            name: save.name,
            date: dateStr,
            floor: save.currentFloor,
            hp,
            maxHp,
            gold,
            deckSize,
            relicCount,
            key: save._key
        };
    }
};

const Game = {
    state: null,
    currentShopData: null,
    currentSaveKey: null,
    currentSaveName: null,

    init() {
        SaveManager.deleteOldSave();
    },

    startNewRun() {
        this.showModeSelectScreen();
    },

    showModeSelectScreen() {
        this.showScreen('screen-mode-select');
        UI.renderModeSelection();
    },

    selectMode(modeId) {
        GameModes.setMode(modeId);
        Unlocks.showDeckSelection();
    },

    startNewRunWithDeck(deckId) {
        this.currentSaveKey = null;
        this.currentSaveName = null;
        this.state = {
            player: {
                hp: 85,
                maxHp: 85,
                gold: 50,
                deck: Unlocks.selectDeck(deckId),
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
        
        if (GameModes.getMode().timeLimit) {
            UI.startTimer();
        }
    },

    showSaveDialog() {
        const name = prompt('请输入存档名称：', this.currentSaveName || ('第' + this.state.currentFloor + '层'));
        if (name === null) return;
        const ok = SaveManager.saveGame(name || undefined);
        if (ok) {
            const indicator = document.getElementById('save-indicator');
            if (indicator) {
                indicator.textContent = '✓ 存档成功';
                indicator.classList.add('show');
                setTimeout(() => indicator.classList.remove('show'), 2000);
            }
        } else {
            alert('存档失败！');
        }
    },

    showLoadScreen() {
        this.showScreen('screen-load');
        this.renderSaveSlots();
    },

    renderSaveSlots() {
        const container = document.getElementById('save-slots');
        container.innerHTML = '';
        const saves = SaveManager.getAllSaves();

        if (saves.length === 0) {
            container.innerHTML = '<p style="color:#888;text-align:center;padding:40px 0">暂无存档</p>';
            return;
        }

        saves.forEach(save => {
            const s = SaveManager.getSlotSummary(save);
            const div = document.createElement('div');
            div.className = 'save-slot';
            div.innerHTML = `
                <div class="save-slot-info">
                    <div class="save-slot-name">${s.name}</div>
                    <div class="save-slot-detail">
                        📍 第${s.floor}层 &nbsp; ❤️ ${s.hp}/${s.maxHp} &nbsp; 💰 ${s.gold} &nbsp; 🃏 ${s.deckSize}张 &nbsp; 🔧 ${s.relicCount}个
                    </div>
                    <div class="save-slot-date">${s.date}</div>
                </div>
                <div class="save-slot-actions">
                    <button class="btn btn-small btn-primary" onclick="Game.loadFromSlot('${s.key}')">读取</button>
                    <button class="btn btn-small btn-danger" onclick="Game.deleteSlotConfirm('${s.key}', '${s.name}')">删除</button>
                </div>
            `;
            container.appendChild(div);
        });
    },

    loadFromSlot(key) {
        if (SaveManager.loadGame(key)) {
            this.showScreen('screen-map');
            Map.render();
            UI.updateMapStats();
        } else {
            alert('读档失败！');
        }
    },

    deleteSlotConfirm(key, name) {
        if (confirm('确定要删除存档「' + name + '」吗？')) {
            SaveManager.deleteSave(key);
            this.renderSaveSlots();
        }
    },

    showScreen(screenId) {
        const currentScreen = document.querySelector('.screen.active');
        const newScreen = document.getElementById(screenId);
        
        if (!newScreen) return;

        if (screenId === 'screen-title') {
            Sound.playBGM('title');
        } else if (screenId === 'screen-map') {
            Sound.playBGM('map');
        } else if (screenId === 'screen-combat') {
            Sound.playBGM('combat');
        }

        if (currentScreen && currentScreen !== newScreen) {
            currentScreen.classList.add('fade-out');
            setTimeout(() => {
                currentScreen.classList.remove('active', 'fade-out');
                newScreen.classList.add('active');
            }, 200);
        } else {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'fade-out'));
            newScreen.classList.add('active');
        }
    },

    togglePause() {
        const pauseScreen = document.getElementById('screen-pause');
        if (pauseScreen.classList.contains('active')) {
            pauseScreen.classList.remove('active');
            Sound.play('click');
        } else {
            pauseScreen.classList.add('active');
            Sound.play('click');
        }
    },

    confirmAbandon() {
        if (confirm('确定要放弃本局游戏吗？当前进度将丢失。')) {
            this.togglePause();
            this.state = null;
            this.toTitle();
        }
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
        const currentNode = this.state.currentNode;
        const isLastRow = currentNode && currentNode.row === Map.data.length - 1;

        if (isLastRow) {
            GameModes.onFloorComplete(this.state.currentFloor);
            
            if (GameModes.isVictory()) {
                this.showVictory();
                return;
            }
            this.state.currentFloor++;
            this.state.stats.floorsCleared++;
            GameStats.recordFloorReached(this.state.currentFloor);
            Map.generate(this.state.currentFloor);
        }

        this.showScreen('screen-map');
        Map.render();
        UI.updateMapStats();
    },

    onTimeUp() {
        UI.stopTimer();
        UI.showNotification('⏰ 时间到！挑战失败', 'warning');
        
        setTimeout(() => {
            const score = GameModes.getScore();
            const mode = GameModes.getMode();
            
            Leaderboard.addScore(mode.id, score);
            GameStats.recordRunEnd(this.state.currentFloor, this.state.stats.battlesWon || 0, false);
            
            this.showScreen('screen-gameover');
            const stats = document.getElementById('gameover-stats');
            stats.innerHTML = `
                <p>到达层数：${this.state.currentFloor}</p>
                <p>战斗胜利：${this.state.stats.battlesWon || 0}</p>
                <p>获得金币：${this.state.player.gold}</p>
                <p>最终得分：${score.toLocaleString()}</p>
            `;
        }, 2000);
    },

    showVictory() {
        UI.stopTimer();
        const score = GameModes.getScore();
        const mode = GameModes.getMode();
        
        GameStats.recordRunEnd(this.state.currentFloor, this.state.stats.battlesWon || 0, true);
        DailyChallenge.endDailyChallenge(true);
        Leaderboard.addScore(mode.id, score);
        
        this.showScreen('screen-victory');
        const stats = document.getElementById('victory-stats');
        stats.innerHTML = `
            <p>🎉 恭喜通关！</p>
            <p>游戏模式：${mode.name}</p>
            <p>战斗胜利：${this.state.stats.battlesWon || 0}</p>
            <p>获得金币：${this.state.player.gold}</p>
            <p>卡组大小：${this.state.player.deck.length}</p>
            <p>科技模块：${this.state.player.relics.length}</p>
            <p style="font-size: 24px; color: #ffaa00; margin-top: 20px;">最终得分：${score.toLocaleString()}</p>
            ${Leaderboard.isHighScore(mode.id, score) ? '<p style="color: #ff4444; font-weight: bold;">🏆 新纪录！</p>' : ''}
        `;
    },

    showStatsScreen() {
        this.showScreen('screen-stats');
        this.showStatsTab('stats');
    },

    showStatsTab(tab) {
        document.querySelectorAll('.stats-tab').forEach(t => t.classList.remove('active'));
        const tabs = document.querySelectorAll('.stats-tab');
        if (tab === 'stats' && tabs[0]) tabs[0].classList.add('active');
        if (tab === 'achievements' && tabs[1]) tabs[1].classList.add('active');

        const content = document.getElementById('stats-content');
        if (tab === 'stats') {
            content.innerHTML = GameStats.getStatsDisplay();
        } else {
            content.innerHTML = GameStats.getAchievementsDisplay();
        }
    },

    toTitle() {
        this.showScreen('screen-title');
    }
};

document.addEventListener('DOMContentLoaded', () => Game.init());

window.addEventListener('beforeunload', () => {
    if (Game.state && Map.data) {
        SaveManager.autoSave();
    }
});
