const STATS_KEY = 'star_spire_stats';
const ACHIEVEMENTS_KEY = 'star_spire_achievements';

const GameStats = {
    data: null,
    achievements: null,

    init() {
        this.load();
    },

    load() {
        try {
            this.data = JSON.parse(localStorage.getItem(STATS_KEY)) || this.getDefaultStats();
            this.achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)) || this.getDefaultAchievements();
        } catch (e) {
            this.data = this.getDefaultStats();
            this.achievements = this.getDefaultAchievements();
        }
    },

    save() {
        try {
            localStorage.setItem(STATS_KEY, JSON.stringify(this.data));
            localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(this.achievements));
        } catch (e) {
            console.warn('Failed to save stats:', e);
        }
    },

    getDefaultStats() {
        return {
            totalRuns: 0,
            totalBattlesWon: 0,
            totalFloorsCleared: 0,
            totalDamageDealt: 0,
            totalCardsPlayed: 0,
            totalGoldEarned: 0,
            bestFloor: 0,
            bossDefeats: 0,
            eliteDefeats: 0,
            perfectBattles: 0
        };
    },

    getDefaultAchievements() {
        return {
            first_victory: { name: '初次胜利', desc: '赢得第一场战斗', unlocked: false, icon: '🏆' },
            floor_5: { name: '深入探索', desc: '到达第5层', unlocked: false, icon: '📍' },
            floor_10: { name: '资深探险者', desc: '到达第10层', unlocked: false, icon: '🗺️' },
            boss_slayer: { name: 'Boss终结者', desc: '击败第一个Boss', unlocked: false, icon: '👑' },
            elite_hunter: { name: '精英猎手', desc: '击败5个精英敌人', unlocked: false, icon: '💀' },
            card_collector: { name: '卡牌收藏家', desc: '单局收集20张卡牌', unlocked: false, icon: '🃏' },
            gold_hoarder: { name: '守财奴', desc: '单局积累100金币', unlocked: false, icon: '💰' },
            damage_dealer: { name: '伤害制造者', desc: '累计造成1000点伤害', unlocked: false, icon: '⚔️' },
            veteran: { name: '老兵', desc: '完成10局游戏', unlocked: false, icon: '🎖️' },
            perfect_run: { name: '完美通关', desc: '通关游戏且HP超过一半', unlocked: false, icon: '⭐' }
        };
    },

    recordBattle(floor, enemyTier) {
        this.data.totalBattlesWon++;
        if (enemyTier === 'boss') {
            this.data.bossDefeats++;
            this.checkAchievement('boss_slayer');
        }
        if (enemyTier === 'elite') {
            this.data.eliteDefeats++;
            if (this.data.eliteDefeats >= 5) {
                this.checkAchievement('elite_hunter');
            }
        }
        this.checkAchievement('first_victory');
        this.save();
    },

    recordRunEnd(floor, battlesWon, victory) {
        this.data.totalRuns++;
        if (floor > this.data.bestFloor) {
            this.data.bestFloor = floor;
        }
        this.data.totalFloorsCleared += floor - 1;
        if (Game.state) {
            this.data.totalGoldEarned += Game.state.player.gold;
            if (Game.state.player.deck.length >= 20) {
                this.checkAchievement('card_collector');
            }
            if (Game.state.player.gold >= 100) {
                this.checkAchievement('gold_hoarder');
            }
            if (victory && Game.state.player.hp > Game.state.player.maxHp * 0.5) {
                this.checkAchievement('perfect_run');
            }
        }
        if (this.data.totalRuns >= 10) {
            this.checkAchievement('veteran');
        }
        this.save();
    },

    recordFloorReached(floor) {
        if (floor >= 5) {
            this.checkAchievement('floor_5');
        }
        if (floor >= 10) {
            this.checkAchievement('floor_10');
        }
        this.save();
    },

    recordDamage(amount) {
        this.data.totalDamageDealt += amount;
        if (this.data.totalDamageDealt >= 1000) {
            this.checkAchievement('damage_dealer');
        }
        this.save();
    },

    recordCardPlayed() {
        this.data.totalCardsPlayed++;
        this.save();
    },

    checkAchievement(id) {
        if (this.achievements[id] && !this.achievements[id].unlocked) {
            this.achievements[id].unlocked = true;
            this.showAchievementNotification(this.achievements[id]);
            this.save();
        }
    },

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">成就解锁！</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    },

    getStatsDisplay() {
        return `
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${this.data.totalRuns}</div>
                    <div class="stat-label">总局数</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.totalBattlesWon}</div>
                    <div class="stat-label">战斗胜利</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.bestFloor}</div>
                    <div class="stat-label">最高层数</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.bossDefeats}</div>
                    <div class="stat-label">Boss击败</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.eliteDefeats}</div>
                    <div class="stat-label">精英击败</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.totalDamageDealt}</div>
                    <div class="stat-label">总伤害</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.totalCardsPlayed}</div>
                    <div class="stat-label">卡牌使用</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.data.totalGoldEarned}</div>
                    <div class="stat-label">总金币</div>
                </div>
            </div>
        `;
    },

    getAchievementsDisplay() {
        const unlocked = Object.values(this.achievements).filter(a => a.unlocked).length;
        const total = Object.keys(this.achievements).length;
        let html = `<div class="achievements-header">已解锁 ${unlocked}/${total}</div>`;
        html += '<div class="achievements-grid">';
        Object.values(this.achievements).forEach(a => {
            const cls = a.unlocked ? 'achievement unlocked' : 'achievement locked';
            html += `
                <div class="${cls}">
                    <div class="achievement-icon">${a.icon}</div>
                    <div class="achievement-name">${a.name}</div>
                    <div class="achievement-desc">${a.desc}</div>
                    ${!a.unlocked ? '<div class="achievement-locked">🔒</div>' : ''}
                </div>
            `;
        });
        html += '</div>';
        return html;
    }
};

document.addEventListener('DOMContentLoaded', () => GameStats.init());
