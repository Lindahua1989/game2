const Unlocks = {
    decks: {
        default: {
            name: '标准战士',
            icon: '⚔️',
            description: '平衡的攻击和防御卡组',
            unlocked: true,
            getDeck: () => {
                const deck = [];
                for (let i = 0; i < 5; i++) deck.push(Cards.createCard('laser_shot'));
                for (let i = 0; i < 4; i++) deck.push(Cards.createCard('energy_shield'));
                deck.push(Cards.createCard('plasma_cannon'));
                return deck;
            }
        },
        assassin: {
            name: '暗影刺客',
            icon: '🗡️',
            description: '高伤害低防御的激进攻击卡组',
            unlocked: false,
            requireAchievement: 'boss_slayer',
            getDeck: () => {
                const deck = [];
                for (let i = 0; i < 7; i++) deck.push(Cards.createCard('laser_shot'));
                for (let i = 0; i < 2; i++) deck.push(Cards.createCard('energy_shield'));
                deck.push(Cards.createCard('plasma_cannon'));
                deck.push(Cards.createCard('rapid_fire'));
                return deck;
            }
        },
        tank: {
            name: '重装卫士',
            icon: '🛡️',
            description: '高防御持久战卡组',
            unlocked: false,
            requireAchievement: 'veteran',
            getDeck: () => {
                const deck = [];
                for (let i = 0; i < 3; i++) deck.push(Cards.createCard('laser_shot'));
                for (let i = 0; i < 6; i++) deck.push(Cards.createCard('energy_shield'));
                deck.push(Cards.createCard('nano_armor'));
                return deck;
            }
        },
        mage: {
            name: '能量法师',
            icon: '⚡',
            description: '利用能量和抽牌的连击卡组',
            unlocked: false,
            requireAchievement: 'card_collector',
            getDeck: () => {
                const deck = [];
                for (let i = 0; i < 4; i++) deck.push(Cards.createCard('laser_shot'));
                for (let i = 0; i < 3; i++) deck.push(Cards.createCard('energy_shield'));
                deck.push(Cards.createCard('data_download'));
                deck.push(Cards.createCard('energy_pulse'));
                deck.push(Cards.createCard('quick_deploy'));
                return deck;
            }
        },
        poison: {
            name: '毒素大师',
            icon: '☢️',
            description: '通过持续伤害折磨敌人',
            unlocked: false,
            requireAchievement: 'elite_hunter',
            getDeck: () => {
                const deck = [];
                for (let i = 0; i < 4; i++) deck.push(Cards.createCard('laser_shot'));
                for (let i = 0; i < 3; i++) deck.push(Cards.createCard('energy_shield'));
                deck.push(Cards.createCard('radiation_round'));
                deck.push(Cards.createCard('nano_inject'));
                deck.push(Cards.createCard('emp_pulse'));
                return deck;
            }
        }
    },

    init() {
        this.checkUnlocks();
    },

    checkUnlocks() {
        Object.keys(this.decks).forEach(deckId => {
            const deck = this.decks[deckId];
            if (deck.requireAchievement && GameStats.achievements[deck.requireAchievement]) {
                deck.unlocked = GameStats.achievements[deck.requireAchievement].unlocked;
            }
        });
    },

    getUnlockedDecks() {
        return Object.keys(this.decks).filter(id => this.decks[id].unlocked);
    },

    selectDeck(deckId) {
        if (!this.decks[deckId] || !this.decks[deckId].unlocked) {
            return this.decks.default.getDeck();
        }
        return this.decks[deckId].getDeck();
    },

    showDeckSelection() {
        this.checkUnlocks();
        const modal = document.getElementById('deck-selection-modal');
        const content = document.getElementById('deck-selection-content');
        
        let html = '<h2>选择初始卡组</h2><div class="deck-grid">';
        
        Object.keys(this.decks).forEach(deckId => {
            const deck = this.decks[deckId];
            const locked = !deck.unlocked;
            const lockedClass = locked ? 'locked' : '';
            const achievementName = deck.requireAchievement ? 
                GameStats.achievements[deck.requireAchievement]?.name : '';
            
            html += `
                <div class="deck-option ${lockedClass}" onclick="Unlocks.onDeckSelect('${deckId}')">
                    <div class="deck-icon">${deck.icon}</div>
                    <div class="deck-name">${deck.name}</div>
                    <div class="deck-desc">${deck.description}</div>
                    ${locked ? `<div class="deck-locked">🔒 需要成就: ${achievementName}</div>` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        content.innerHTML = html;
        modal.classList.add('show');
    },

    onDeckSelect(deckId) {
        if (!this.decks[deckId].unlocked) return;
        
        document.getElementById('deck-selection-modal').classList.remove('show');
        Game.startNewRunWithDeck(deckId);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => Unlocks.init(), 100);
});
