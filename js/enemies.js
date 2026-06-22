const EnemyData = {
    patrol_drone: {
        id: 'patrol_drone',
        name: '巡逻无人机',
        icon: '🤖',
        hp: 20,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 6 },
            { type: 'attack', value: 8 }
        ]
    },
    infected_bot: {
        id: 'infected_bot',
        name: '感染机器人',
        icon: '🧟',
        hp: 28,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 7 },
            { type: 'block', value: 5 },
            { type: 'attack', value: 10 }
        ]
    },
    mutant: {
        id: 'mutant',
        name: '变异体',
        icon: '👾',
        hp: 35,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 8 },
            { type: 'attack', value: 12 },
            { type: 'attack', value: 10 }
        ]
    },
    em_spider: {
        id: 'em_spider',
        name: '电磁蛛',
        icon: '🕷️',
        hp: 22,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 5, weak: 1 },
            { type: 'attack', value: 9 }
        ]
    },
    nano_swarm_enemy: {
        id: 'nano_swarm_enemy',
        name: '纳米虫群',
        icon: '🐛',
        hp: 18,
        tier: 'normal',
        pattern: [
            { type: 'attack_poison', value: 4, poison: 2, hits: 2 },
            { type: 'attack_poison', value: 3, poison: 2 }
        ]
    },
    sentry_turret: {
        id: 'sentry_turret',
        name: '哨兵炮台',
        icon: '🔫',
        hp: 30,
        tier: 'normal',
        pattern: [
            { type: 'charge' },
            { type: 'attack', value: 18 }
        ]
    },
    repair_bot: {
        id: 'repair_bot',
        name: '维修机器人',
        icon: '🔧',
        hp: 25,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 6 },
            { type: 'heal', value: 5 }
        ]
    },
    laser_trap: {
        id: 'laser_trap',
        name: '激光陷阱',
        icon: '⚡',
        hp: 15,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 7 },
            { type: 'attack', value: 7 }
        ]
    },
    data_ghost: {
        id: 'data_ghost',
        name: '数据幽灵',
        icon: '👻',
        hp: 20,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 5, weak: 1 },
            { type: 'attack', value: 10 }
        ]
    },
    mech_spider: {
        id: 'mech_spider',
        name: '机械蜘蛛',
        icon: '🦂',
        hp: 24,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 6 },
            { type: 'attack_poison', value: 6, poison: 2 }
        ]
    },
    battle_mech: {
        id: 'battle_mech',
        name: '战斗机甲',
        icon: '🤖',
        hp: 65,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 12 },
            { type: 'block_attack', value: 18, block: 10 },
            { type: 'charge' },
            { type: 'attack', value: 25 }
        ]
    },
    stealth_hunter: {
        id: 'stealth_hunter',
        name: '隐形猎手',
        icon: '🥷',
        hp: 50,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 15 },
            { type: 'block', value: 12 },
            { type: 'attack', value: 20 }
        ]
    },
    quantum_mage: {
        id: 'quantum_mage',
        name: '量子法师',
        icon: '🧙',
        hp: 55,
        tier: 'elite',
        pattern: [
            { type: 'attack_weak', value: 10, weak: 2 },
            { type: 'attack', value: 8, hits: 2 },
            { type: 'block', value: 15 }
        ]
    },
    heavy_gunship: {
        id: 'heavy_gunship',
        name: '重型炮舰',
        icon: '🚀',
        hp: 80,
        tier: 'elite',
        pattern: [
            { type: 'charge' },
            { type: 'attack', value: 30 },
            { type: 'attack', value: 10 },
            { type: 'block', value: 20 }
        ]
    },
    infection_core: {
        id: 'infection_core',
        name: '感染核心',
        icon: '💀',
        hp: 70,
        tier: 'elite',
        pattern: [
            { type: 'summon', value: 2 },
            { type: 'attack_poison', value: 12, poison: 3 },
            { type: 'heal', value: 10 }
        ]
    },
    boss_guardian: {
        id: 'boss_guardian',
        name: '守卫核心',
        icon: '🏰',
        hp: 100,
        tier: 'boss',
        phases: [
            {
                threshold: 50,
                pattern: [
                    { type: 'attack', value: 10 },
                    { type: 'block_attack', value: 8, block: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 15 },
                    { type: 'attack', value: 20 },
                    { type: 'charge' },
                    { type: 'attack', value: 30 }
                ]
            }
        ]
    },
    boss_queen: {
        id: 'boss_queen',
        name: '虫族女王',
        icon: '👑',
        hp: 130,
        tier: 'boss',
        phases: [
            {
                threshold: 65,
                pattern: [
                    { type: 'summon', value: 2 },
                    { type: 'attack_poison', value: 8, poison: 3 },
                    { type: 'attack', value: 12 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack_poison', value: 15, poison: 5 },
                    { type: 'attack', value: 20 },
                    { type: 'attack_all', value: 10 }
                ]
            }
        ]
    },
    boss_omega: {
        id: 'boss_omega',
        name: '主控AI·奥米伽',
        icon: '🧠',
        hp: 180,
        tier: 'boss',
        phases: [
            {
                threshold: 120,
                pattern: [
                    { type: 'attack', value: 12 },
                    { type: 'block_attack', value: 8, block: 20 },
                    { type: 'attack_weak', value: 10, weak: 3 }
                ]
            },
            {
                threshold: 60,
                pattern: [
                    { type: 'attack', value: 18 },
                    { type: 'attack', value: 10, hits: 2 },
                    { type: 'block_attack', value: 15, block: 25 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 25 },
                    { type: 'charge' },
                    { type: 'attack', value: 40 },
                    { type: 'attack_poison', value: 15, poison: 5, weak: 3 }
                ]
            }
        ]
    }
};

