const Skins = {
    currentSkin: 'default',
    
    skins: {
        default: {
            name: '标准战士',
            icon: '⚔️',
            description: '默认的赛博战士外观',
            unlocked: true,
            colors: {
                primary: '#00d4ff',
                secondary: '#b44aff',
                attack: '#ff4466',
                skill: '#4488ff',
                power: '#b44aff',
                background: 'linear-gradient(180deg, #0d1b2a 0%, #1a1a3e 50%, #0a0a1a 100%)'
            }
        },
        fire: {
            name: '烈焰战士',
            icon: '🔥',
            description: '燃烧一切的火焰主题',
            unlocked: false,
            requireAchievement: 'boss_slayer',
            colors: {
                primary: '#ff6600',
                secondary: '#ffaa00',
                attack: '#ff3300',
                skill: '#ff8800',
                power: '#ffcc00',
                background: 'linear-gradient(180deg, #2a0d0d 0%, #3e1a1a 50%, #1a0a0a 100%)'
            }
        },
        ice: {
            name: '冰霜法师',
            icon: '❄️',
            description: '冷酷无情的冰霜主题',
            unlocked: false,
            requireAchievement: 'floor_10',
            colors: {
                primary: '#00ffff',
                secondary: '#88ccff',
                attack: '#0088ff',
                skill: '#00ccff',
                power: '#aaddff',
                background: 'linear-gradient(180deg, #0a1a2a 0%, #1a2a3e 50%, #0a0a1a 100%)'
            }
        },
        shadow: {
            name: '暗影刺客',
            icon: '🌑',
            description: '隐匿于黑暗的暗影主题',
            unlocked: false,
            requireAchievement: 'elite_hunter',
            colors: {
                primary: '#8844ff',
                secondary: '#aa66ff',
                attack: '#6622cc',
                skill: '#9955ff',
                power: '#bb77ff',
                background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2a 50%, #0a0a0a 100%)'
            }
        },
        golden: {
            name: '黄金圣骑',
            icon: '✨',
            description: '闪耀金光的圣骑主题',
            unlocked: false,
            requireAchievement: 'perfect_run',
            colors: {
                primary: '#ffdd00',
                secondary: '#ffaa00',
                attack: '#ffcc00',
                skill: '#ffdd44',
                power: '#ffee88',
                background: 'linear-gradient(180deg, #2a2a0d 0%, #3e3e1a 50%, #1a1a0a 100%)'
            }
        },
        neon: {
            name: '霓虹赛博',
            icon: '💜',
            description: '赛博朋克的霓虹主题',
            unlocked: false,
            requireAchievement: 'veteran',
            colors: {
                primary: '#ff00ff',
                secondary: '#00ffff',
                attack: '#ff0088',
                skill: '#00ff88',
                power: '#8800ff',
                background: 'linear-gradient(180deg, #1a0a2a 0%, #0a1a2a 50%, #0a0a1a 100%)'
            }
        }
    },

    init() {
        this.checkUnlocks();
        const saved = localStorage.getItem('current_skin');
        if (saved && this.skins[saved] && this.skins[saved].unlocked) {
            this.currentSkin = saved;
        }
        this.applySkin();
    },

    checkUnlocks() {
        Object.keys(this.skins).forEach(skinId => {
            const skin = this.skins[skinId];
            if (skin.requireAchievement && GameStats.achievements[skin.requireAchievement]) {
                skin.unlocked = GameStats.achievements[skin.requireAchievement].unlocked;
            }
        });
    },

    applySkin() {
        const skin = this.skins[this.currentSkin];
        if (!skin) return;

        const root = document.documentElement;
        root.style.setProperty('--color-primary', skin.colors.primary);
        root.style.setProperty('--color-secondary', skin.colors.secondary);
        root.style.setProperty('--color-attack', skin.colors.attack);
        root.style.setProperty('--color-skill', skin.colors.skill);
        root.style.setProperty('--color-power', skin.colors.power);
        
        const combatScreen = document.getElementById('screen-combat');
        if (combatScreen) {
            combatScreen.style.background = skin.colors.background;
        }
    },

    selectSkin(skinId) {
        if (!this.skins[skinId] || !this.skins[skinId].unlocked) return;
        
        this.currentSkin = skinId;
        localStorage.setItem('current_skin', skinId);
        this.applySkin();
    },

    showSkinSelection() {
        this.checkUnlocks();
        const modal = document.getElementById('skin-selection-modal');
        const content = document.getElementById('skin-selection-content');
        
        let html = '<h2>选择角色皮肤</h2><div class="skin-grid">';
        
        Object.keys(this.skins).forEach(skinId => {
            const skin = this.skins[skinId];
            const locked = !skin.unlocked;
            const selected = skinId === this.currentSkin;
            const lockedClass = locked ? 'locked' : '';
            const selectedClass = selected ? 'selected' : '';
            const achievementName = skin.requireAchievement ? 
                GameStats.achievements[skin.requireAchievement]?.name : '';
            
            html += `
                <div class="skin-option ${lockedClass} ${selectedClass}" onclick="Skins.onSkinSelect('${skinId}')">
                    <div class="skin-icon" style="background: ${skin.colors.primary}">${skin.icon}</div>
                    <div class="skin-name">${skin.name}</div>
                    <div class="skin-desc">${skin.description}</div>
                    ${locked ? `<div class="skin-locked">🔒 需要成就: ${achievementName}</div>` : ''}
                    ${selected ? '<div class="skin-selected">✓ 当前使用</div>' : ''}
                </div>
            `;
        });
        
        html += '</div>';
        content.innerHTML = html;
        modal.classList.add('show');
    },

    onSkinSelect(skinId) {
        if (!this.skins[skinId].unlocked) return;
        
        this.selectSkin(skinId);
        document.getElementById('skin-selection-modal').classList.remove('show');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => Skins.init(), 200);
});
