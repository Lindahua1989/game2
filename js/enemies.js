const ENEMY_AFFIXES = {
    strong: { name: '强壮的', hpMult: 1.0, atkMult: 1.3 },
    tough: { name: '坚韧的', hpMult: 1.4, atkMult: 1.0 },
    swift: { name: '迅捷的', extraAction: true },
    thorny: { name: '带刺的', reflectDamage: 3 },
    regenerating: { name: '再生的', healPerTurn: 3 },
    hidden: { name: '隐蔽的', stealthTurns: 1 },
    furious: { name: '狂怒的', strengthPerTurn: 1 },
    shielded: { name: '护盾的', blockPerTurn: 5 }
};

const EnemyData = {
    patrol_drone: {
        id: 'patrol_drone',
        name: '巡逻无人机',
        icon: '🤖',
        hp: 20,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 6, weight: 50 },
            { type: 'attack', value: 8, weight: 30 },
            { type: 'block', value: 4, weight: 20 }
        ]
    },
    infected_bot: {
        id: 'infected_bot',
        name: '感染机器人',
        icon: '🧟',
        hp: 28,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 7, weight: 40 },
            { type: 'block', value: 5, weight: 25 },
            { type: 'attack', value: 10, weight: 35 }
        ]
    },
    mutant: {
        id: 'mutant',
        name: '变异体',
        icon: '👾',
        hp: 35,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 8, weight: 35 },
            { type: 'attack', value: 12, weight: 25 },
            { type: 'attack', value: 10, weight: 25 },
            { type: 'enrage', value: 2, weight: 15 }
        ]
    },
    em_spider: {
        id: 'em_spider',
        name: '电磁蛛',
        icon: '🕷️',
        hp: 22,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 5, weak: 1, weight: 40 },
            { type: 'attack', value: 9, weight: 35 },
            { type: 'block', value: 6, weight: 25 }
        ]
    },
    nano_swarm_enemy: {
        id: 'nano_swarm_enemy',
        name: '纳米虫群',
        icon: '🐛',
        hp: 22,
        tier: 'normal',
        pattern: [
            { type: 'attack_poison', value: 4, poison: 2, hits: 2, weight: 40 },
            { type: 'attack_poison', value: 3, poison: 2, weight: 30 },
            { type: 'split', value: 2, weight: 15, condition: 'hp_below_30' },
            { type: 'attack', value: 6, weight: 15 }
        ]
    },
    sentry_turret: {
        id: 'sentry_turret',
        name: '哨兵炮台',
        icon: '🔫',
        hp: 30,
        tier: 'normal',
        pattern: [
            { type: 'charge', weight: 30 },
            { type: 'attack', value: 18, weight: 40 },
            { type: 'block', value: 8, weight: 30 }
        ]
    },
    repair_bot: {
        id: 'repair_bot',
        name: '维修机器人',
        icon: '🔧',
        hp: 25,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 6, weight: 35 },
            { type: 'heal', value: 5, weight: 30 },
            { type: 'shield_ally', value: 6, weight: 20, condition: 'has_allies' },
            { type: 'block', value: 5, weight: 15 }
        ]
    },
    laser_trap: {
        id: 'laser_trap',
        name: '激光陷阱',
        icon: '⚡',
        hp: 20,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 7, weight: 45 },
            { type: 'attack', value: 7, weight: 35 },
            { type: 'attack', value: 12, weight: 20, condition: 'turn_3_plus' }
        ]
    },
    data_ghost: {
        id: 'data_ghost',
        name: '数据幽灵',
        icon: '👻',
        hp: 20,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 5, weak: 1, weight: 35 },
            { type: 'attack', value: 10, weight: 35 },
            { type: 'block', value: 8, weight: 30 }
        ]
    },
    mech_spider: {
        id: 'mech_spider',
        name: '机械蜘蛛',
        icon: '🦂',
        hp: 24,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 6, weight: 35 },
            { type: 'attack_poison', value: 6, poison: 2, weight: 30 },
            { type: 'block', value: 5, weight: 20 },
            { type: 'attack', value: 10, weight: 15, condition: 'hp_below_50' }
        ]
    },
    battle_mech: {
        id: 'battle_mech',
        name: '战斗机甲',
        icon: '🤖',
        hp: 65,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 12, weight: 30 },
            { type: 'block_attack', value: 18, block: 10, weight: 25 },
            { type: 'charge', weight: 15 },
            { type: 'attack', value: 25, weight: 20 },
            { type: 'enrage', value: 3, weight: 10, condition: 'hp_below_50' }
        ]
    },
    stealth_hunter: {
        id: 'stealth_hunter',
        name: '隐形猎手',
        icon: '🥷',
        hp: 50,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 15, weight: 30 },
            { type: 'block', value: 12, weight: 20 },
            { type: 'attack', value: 20, weight: 25 },
            { type: 'discard_attack', value: 12, weight: 15, condition: 'turn_3_plus' },
            { type: 'energy_drain', value: 1, weight: 10, condition: 'player_high_block' }
        ]
    },
    quantum_mage: {
        id: 'quantum_mage',
        name: '量子法师',
        icon: '🧙',
        hp: 55,
        tier: 'elite',
        pattern: [
            { type: 'attack_weak', value: 10, weak: 2, weight: 25 },
            { type: 'attack', value: 8, hits: 2, weight: 25 },
            { type: 'block', value: 15, weight: 20 },
            { type: 'summon', value: 1, weight: 15, condition: 'has_allies' },
            { type: 'energy_drain', value: 1, weight: 15, condition: 'turn_3_plus' }
        ]
    },
    heavy_gunship: {
        id: 'heavy_gunship',
        name: '重型炮舰',
        icon: '🚀',
        hp: 80,
        tier: 'elite',
        pattern: [
            { type: 'charge', weight: 20 },
            { type: 'attack', value: 30, weight: 30 },
            { type: 'attack', value: 10, weight: 25 },
            { type: 'block', value: 20, weight: 15 },
            { type: 'enrage', value: 4, weight: 10, condition: 'hp_below_30' }
        ]
    },
    infection_core: {
        id: 'infection_core',
        name: '感染核心',
        icon: '💀',
        hp: 70,
        tier: 'elite',
        pattern: [
            { type: 'summon', value: 2, weight: 25 },
            { type: 'attack_poison', value: 12, poison: 3, weight: 30 },
            { type: 'heal', value: 10, weight: 20 },
            { type: 'shield_ally', value: 10, weight: 15, condition: 'has_allies' },
            { type: 'attack', value: 15, weight: 10, condition: 'hp_below_50' }
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
                    { type: 'attack', value: 10, weight: 35 },
                    { type: 'block_attack', value: 8, block: 15, weight: 30 },
                    { type: 'shield_ally', value: 10, weight: 20, condition: 'has_allies' },
                    { type: 'block', value: 12, weight: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 15, weight: 30 },
                    { type: 'attack', value: 20, weight: 25 },
                    { type: 'charge', weight: 15 },
                    { type: 'attack', value: 25, weight: 20 },
                    { type: 'enrage', value: 3, weight: 10 }
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
                    { type: 'summon', value: 2, weight: 30 },
                    { type: 'attack_poison', value: 8, poison: 3, weight: 30 },
                    { type: 'attack', value: 12, weight: 25 },
                    { type: 'shield_ally', value: 8, weight: 15, condition: 'has_allies' }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack_poison', value: 15, poison: 5, weight: 30 },
                    { type: 'attack', value: 20, weight: 25 },
                    { type: 'attack_all', value: 10, weight: 20 },
                    { type: 'summon', value: 1, weight: 15 },
                    { type: 'enrage', value: 4, weight: 10 }
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
                    { type: 'attack', value: 12, weight: 30 },
                    { type: 'block_attack', value: 8, block: 20, weight: 25 },
                    { type: 'attack_weak', value: 10, weak: 3, weight: 25 },
                    { type: 'energy_drain', value: 1, weight: 20 }
                ]
            },
            {
                threshold: 60,
                pattern: [
                    { type: 'attack', value: 18, weight: 25 },
                    { type: 'attack', value: 10, hits: 2, weight: 25 },
                    { type: 'block_attack', value: 15, block: 25, weight: 20 },
                    { type: 'summon', value: 1, weight: 15 },
                    { type: 'discard_attack', value: 14, weight: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 25, weight: 25 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 32, weight: 20 },
                    { type: 'attack_poison', value: 15, poison: 5, weak: 3, weight: 20 },
                    { type: 'enrage', value: 5, weight: 10 },
                    { type: 'energy_drain', value: 2, weight: 15 }
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
            { type: 'attack', value: 9, weight: 35 },
            { type: 'attack', value: 7, hits: 2, weight: 30 },
            { type: 'block', value: 8, weight: 20 },
            { type: 'enrage', value: 2, weight: 15, condition: 'hp_below_50' }
        ]
    },
    void_walker: {
        id: 'void_walker',
        name: '虚空行者',
        icon: '🌑',
        hp: 28,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 6, weak: 2, weight: 30 },
            { type: 'attack', value: 11, weight: 30 },
            { type: 'block', value: 10, weight: 25 },
            { type: 'energy_drain', value: 1, weight: 15, condition: 'turn_3_plus' }
        ]
    },
    cyber_assassin: {
        id: 'cyber_assassin',
        name: '赛博刺客',
        icon: '🗡️',
        hp: 26,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 10, weight: 35 },
            { type: 'attack', value: 8, weight: 25 },
            { type: 'attack', value: 12, weight: 25 },
            { type: 'discard_attack', value: 7, weight: 15, condition: 'turn_3_plus' }
        ]
    },
    shield_drone: {
        id: 'shield_drone',
        name: '护盾无人机',
        icon: '🛡️',
        hp: 18,
        tier: 'normal',
        pattern: [
            { type: 'block', value: 12, weight: 30 },
            { type: 'attack', value: 5, weight: 25 },
            { type: 'shield_ally', value: 8, weight: 30, condition: 'has_allies' },
            { type: 'block', value: 8, weight: 15 }
        ]
    },
    toxic_spitter: {
        id: 'toxic_spitter',
        name: '毒液喷射者',
        icon: '☣️',
        hp: 24,
        tier: 'normal',
        pattern: [
            { type: 'attack_poison', value: 5, poison: 3, weight: 35 },
            { type: 'attack_poison', value: 4, poison: 2, hits: 2, weight: 30 },
            { type: 'attack', value: 8, weight: 20 },
            { type: 'block', value: 5, weight: 15 }
        ]
    },
    energy_vampire: {
        id: 'energy_vampire',
        name: '能量吸血鬼',
        icon: '🧛',
        hp: 30,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 7, weight: 30 },
            { type: 'heal', value: 7, weight: 20 },
            { type: 'attack', value: 9, weight: 25 },
            { type: 'energy_drain', value: 1, weight: 25 }
        ]
    },
    gravity_manipulator: {
        id: 'gravity_manipulator',
        name: '重力操控者',
        icon: '🌀',
        hp: 34,
        tier: 'normal',
        pattern: [
            { type: 'attack_weak', value: 7, weak: 2, weight: 30 },
            { type: 'block', value: 10, weight: 25 },
            { type: 'attack', value: 11, weight: 25 },
            { type: 'discard_attack', value: 8, weight: 20, condition: 'player_high_block' }
        ]
    },
    phase_shifter: {
        id: 'phase_shifter',
        name: '相位转换者',
        icon: '⚡',
        hp: 22,
        tier: 'normal',
        pattern: [
            { type: 'attack', value: 8, weight: 30 },
            { type: 'block', value: 15, weight: 30 },
            { type: 'attack', value: 10, weight: 25 },
            { type: 'block', value: 20, weight: 15, condition: 'hp_below_50' }
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
            { type: 'attack', value: 14, weight: 25 },
            { type: 'block_attack', value: 16, block: 12, weight: 20 },
            { type: 'attack', value: 12, hits: 2, weight: 20 },
            { type: 'charge', weight: 15 },
            { type: 'attack', value: 28, weight: 10 },
            { type: 'energy_drain', value: 2, weight: 10, condition: 'turn_3_plus' }
        ]
    },
    plasma_titan: {
        id: 'plasma_titan',
        name: '等离子泰坦',
        icon: '🔥',
        hp: 100,
        tier: 'elite',
        pattern: [
            { type: 'attack', value: 16, weight: 25 },
            { type: 'attack', value: 12, hits: 2, weight: 20 },
            { type: 'block', value: 18, weight: 20 },
            { type: 'charge', weight: 15 },
            { type: 'attack', value: 35, weight: 10 },
            { type: 'enrage', value: 5, weight: 10, condition: 'hp_below_30' }
        ]
    },
    void_empress: {
        id: 'void_empress',
        name: '虚空女皇',
        icon: '👑',
        hp: 85,
        tier: 'elite',
        pattern: [
            { type: 'attack_weak', value: 12, weak: 3, weight: 25 },
            { type: 'summon', value: 1, weight: 20 },
            { type: 'attack_poison', value: 10, poison: 4, weight: 25 },
            { type: 'block', value: 20, weight: 15 },
            { type: 'energy_drain', value: 2, weight: 15, condition: 'player_high_block' }
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
                    { type: 'attack', value: 14, weight: 35 },
                    { type: 'attack', value: 10, hits: 2, weight: 30 },
                    { type: 'block', value: 15, weight: 20 },
                    { type: 'enrage', value: 2, weight: 15 }
                ]
            },
            {
                threshold: 50,
                pattern: [
                    { type: 'attack', value: 20, weight: 30 },
                    { type: 'charge', weight: 15 },
                    { type: 'attack', value: 30, weight: 25 },
                    { type: 'attack', value: 15, hits: 2, weight: 20 },
                    { type: 'enrage', value: 3, weight: 10 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 25, weight: 25 },
                    { type: 'attack', value: 18, hits: 3, weight: 20 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 40, weight: 25 },
                    { type: 'enrage', value: 5, weight: 10 },
                    { type: 'energy_drain', value: 2, weight: 10 }
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
                    { type: 'attack', value: 12, weight: 30 },
                    { type: 'block_attack', value: 10, block: 18, weight: 25 },
                    { type: 'attack_weak', value: 14, weak: 2, weight: 25 },
                    { type: 'shield_ally', value: 10, weight: 20, condition: 'has_allies' }
                ]
            },
            {
                threshold: 80,
                pattern: [
                    { type: 'summon', value: 2, weight: 25 },
                    { type: 'attack', value: 18, weight: 25 },
                    { type: 'block', value: 22, weight: 20 },
                    { type: 'attack', value: 15, hits: 2, weight: 20 },
                    { type: 'energy_drain', value: 1, weight: 10 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 28, weight: 25 },
                    { type: 'attack', value: 20, hits: 2, weight: 20 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 45, weight: 20 },
                    { type: 'attack_poison', value: 18, poison: 6, weight: 15 },
                    { type: 'enrage', value: 6, weight: 10 }
                ]
            }
        ]
    },
    // === 新增Boss (层6-10) ===
    boss_phantom: {
        id: 'boss_phantom',
        name: '幻影领主',
        icon: '👻',
        hp: 240,
        tier: 'boss',
        dialogue: {
            entry: '你看到的只是我的幻影...真正的我无处不在。',
            phase2: '幻影消散...现出真身！',
            phase3: '虚空之力...吞噬一切！'
        },
        phases: [
            {
                threshold: 180,
                pattern: [
                    { type: 'attack_weak', value: 15, weak: 3, weight: 30 },
                    { type: 'block', value: 20, weight: 25 },
                    { type: 'attack', value: 18, hits: 2, weight: 25 },
                    { type: 'energy_drain', value: 1, weight: 20 }
                ]
            },
            {
                threshold: 100,
                pattern: [
                    { type: 'attack', value: 22, weight: 25 },
                    { type: 'attack_poison', value: 16, poison: 4, weight: 20 },
                    { type: 'block_attack', value: 20, block: 25, weight: 20 },
                    { type: 'attack', value: 25, hits: 2, weight: 20 },
                    { type: 'summon', value: 1, weight: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 30, weight: 25 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 50, weight: 20 },
                    { type: 'attack_weak', value: 28, weak: 4, weight: 15 },
                    { type: 'attack_poison', value: 22, poison: 6, weight: 15 },
                    { type: 'enrage', value: 6, weight: 10 },
                    { type: 'energy_drain', value: 2, weight: 5 }
                ]
            }
        ]
    },
    boss_titan: {
        id: 'boss_titan',
        name: '泰坦巨像',
        icon: '🗿',
        hp: 280,
        tier: 'boss',
        dialogue: {
            entry: '渺小的存在...在我面前化为尘埃。',
            phase2: '你激怒了泰坦...准备承受怒火！',
            phase3: '大地震颤...泰坦之怒！'
        },
        phases: [
            {
                threshold: 210,
                pattern: [
                    { type: 'attack', value: 20, weight: 35 },
                    { type: 'block', value: 30, weight: 30 },
                    { type: 'attack', value: 25, weight: 25 },
                    { type: 'enrage', value: 2, weight: 10 }
                ]
            },
            {
                threshold: 120,
                pattern: [
                    { type: 'charge', weight: 15 },
                    { type: 'attack', value: 40, weight: 25 },
                    { type: 'block_attack', value: 30, block: 35, weight: 20 },
                    { type: 'attack', value: 35, hits: 2, weight: 25 },
                    { type: 'enrage', value: 4, weight: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 45, weight: 25 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 60, weight: 20 },
                    { type: 'attack', value: 40, hits: 3, weight: 20 },
                    { type: 'block', value: 40, weight: 10 },
                    { type: 'enrage', value: 6, weight: 15 }
                ]
            }
        ]
    },
    boss_void_emperor: {
        id: 'boss_void_emperor',
        name: '虚空皇帝',
        icon: '🌑',
        hp: 320,
        tier: 'boss',
        dialogue: {
            entry: '虚空是我的领域...你已踏入死地。',
            phase2: '虚空裂隙...吞噬你的存在！',
            phase3: '虚空崩塌...同归于尽！'
        },
        phases: [
            {
                threshold: 240,
                pattern: [
                    { type: 'attack_poison', value: 18, poison: 5, weight: 30 },
                    { type: 'attack_weak', value: 20, weak: 3, weight: 25 },
                    { type: 'block', value: 25, weight: 20 },
                    { type: 'energy_drain', value: 1, weight: 15 },
                    { type: 'summon', value: 1, weight: 10 }
                ]
            },
            {
                threshold: 140,
                pattern: [
                    { type: 'attack', value: 30, weight: 25 },
                    { type: 'attack_poison', value: 25, poison: 6, weight: 20 },
                    { type: 'summon', value: 2, weight: 20 },
                    { type: 'attack', value: 35, hits: 2, weight: 20 },
                    { type: 'enrage', value: 4, weight: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 50, weight: 25 },
                    { type: 'attack_poison', value: 30, poison: 8, weight: 20 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 65, weight: 20 },
                    { type: 'attack_weak', value: 40, weak: 5, weight: 15 },
                    { type: 'enrage', value: 8, weight: 10 }
                ]
            }
        ]
    },
    boss_cosmic_horror: {
        id: 'boss_cosmic_horror',
        name: '宇宙恐惧',
        icon: '🌌',
        hp: 360,
        tier: 'boss',
        dialogue: {
            entry: '我是宇宙的恐惧本身...你的理智将在此崩溃。',
            phase2: '疯狂降临...你的思维开始扭曲！',
            phase3: '终极恐惧...直面深渊！'
        },
        phases: [
            {
                threshold: 270,
                pattern: [
                    { type: 'attack_weak', value: 22, weak: 4, weight: 30 },
                    { type: 'attack_poison', value: 20, poison: 6, weight: 25 },
                    { type: 'attack', value: 28, weight: 25 },
                    { type: 'energy_drain', value: 1, weight: 20 }
                ]
            },
            {
                threshold: 160,
                pattern: [
                    { type: 'attack', value: 35, hits: 2, weight: 25 },
                    { type: 'attack_poison', value: 28, poison: 7, weight: 20 },
                    { type: 'summon', value: 3, weight: 20 },
                    { type: 'block_attack', value: 35, block: 30, weight: 20 },
                    { type: 'discard_attack', value: 20, weight: 15 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 55, weight: 25 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 70, weight: 20 },
                    { type: 'attack_poison', value: 35, poison: 10, weight: 15 },
                    { type: 'attack', value: 45, hits: 3, weight: 15 },
                    { type: 'enrage', value: 8, weight: 10 },
                    { type: 'energy_drain', value: 2, weight: 5 }
                ]
            }
        ]
    },
    boss_final_god: {
        id: 'boss_final_god',
        name: '终焉之神',
        icon: '⚡',
        hp: 400,
        tier: 'boss',
        dialogue: {
            entry: '我是终结...也是开始。你的旅程到此为止。',
            phase2: '神之力觉醒...凡人无法抗衡！',
            phase3: '终焉降临...万物归零！'
        },
        phases: [
            {
                threshold: 300,
                pattern: [
                    { type: 'attack', value: 30, weight: 30 },
                    { type: 'block', value: 35, weight: 25 },
                    { type: 'attack', value: 35, hits: 2, weight: 25 },
                    { type: 'energy_drain', value: 1, weight: 20 }
                ]
            },
            {
                threshold: 180,
                pattern: [
                    { type: 'attack', value: 40, weight: 25 },
                    { type: 'attack_poison', value: 30, poison: 8, weight: 20 },
                    { type: 'summon', value: 3, weight: 15 },
                    { type: 'charge', weight: 10 },
                    { type: 'attack', value: 55, weight: 20 },
                    { type: 'discard_attack', value: 25, weight: 10 }
                ]
            },
            {
                threshold: 0,
                pattern: [
                    { type: 'attack', value: 60, weight: 20 },
                    { type: 'charge', weight: 8 },
                    { type: 'attack', value: 80, weight: 18 },
                    { type: 'attack', value: 50, hits: 3, weight: 18 },
                    { type: 'attack_poison', value: 40, poison: 12, weight: 15 },
                    { type: 'block', value: 50, weight: 10 },
                    { type: 'enrage', value: 10, weight: 6 },
                    { type: 'energy_drain', value: 3, weight: 5 }
                ]
            }
        ]
    }
};