const Enemies = {
    getEncounter(floor, type) {
        if (type === 'boss') {
            const bosses = ['boss_guardian', 'boss_queen', 'boss_omega'];
            const bossId = bosses[Math.min(floor - 1, bosses.length - 1)];
            return [this.createEnemy(bossId)];
        }

        if (type === 'elite') {
            const elites = Object.values(EnemyData).filter(e => e.tier === 'elite');
            const elite = Utils.randomChoice(elites);
            return [this.createEnemy(elite.id)];
        }

        const normals = Object.values(EnemyData).filter(e => e.tier === 'normal');
        const count = Utils.randomInt(1, 2);
        const enemies = [];
        for (let i = 0; i < count; i++) {
            enemies.push(this.createEnemy(Utils.randomChoice(normals).id));
        }
        return enemies;
    },

    createEnemy(id) {
        const base = EnemyData[id];
        if (!base) return null;
        const enemy = {
            id: base.id,
            uid: Utils.generateId(),
            name: base.name,
            icon: base.icon,
            hp: base.hp,
            maxHp: base.hp,
            block: 0,
            tier: base.tier,
            patternIndex: 0,
            status: {
                poison: 0,
                weak: 0,
                strength: 0
            },
            intent: null
        };

        if (base.phases) {
            enemy.phases = Utils.deepClone(base.phases);
            enemy.currentPhase = 0;
            enemy.pattern = enemy.phases[0].pattern;
        } else {
            enemy.pattern = Utils.deepClone(base.pattern);
        }

        this.rollIntent(enemy);
        return enemy;
    },

    rollIntent(enemy) {
        const pattern = enemy.pattern;
        if (!pattern || pattern.length === 0) return;
        enemy.intent = pattern[enemy.patternIndex % pattern.length];
    },

    advancePattern(enemy) {
        if (enemy.phases) {
            if (enemy.currentPhase < enemy.phases.length - 1) {
                if (enemy.hp <= enemy.phases[enemy.currentPhase].threshold) {
                    enemy.currentPhase++;
                    enemy.pattern = enemy.phases[enemy.currentPhase].pattern;
                    enemy.patternIndex = 0;
                    return;
                }
            }
        }
        enemy.patternIndex = (enemy.patternIndex + 1) % enemy.pattern.length;
    },

    getIntentText(intent) {
        if (!intent) return '?';
        switch (intent.type) {
            case 'attack':
                const hits = intent.hits || 1;
                const dmg = intent.value + (intent.strength || 0);
                return hits > 1 ? `⚔️ ${dmg}x${hits}` : `⚔️ ${dmg}`;
            case 'attack_poison':
                return `⚔️ ${intent.value} ☢️${intent.poison}`;
            case 'attack_weak':
                return `⚔️ ${intent.value} 💫${intent.weak}`;
            case 'attack_all':
                return `⚔️ ${intent.value} (全体)`;
            case 'block':
                return `🛡️ ${intent.value}`;
            case 'block_attack':
                return `🛡️${intent.block} ⚔️${intent.value}`;
            case 'charge':
                return '⏳ 蓄力';
            case 'heal':
                return `💚 ${intent.value}`;
            case 'summon':
                return `📢 召唤`;
            default:
                return '?';
        }
    },

    getGoldReward(tier) {
        switch (tier) {
            case 'normal': return Utils.randomInt(10, 20);
            case 'elite': return Utils.randomInt(25, 40);
            case 'boss': return Utils.randomInt(50, 80);
            default: return 10;
        }
    }
};
