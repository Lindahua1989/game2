const DailyChallenge = {
    currentSeed: null,
    isDailyMode: false,

    getTodaySeed() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    },

    seedRandom(seed) {
        let h = 0;
        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
        }
        
        return function() {
            h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
            h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
            h = (h ^ (h >>> 16)) >>> 0;
            return h / 4294967296;
        };
    },

    startDailyChallenge() {
        this.currentSeed = this.getTodaySeed();
        this.isDailyMode = true;
        
        const seededRandom = this.seedRandom(this.currentSeed);
        const originalRandom = Math.random;
        Math.random = seededRandom;
        
        Game.startNewRunWithDeck('default');
        
        Math.random = originalRandom;
        
        UI.showNotification(`每日挑战开始！种子: ${this.currentSeed}`, 'info');
    },

    endDailyChallenge(victory) {
        if (!this.isDailyMode) return;
        
        const score = this.calculateScore(victory);
        this.saveDailyScore(score);
        
        this.isDailyMode = false;
        this.currentSeed = null;
    },

    calculateScore(victory) {
        if (!Game.state) return 0;
        
        let score = 0;
        score += Game.state.currentFloor * 100;
        score += (Game.state.stats.battlesWon || 0) * 50;
        score += Game.state.player.hp * 2;
        score += Game.state.player.gold;
        
        if (victory) {
            score += 500;
        }
        
        return score;
    },

    saveDailyScore(score) {
        const today = this.getTodaySeed();
        const scores = JSON.parse(localStorage.getItem('daily_scores') || '{}');
        
        if (!scores[today] || score > scores[today]) {
            scores[today] = score;
            localStorage.setItem('daily_scores', JSON.stringify(scores));
        }
    },

    getTodayScore() {
        const today = this.getTodaySeed();
        const scores = JSON.parse(localStorage.getItem('daily_scores') || '{}');
        return scores[today] || 0;
    },

    hasPlayedToday() {
        return this.getTodayScore() > 0;
    },

    showDailyInfo() {
        const todayScore = this.getTodayScore();
        const hasPlayed = this.hasPlayedToday();
        
        let message = `每日挑战 - ${this.getTodaySeed()}\n\n`;
        message += `所有玩家使用相同的随机种子\n`;
        message += `比较谁的分数更高！\n\n`;
        
        if (hasPlayed) {
            message += `今日最高分: ${todayScore}\n`;
            message += `再次挑战将覆盖分数`;
        } else {
            message += `你还没有挑战今天的关卡`;
        }
        
        if (confirm(message + '\n\n开始每日挑战？')) {
            this.startDailyChallenge();
        }
    }
};