const Enemies = {
    getEncounter(floor, type) {
        if (type === 'boss') {
            const bosses = ['boss_guardian', 'boss_queen', 'boss_omega', 'boss_dragon', 'boss_nexus', 'boss_phantom', 'boss_titan', 'boss_void_emperor', 'boss_cosmic_horror', 'boss_final_god'];
            const bossId = bosses[Math.min(floor - 1, bosses.length - 1)];
            return [this.createEnemy(bossId, floor)];
        }

        if (type === 'elite') {
            const elites = Object.values(EnemyData).filter(e => e.tier === 'elite');
            const elite = Utils.randomChoice(elites);
            const enemies = [this.createEnemy(elite.id, floor)];
            if (Math.random() < 0.5) {
                const normals = Object.values(EnemyData).filter(e => e.tier === 'normal');
                const minion = this.createEnemy(Utils.randomChoice(normals).id, floor);
                minion.hp = Math.floor(minion.hp * 0.5);
                minion.maxHp = minion.hp;
                minion.name = '弱化' + minion.name;
                enemies.push(minion);
            }
            return enemies;
        }

        const normals = Object.values(EnemyData).filter(e => e.tier === 'normal');
        let count;
        if (floor <= 4) count = Utils.randomInt(1, 2);
        else if (floor <= 8) count = Utils.randomInt(2, 3);
        else if (floor <= 12) count = Utils.randomInt(2, 4);
        else count = Utils.randomInt(3, 4);
        const enemies = [];
        const usedIds = [];
        for (let i = 0; i < count; i++) {
            const available = normals.filter(n => !usedIds.includes(n.id));
            const pool = available.length > 0 ? available : normals;
            const chosen = Utils.randomChoice(pool);
            usedIds.push(chosen.id);
            enemies.push(this.createEnemy(chosen.id, floor));
        }
        return enemies;
    },

    createEnemy(id, floor) {
        const base = EnemyData[id];
        if (!base) return null;
        
        const scaling = GameModes.getEnemyScaling(floor || (Game.state ? Game.state.currentFloor : 1));
        const scaledHp = Math.floor(base.hp * scaling);
        
        const enemy = {
            id: base.id,
            uid: Utils.generateId(),
            name: base.name,
            icon: base.icon,
            hp: scaledHp,
            maxHp: scaledHp,
            block: 0,
            tier: base.tier,
            patternIndex: 0,
            lastIntentType: null,
            status: {
                poison: 0,
                weak: 0,
                strength: 0
            },
            intent: null,
            affix: null,
            stealthTurns: 0,
            blockPerTurn: 0,
            healPerTurn: 0,
            strengthPerTurn: 0,
            reflectDamage: 0,
            extraAction: false
        };

        if (base.phases) {
            enemy.phases = Utils.deepClone(base.phases);
            enemy.currentPhase = 0;
            enemy.pattern = enemy.phases[0].pattern;
            
            if (scaling > 1) {
                enemy.phases.forEach(phase => {
                    phase.pattern.forEach(action => {
                        if (action.value) {
                            action.value = Math.floor(action.value * scaling);
                        }
                        if (action.block) {
                            action.block = Math.floor(action.block * scaling);
                        }
                    });
                });
            }
        } else {
            enemy.pattern = Utils.deepClone(base.pattern);
            
            if (scaling > 1) {
                enemy.pattern.forEach(action => {
                    if (action.value) {
                        action.value = Math.floor(action.value * scaling);
                    }
                    if (action.block) {
                        action.block = Math.floor(action.block * scaling);
                    }
                });
            }
        }

        const currentFloor = floor || (Game.state ? Game.state.currentFloor : 1);
        if (currentFloor >= 5 && (base.tier === 'normal' || base.tier === 'elite')) {
            if (Math.random() < 0.3) {
                const affixKeys = Object.keys(ENEMY_AFFIXES);
                const affixKey = Utils.randomChoice(affixKeys);
                const affix = ENEMY_AFFIXES[affixKey];
                
                enemy.affix = affixKey;
                enemy.name = affix.name + enemy.name;
                
                if (affix.hpMult && affix.hpMult !== 1.0) {
                    enemy.hp = Math.floor(enemy.hp * affix.hpMult);
                    enemy.maxHp = enemy.hp;
                }
                if (affix.atkMult && affix.atkMult !== 1.0) {
                    enemy.pattern.forEach(p => {
                        if (p.value) p.value = Math.floor(p.value * affix.atkMult);
                    });
                    if (enemy.phases) {
                        enemy.phases.forEach(phase => {
                            phase.pattern.forEach(p => {
                                if (p.value) p.value = Math.floor(p.value * affix.atkMult);
                            });
                        });
                    }
                }
                if (affix.reflectDamage) enemy.reflectDamage = affix.reflectDamage;
                if (affix.healPerTurn) enemy.healPerTurn = affix.healPerTurn;
                if (affix.blockPerTurn) enemy.blockPerTurn = affix.blockPerTurn;
                if (affix.strengthPerTurn) enemy.strengthPerTurn = affix.strengthPerTurn;
                if (affix.stealthTurns) enemy.stealthTurns = affix.stealthTurns;
                if (affix.extraAction) enemy.extraAction = true;
            }
        }

        this.rollIntent(enemy);
        return enemy;
    },

    rollIntent(enemy) {
        const pattern = enemy.pattern;
        if (!pattern || pattern.length === 0) return;

        const validActions = pattern.filter(p => this.checkCondition(enemy, p.condition));
        const actionsToUse = validActions.length > 0 ? validActions : pattern;

        const hasWeights = actionsToUse.some(a => a.weight !== undefined);
        
        if (hasWeights) {
            const totalWeight = actionsToUse.reduce((sum, a) => sum + (a.weight || 1), 0);
            let random = Math.random() * totalWeight;
            
            let chosen = actionsToUse[0];
            for (let i = 0; i < actionsToUse.length; i++) {
                random -= (actionsToUse[i].weight || 1);
                if (random <= 0) {
                    chosen = actionsToUse[i];
                    break;
                }
            }

            if (actionsToUse.length > 1 && chosen.type === enemy.lastIntentType) {
                const alternatives = actionsToUse.filter(a => a.type !== enemy.lastIntentType);
                if (alternatives.length > 0) {
                    chosen = Utils.randomChoice(alternatives);
                }
            }

            enemy.intent = chosen;
            enemy.lastIntentType = chosen.type;
        } else {
            enemy.intent = pattern[enemy.patternIndex % pattern.length];
            enemy.lastIntentType = enemy.intent.type;
        }
    },

    checkCondition(enemy, condition) {
        if (!condition) return true;
        
        switch (condition) {
            case 'hp_below_50':
                return enemy.hp < enemy.maxHp * 0.5;
            case 'hp_below_30':
                return enemy.hp < enemy.maxHp * 0.3;
            case 'player_low_hp':
                return Game.state && Game.state.player.hp < Game.state.player.maxHp * 0.3;
            case 'player_high_block':
                return Combat.state && Combat.state.playerBlock > 15;
            case 'ally_dead': {
                const alive = Combat.state ? Combat.state.enemies.filter(e => e.hp > 0 && e !== enemy && e.tier === enemy.tier) : [];
                const total = Combat.state ? Combat.state.enemies.filter(e => e.tier === enemy.tier) : [];
                return total.length > 1 && alive.length < total.length - 1;
            }
            case 'turn_3_plus':
                return Combat.state && Combat.state.turn >= 3;
            case 'poisoned':
                return enemy.status.poison > 0;
            case 'has_allies':
                return Combat.state ? Combat.state.enemies.filter(e => e.hp > 0 && e !== enemy).length > 0 : false;
            default:
                return true;
        }
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
            case 'split':
                return '💥 分裂';
            case 'enrage':
                return `😡 狂暴+${intent.value}`;
            case 'shield_ally':
                return `🛡️ 护盾同伴${intent.value}`;
            case 'energy_drain':
                return `⚡ 吸取${intent.value}`;
            case 'discard_attack':
                return `⚔️${intent.value} 🗑️`;
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
