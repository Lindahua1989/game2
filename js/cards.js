const CardData = {
    laser_shot: {
        id: 'laser_shot',
        name: '激光射击',
        type: 'attack',
        cost: 1,
        icon: '🔫',
        description: '造成 6 点伤害',
        damage: 6,
        target: 'single'
    },
    energy_shield: {
        id: 'energy_shield',
        name: '能量护盾',
        type: 'skill',
        cost: 1,
        icon: '🛡️',
        description: '获得 5 点护甲',
        block: 5,
        target: 'self'
    },
    plasma_cannon: {
        id: 'plasma_cannon',
        name: '等离子炮',
        type: 'attack',
        cost: 2,
        icon: '💥',
        description: '造成 14 点伤害',
        damage: 14,
        target: 'single'
    },
    emp_pulse: {
        id: 'emp_pulse',
        name: 'EMP脉冲',
        type: 'attack',
        cost: 1,
        icon: '⚡',
        description: '对所有敌人造成 8 点伤害',
        damage: 8,
        target: 'all'
    },
    nano_armor: {
        id: 'nano_armor',
        name: '纳米装甲',
        type: 'skill',
        cost: 2,
        icon: '🔰',
        description: '获得 15 点护甲',
        block: 15,
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
        description: '造成 10 伤害，回复 5 HP',
        damage: 10,
        heal: 5,
        target: 'single'
    },
    rapid_fire: {
        id: 'rapid_fire',
        name: '连射',
        type: 'attack',
        cost: 1,
        icon: '🔥',
        description: '造成 4 伤害 x2',
        damage: 4,
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
        description: '造成 4 伤害，施加 3 腐蚀',
        damage: 4,
        poison: 3,
        target: 'single'
    },
    em_storm: {
        id: 'em_storm',
        name: '电磁风暴',
        type: 'attack',
        cost: 2,
        icon: '🌩️',
        description: '造成 18 点伤害',
        damage: 18,
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
        description: '造成 5 伤害 x3',
        damage: 5,
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
        description: '造成 32 点伤害',
        damage: 32,
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
        description: '造成 6 伤害，获得 1 能量',
        damage: 6,
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
        description: '造成 20 伤害，无视护甲',
        damage: 20,
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
        description: '造成 9 点伤害',
        damage: 9,
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
        description: '对随机敌人造成 7 伤害 x3',
        damage: 7,
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
        description: '造成 40 伤害，自身受 20 伤害',
        damage: 40,
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
        description: '造成 3 伤害，施加 2 虚弱 + 2 腐蚀',
        damage: 3,
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
        description: '造成 12 伤害，施加 3 虚弱',
        damage: 12,
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
        description: '获得 20 点护甲',
        block: 20,
        target: 'self'
    },
    death_ray: {
        id: 'death_ray',
        name: '毁灭射线',
        type: 'attack',
        cost: 4,
        icon: '☠️',
        description: '造成 50 点伤害',
        damage: 50,
        target: 'single'
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
            if (card.damage) card.damage = Math.ceil(card.damage * 1.3);
            if (card.block) card.block = Math.ceil(card.block * 1.3);
            if (card.heal) card.heal = Math.ceil(card.heal * 1.3);
            if (card.draw) card.draw += 1;
            if (card.poison) card.poison = Math.ceil(card.poison * 1.3);
            if (card.weak) card.weak += 1;
            if (card.strength) card.strength += 1;
            if (card.hits) card.hits += 1;
        }
        return card;
    },

    getRewardPool() {
        return Object.keys(CardData).filter(id =>
            !['laser_shot', 'energy_shield', 'plasma_cannon'].includes(id)
        );
    },

    getRandomRewards(count = 3) {
        const pool = this.getRewardPool();
        return Utils.pickRandom(pool, count).map(id => this.createCard(id));
    },

    getCardDescription(card) {
        let desc = card.description;
        if (card.upgraded) {
            desc = desc.replace(/\d+/g, (match) => {
                return Math.ceil(parseInt(match) * 1.3);
            });
        }
        return desc;
    }
};
