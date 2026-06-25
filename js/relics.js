const RelicData = {
    nano_repair_module: {
        id: 'nano_repair_module',
        name: '纳米修复器',
        icon: '🔧',
        description: '每场战斗结束回复 5 HP',
        rarity: 'common'
    },
    quantum_chip: {
        id: 'quantum_chip',
        name: '量子芯片',
        icon: '💎',
        description: '每回合两成概率多抽 1 张牌',
        rarity: 'common'
    },
    auto_turret: {
        id: 'auto_turret',
        name: '自动炮台',
        icon: '🔫',
        description: '每回合开始对随机敌人造成 3 伤害',
        rarity: 'common'
    },
    energy_core: {
        id: 'energy_core',
        name: '能量核心',
        icon: '⚡',
        description: '初始能量 +1',
        rarity: 'rare'
    },
    titanium_frame: {
        id: 'titanium_frame',
        name: '钛合金骨架',
        icon: '🦾',
        description: '初始最大 HP +15',
        rarity: 'common'
    },
    data_crystal: {
        id: 'data_crystal',
        name: '数据水晶',
        icon: '💠',
        description: '战斗胜利后多获得 5 金币',
        rarity: 'common'
    },
    nano_shield_module: {
        id: 'nano_shield_module',
        name: '纳米护盾',
        icon: '🛡️',
        description: '每场战斗第一回合获得 8 护甲',
        rarity: 'common'
    },
    overclock_engine: {
        id: 'overclock_engine',
        name: '超频引擎',
        icon: '🔥',
        description: '每回合未用完的能量保留 1 点',
        rarity: 'rare'
    },
    virus_program: {
        id: 'virus_program',
        name: '病毒程序',
        icon: '🦠',
        description: '战斗开始时对所有敌人施加 2 腐蚀',
        rarity: 'common'
    },
    tactical_goggles: {
        id: 'tactical_goggles',
        name: '战术目镜',
        icon: '🥽',
        description: '每回合第一张攻击牌伤害 +5',
        rarity: 'common'
    },
    energy_recycler: {
        id: 'energy_recycler',
        name: '能量回收器',
        icon: '♻️',
        description: '每弃掉 3 张牌获得 1 能量',
        rarity: 'uncommon'
    },
    stealth_module: {
        id: 'stealth_module',
        name: '隐身模块',
        icon: '👤',
        description: '每场战斗第一回合敌人无法攻击',
        rarity: 'rare'
    },
    magnetic_gloves: {
        id: 'magnetic_gloves',
        name: '磁力手套',
        icon: '🧲',
        description: '每打出 3 张牌抽 1 张',
        rarity: 'uncommon'
    },
    cooling_system: {
        id: 'cooling_system',
        name: '冷却系统',
        icon: '❄️',
        description: '每回合开始获得 2 护甲',
        rarity: 'common'
    },
    ultimate_core: {
        id: 'ultimate_core',
        name: '终极核心',
        icon: '⭐',
        description: '所有卡牌伤害/护甲 +1',
        rarity: 'rare'
    },
    plasma_reactor: {
        id: 'plasma_reactor',
        name: '等离子反应堆',
        icon: '☢️',
        description: '每回合开始对所有敌人造成 2 伤害',
        rarity: 'uncommon'
    },
    shield_generator: {
        id: 'shield_generator',
        name: '护盾发生器',
        icon: '🔰',
        description: '每回合开始获得 3 护甲',
        rarity: 'uncommon'
    },
    time_dilator: {
        id: 'time_dilator',
        name: '时间膨胀器',
        icon: '⏰',
        description: '每场战斗第一回合抽 7 张牌',
        rarity: 'rare'
    },
    berserker_chip: {
        id: 'berserker_chip',
        name: '狂战士芯片',
        icon: '😤',
        description: 'HP 低于一半时，攻击伤害 +3',
        rarity: 'uncommon'
    },
    vampiric_module: {
        id: 'vampiric_module',
        name: '吸血模块',
        icon: '🧛',
        description: '每次造成伤害时回复 1 HP（每回合最多 5 次）',
        rarity: 'rare'
    },
    lucky_coin: {
        id: 'lucky_coin',
        name: '幸运硬币',
        icon: '🍀',
        description: '每场战斗有三成概率获得额外 15 金币',
        rarity: 'common'
    },
    energy_amplifier: {
        id: 'energy_amplifier',
        name: '能量放大器',
        icon: '🔋',
        description: '每回合第一张卡牌费用 -1',
        rarity: 'uncommon'
    },
    thorn_armor: {
        id: 'thorn_armor',
        name: '荆棘装甲',
        icon: '🌵',
        description: '受到攻击时反弹 3 伤害',
        rarity: 'uncommon'
    },
    card_compressor: {
        id: 'card_compressor',
        name: '卡牌压缩器',
        icon: '🗜️',
        description: '每回合结束时，手牌中费用最高的卡牌费用 -1（下回合）',
        rarity: 'rare'
    },
    phoenix_core: {
        id: 'phoenix_core',
        name: '凤凰核心',
        icon: '🔥',
        description: '每场战斗一次：受到致命伤害时回复 20 HP',
        rarity: 'rare'
    },
    gravity_well: {
        id: 'gravity_well',
        name: '重力井',
        icon: '🌀',
        description: '战斗开始时对所有敌人施加 1 虚弱',
        rarity: 'uncommon'
    },
    // === 精英专属遗物 ===
    elite_core_fragment: {
        id: 'elite_core_fragment',
        name: '精英核心碎片',
        icon: '💠',
        description: '每回合开始获得 4 护甲，+1 能量',
        rarity: 'elite',
        blockPerTurn: 4,
        energyPerTurn: 1
    },
    elite_hunter_mark: {
        id: 'elite_hunter_mark',
        name: '猎人印记',
        icon: '🎯',
        description: '每回合第一张攻击牌伤害 +8',
        rarity: 'elite',
        firstAttackBonus: 8
    },
    elite_void_essence: {
        id: 'elite_void_essence',
        name: '虚空精华',
        icon: '🌑',
        description: '战斗开始时对所有敌人施加 3 腐蚀',
        rarity: 'elite',
        poisonAll: 3
    },
    elite_time_crystal: {
        id: 'elite_time_crystal',
        name: '时间水晶',
        icon: '⏰',
        description: '每场战斗第一回合抽 8 张牌',
        rarity: 'elite',
        firstTurnDraw: 8
    },
    // === Boss专属遗物 ===
    // Boss 1: 守卫核心
    boss_guardian_shield: {
        id: 'boss_guardian_shield',
        name: '守卫之盾',
        icon: '🛡️',
        description: '每回合开始获得 12 护甲，受到攻击时反弹 4 伤害',
        rarity: 'boss',
        blockPerTurn: 12,
        thorns: 4,
        bossId: 'boss_guardian'
    },
    // Boss 2: 虫族女王
    boss_queen_hive: {
        id: 'boss_queen_hive',
        name: '虫族蜂巢',
        icon: '🐝',
        description: '每回合对随机敌人造成 8 伤害，战斗开始时对所有敌人施加 3 腐蚀',
        rarity: 'boss',
        damagePerTurn: 8,
        poisonAll: 3,
        bossId: 'boss_queen'
    },
    // Boss 3: 主控AI·奥米伽
    boss_omega_matrix: {
        id: 'boss_omega_matrix',
        name: '奥米伽矩阵',
        icon: '🧠',
        description: '每回合开始获得 10 护甲，+2 能量，对所有敌人造成 5 伤害',
        rarity: 'boss',
        blockPerTurn: 10,
        energyPerTurn: 2,
        damageAll: 5,
        bossId: 'boss_omega'
    },
    // Boss 4: 机械巨龙
    boss_dragon_heart: {
        id: 'boss_dragon_heart',
        name: '龙心核心',
        icon: '❤️‍🔥',
        description: '最大 HP +30，每回合回复 5 HP',
        rarity: 'boss',
        maxHpBonus: 30,
        healPerTurn: 5,
        bossId: 'boss_dragon'
    },
    // Boss 5: 核心枢纽
    boss_nexus_shard: {
        id: 'boss_nexus_shard',
        name: '枢纽碎片',
        icon: '💎',
        description: '所有卡牌伤害 +5，护甲 +5',
        rarity: 'boss',
        cardBonus: 5,
        bossId: 'boss_nexus'
    },
    boss_void_crown: {
        id: 'boss_void_crown',
        name: '虚空王冠',
        icon: '👑',
        description: '每回合抽 7 张牌，+3 能量',
        rarity: 'boss',
        drawPerTurn: 7,
        energyPerTurn: 3,
        bossId: 'boss_nexus'
    },
    // Boss 6: 幻影领主
    boss_phantom_cloak: {
        id: 'boss_phantom_cloak',
        name: '幻影斗篷',
        icon: '🌫️',
        description: '每回合开始获得 15 护甲，30%概率闪避攻击',
        rarity: 'boss',
        blockPerTurn: 15,
        bossId: 'boss_phantom'
    },
    // Boss 7: 泰坦巨像
    boss_titan_core: {
        id: 'boss_titan_core',
        name: '泰坦核心',
        icon: '⚙️',
        description: '最大 HP +50，每回合开始获得 8 护甲，攻击伤害 +5',
        rarity: 'boss',
        maxHpBonus: 50,
        blockPerTurn: 8,
        bossId: 'boss_titan'
    },
    // Boss 8: 虚空皇帝
    boss_void_throne: {
        id: 'boss_void_throne',
        name: '虚空王座',
        icon: '🪑',
        description: '战斗开始时对所有敌人施加 5 腐蚀 + 3 虚弱，每回合抽 6 张牌',
        rarity: 'boss',
        poisonAll: 5,
        weakAll: 3,
        drawPerTurn: 6,
        bossId: 'boss_void_emperor'
    },
    // Boss 9: 宇宙恐惧
    boss_cosmic_eye: {
        id: 'boss_cosmic_eye',
        name: '宇宙之眼',
        icon: '👁️',
        description: '每回合 +4 能量，每回合开始对所有敌人造成 8 伤害',
        rarity: 'boss',
        energyPerTurn: 4,
        damageAll: 8,
        bossId: 'boss_cosmic_horror'
    },
    // Boss 10: 终焉之神
    boss_divine_spark: {
        id: 'boss_divine_spark',
        name: '神性火花',
        icon: '✴️',
        description: '所有卡牌伤害 +8，护甲 +8，每回合 +5 能量，抽 8 张牌',
        rarity: 'boss',
        cardBonus: 8,
        energyPerTurn: 5,
        drawPerTurn: 8,
        bossId: 'boss_final_god'
    }
};

