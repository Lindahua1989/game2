const GameModes = {
    modes: {
        normal: {
            id: 'normal',
            name: '标准模式',
            description: '穿越3层地图，击败最终Boss',
            icon: '⚔️',
            maxFloors: 3,
            enemyScaling: 1.0,
            rewardScaling: 1.0,
            timeLimit: null,
            specialRules: []
        },
        endless: {
            id: 'endless',
            name: '无尽模式',
            description: '无限层数挑战，敌人逐渐增强，看你能坚持多久',
            icon: '♾️',
            maxFloors: Infinity,
            enemyScaling: 1.15,
            rewardScaling: 1.1,
            timeLimit: null,
            specialRules: ['scaling_enemies', 'no_final_boss']
        },
        speedrun: {
            id: 'speedrun',
            name: '竞速模式',
            description: '限时15分钟通关，追求最快速度',
            icon: '⚡',
            maxFloors: 3,
            enemyScaling: 0.9,
            rewardScaling: 1.2,
            timeLimit: 900,
            specialRules: ['time_limit', 'speed_bonus']
        },
        bossrush: {
            id: 'bossrush',
            name: 'Boss Rush',
            description: '连续挑战所有Boss，无休息无商店',
            icon: '👑',
            maxFloors: 5,
            enemyScaling: 1.0,
            rewardScaling: 1.5,
            timeLimit: null,
            specialRules: ['boss_only', 'no_rest', 'no_shop', 'heal_between']
        }
    },

    currentMode: null,
    startTime: null,
    elapsedTime: 0,

    setMode(modeId) {
        this.currentMode = this.modes[modeId] || this.modes.normal;
        this.startTime = Date.now();
        this.elapsedTime = 0;
    },

    getMode() {
        return this.currentMode || this.modes.normal;
    },

    updateTimer() {
        if (this.startTime && this.currentMode && this.currentMode.timeLimit) {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        }
    },

    getTimeRemaining() {
        if (!this.currentMode || !this.currentMode.timeLimit) return null;
        return Math.max(0, this.currentMode.timeLimit - this.elapsedTime);
    },

    isTimeUp() {
        const remaining = this.getTimeRemaining();
        return remaining !== null && remaining <= 0;
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    getEnemyScaling(floor) {
        const mode = this.getMode();
        if (mode.id === 'endless') {
            return Math.pow(mode.enemyScaling, floor - 1);
        }
        return mode.enemyScaling;
    },

    getRewardScaling(floor) {
        const mode = this.getMode();
        if (mode.id === 'endless') {
            return Math.pow(mode.rewardScaling, floor - 1);
        }
        return mode.rewardScaling;
    },

    hasRule(rule) {
        const mode = this.getMode();
        return mode.specialRules && mode.specialRules.includes(rule);
    },

    shouldGenerateBoss(floor) {
        const mode = this.getMode();
        if (this.hasRule('boss_only')) {
            return true;
        }
        if (this.hasRule('no_final_boss')) {
            return false;
        }
        return floor === mode.maxFloors;
    },

    shouldGenerateRest(floor) {
        return !this.hasRule('no_rest');
    },

    shouldGenerateShop(floor) {
        return !this.hasRule('no_shop');
    },

    onFloorComplete(floor) {
        if (this.hasRule('heal_between')) {
            const healAmount = Math.floor(Game.state.player.maxHp * 0.3);
            Game.state.player.hp = Math.min(Game.state.player.maxHp, Game.state.player.hp + healAmount);
        }
    },

    getScore() {
        const mode = this.getMode();
        let score = 0;
        
        score += Game.state.currentFloor * 1000;
        score += Game.state.stats.battlesWon * 100;
        score += Game.state.player.gold;
        
        if (mode.id === 'speedrun') {
            const timeBonus = Math.max(0, (mode.timeLimit - this.elapsedTime) * 10);
            score += timeBonus;
        }
        
        if (mode.id === 'endless') {
            score *= (1 + (Game.state.currentFloor - 1) * 0.1);
        }
        
        return Math.floor(score);
    },

    isVictory() {
        const mode = this.getMode();
        if (mode.id === 'endless') {
            return false;
        }
        return Game.state.currentFloor >= mode.maxFloors;
    }
};
