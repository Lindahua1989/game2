const CardData = {
    laser_shot: {
        id: 'laser_shot',
        name: '激光射击',
        type: 'attack',
        cost: 1,
        icon: '🔫',
        description: '造成 5~9 点伤害',
        minDamage: 5,
        maxDamage: 9,
        target: 'single',
        maxCopies: 99
    },
    energy_shield: {
        id: 'energy_shield',
        name: '能量护盾',
        type: 'skill',
        cost: 1,
        icon: '🛡️',
        description: '获得 6 点护甲',
        block: 6,
        target: 'self',
        maxCopies: 99
    },
    plasma_cannon: {
        id: 'plasma_cannon',
        name: '等离子炮',
        type: 'attack',
        cost: 2,
        icon: '💥',
        description: '造成 13~19 点伤害',
        minDamage: 13,
        maxDamage: 19,
        target: 'single',
        maxCopies: 99
    },
    emp_pulse: {
        id: 'emp_pulse',
        name: 'EMP脉冲',
        type: 'attack',
        cost: 1,
        icon: '⚡',
        description: '对所有敌人造成 6~10 点伤害',
        minDamage: 6,
        maxDamage: 10,
        target: 'all',
        maxCopies: 2
    },
    nano_armor: {
        id: 'nano_armor',
        name: '纳米装甲',
        type: 'skill',
        cost: 2,
        icon: '🔰',
        description: '获得 18 点护甲',
        block: 18,
        target: 'self',
        maxCopies: 2
    },
    overclock: {
        id: 'overclock',
        name: '超频模式',
        type: 'power',
        cost: 1,
        icon: '⚙️',
        description: '每次攻击额外 +2 伤害',
        strength: 2,
        target: 'self',
        maxCopies: 2
    },
    nano_repair: {
        id: 'nano_repair',
        name: '纳米修复',
        type: 'attack',
        cost: 2,
        icon: '💚',
        description: '造成 8~12 伤害，回复 5 HP',
        minDamage: 8,
        maxDamage: 12,
        heal: 5,
        target: 'single',
        maxCopies: 2
    },
    rapid_fire: {
        id: 'rapid_fire',
        name: '连射',
        type: 'attack',
        cost: 1,
        icon: '🔥',
        description: '造成 3~5 伤害 x2',
        minDamage: 3,
        maxDamage: 5,
        hits: 2,
        target: 'single',
        maxCopies: 2
    },
    data_download: {
        id: 'data_download',
        name: '数据下载',
        type: 'skill',
        cost: 0,
        icon: '📥',
        description: '抽 2 张牌',
        draw: 2,
        target: 'self',
        maxCopies: 2
    },
    radiation_round: {
        id: 'radiation_round',
        name: '辐射弹',
        type: 'attack',
        cost: 1,
        icon: '☢️',
        description: '造成 3~5 伤害，施加 3 腐蚀',
        minDamage: 3,
        maxDamage: 5,
        poison: 3,
        target: 'single',
        maxCopies: 2
    },
    em_storm: {
        id: 'em_storm',
        name: '电磁风暴',
        type: 'attack',
        cost: 2,
        icon: '🌩️',
        description: '造成 17~23 点伤害',
        minDamage: 17,
        maxDamage: 23,
        target: 'single',
        maxCopies: 2
    },
    quantum_dodge: {
        id: 'quantum_dodge',
        name: '量子闪避',
        type: 'skill',
        cost: 1,
        icon: '💨',
        description: '获得 8 护甲，抽 1 张牌',
        block: 8,
        draw: 1,
        target: 'self',
        maxCopies: 2
    },
    energy_overload: {
        id: 'energy_overload',
        name: '能量过载',
        type: 'skill',
        cost: 0,
        icon: '⚡',
        description: '获得 2 C能量，受到 3 伤害',
        energy: 2,
        selfDamage: 3,
        target: 'self',
        maxCopies: 2
    },
    laser_array: {
        id: 'laser_array',
        name: '激光阵列',
        type: 'attack',
        cost: 1,
        icon: '✨',
        description: '造成 4~6 伤害 x3',
        minDamage: 4,
        maxDamage: 6,
        hits: 3,
        target: 'single',
        maxCopies: 2
    },
    hologram: {
        id: 'hologram',
        name: '全息投影',
        type: 'skill',
        cost: 1,
        icon: '👻',
        description: '获得 12 点护甲',
        block: 12,
        target: 'self',
        maxCopies: 2
    },
    system_reboot: {
        id: 'system_reboot',
        name: '系统重启',
        type: 'skill',
        cost: 1,
        icon: '🔄',
        description: '弃掉所有手牌，抽等量+2张',
        reboot: true,
        target: 'self',
        maxCopies: 1
    },
    ion_shield: {
        id: 'ion_shield',
        name: '离子护盾',
        type: 'power',
        cost: 2,
        icon: '🔵',
        description: '每回合开始获得 3 护甲',
        blockPerTurn: 3,
        target: 'self',
        maxCopies: 2
    },
    railgun: {
        id: 'railgun',
        name: '磁轨炮',
        type: 'attack',
        cost: 3,
        icon: '🎯',
        description: '造成 30~40 点伤害',
        minDamage: 30,
        maxDamage: 40,
        target: 'single',
        maxCopies: 1
    },
    nano_swarm: {
        id: 'nano_swarm',
        name: '纳米蜂群',
        type: 'power',
        cost: 2,
        icon: '🐝',
        description: '每回合对随机敌人造成 5 伤害',
        damagePerTurn: 5,
        target: 'self',
        maxCopies: 2
    },
    energy_siphon: {
        id: 'energy_siphon',
        name: '能量虹吸',
        type: 'attack',
        cost: 1,
        icon: '🌀',
        description: '造成 4~8 伤害，获得 1 C能量',
        minDamage: 4,
        maxDamage: 8,
        energy: 1,
        target: 'single',
        maxCopies: 2
    },
    pulse_barrier: {
        id: 'pulse_barrier',
        name: '脉冲屏障',
        type: 'skill',
        cost: 1,
        icon: '🔷',
        description: '获得 7 护甲，下回合额外 3 护甲',
        block: 7,
        nextTurnBlock: 3,
        target: 'self',
        maxCopies: 2
    },
    overload_protocol: {
        id: 'overload_protocol',
        name: '过载协议',
        type: 'power',
        cost: 1,
        icon: '⚠️',
        description: '每回合 +1 C能量，受 2 伤害',
        energyPerTurn: 1,
        damagePerTurnSelf: 2,
        target: 'self',
        maxCopies: 1
    },
    precision_strike: {
        id: 'precision_strike',
        name: '精准打击',
        type: 'attack',
        cost: 2,
        icon: '🎯',
        description: '造成 17~23 伤害，无视护甲',
        minDamage: 17,
        maxDamage: 23,
        ignoreBlock: true,
        target: 'single',
        maxCopies: 2
    },
    tactical_scan: {
        id: 'tactical_scan',
        name: '战术扫描',
        type: 'skill',
        cost: 1,
        icon: '📡',
        description: '抽 2 张牌，获得 1 护甲',
        draw: 2,
        block: 1,
        target: 'self',
        maxCopies: 2
    },
    plasma_blade: {
        id: 'plasma_blade',
        name: '等离子刃',
        type: 'attack',
        cost: 1,
        icon: '⚔️',
        description: '造成 7~11 点伤害',
        minDamage: 7,
        maxDamage: 11,
        target: 'single',
        maxCopies: 2
    },
    reflect_shield: {
        id: 'reflect_shield',
        name: '反射护盾',
        type: 'skill',
        cost: 2,
        icon: '🪞',
        description: '获得 10 护甲，反弹 3 伤害',
        block: 10,
        thorns: 3,
        target: 'self',
        maxCopies: 2
    },
    emergency_repair: {
        id: 'emergency_repair',
        name: '紧急修复',
        type: 'skill',
        cost: 1,
        icon: '🩹',
        description: '回复 8 HP',
        heal: 8,
        target: 'self',
        maxCopies: 2
    },
    chain_lightning: {
        id: 'chain_lightning',
        name: '链式闪电',
        type: 'attack',
        cost: 2,
        icon: '⛓️',
        description: '对随机敌人造成 5~9 伤害 x3',
        minDamage: 5,
        maxDamage: 9,
        hits: 3,
        target: 'random',
        maxCopies: 2
    },
    energy_convert: {
        id: 'energy_convert',
        name: '能量转换',
        type: 'skill',
        cost: 1,
        icon: '🔋',
        description: '将 2 点C能量转化为 10 护甲',
        energyCost: 2,
        block: 10,
        target: 'self',
        maxCopies: 2
    },
    auto_aim: {
        id: 'auto_aim',
        name: '自动瞄准',
        type: 'power',
        cost: 1,
        icon: '🎯',
        description: '攻击牌伤害 +3',
        attackBonus: 3,
        target: 'self',
        maxCopies: 1
    },
    quantum_entangle: {
        id: 'quantum_entangle',
        name: '量子纠缠',
        type: 'skill',
        cost: 1,
        icon: '🔮',
        description: '抽 1 张牌，随机 1 张手牌费用变 0',
        draw: 1,
        freeCard: true,
        target: 'self',
        maxCopies: 2
    },
    gravity_field: {
        id: 'gravity_field',
        name: '重力场',
        type: 'skill',
        cost: 2,
        icon: '🌊',
        description: '所有敌人获得 2 虚弱',
        weakAll: 2,
        target: 'all_enemies',
        maxCopies: 2
    },
    self_destruct: {
        id: 'self_destruct',
        name: '自毁程序',
        type: 'attack',
        cost: 0,
        icon: '💣',
        description: '造成 35~45 伤害，自身受 20 伤害',
        minDamage: 35,
        maxDamage: 45,
        selfDamage: 20,
        target: 'single',
        maxCopies: 1
    },
    mech_enhance: {
        id: 'mech_enhance',
        name: '机械强化',
        type: 'power',
        cost: 1,
        icon: '🔧',
        description: '每打出攻击牌获得 2 护甲',
        blockOnAttack: 2,
        target: 'self',
        maxCopies: 2
    },
    h_charge: {
        id: 'h_charge',
        name: 'H充能',
        type: 'skill',
        cost: 1,
        icon: '🔋',
        description: '获得 3 点H能量',
        hEnergyGain: 3,
        target: 'self',
        maxCopies: 2
    },
    h_battery: {
        id: 'h_battery',
        name: 'H能量电池',
        type: 'power',
        cost: 2,
        icon: '⚡',
        description: '每回合开始获得 1 点H能量',
        hEnergyPerTurn: 1,
        target: 'self',
        maxCopies: 1
    },
    h_emergency: {
        id: 'h_emergency',
        name: '紧急充能',
        type: 'skill',
        cost: 0,
        icon: '⚠️',
        description: '获得 5 点H能量，受到 5 点伤害',
        hEnergyGain: 5,
        selfDamage: 5,
        target: 'self',
        maxCopies: 2
    },
    h_shield: {
        id: 'h_shield',
        name: 'H能量护盾',
        type: 'skill',
        cost: -1,
        icon: '🛡️',
        description: '消耗全部H能量，每点获得 3 护甲',
        blockPerHEnergy: 3,
        target: 'self',
        maxCopies: 2
    },
    h_heal: {
        id: 'h_heal',
        name: 'H能量修复',
        type: 'skill',
        cost: -1,
        icon: '💚',
        description: '消耗全部H能量，每点回复 2 HP',
        healPerHEnergy: 2,
        target: 'self',
        maxCopies: 2
    },
    h_blast: {
        id: 'h_blast',
        name: 'H能量爆破',
        type: 'attack',
        cost: -1,
        icon: '💥',
        description: '消耗全部H能量，每点对所有敌人造成 4 伤害',
        damagePerEnergy: 4,
        target: 'all',
        maxCopies: 1
    },
    h_convert: {
        id: 'h_convert',
        name: 'H能量转换',
        type: 'skill',
        cost: 0,
        icon: '🔄',
        description: '消耗 3 点H能量，获得 2 C能量',
        hEnergyCost: 3,
        energy: 2,
        target: 'self',
        maxCopies: 2
    },
    h_amplifier: {
        id: 'h_amplifier',
        name: 'H能量放大器',
        type: 'attack',
        cost: 1,
        icon: '🔆',
        description: '若H能量>=5，造成 15 伤害',
        minDamage: 15,
        maxDamage: 15,
        requireHEnergy: 5,
        target: 'single',
        maxCopies: 1
    },
    h_reactor: {
        id: 'h_reactor',
        name: 'H能量反应堆',
        type: 'attack',
        cost: 1,
        icon: '⚛️',
        description: '造成 6~10 伤害，获得 1 点H能量',
        minDamage: 6,
        maxDamage: 10,
        hEnergyGain: 1,
        target: 'single',
        maxCopies: 2
    },
    nano_inject: {
        id: 'nano_inject',
        name: '纳米注入',
        type: 'attack',
        cost: 1,
        icon: '💉',
        description: '造成 2~4 伤害，施加 2 虚弱 + 2 腐蚀',
        minDamage: 2,
        maxDamage: 4,
        weak: 2,
        poison: 2,
        target: 'single',
        maxCopies: 2
    },
    energy_pulse: {
        id: 'energy_pulse',
        name: '能量脉冲',
        type: 'skill',
        cost: 0,
        icon: '🔌',
        description: '获得 1 C能量',
        energy: 1,
        target: 'self',
        maxCopies: 2
    },
    defense_matrix: {
        id: 'defense_matrix',
        name: '防御矩阵',
        type: 'power',
        cost: 2,
        icon: '🛡️',
        description: '每回合开始获得 5 护甲',
        blockPerTurn: 5,
        target: 'self',
        maxCopies: 2
    },
    high_freq: {
        id: 'high_freq',
        name: '高频震荡',
        type: 'attack',
        cost: 2,
        icon: '〰️',
        description: '造成 10~14 伤害，施加 3 虚弱',
        minDamage: 10,
        maxDamage: 14,
        weak: 3,
        target: 'single',
        maxCopies: 2
    },
    system_upgrade: {
        id: 'system_upgrade',
        name: '系统升级',
        type: 'power',
        cost: 2,
        icon: '⬆️',
        description: '所有卡牌伤害/护甲 +2',
        upgradeAll: 2,
        target: 'self',
        maxCopies: 1
    },
    quick_deploy: {
        id: 'quick_deploy',
        name: '快速部署',
        type: 'skill',
        cost: 1,
        icon: '🚀',
        description: '抽 3 张牌',
        draw: 3,
        target: 'self',
        maxCopies: 2
    },
    photon_shield: {
        id: 'photon_shield',
        name: '光子护盾',
        type: 'skill',
        cost: 2,
        icon: '☀️',
        description: '获得 22 点护甲',
        block: 22,
        target: 'self',
        maxCopies: 2
    },
    death_ray: {
        id: 'death_ray',
        name: '毁灭射线',
        type: 'attack',
        cost: 4,
        icon: '☠️',
        description: '造成 48~62 点伤害',
        minDamage: 48,
        maxDamage: 62,
        target: 'single',
        maxCopies: 1
    },
    // === 新增卡牌 ===
    shield_bash: {
        id: 'shield_bash',
        name: '护盾猛击',
        type: 'attack',
        cost: 2,
        icon: '🛡️',
        description: '造成等同于护甲的伤害',
        shieldBash: true,
        target: 'single',
        maxCopies: 2
    },
    time_warp: {
        id: 'time_warp',
        name: '时间扭曲',
        type: 'skill',
        cost: 2,
        icon: '⏰',
        description: '额外获得一个回合（每场战斗限1次）',
        extraTurn: true,
        unique: true,
        target: 'self',
        maxCopies: 1
    },
    virus_spread: {
        id: 'virus_spread',
        name: '病毒扩散',
        type: 'attack',
        cost: 1,
        icon: '🦠',
        description: '对所有敌人施加 2 腐蚀',
        poisonAll: 2,
        target: 'all_enemies',
        maxCopies: 2
    },
    energy_drain: {
        id: 'energy_drain',
        name: '能量汲取',
        type: 'attack',
        cost: 1,
        icon: '💧',
        description: '造成 3~7 伤害，回复 3 HP',
        minDamage: 3,
        maxDamage: 7,
        heal: 3,
        target: 'single',
        maxCopies: 2
    },
    mirror_image: {
        id: 'mirror_image',
        name: '镜像分身',
        type: 'skill',
        cost: 1,
        icon: '🪞',
        description: '复制手牌中费用最低的卡牌',
        copyCard: true,
        target: 'self',
        maxCopies: 1
    },
    explosive_shot: {
        id: 'explosive_shot',
        name: '爆裂射击',
        type: 'attack',
        cost: 2,
        icon: '💥',
        description: '造成 10~14 伤害，对所有敌人造成 4~8 伤害',
        minDamage: 10,
        maxDamage: 14,
        minAoeDamage: 4,
        maxAoeDamage: 8,
        target: 'single',
        maxCopies: 2
    },
    adaptive_armor: {
        id: 'adaptive_armor',
        name: '自适应装甲',
        type: 'power',
        cost: 1,
        icon: '🔰',
        description: '每次受到伤害时获得 2 护甲',
        armorOnHit: 2,
        target: 'self',
        maxCopies: 1
    },
    power_surge: {
        id: 'power_surge',
        name: '能量激增',
        type: 'skill',
        cost: 0,
        icon: '⚡',
        description: '本回合所有卡牌费用 -1',
        costReduction: 1,
        target: 'self',
        maxCopies: 2
    },
    heal_beam: {
        id: 'heal_beam',
        name: '治愈光束',
        type: 'skill',
        cost: 2,
        icon: '💚',
        description: '回复 15 HP，获得 5 护甲',
        heal: 15,
        block: 5,
        target: 'self',
        maxCopies: 2
    },
    weaken_field: {
        id: 'weaken_field',
        name: '虚弱力场',
        type: 'skill',
        cost: 1,
        icon: '🌫️',
        description: '所有敌人获得 3 虚弱',
        weakAll: 3,
        target: 'all_enemies',
        maxCopies: 2
    },
    critical_strike: {
        id: 'critical_strike',
        name: '致命一击',
        type: 'attack',
        cost: 2,
        icon: '⚔️',
        description: '造成 6~10 伤害，一半概率造成双倍伤害',
        minDamage: 6,
        maxDamage: 10,
        critChance: 0.5,
        target: 'single',
        maxCopies: 2
    },
    shield_wall: {
        id: 'shield_wall',
        name: '护盾之墙',
        type: 'skill',
        cost: 2,
        icon: '🏰',
        description: '获得 15 护甲，下回合额外 10 护甲',
        block: 15,
        nextTurnBlock: 10,
        target: 'self',
        maxCopies: 2
    },
    energy_burst: {
        id: 'energy_burst',
        name: '能量爆发',
        type: 'attack',
        cost: 1,
        icon: '✨',
        description: '造成等同于手牌数的伤害',
        handDamage: true,
        target: 'single',
        maxCopies: 2
    },
    toxic_cloud: {
        id: 'toxic_cloud',
        name: '毒雾弥漫',
        type: 'skill',
        cost: 2,
        icon: '☁️',
        description: '所有敌人获得 4 腐蚀 + 2 虚弱',
        poisonAll: 4,
        weakAll: 2,
        target: 'all_enemies',
        maxCopies: 2
    },
    berserker_rage: {
        id: 'berserker_rage',
        name: '狂战士之怒',
        type: 'power',
        cost: 2,
        icon: '😤',
        description: 'HP 越低伤害越高（最多 +8）',
        berserkerBonus: 8,
        target: 'self',
        maxCopies: 1
    },
    phase_shift: {
        id: 'phase_shift',
        name: '相位转移',
        type: 'skill',
        cost: 1,
        icon: '🌀',
        description: '获得 10 护甲，抽 2 张牌',
        block: 10,
        draw: 2,
        target: 'self',
        maxCopies: 2
    },
    plasma_wave: {
        id: 'plasma_wave',
        name: '等离子波',
        type: 'attack',
        cost: 3,
        icon: '🌊',
        description: '对所有敌人造成 12~18 伤害',
        minDamage: 12,
        maxDamage: 18,
        target: 'all',
        maxCopies: 2
    },
    repair_drone: {
        id: 'repair_drone',
        name: '修复无人机',
        type: 'power',
        cost: 2,
        icon: '🤖',
        description: '每回合开始回复 3 HP',
        healPerTurn: 3,
        target: 'self',
        maxCopies: 1
    },
    // === 精英专属卡牌 ===
    void_strike: {
        id: 'void_strike',
        name: '虚空斩击',
        type: 'attack',
        cost: 1,
        icon: '🌑',
        description: '造成 10~14 伤害，施加 2 虚弱',
        minDamage: 10,
        maxDamage: 14,
        weak: 2,
        target: 'single',
        rarity: 'elite',
        maxCopies: 1
    },
    plasma_burst: {
        id: 'plasma_burst',
        name: '等离子爆发',
        type: 'attack',
        cost: 2,
        icon: '💫',
        description: '对所有敌人造成 10~14 伤害',
        minDamage: 10,
        maxDamage: 14,
        target: 'all',
        rarity: 'elite',
        maxCopies: 1
    },
    time_lock: {
        id: 'time_lock',
        name: '时间锁定',
        type: 'skill',
        cost: 1,
        icon: '⏳',
        description: '获得 15 护甲，所有敌人获得 1 虚弱',
        block: 15,
        weakAll: 1,
        target: 'self',
        rarity: 'elite',
        maxCopies: 1
    },
    energy_nova: {
        id: 'energy_nova',
        name: '能量新星',
        type: 'skill',
        cost: 0,
        icon: '🌟',
        description: '获得 2 C能量，抽 1 张牌',
        energy: 2,
        draw: 1,
        target: 'self',
        rarity: 'elite',
        maxCopies: 1
    },
    titan_fist: {
        id: 'titan_fist',
        name: '泰坦之拳',
        type: 'attack',
        cost: 2,
        icon: '👊',
        description: '造成 21~29 伤害，无视护甲',
        minDamage: 21,
        maxDamage: 29,
        ignoreBlock: true,
        target: 'single',
        rarity: 'elite',
        maxCopies: 1
    },
    // === Boss专属卡牌 ===
    // Boss 1: 守卫核心
    guardian_fortress: {
        id: 'guardian_fortress',
        name: '守卫堡垒',
        type: 'skill',
        cost: 2,
        icon: '🏰',
        description: '获得 30 护甲，下回合额外 15 护甲',
        block: 30,
        nextTurnBlock: 15,
        target: 'self',
        rarity: 'boss',
        bossId: 'boss_guardian',
        maxCopies: 1
    },
    // Boss 2: 虫族女王
    queen_toxin: {
        id: 'queen_toxin',
        name: '女王毒素',
        type: 'attack',
        cost: 2,
        icon: '👑',
        description: '对所有敌人造成 15~21 伤害，施加 5 腐蚀',
        minDamage: 15,
        maxDamage: 21,
        poisonAll: 5,
        target: 'all',
        rarity: 'boss',
        bossId: 'boss_queen',
        maxCopies: 1
    },
    // Boss 3: 主控AI·奥米伽
    omega_beam: {
        id: 'omega_beam',
        name: '奥米伽射线',
        type: 'attack',
        cost: 2,
        icon: '🧠',
        description: '造成 26~34 伤害，对所有敌人造成 8~12 伤害',
        minDamage: 26,
        maxDamage: 34,
        minAoeDamage: 8,
        maxAoeDamage: 12,
        target: 'single',
        rarity: 'boss',
        bossId: 'boss_omega',
        maxCopies: 1
    },
    // Boss 4: 机械巨龙
    dragon_breath: {
        id: 'dragon_breath',
        name: '龙息吐息',
        type: 'attack',
        cost: 2,
        icon: '🐉',
        description: '对所有敌人造成 18~24 伤害，施加 4 腐蚀',
        minDamage: 18,
        maxDamage: 24,
        poisonAll: 4,
        target: 'all',
        rarity: 'boss',
        bossId: 'boss_dragon',
        maxCopies: 1
    },
    // Boss 5: 核心枢纽
    nexus_core: {
        id: 'nexus_core',
        name: '核心枢纽',
        type: 'power',
        cost: 2,
        icon: '💎',
        description: '每回合开始获得 10 护甲，+2 C能量',
        blockPerTurn: 10,
        energyPerTurn: 2,
        target: 'self',
        rarity: 'boss',
        bossId: 'boss_nexus',
        maxCopies: 1
    },
    quantum_resurrection: {
        id: 'quantum_resurrection',
        name: '量子重生',
        type: 'skill',
        cost: 1,
        icon: '✨',
        description: '回复 20 HP，获得 15 护甲，抽 2 张牌',
        heal: 20,
        block: 15,
        draw: 2,
        target: 'self',
        rarity: 'boss',
        bossId: 'boss_omega',
        maxCopies: 1
    },
    void_annihilation: {
        id: 'void_annihilation',
        name: '虚空湮灭',
        type: 'attack',
        cost: 3,
        icon: '💀',
        description: '造成 43~57 伤害，施加 5 虚弱 + 5 腐蚀',
        minDamage: 43,
        maxDamage: 57,
        weak: 5,
        poison: 5,
        target: 'single',
        rarity: 'boss',
        bossId: 'boss_nexus',
        maxCopies: 1
    },
    // Boss 6: 幻影领主
    phantom_strike: {
        id: 'phantom_strike',
        name: '幻影突袭',
        type: 'attack',
        cost: 1,
        icon: '👻',
        description: '造成 12~18 伤害 x2，施加 3 虚弱',
        minDamage: 12,
        maxDamage: 18,
        hits: 2,
        weak: 3,
        target: 'single',
        rarity: 'boss',
        bossId: 'boss_phantom',
        maxCopies: 1
    },
    // Boss 7: 泰坦巨像
    titan_crush: {
        id: 'titan_crush',
        name: '泰坦粉碎',
        type: 'attack',
        cost: 3,
        icon: '🗿',
        description: '造成 55~70 伤害，无视护甲',
        minDamage: 55,
        maxDamage: 70,
        ignoreBlock: true,
        target: 'single',
        rarity: 'boss',
        bossId: 'boss_titan',
        maxCopies: 1
    },
    // Boss 8: 虚空皇帝
    void_decree: {
        id: 'void_decree',
        name: '虚空诏令',
        type: 'skill',
        cost: 2,
        icon: '🌑',
        description: '所有敌人获得 6 腐蚀 + 4 虚弱，抽 3 张牌',
        poisonAll: 6,
        weakAll: 4,
        draw: 3,
        target: 'all_enemies',
        rarity: 'boss',
        bossId: 'boss_void_emperor',
        maxCopies: 1
    },
    // Boss 9: 宇宙恐惧
    cosmic_madness: {
        id: 'cosmic_madness',
        name: '宇宙疯狂',
        type: 'attack',
        cost: 2,
        icon: '🌌',
        description: '对所有敌人造成 20~28 伤害，施加 5 腐蚀 + 3 虚弱',
        minDamage: 20,
        maxDamage: 28,
        poisonAll: 5,
        weakAll: 3,
        target: 'all',
        rarity: 'boss',
        bossId: 'boss_cosmic_horror',
        maxCopies: 1
    },
    // Boss 10: 终焉之神
    divine_judgment: {
        id: 'divine_judgment',
        name: '神之裁决',
        type: 'attack',
        cost: 4,
        icon: '⚡',
        description: '造成 70~90 伤害，对所有敌人造成 25~35 伤害',
        minDamage: 70,
        maxDamage: 90,
        minAoeDamage: 25,
        maxAoeDamage: 35,
        target: 'single',
        rarity: 'boss',
        bossId: 'boss_final_god',
        maxCopies: 1
    }
};

