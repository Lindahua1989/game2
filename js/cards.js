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
        target: 'single'
    },
    energy_shield: {
        id: 'energy_shield',
        name: '能量护盾',
        type: 'skill',
        cost: 1,
        icon: '🛡️',
        description: '获得 6 点护甲',
        block: 6,
        target: 'self'
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
        target: 'single'
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
        target: 'all'
    },
    nano_armor: {
        id: 'nano_armor',
        name: '纳米装甲',
        type: 'skill',
        cost: 2,
        icon: '🔰',
        description: '获得 18 点护甲',
        block: 18,
        target: 'self'
    },
    overclock: {
        id: 'overclock',
        name: '超频模式',
        type: 'power',
        cost: 1,
        icon: '⚙️',
        description: '每次攻击额外 +2 伤害',
        strength: 2,
        target: 'self'
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
        target: 'single'
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
        target: 'single'
    },
    data_download: {
        id: 'data_download',
        name: '数据下载',
        type: 'skill',
        cost: 0,
        icon: '📥',
        description: '抽 2 张牌',
        draw: 2,
        target: 'self'
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
        target: 'single'
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
        target: 'single'
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
        target: 'self'
    },
    energy_overload: {
        id: 'energy_overload',
        name: '能量过载',
        type: 'skill',
        cost: 0,
        icon: '⚡',
        description: '获得 2 能量，受到 3 伤害',
        energy: 2,
        selfDamage: 3,
        target: 'self'
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
        target: 'single'
    },
    hologram: {
        id: 'hologram',
        name: '全息投影',
        type: 'skill',
        cost: 1,
        icon: '👻',
        description: '获得 12 点护甲',
        block: 12,
        target: 'self'
    },
    system_reboot: {
        id: 'system_reboot',
        name: '系统重启',
        type: 'skill',
        cost: 1,
        icon: '🔄',
        description: '弃掉所有手牌，抽等量+2张',
        reboot: true,
        target: 'self'
    },
    ion_shield: {
        id: 'ion_shield',
        name: '离子护盾',
        type: 'power',
        cost: 2,
        icon: '🔵',
        description: '每回合开始获得 3 护甲',
        blockPerTurn: 3,
        target: 'self'
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
        target: 'single'
    },
    nano_swarm: {
        id: 'nano_swarm',
        name: '纳米蜂群',
        type: 'power',
        cost: 2,
        icon: '🐝',
        description: '每回合对随机敌人造成 5 伤害',
        damagePerTurn: 5,
        target: 'self'
    },
    energy_siphon: {
        id: 'energy_siphon',
        name: '能量虹吸',
        type: 'attack',
        cost: 1,
        icon: '🌀',
        description: '造成 4~8 伤害，获得 1 能量',
        minDamage: 4,
        maxDamage: 8,
        energy: 1,
        target: 'single'
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
        target: 'self'
    },
    overload_protocol: {
        id: 'overload_protocol',
        name: '过载协议',
        type: 'power',
        cost: 1,
        icon: '⚠️',
        description: '每回合 +1 能量，受 2 伤害',
        energyPerTurn: 1,
        damagePerTurnSelf: 2,
        target: 'self'
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
        target: 'single'
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
        target: 'self'
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
        target: 'single'
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
        target: 'self'
    },
    emergency_repair: {
        id: 'emergency_repair',
        name: '紧急修复',
        type: 'skill',
        cost: 1,
        icon: '🩹',
        description: '回复 8 HP',
        heal: 8,
        target: 'self'
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
        target: 'random'
    },
    energy_convert: {
        id: 'energy_convert',
        name: '能量转换',
        type: 'skill',
        cost: 1,
        icon: '🔋',
        description: '将 2 点能量转化为 10 护甲',
        energyCost: 2,
        block: 10,
        target: 'self'
    },
    auto_aim: {
        id: 'auto_aim',
        name: '自动瞄准',
        type: 'power',
        cost: 1,
        icon: '🎯',
        description: '攻击牌伤害 +3',
        attackBonus: 3,
        target: 'self'
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
        target: 'self'
    },
    gravity_field: {
        id: 'gravity_field',
        name: '重力场',
        type: 'skill',
        cost: 2,
        icon: '🌊',
        description: '所有敌人获得 2 虚弱',
        weakAll: 2,
        target: 'all_enemies'
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
        target: 'single'
    },
    mech_enhance: {
        id: 'mech_enhance',
        name: '机械强化',
        type: 'power',
        cost: 1,
        icon: '🔧',
        description: '每打出攻击牌获得 2 护甲',
        blockOnAttack: 2,
        target: 'self'
    },
    data_overflow: {
        id: 'data_overflow',
        name: '数据溢出',
        type: 'attack',
        cost: -1,
        icon: '💾',
        description: '造成 X*5 伤害，消耗 X 能量',
        damagePerEnergy: 5,
        target: 'single'
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
        target: 'single'
    },
    energy_pulse: {
        id: 'energy_pulse',
        name: '能量脉冲',
        type: 'skill',
        cost: 0,
        icon: '🔌',
        description: '获得 1 能量',
        energy: 1,
        target: 'self'
    },
    defense_matrix: {
        id: 'defense_matrix',
        name: '防御矩阵',
        type: 'power',
        cost: 2,
        icon: '🛡️',
        description: '每回合开始获得 5 护甲',
        blockPerTurn: 5,
        target: 'self'
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
        target: 'single'
    },
    system_upgrade: {
        id: 'system_upgrade',
        name: '系统升级',
        type: 'power',
        cost: 2,
        icon: '⬆️',
        description: '所有卡牌伤害/护甲 +2',
        upgradeAll: 2,
        target: 'self'
    },
    quick_deploy: {
        id: 'quick_deploy',
        name: '快速部署',
        type: 'skill',
        cost: 1,
        icon: '🚀',
        description: '抽 3 张牌',
        draw: 3,
        target: 'self'
    },
    photon_shield: {
        id: 'photon_shield',
        name: '光子护盾',
        type: 'skill',
        cost: 2,
        icon: '☀️',
        description: '获得 22 点护甲',
        block: 22,
        target: 'self'
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
        target: 'single'
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
        target: 'single'
    },
    time_warp: {
        id: 'time_warp',
        name: '时间扭曲',
        type: 'skill',
        cost: 2,
        icon: '⏰',
        description: '额外获得一个回合',
        extraTurn: true,
        target: 'self'
    },
    virus_spread: {
        id: 'virus_spread',
        name: '病毒扩散',
        type: 'attack',
        cost: 1,
        icon: '🦠',
        description: '对所有敌人施加 2 腐蚀',
        poisonAll: 2,
        target: 'all_enemies'
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
        target: 'single'
    },
    mirror_image: {
        id: 'mirror_image',
        name: '镜像分身',
        type: 'skill',
        cost: 1,
        icon: '🪞',
        description: '复制手牌中费用最低的卡牌',
        copyCard: true,
        target: 'self'
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
        target: 'single'
    },
    adaptive_armor: {
        id: 'adaptive_armor',
        name: '自适应装甲',
        type: 'power',
        cost: 1,
        icon: '🔰',
        description: '每次受到伤害时获得 2 护甲',
        armorOnHit: 2,
        target: 'self'
    },
    power_surge: {
        id: 'power_surge',
        name: '能量激增',
        type: 'skill',
        cost: 0,
        icon: '⚡',
        description: '本回合所有卡牌费用 -1',
        costReduction: 1,
        target: 'self'
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
        target: 'self'
    },
    weaken_field: {
        id: 'weaken_field',
        name: '虚弱力场',
        type: 'skill',
        cost: 1,
        icon: '🌫️',
        description: '所有敌人获得 3 虚弱',
        weakAll: 3,
        target: 'all_enemies'
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
        target: 'single'
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
        target: 'self'
    },
    energy_burst: {
        id: 'energy_burst',
        name: '能量爆发',
        type: 'attack',
        cost: 1,
        icon: '✨',
        description: '造成等同于手牌数的伤害',
        handDamage: true,
        target: 'single'
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
        target: 'all_enemies'
    },
    berserker_rage: {
        id: 'berserker_rage',
        name: '狂战士之怒',
        type: 'power',
        cost: 2,
        icon: '😤',
        description: 'HP 越低伤害越高（最多 +8）',
        berserkerBonus: 8,
        target: 'self'
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
        target: 'self'
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
        target: 'all'
    },
    repair_drone: {
        id: 'repair_drone',
        name: '修复无人机',
        type: 'power',
        cost: 2,
        icon: '🤖',
        description: '每回合开始回复 3 HP',
        healPerTurn: 3,
        target: 'self'
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
        rarity: 'elite'
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
        rarity: 'elite'
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
        rarity: 'elite'
    },
    energy_nova: {
        id: 'energy_nova',
        name: '能量新星',
        type: 'skill',
        cost: 0,
        icon: '🌟',
        description: '获得 2 能量，抽 1 张牌',
        energy: 2,
        draw: 1,
        target: 'self',
        rarity: 'elite'
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
        rarity: 'elite'
    },
    // === Boss专属卡牌 ===
    omega_beam: {
        id: 'omega_beam',
        name: '奥米伽射线',
        type: 'attack',
        cost: 2,
        icon: '☄️',
        description: '造成 26~34 伤害，对所有敌人造成 8~12 伤害',
        minDamage: 26,
        maxDamage: 34,
        minAoeDamage: 8,
        maxAoeDamage: 12,
        target: 'single',
        rarity: 'boss'
    },
    dragon_breath: {
        id: 'dragon_breath',
        name: '龙息吐息',
        type: 'attack',
        cost: 2,
        icon: '🔥',
        description: '对所有敌人造成 15~21 伤害，施加 3 腐蚀',
        minDamage: 15,
        maxDamage: 21,
        poisonAll: 3,
        target: 'all',
        rarity: 'boss'
    },
    nexus_core: {
        id: 'nexus_core',
        name: '核心枢纽',
        type: 'power',
        cost: 2,
        icon: '💎',
        description: '每回合开始获得 8 护甲，+2 能量',
        blockPerTurn: 8,
        energyPerTurn: 2,
        target: 'self',
        rarity: 'boss'
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
        rarity: 'boss'
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
        rarity: 'boss'
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

        if (card.damage && card.damagePerEnergy) {
            parts.push(`造成 X*${card.damagePerEnergy} 伤害，消耗 X 能量`);
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
            parts.push(`获得 ${card.energy} 能量`);
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

    getBossPool() {
        return Object.keys(CardData).filter(id => CardData[id].rarity === 'boss');
    },

    getEliteRewards(count = 2) {
        const pool = this.getElitePool();
        return Utils.pickRandom(pool, Math.min(count, pool.length)).map(id => this.createCard(id));
    },

    getBossRewards(count = 2) {
        const pool = this.getBossPool();
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
        card.description = this.buildDescription(card);
    }
};
