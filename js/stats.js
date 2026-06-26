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
            perfectBattles: 0,
            totalHEnergyUsed: 0,
            totalCombosTriggered: 0,
            totalExhaustCardsUsed: 0,
            totalEchoEffects: 0,
            totalSynergyBonuses: 0,
            totalCounterDamage: 0,
            speedRunBestTime: null,
            perfectBattleCount: 0
        };
    },

    getDefaultAchievements() {
        return {
            // 基础成就
            first_victory: { name: '初次胜利', desc: '赢得第一场战斗', unlocked: false, icon: '🏆' },
            floor_5: { name: '深入探索', desc: '到达第5层', unlocked: false, icon: '📍' },
            floor_10: { name: '资深探险者', desc: '到达第10层', unlocked: false, icon: '🗺️' },
            floor_15: { name: '深渊行者', desc: '到达第15层', unlocked: false, icon: '🌟' },
            floor_20: { name: '传奇探险者', desc: '到达第20层', unlocked: false, icon: '⭐' },
            floor_25: { name: '无尽征服者', desc: '到达第25层', unlocked: false, icon: '💫' },
            floor_30: { name: '星际霸主', desc: '到达第30层', unlocked: false, icon: '👑' },
            
            // Boss成就
            boss_slayer: { name: 'Boss终结者', desc: '击败第一个Boss', unlocked: false, icon: '👑' },
            boss_hunter: { name: 'Boss猎手', desc: '击败5个Boss', unlocked: false, icon: '⚔️' },
            boss_master: { name: 'Boss大师', desc: '击败10个Boss', unlocked: false, icon: '🏅' },
            all_bosses: { name: '全Boss征服', desc: '击败所有类型的Boss', unlocked: false, icon: '🏆' },
            
            // 精英成就
            elite_hunter: { name: '精英猎手', desc: '击败5个精英敌人', unlocked: false, icon: '💀' },
            elite_master: { name: '精英大师', desc: '击败20个精英敌人', unlocked: false, icon: '💀' },
            elite_slayer: { name: '精英屠杀者', desc: '击败50个精英敌人', unlocked: false, icon: '☠️' },
            
            // 卡牌成就
            card_collector: { name: '卡牌收藏家', desc: '单局收集20张卡牌', unlocked: false, icon: '🃏' },
            card_master: { name: '卡牌大师', desc: '单局收集30张卡牌', unlocked: false, icon: '🃏' },
            card_hoarder: { name: '卡牌囤积者', desc: '单局收集50张卡牌', unlocked: false, icon: '🃏' },
            card_legend: { name: '卡牌传说', desc: '单局收集100张卡牌', unlocked: false, icon: '🃏' },
            
            // 金币成就
            gold_hoarder: { name: '守财奴', desc: '单局积累100金币', unlocked: false, icon: '💰' },
            gold_master: { name: '金币大师', desc: '单局积累500金币', unlocked: false, icon: '💰' },
            gold_legend: { name: '金币传说', desc: '单局积累1000金币', unlocked: false, icon: '💰' },
            
            // 伤害成就
            damage_dealer: { name: '伤害制造者', desc: '累计造成1000点伤害', unlocked: false, icon: '⚔️' },
            damage_master: { name: '伤害大师', desc: '累计造成5000点伤害', unlocked: false, icon: '⚔️' },
            damage_legend: { name: '伤害传说', desc: '累计造成10000点伤害', unlocked: false, icon: '⚔️' },
            damage_god: { name: '伤害之神', desc: '累计造成50000点伤害', unlocked: false, icon: '⚔️' },
            
            // 游戏局数成就
            veteran: { name: '老兵', desc: '完成10局游戏', unlocked: false, icon: '🎖️' },
            veteran_master: { name: '资深老兵', desc: '完成50局游戏', unlocked: false, icon: '🎖️' },
            veteran_legend: { name: '传奇老兵', desc: '完成100局游戏', unlocked: false, icon: '🎖️' },
            
            // 完美通关成就
            perfect_run: { name: '完美通关', desc: '通关游戏且HP超过一半', unlocked: false, icon: '⭐' },
            perfect_battle: { name: '完美战斗', desc: '在一场战斗中不受任何伤害', unlocked: false, icon: '✨' },
            perfect_battle_master: { name: '完美战斗大师', desc: '完成10场完美战斗', unlocked: false, icon: '✨' },
            
            // H能量成就
            h_energy_user: { name: 'H能量使用者', desc: '累计使用100点H能量', unlocked: false, icon: '⚡' },
            h_energy_master: { name: 'H能量大师', desc: '累计使用500点H能量', unlocked: false, icon: '⚡' },
            h_energy_legend: { name: 'H能量传说', desc: '累计使用1000点H能量', unlocked: false, icon: '⚡' },
            
            // 连击成就
            combo_starter: { name: '连击新手', desc: '累计触发10次连击', unlocked: false, icon: '🔥' },
            combo_master: { name: '连击大师', desc: '累计触发50次连击', unlocked: false, icon: '🔥' },
            combo_legend: { name: '连击传说', desc: '累计触发100次连击', unlocked: false, icon: '🔥' },
            
            // 消耗卡牌成就
            exhaust_user: { name: '消耗者', desc: '累计使用10张消耗卡牌', unlocked: false, icon: '💣' },
            exhaust_master: { name: '消耗大师', desc: '累计使用50张消耗卡牌', unlocked: false, icon: '💣' },
            
            // 回响成就
            echo_user: { name: '回响者', desc: '累计触发10次回响效果', unlocked: false, icon: '🔊' },
            echo_master: { name: '回响大师', desc: '累计触发50次回响效果', unlocked: false, icon: '🔊' },
            
            // 协同成就
            synergy_user: { name: '协同者', desc: '累计触发10次协同效果', unlocked: false, icon: '🤝' },
            synergy_master: { name: '协同大师', desc: '累计触发50次协同效果', unlocked: false, icon: '🤝' },
            
            // 反击成就
            counter_user: { name: '反击者', desc: '累计造成100点反击伤害', unlocked: false, icon: '⚔️' },
            counter_master: { name: '反击大师', desc: '累计造成500点反击伤害', unlocked: false, icon: '⚔️' },
            
            // 速度成就
            speed_run_5: { name: '速通新手', desc: '在5分钟内通关', unlocked: false, icon: '⏱️' },
            speed_run_3: { name: '速通高手', desc: '在3分钟内通关', unlocked: false, icon: '⏱️' },
            speed_run_2: { name: '速通大师', desc: '在2分钟内通关', unlocked: false, icon: '⏱️' },
            
            // 战斗胜利成就
            battle_10: { name: '十胜将军', desc: '累计赢得10场战斗', unlocked: false, icon: '🏆' },
            battle_50: { name: '五十胜将军', desc: '累计赢得50场战斗', unlocked: false, icon: '🏆' },
            battle_100: { name: '百胜将军', desc: '累计赢得100场战斗', unlocked: false, icon: '🏆' }
        };
    },

    recordBattle(floor, enemyTier, damageTaken = 0) {
        this.data.totalBattlesWon++;
        if (enemyTier === 'boss') {
            this.data.bossDefeats++;
            this.checkAchievement('boss_slayer');
            if (this.data.bossDefeats >= 5) this.checkAchievement('boss_hunter');
            if (this.data.bossDefeats >= 10) this.checkAchievement('boss_master');
        }
        if (enemyTier === 'elite') {
            this.data.eliteDefeats++;
            if (this.data.eliteDefeats >= 5) this.checkAchievement('elite_hunter');
            if (this.data.eliteDefeats >= 20) this.checkAchievement('elite_master');
            if (this.data.eliteDefeats >= 50) this.checkAchievement('elite_slayer');
        }
        this.checkAchievement('first_victory');
        
        if (this.data.totalBattlesWon >= 10) this.checkAchievement('battle_10');
        if (this.data.totalBattlesWon >= 50) this.checkAchievement('battle_50');
        if (this.data.totalBattlesWon >= 100) this.checkAchievement('battle_100');
        
        // 完美战斗检查
        if (damageTaken === 0) {
            this.data.perfectBattleCount = (this.data.perfectBattleCount || 0) + 1;
            this.checkAchievement('perfect_battle');
            if (this.data.perfectBattleCount >= 10) this.checkAchievement('perfect_battle_master');
        }
        
        this.save();
    },

    recordRunEnd(floor, battlesWon, victory, startTime = null) {
        this.data.totalRuns++;
        if (floor > this.data.bestFloor) {
            this.data.bestFloor = floor;
        }
        this.data.totalFloorsCleared += floor - 1;
        
        if (Game.state) {
            this.data.totalGoldEarned += Game.state.player.gold;
            if (Game.state.player.deck.length >= 20) this.checkAchievement('card_collector');
            if (Game.state.player.deck.length >= 30) this.checkAchievement('card_master');
            if (Game.state.player.deck.length >= 50) this.checkAchievement('card_hoarder');
            if (Game.state.player.deck.length >= 100) this.checkAchievement('card_legend');
            
            if (Game.state.player.gold >= 100) this.checkAchievement('gold_hoarder');
            if (Game.state.player.gold >= 500) this.checkAchievement('gold_master');
            if (Game.state.player.gold >= 1000) this.checkAchievement('gold_legend');
            
            if (victory && Game.state.player.hp > Game.state.player.maxHp * 0.5) {
                this.checkAchievement('perfect_run');
            }
            
            // 速度成就检查
            if (startTime && victory) {
                const timeTaken = (Date.now() - startTime) / 1000 / 60; // 分钟
                if (timeTaken <= 5) this.checkAchievement('speed_run_5');
                if (timeTaken <= 3) this.checkAchievement('speed_run_3');
                if (timeTaken <= 2) this.checkAchievement('speed_run_2');
                
                if (!this.data.speedRunBestTime || timeTaken < this.data.speedRunBestTime) {
                    this.data.speedRunBestTime = timeTaken;
                }
            }
        }
        
        if (this.data.totalRuns >= 10) this.checkAchievement('veteran');
        if (this.data.totalRuns >= 50) this.checkAchievement('veteran_master');
        if (this.data.totalRuns >= 100) this.checkAchievement('veteran_legend');
        
        this.save();
    },

    recordFloorReached(floor) {
        if (floor >= 5) this.checkAchievement('floor_5');
        if (floor >= 10) this.checkAchievement('floor_10');
        if (floor >= 15) this.checkAchievement('floor_15');
        if (floor >= 20) this.checkAchievement('floor_20');
        if (floor >= 25) this.checkAchievement('floor_25');
        if (floor >= 30) this.checkAchievement('floor_30');
        this.save();
    },

    recordDamage(amount) {
        this.data.totalDamageDealt += amount;
        if (this.data.totalDamageDealt >= 1000) this.checkAchievement('damage_dealer');
        if (this.data.totalDamageDealt >= 5000) this.checkAchievement('damage_master');
        if (this.data.totalDamageDealt >= 10000) this.checkAchievement('damage_legend');
        if (this.data.totalDamageDealt >= 50000) this.checkAchievement('damage_god');
        this.save();
    },

    recordCardPlayed() {
        this.data.totalCardsPlayed++;
        this.save();
    },

    recordHEnergyUsed(amount) {
        this.data.totalHEnergyUsed = (this.data.totalHEnergyUsed || 0) + amount;
        if (this.data.totalHEnergyUsed >= 100) this.checkAchievement('h_energy_user');
        if (this.data.totalHEnergyUsed >= 500) this.checkAchievement('h_energy_master');
        if (this.data.totalHEnergyUsed >= 1000) this.checkAchievement('h_energy_legend');
        this.save();
    },

    recordComboTriggered() {
        this.data.totalCombosTriggered = (this.data.totalCombosTriggered || 0) + 1;
        if (this.data.totalCombosTriggered >= 10) this.checkAchievement('combo_starter');
        if (this.data.totalCombosTriggered >= 50) this.checkAchievement('combo_master');
        if (this.data.totalCombosTriggered >= 100) this.checkAchievement('combo_legend');
        this.save();
    },

    recordExhaustCardUsed() {
        this.data.totalExhaustCardsUsed = (this.data.totalExhaustCardsUsed || 0) + 1;
        if (this.data.totalExhaustCardsUsed >= 10) this.checkAchievement('exhaust_user');
        if (this.data.totalExhaustCardsUsed >= 50) this.checkAchievement('exhaust_master');
        this.save();
    },

    recordEchoEffect() {
        this.data.totalEchoEffects = (this.data.totalEchoEffects || 0) + 1;
        if (this.data.totalEchoEffects >= 10) this.checkAchievement('echo_user');
        if (this.data.totalEchoEffects >= 50) this.checkAchievement('echo_master');
        this.save();
    },

    recordSynergyBonus() {
        this.data.totalSynergyBonuses = (this.data.totalSynergyBonuses || 0) + 1;
        if (this.data.totalSynergyBonuses >= 10) this.checkAchievement('synergy_user');
        if (this.data.totalSynergyBonuses >= 50) this.checkAchievement('synergy_master');
        this.save();
    },

    recordCounterDamage(amount) {
        this.data.totalCounterDamage = (this.data.totalCounterDamage || 0) + amount;
        if (this.data.totalCounterDamage >= 100) this.checkAchievement('counter_user');
        if (this.data.totalCounterDamage >= 500) this.checkAchievement('counter_master');
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
            const rect = notification.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            for (let i = 0; i < 20; i++) {
                const p = document.createElement('div');
                p.className = 'particle particle-achievement particle-animate';
                const size = 4 + Math.random() * 8;
                const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.5;
                const distance = 40 + Math.random() * 60;
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
