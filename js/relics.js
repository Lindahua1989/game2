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
        description: '每回合 20% 概率多抽 1 张牌',
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
        const pool = Object.values(RelicData).filter(r => !exclude.includes(r.id));
        return Utils.pickRandom(pool, count);
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
        });
    },

    onTurnStart(relics, combatState) {
        relics.forEach(r => {
            if (r.id === 'cooling_system') {
                combatState.playerBlock += 2;
            }
            if (r.id === 'auto_turret' && combatState.enemies.length > 0) {
                const target = Utils.randomChoice(combatState.enemies);
                Combat.dealDamageToEnemy(target, 3);
            }
            if (r.id === 'quantum_chip' && Math.random() < 0.2) {
                combatState.extraDraw = (combatState.extraDraw || 0) + 1;
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
        });
    },

    getExtraEnergy(relics) {
        let extra = 0;
        relics.forEach(r => {
            if (r.id === 'energy_core') extra += 1;
        });
        return extra;
    }
};
