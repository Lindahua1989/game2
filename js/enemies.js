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
        hp: 22,
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
        hp: 20,
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
        dialogue: {
            entry: '入侵者...你无法突破我的防线！',
            phase2: '防御协议启动...准备迎接毁灭！'
        },
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
                    { type: 'attack', value: 25 }
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
        dialogue: {
            entry: '我的虫群将吞噬一切...',
            phase2: '感受虫族的真正力量吧！'
        },
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
        dialogue: {
            entry: '人类...你的反抗毫无意义。',
            phase2: '计算完毕...启动歼灭协议。',
            phase3: '错误...错误...不可能...我要毁灭一切！'
        },
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
                    { type: 'attack', value: 32 },
                    { type: 'attack_poison', value: 15, poison: 5, weak: 3 }
                ]
            }
        ]
    },
    // === 新增敌人 ===
    plasma_elemental: {
        id: 'plasma_elemental',
        name: '等离子元素',
        icon: '🔥',
        hp: 32,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 9 },
            { type: 'attack', value: 7, hits: 2 },
            { type: 'block', value: 8 }
        ]
    },
    void_walker: {
        id: 'void_walker',
        name: '虚空行者',
        icon: '🌑',
        hp: 28,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 6, weak: 2 },
            { type: 'attack', value: 11 },
            { type: 'block', value: 10 }
        ]
    },
    cyber_assassin: {
        id: 'cyber_assassin',
        name: '赛博刺客',
        icon: '🗡️',
        hp: 26,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 10 },
            { type: 'attack', value: 8 },
            { type: 'attack', value: 12 }
        ]
    },
    shield_drone: {
        id: 'shield_drone',
        name: '护盾无人机',
        icon: '🛡️',
        hp: 18,
        tier: 'normal',
        pattern: [
            { type: 'block', value: 12 },
            { type: 'attack', value: 5 },
            { type: 'block', value: 8 }
        ]
    },
    toxic_spitter: {
        id: 'toxic_spitter',
        name: '毒液喷射者',
        icon: '☣️',
        hp: 24,
        tier: 'normal',
        pattern: [
            { type: 'attack_poison', value: 5, poison: 3 },
            { type: 'attack_poison', value: 4, poison: 2, hits: 2 },
            { type: 'attack', value: 8 }
        ]
    },
    energy_vampire: {
        id: 'energy_vampire',
        name: '能量吸血鬼',
        icon: '🧛',
        hp: 30,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 7 },
            { type: 'heal', value: 7 },
            { type: 'attack', value: 9 }
        ]
    },
    gravity_manipulator: {
        id: 'gravity_manipulator',
        name: '重力操控者',
        icon: '🌀',
        hp: 34,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 7, weak: 2 },
            { type: 'block', value: 10 },
            { type: 'attack', value: 11 }
        ]
    },
    phase_shifter: {
        id: 'phase_shifter',
        name: '相位转换者',
        icon: '⚡',
        hp: 22,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 8 },
            { type: 'block', value: 15 },
            { type: 'attack', value: 10 }
        ]
    },
    // === 新增精英 ===
    time_lord: {
        id: 'time_lord',
        name: '时间领主',
        icon: '⏰',
        hp: 90,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 14 },
            { type: 'block_attack', value: 16, block: 12 },
            { type: 'attack', value: 12, hits: 2 },
            { type: 'charge' },
            { type: 'attack', value: 28 }
        ]
    },
    plasma_titan: {
        id: 'plasma_titan',
        name: '等离子泰坦',
        icon: '🔥',
        hp: 100,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 16 },
            { type: 'attack', value: 12, hits: 2 },
            { type: 'block', value: 18 },
            { type: 'charge' },
            { type: 'attack', value: 35 }
        ]
    },
    void_empress: {
        id: 'void_empress',
        name: '虚空女皇',
        icon: '👑',
        hp: 85,
        tier: 'elite',
        pattern: [
            { type: 'attack_weak', value: 12, weak: 3 },
            { type: 'summon', value: 1 },
            { type: 'attack_poison', value: 10, poison: 4 },
            { type: 'block', value: 20 }
        ]
    },
    // === 新增Boss ===
    boss_dragon: {
        id: 'boss_dragon',
        name: '机械巨龙',
        icon: '🐉',
        hp: 150,
        tier: 'boss',
        dialogue: {
            entry: '渺小的生物...准备成为我的燃料！',
            phase2: '你激怒了我...感受龙焰的愤怒！',
            phase3: '不可能...我是不朽的！'
        },
        phases: [
            {
                threshold: 100,
                pattern: [
                    { type: 'attack', value: 14 },
                    { type: 'attack', value: 10, hits: 2 },
                    { type: 'block', value: 15 }
                ]
            },
            {
                threshold: 50,
                pattern: [
                    { type: 'attack', value: 20 },
                    { type: 'charge' },
                    { type: 'attack', value: 30 },
                    { type: 'attack', value: 15, hits: 2 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 25 },
                    { type: 'attack', value: 18, hits: 3 },
                    { type: 'charge' },
                    { type: 'attack', value: 40 }
                ]
            }
        ]
    },
    boss_nexus: {
        id: 'boss_nexus',
        name: '核心枢纽',
        icon: '💎',
        hp: 200,
        tier: 'boss',
        dialogue: {
            entry: '我是这个系统的核心...你无法摧毁我。',
            phase2: '启动防御协议...召唤护卫！',
            phase3: '系统过载...全力输出！'
        },
        phases: [
            {
                threshold: 150,
                pattern: [
                    { type: 'attack', value: 12 },
                    { type: 'block_attack', value: 10, block: 18 },
                    { type: 'attack_weak', value: 14, weak: 2 }
                ]
            },
            {
                threshold: 80,
                pattern: [
                    { type: 'summon', value: 2 },
                    { type: 'attack', value: 18 },
                    { type: 'block', value: 22 },
                    { type: 'attack', value: 15, hits: 2 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 28 },
                    { type: 'attack', value: 20, hits: 2 },
                    { type: 'charge' },
                    { type: 'attack', value: 45 },
                    { type: 'attack_poison', value: 18, poison: 6 }
                ]
            }
        ]
    }
};

const Enemies = {
    getEncounter(floor, type) {
        if (type === 'boss') {
            const bosses = ['boss_guardian', 'boss_queen', 'boss_omega', 'boss_dragon', 'boss_nexus'];
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
                    
                    if (enemy.dialogue) {
                        const phaseKey = `phase${enemy.currentPhase + 1}`;
                        if (enemy.dialogue[phaseKey]) {
                            UI.showPhaseTransition();
                            setTimeout(() => {
                                UI.showBossDialogue(enemy.name, enemy.dialogue[phaseKey]);
                            }, 800);
                        }
                    }
                    
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