const Cards = {
    getInitialDeck() {
        const deck = [];
        for (let i = 0; i < 5; i++) deck.push(this.createCard('laser_shot'));
        for (let i = 0; i < 4; i++) deck.push(this.createCard('energy_shield'));
        deck.push(this.createCard('plasma_cannon'));
        return deck;
    },

    createCard(id, upgraded = false) {
        const base = CardData[id];
        if (!base) return null;
        const card = Utils.deepClone(base);
        card.uid = Utils.generateId();
        card.upgraded = upgraded;
        if (upgraded) {
            card.name = card.name + '+';
            if (card.minDamage) card.minDamage = Math.ceil(card.minDamage * 1.3);
            if (card.maxDamage) card.maxDamage = Math.ceil(card.maxDamage * 1.3);
            if (card.damage) card.damage = Math.ceil(card.damage * 1.3);
            if (card.block) card.block = Math.ceil(card.block * 1.3);
            if (card.heal) card.heal = Math.ceil(card.heal * 1.3);
            if (card.draw) card.draw += 1;
            if (card.poison) card.poison = Math.ceil(card.poison * 1.3);
            if (card.weak) card.weak += 1;
            if (card.strength) card.strength += 1;
            if (card.hits) card.hits += 1;
            if (card.blockPerTurn) card.blockPerTurn = Math.ceil(card.blockPerTurn * 1.3);
            if (card.damagePerTurn) card.damagePerTurn = Math.ceil(card.damagePerTurn * 1.3);
            if (card.energyPerTurn) card.energyPerTurn += 1;
            if (card.nextTurnBlock) card.nextTurnBlock = Math.ceil(card.nextTurnBlock * 1.3);
            if (card.attackBonus) card.attackBonus += 1;
            if (card.blockOnAttack) card.blockOnAttack += 1;
            if (card.thorns) card.thorns += 1;
            if (card.selfDamage) card.selfDamage = Math.ceil(card.selfDamage * 0.8);
            if (card.energy) card.energy += 1;
            if (card.minAoeDamage) card.minAoeDamage = Math.ceil(card.minAoeDamage * 1.3);
            if (card.maxAoeDamage) card.maxAoeDamage = Math.ceil(card.maxAoeDamage * 1.3);
            if (card.aoeDamage) card.aoeDamage = Math.ceil(card.aoeDamage * 1.3);
            if (card.armorOnHit) card.armorOnHit += 1;
            if (card.poisonAll) card.poisonAll = Math.ceil(card.poisonAll * 1.3);
            if (card.weakAll) card.weakAll += 1;
            if (card.healPerTurn) card.healPerTurn = Math.ceil(card.healPerTurn * 1.3);
            if (card.berserkerBonus) card.berserkerBonus += 2;
        }
        card.description = this.buildDescription(card);
        return card;
    },

    buildDescription(card) {
        const parts = [];

        if (card.cost === -1 && card.damagePerEnergy) {
            parts.push(`消耗全部H能量，每点造成 ${card.damagePerEnergy} 伤害`);
        } else if (card.minDamage && card.maxDamage) {
            const hits = card.hits || 1;
            if (hits > 1) {
                parts.push(`造成 ${card.minDamage}~${card.maxDamage} 伤害 x${hits}`);
            } else {
                parts.push(`造成 ${card.minDamage}~${card.maxDamage} 点伤害`);
            }
        } else if (card.damage) {
            const hits = card.hits || 1;
            if (hits > 1) {
                parts.push(`造成 ${card.damage} 伤害 x${hits}`);
            } else {
                parts.push(`造成 ${card.damage} 点伤害`);
            }
        }

        if (card.block) {
            parts.push(`获得 ${card.block} 护甲`);
        }

        if (card.heal) {
            parts.push(`回复 ${card.heal} HP`);
        }

        if (card.draw) {
            parts.push(`抽 ${card.draw} 张牌`);
        }

        if (card.energy && !card.damagePerEnergy) {
            parts.push(`获得 ${card.energy} C能量`);
        }

        if (card.poison) {
            parts.push(`施加 ${card.poison} 腐蚀`);
        }

        if (card.weak) {
            parts.push(`施加 ${card.weak} 虚弱`);
        }

        if (card.weakAll) {
            parts.push(`所有敌人获得 ${card.weakAll} 虚弱`);
        }

        if (card.strength) {
            parts.push(`每次攻击额外 +${card.strength} 伤害`);
        }

        if (card.blockPerTurn) {
            parts.push(`每回合开始获得 ${card.blockPerTurn} 护甲`);
        }

        if (card.damagePerTurn && !card.damagePerTurnSelf) {
            parts.push(`每回合对随机敌人造成 ${card.damagePerTurn} 伤害`);
        }

        if (card.energyPerTurn) {
            parts.push(`每回合 +${card.energyPerTurn} 能量`);
        }

        if (card.damagePerTurnSelf) {
            parts.push(`每回合受 ${card.damagePerTurnSelf} 伤害`);
        }

        if (card.attackBonus) {
            parts.push(`攻击牌伤害 +${card.attackBonus}`);
        }

        if (card.blockOnAttack) {
            parts.push(`每打出攻击牌获得 ${card.blockOnAttack} 护甲`);
        }

        if (card.thorns) {
            parts.push(`反弹 ${card.thorns} 伤害`);
        }

        if (card.nextTurnBlock) {
            parts.push(`下回合额外 ${card.nextTurnBlock} 护甲`);
        }

        if (card.selfDamage) {
            parts.push(`自身受 ${card.selfDamage} 伤害`);
        }

        if (card.ignoreBlock) {
            parts.push(`无视护甲`);
        }

        if (card.reboot) {
            parts.push(`弃掉所有手牌，抽等量+2张`);
        }

        if (card.freeCard) {
            parts.push(`随机 1 张手牌费用变 0`);
        }

        if (card.upgradeAll) {
            parts.push(`所有卡牌伤害/护甲 +${card.upgradeAll}`);
        }

        if (card.shieldBash) {
            parts.push(`造成等同于护甲的伤害`);
        }

        if (card.extraTurn) {
            parts.push(`额外获得一个回合`);
        }

        if (card.poisonAll) {
            parts.push(`所有敌人获得 ${card.poisonAll} 腐蚀`);
        }

        if (card.copyCard) {
            parts.push(`复制手牌中费用最低的卡牌`);
        }

        if (card.minAoeDamage && card.maxAoeDamage) {
            parts.push(`对所有敌人造成 ${card.minAoeDamage}~${card.maxAoeDamage} 伤害`);
        } else if (card.aoeDamage) {
            parts.push(`对所有敌人造成 ${card.aoeDamage} 伤害`);
        }

        if (card.armorOnHit) {
            parts.push(`每次受到伤害时获得 ${card.armorOnHit} 护甲`);
        }

        if (card.costReduction) {
            parts.push(`本回合所有卡牌费用 -${card.costReduction}`);
        }

        if (card.critChance) {
            parts.push(`一半概率造成双倍伤害`);
        }

        if (card.handDamage) {
            parts.push(`造成等同于手牌数的伤害`);
        }

        if (card.berserkerBonus) {
            parts.push(`HP 越低伤害越高（最多 +${card.berserkerBonus}）`);
        }

        if (card.healPerTurn) {
            parts.push(`每回合开始回复 ${card.healPerTurn} HP`);
        }

        if (parts.length === 0) return card.description || '';
        return parts.join('，');
    },

    getRewardPool() {
        return Object.keys(CardData).filter(id => {
            const card = CardData[id];
            return !['laser_shot', 'energy_shield', 'plasma_cannon'].includes(id) 
                && card.rarity !== 'elite' 
                && card.rarity !== 'boss';
        });
    },

    getElitePool() {
        return Object.keys(CardData).filter(id => CardData[id].rarity === 'elite');
    },

    getBossPool(bossId) {
        return Object.keys(CardData).filter(id => {
            const card = CardData[id];
            return card.rarity === 'boss' && (!bossId || card.bossId === bossId);
        });
    },

    getEliteRewards(count = 2) {
        const pool = this.getElitePool();
        return Utils.pickRandom(pool, Math.min(count, pool.length)).map(id => this.createCard(id));
    },

    getBossRewards(count = 2, bossId) {
        const pool = this.getBossPool(bossId);
        return Utils.pickRandom(pool, Math.min(count, pool.length)).map(id => this.createCard(id));
    },

    getRandomRewards(count = 3) {
        const pool = this.getRewardPool();
        return Utils.pickRandom(pool, count).map(id => this.createCard(id));
    },

    getCardDescription(card) {
        return card.description;
    },

    upgradeCard(card) {
        if (card.upgraded) return;
        card.upgraded = true;
        card.name = card.name + '+';
        if (card.minDamage) card.minDamage = Math.ceil(card.minDamage * 1.3);
        if (card.maxDamage) card.maxDamage = Math.ceil(card.maxDamage * 1.3);
        if (card.damage) card.damage = Math.ceil(card.damage * 1.3);
        if (card.block) card.block = Math.ceil(card.block * 1.3);
        if (card.heal) card.heal = Math.ceil(card.heal * 1.3);
        if (card.draw) card.draw += 1;
        if (card.poison) card.poison = Math.ceil(card.poison * 1.3);
        if (card.weak) card.weak += 1;
        if (card.strength) card.strength += 1;
        if (card.hits) card.hits += 1;
        if (card.blockPerTurn) card.blockPerTurn = Math.ceil(card.blockPerTurn * 1.3);
        if (card.damagePerTurn) card.damagePerTurn = Math.ceil(card.damagePerTurn * 1.3);
        if (card.energyPerTurn) card.energyPerTurn += 1;
        if (card.nextTurnBlock) card.nextTurnBlock = Math.ceil(card.nextTurnBlock * 1.3);
        if (card.attackBonus) card.attackBonus += 1;
        if (card.blockOnAttack) card.blockOnAttack += 1;
        if (card.thorns) card.thorns += 1;
        if (card.selfDamage) card.selfDamage = Math.ceil(card.selfDamage * 0.8);
        if (card.energy) card.energy += 1;
        if (card.minAoeDamage) card.minAoeDamage = Math.ceil(card.minAoeDamage * 1.3);
        if (card.maxAoeDamage) card.maxAoeDamage = Math.ceil(card.maxAoeDamage * 1.3);
        if (card.aoeDamage) card.aoeDamage = Math.ceil(card.aoeDamage * 1.3);
        if (card.armorOnHit) card.armorOnHit += 1;
        if (card.poisonAll) card.poisonAll = Math.ceil(card.poisonAll * 1.3);
        if (card.weakAll) card.weakAll += 1;
        if (card.healPerTurn) card.healPerTurn = Math.ceil(card.healPerTurn * 1.3);
        if (card.berserkerBonus) card.berserkerBonus += 2;
        if (card.damagePerEnergy) card.damagePerEnergy = Math.ceil(card.damagePerEnergy * 1.3);
        if (card.blockPerHEnergy) card.blockPerHEnergy = Math.ceil(card.blockPerHEnergy * 1.3);
        if (card.healPerHEnergy) card.healPerHEnergy = Math.ceil(card.healPerHEnergy * 1.3);
        card.description = this.buildDescription(card);
    },

    canAddToDeck(deck, card) {
        // Initial cards are unlimited
        const initialCards = ['laser_shot', 'energy_shield', 'plasma_cannon'];
        if (initialCards.includes(card.id)) {
            return true;
        }
        
        // Check maxCopies limit from CardLimits settings
        const maxCopies = CardLimits.getCardLimit(card.id);
        const currentCount = deck.filter(c => c.id === card.id).length;
        if (currentCount >= maxCopies) {
            return false;
        }
        
        // Legacy check for elite/unique cards
        if (card.rarity === 'elite' || card.unique) {
            const hasCopy = deck.some(c => c.id === card.id);
            return !hasCopy;
        }
        return true;
    },

    addToDeck(deck, card) {
        if (this.canAddToDeck(deck, card)) {
            deck.push(card);
            return true;
        }
        return false;
    }
};
