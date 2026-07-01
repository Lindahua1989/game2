const AssetManager = {
    enemySprites: {
        'patrol_drone': 'assets/enemies/normal/patrol_drone',
        'infected_bot': 'assets/enemies/normal/infected_bot',
        'mutant': 'assets/enemies/normal/mutant',
        'em_spider': 'assets/enemies/normal/em_spider',
        'nano_swarm': 'assets/enemies/normal/nano_swarm',
        'sentry_turret': 'assets/enemies/normal/sentry_turret',
        'repair_bot': 'assets/enemies/normal/repair_bot',
        'laser_trap': 'assets/enemies/normal/laser_trap',
        'data_ghost': 'assets/enemies/normal/data_ghost',
        'mech_scorpion': 'assets/enemies/normal/mech_scorpion',
        'plasma_elemental': 'assets/enemies/normal/plasma_elemental',
        'void_walker': 'assets/enemies/normal/void_walker',
        'cyber_assassin': 'assets/enemies/normal/cyber_assassin',
        'shield_drone': 'assets/enemies/normal/shield_drone',
        'venom_spitter': 'assets/enemies/normal/venom_spitter',
        'energy_vampire': 'assets/enemies/normal/energy_vampire',
        'gravity_manipulator': 'assets/enemies/normal/gravity_manipulator',
        'phase_shifter': 'assets/enemies/normal/phase_shifter',
        'mech_warrior': 'assets/enemies/elite/mech_warrior',
        'stealth_hunter': 'assets/enemies/elite/stealth_hunter',
        'quantum_mage': 'assets/enemies/elite/quantum_mage',
        'heavy_battleship': 'assets/enemies/elite/heavy_battleship',
        'infection_core': 'assets/enemies/elite/infection_core',
        'time_lord': 'assets/enemies/elite/time_lord',
        'plasma_titan': 'assets/enemies/elite/plasma_titan',
        'void_empress': 'assets/enemies/elite/void_empress',
        'guardian_core': 'assets/enemies/boss/guardian_core',
        'bug_queen': 'assets/enemies/boss/bug_queen',
        'omega_ai': 'assets/enemies/boss/omega_ai',
        'mech_dragon': 'assets/enemies/boss/mech_dragon',
        'core_hub': 'assets/enemies/boss/core_hub',
        'void_wraith': 'assets/enemies/normal/void_wraith',
        'stone_golem': 'assets/enemies/normal/stone_golem',
        'dark_stalker': 'assets/enemies/normal/dark_stalker',
        'cosmic_horror': 'assets/enemies/normal/cosmic_horror',
        'glitch_entity': 'assets/enemies/normal/glitch_entity'
    },

    playerSprites: {
        'default': 'assets/player/player-default',
        'fire': 'assets/player/player-fire',
        'ice': 'assets/player/player-ice',
        'shadow': 'assets/player/player-shadow',
        'golden': 'assets/player/player-golden',
        'neon': 'assets/player/player-neon'
    },

    combatBackgrounds: {
        1: 'combat-bg-engine',
        2: 'combat-bg-core',
        3: 'combat-bg-bridge'
    },

    loadedSprites: {},

    resolveImage(basePath) {
        if (this.loadedSprites[basePath]) return this.loadedSprites[basePath];

        const extensions = ['.png', '.jpg', '.jpeg'];
        for (const ext of extensions) {
            const fullPath = basePath + ext;
            const img = new Image();
            let loaded = false;
            img.onload = () => { loaded = true; };
            img.src = fullPath;
            if (loaded || img.complete) {
                this.loadedSprites[basePath] = fullPath;
                return fullPath;
            }
        }

        this.loadedSprites[basePath] = null;
        return null;
    },

    resolveImageAsync(basePath) {
        if (this.loadedSprites[basePath]) {
            return Promise.resolve(this.loadedSprites[basePath]);
        }

        const extensions = ['.png', '.jpg', '.jpeg'];
        let idx = 0;

        return new Promise((resolve) => {
            const tryNext = () => {
                if (idx >= extensions.length) {
                    this.loadedSprites[basePath] = null;
                    resolve(null);
                    return;
                }
                const fullPath = basePath + extensions[idx];
                const img = new Image();
                img.onload = () => {
                    this.loadedSprites[basePath] = fullPath;
                    resolve(fullPath);
                };
                img.onerror = () => {
                    idx++;
                    tryNext();
                };
                img.src = fullPath;
            };
            tryNext();
        });
    },

    getEnemySpritePath(enemyId) {
        const basePath = this.enemySprites[enemyId];
        if (!basePath) return null;
        return this.resolveImage(basePath);
    },

    getPlayerSpritePath(skinId) {
        const basePath = this.playerSprites[skinId] || this.playerSprites['default'];
        return this.resolveImage(basePath);
    },

    preloadImage(basePath) {
        return this.resolveImageAsync(basePath);
    },

    preloadEnemySprites() {
        const promises = Object.values(this.enemySprites).map(path => this.preloadImage(path));
        return Promise.all(promises);
    },

    preloadPlayerSprite(skinId) {
        const basePath = this.playerSprites[skinId] || this.playerSprites['default'];
        return this.preloadImage(basePath);
    },

    setCombatBackground(floor) {
        const combatScreen = document.getElementById('screen-combat');
        if (!combatScreen) return;

        combatScreen.classList.remove('combat-bg-engine', 'combat-bg-core', 'combat-bg-bridge');

        const bgClass = this.combatBackgrounds[floor];
        if (bgClass) {
            const bgMap = { 1: 'combat-engine', 2: 'combat-core', 3: 'combat-bridge' };
            const basePath = `assets/backgrounds/${bgMap[floor]}`;
            this.resolveImageAsync(basePath).then(path => {
                if (path) {
                    combatScreen.classList.add(bgClass);
                    combatScreen.style.backgroundImage = `url('${path}'), linear-gradient(180deg, #0d1b2a 0%, #1a1a3e 50%, #0a0a1a 100%)`;
                    combatScreen.style.backgroundSize = 'cover, cover';
                    combatScreen.style.backgroundPosition = 'center, center';
                    combatScreen.style.backgroundRepeat = 'no-repeat, no-repeat';
                }
            });
        }
    },

    setTitleBackground() {
        const titleScreen = document.getElementById('screen-title');
        if (!titleScreen) return;
        this.resolveImageAsync('assets/backgrounds/title-bg').then(path => {
            if (path) {
                titleScreen.classList.add('has-bg');
                titleScreen.style.backgroundImage = `url('${path}')`;
            }
        });
    },

    updatePlayerSprite() {
        const container = document.getElementById('player-sprite-container');
        if (!container) return;

        const skinId = (typeof Skins !== 'undefined') ? Skins.currentSkin : 'default';
        const basePath = this.playerSprites[skinId] || this.playerSprites['default'];

        this.resolveImageAsync(basePath).then(path => {
            if (path) {
                container.innerHTML = `<img src="${path}" alt="player">`;
            } else {
                container.innerHTML = '';
            }
        });
    }
};