const Relics = {
    getAll() {
        return Object.values(RelicData);
    },

    getByRarity(rarity) {
        return Object.values(RelicData).filter(r => r.rarity === rarity);
    },

    getRandom(count = 1, exclude = []) {
        const pool = Object.values(RelicData).filter(r => 
            !exclude.includes(r.id) 
            && r.rarity !== 'elite' 
            && r.rarity !== 'boss'
        );
        return Utils.pickRandom(pool, count);
    },

    getElitePool(exclude = []) {
        const pool = Object.values(RelicData).filter(r => 
            r.rarity === 'elite' && !exclude.includes(r.id)
        );
        return Utils.pickRandom(pool, Math.min(1, pool.length));
    },

    getBossPool(exclude = [], bossId) {
        const pool = Object.values(RelicData).filter(r => 
            r.rarity === 'boss' && !exclude.includes(r.id) && (!bossId || r.bossId === bossId)
        );
        return Utils.pickRandom(pool, Math.min(1, pool.length));
    },

    onCombatStart(relics, combatState) {
        relics.forEach(r => {
            if (r.id === 'virus_program') {
                combatState.enemies.forEach(e => {
                    e.status.poison += 2;
                });
            }
            if (r.id === 'nano_shield_module') {
                combatState.playerBlock += 8;
            }
            if (r.id === 'gravity_well') {
                combatState.enemies.forEach(e => {
                    e.status.weak += 1;
                });
            }
            if (r.id === 'time_dilator') {
                combatState.firstTurnExtraDraw = 2;
            }
            if (r.id === 'phoenix_core') {
                combatState.phoenixUsed = false;
            }
            if (r.id === 'vampiric_module') {
                combatState.vampiricHealsThisTurn = 0;
            }
            // Elite relics
            if (r.id === 'elite_void_essence') {
                combatState.enemies.forEach(e => {
                    e.status.poison += 3;
                });
            }
            if (r.id === 'elite_time_crystal') {
                combatState.firstTurnExtraDraw = (combatState.firstTurnExtraDraw || 0) + 3;
            }
            // Boss relics
            if (r.id === 'boss_omega_matrix') {
                combatState.playerBlock += 10;
                combatState.enemies.forEach(e => {
                    Combat.dealDamageToEnemy(e, 5);
                });
            }
            if (r.id === 'boss_dragon_heart') {
                Game.state.player.maxHp += 30;
                Game.state.player.hp += 30;
            }
        });
    },

    onTurnStart(relics, combatState) {
        relics.forEach(r => {
            if (r.id === 'cooling_system') {
                combatState.playerBlock += 2;
            }
            if (r.id === 'shield_generator') {
                combatState.playerBlock += 3;
            }
            if (r.id === 'auto_turret' && combatState.enemies.length > 0) {
                const target = Utils.randomChoice(combatState.enemies);
                Combat.dealDamageToEnemy(target, 3);
            }
            if (r.id === 'plasma_reactor' && combatState.enemies.length > 0) {
                combatState.enemies.forEach(enemy => {
                    Combat.dealDamageToEnemy(enemy, 2);
                });
            }
            if (r.id === 'quantum_chip' && Math.random() < 0.2) {
                combatState.extraDraw = (combatState.extraDraw || 0) + 1;
            }
            if (r.id === 'time_dilator' && combatState.turn === 1 && combatState.firstTurnExtraDraw) {
                combatState.extraDraw = (combatState.extraDraw || 0) + combatState.firstTurnExtraDraw;
            }
            if (r.id === 'energy_amplifier') {
                combatState.firstCardDiscount = true;
            }
            if (r.id === 'vampiric_module') {
                combatState.vampiricHealsThisTurn = 0;
            }
            // Elite relics
            if (r.id === 'elite_core_fragment') {
                combatState.playerBlock += 4;
            }
            if (r.id === 'elite_hunter_mark') {
                combatState.firstAttackBonus = (combatState.firstAttackBonus || 0) + 8;
            }
            if (r.id === 'elite_time_crystal' && combatState.turn === 1 && combatState.firstTurnExtraDraw) {
                combatState.extraDraw = (combatState.extraDraw || 0) + combatState.firstTurnExtraDraw;
            }
            // Boss relics
            if (r.id === 'boss_omega_matrix') {
                combatState.playerBlock += 10;
                if (combatState.enemies.length > 0) {
                    combatState.enemies.forEach(e => {
                        Combat.dealDamageToEnemy(e, 5);
                    });
                }
            }
            if (r.id === 'boss_dragon_heart') {
                Game.state.player.hp = Math.min(Game.state.player.maxHp, Game.state.player.hp + 5);
            }
            if (r.id === 'boss_void_crown') {
                combatState.extraDraw = (combatState.extraDraw || 0) + 2;
            }
        });
    },

    onCombatEnd(relics, combatState) {
        relics.forEach(r => {
            if (r.id === 'nano_repair_module') {
                Game.state.player.hp = Math.min(
                    Game.state.player.maxHp,
                    Game.state.player.hp + 5
                );
            }
            if (r.id === 'data_crystal') {
                Game.state.player.gold += 5;
            }
            if (r.id === 'lucky_coin' && Math.random() < 0.3) {
                Game.state.player.gold += 15;
            }
        });
    },

    onCardPlayed(relics, card, combatState) {
        relics.forEach(r => {
            if (r.id === 'tactical_goggles' && card.type === 'attack' && !combatState.firstAttackUsed) {
                combatState.firstAttackBonus = 5;
                combatState.firstAttackUsed = true;
            }
            if (r.id === 'magnetic_gloves') {
                combatState.cardsPlayedThisTurn = (combatState.cardsPlayedThisTurn || 0) + 1;
                if (combatState.cardsPlayedThisTurn % 3 === 0) {
                    Combat.drawCards(1);
                }
            }
            if (r.id === 'berserker_chip' && card.type === 'attack') {
                if (Game.state.player.hp < Game.state.player.maxHp * 0.5) {
                    combatState.berserkerBonus = 3;
                }
            }
        });
    },

    onDamageDealt(relics, damage, combatState) {
        let healAmount = 0;
        relics.forEach(r => {
            if (r.id === 'vampiric_module') {
                if ((combatState.vampiricHealsThisTurn || 0) < 5) {
                    healAmount += 1;
                    combatState.vampiricHealsThisTurn = (combatState.vampiricHealsThisTurn || 0) + 1;
                }
            }
        });
        if (healAmount > 0) {
            Game.state.player.hp = Math.min(Game.state.player.maxHp, Game.state.player.hp + healAmount);
        }
    },

    onPlayerDamaged(relics, damage, combatState) {
        let reflectedDamage = 0;
        relics.forEach(r => {
            if (r.id === 'thorn_armor') {
                reflectedDamage += 3;
            }
            if (r.id === 'phoenix_core' && !combatState.phoenixUsed) {
                if (Game.state.player.hp <= 0) {
                    Game.state.player.hp = 20;
                    combatState.phoenixUsed = true;
                }
            }
        });
        return reflectedDamage;
    },

    getExtraEnergy(relics) {
        let extra = 0;
        relics.forEach(r => {
            if (r.id === 'energy_core') extra += 1;
            if (r.id === 'elite_core_fragment') extra += 1;
            if (r.id === 'boss_omega_matrix') extra += 2;
            if (r.id === 'boss_void_crown') extra += 3;
        });
        return extra;
    },

    getCardBonus(relics) {
        let bonus = 0;
        relics.forEach(r => {
            if (r.id === 'boss_nexus_shard') bonus += 5;
        });
        return bonus;
    }
};
