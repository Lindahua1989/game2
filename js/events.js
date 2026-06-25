const EventData = [
    {
        id: 'abandoned_lab',
        icon: '🧪',
        title: '废弃实验室',
        description: '你发现了一个被遗弃的实验室，里面似乎还有一些有用的东西...但也可能有危险。',
        choices: [
            {
                text: '🔍 搜索实验室',
                effect: (state) => {
                    if (Math.random() < 0.6) {
                        const pool = Cards.getRewardPool();
                        const cardId = Utils.randomChoice(pool);
                        const card = Cards.createCard(cardId);
                        Cards.addToDeck(state.player.deck, card);
                        return `找到了一张卡牌：${card.name}！`;
                    } else {
                        state.player.hp = Math.max(1, state.player.hp - 8);
                        return '触发了陷阱！受到 8 点伤害。';
                    }
                }
            },
            {
                text: '🚪 离开',
                effect: () => '你决定不冒险，继续前进。'
            }
        ]
    },
    {
        id: 'survivor_signal',
        icon: '📡',
        title: '幸存者信号',
        description: '你接收到一个微弱的求救信号，似乎有幸存者被困在附近。',
        choices: [
            {
                text: '🆘 前往救援',
                effect: (state) => {
                    const gold = Utils.randomInt(10, 20);
                    state.player.gold += gold;
                    return `成功救出幸存者！获得 ${gold} 金币作为感谢。`;
                }
            },
            {
                text: '📵 忽略信号',
                effect: () => '你没有时间停留，继续前进。'
            }
        ]
    },
    {
        id: 'system_malfunction',
        icon: '⚠️',
        title: '系统故障',
        description: '前方的通道发生了系统故障，电弧四溅。',
        choices: [
            {
                text: '🔧 修复（消耗 10 金币）',
                effect: (state) => {
                    if (state.player.gold >= 10) {
                        state.player.gold -= 10;
                        const relics = Relics.getRandom(1, state.player.relics.map(r => r.id));
                        if (relics.length > 0) {
                            state.player.relics.push(relics[0]);
                            return `修复成功！获得科技模块：${relics[0].name}`;
                        }
                        return '修复成功，但没有发现什么有用的东西。';
                    }
                    return '金币不足！';
                }
            },
            {
                text: '⚡ 强行通过',
                effect: (state) => {
                    state.player.hp = Math.max(1, state.player.hp - 5);
                    return '被电弧击中，受到 5 点伤害。';
                }
            }
        ]
    },
    {
        id: 'energy_node',
        icon: '🔋',
        title: '能量节点',
        description: '一个闪烁着蓝光的能量节点出现在你面前。',
        choices: [
            {
                text: '🔋 充能',
                effect: (state) => {
                    state.player.hp = Math.min(state.player.maxHp, state.player.hp + 15);
                    return '能量充盈，回复 15 HP。';
                }
            },
            {
                text: '⚡ 过载吸收',
                effect: (state) => {
                    state.player.maxHp -= 5;
                    state.player.hp = Math.min(state.player.maxHp, state.player.hp);
                    return '过载成功！最大 HP -5，但你感到力量涌动。';
                }
            }
        ]
    },
    {
        id: 'mysterious_merchant',
        icon: '🎭',
        title: '神秘商人',
        description: '一个戴着面具的神秘人出现在阴影中，手里拿着一张闪闪发光的卡牌。',
        choices: [
            {
                text: '💰 交易（30 金币）',
                effect: (state) => {
                    if (state.player.gold >= 30) {
                        state.player.gold -= 30;
                        const rareCards = Cards.getRewardPool().filter(id => {
                            const card = CardData[id];
                            return card.cost >= 2;
                        });
                        const cardId = Utils.randomChoice(rareCards);
                        const card = Cards.createCard(cardId);
                        Cards.addToDeck(state.player.deck, card);
                        return `获得稀有卡牌：${card.name}！`;
                    }
                    return '金币不足！商人消失在阴影中。';
                }
            },
            {
                text: '👋 拒绝',
                effect: () => '你婉拒了商人的提议。'
            }
        ]
    },
    {
        id: 'broken_robot',
        icon: '🤖',
        title: '损坏的机器人',
        description: '一个半毁的机器人躺在角落，它的核心模块还在微微发光。',
        choices: [
            {
                text: '🔧 修复（20 金币）',
                effect: (state) => {
                    if (state.player.gold >= 20) {
                        state.player.gold -= 20;
                        const relics = Relics.getRandom(1, state.player.relics.map(r => r.id));
                        if (relics.length > 0) {
                            state.player.relics.push(relics[0]);
                            return `修复成功！获得：${relics[0].name}`;
                        }
                        return '修复了但没发现有用的模块。';
                    }
                    return '金币不足！';
                }
            },
            {
                text: '🔨 拆解',
                effect: (state) => {
                    state.player.gold += 15;
                    return '拆解获得 15 金币。';
                }
            }
        ]
    },
    {
        id: 'data_terminal',
        icon: '💻',
        title: '数据终端',
        description: '一台还在运行的数据终端，屏幕上显示着大量加密数据。',
        choices: [
            {
                text: '📥 下载数据',
                effect: (state) => {
                    const upgradeable = state.player.deck.filter(c => !c.upgraded);
                    if (upgradeable.length > 0) {
                        const card = Utils.randomChoice(upgradeable);
                        Cards.upgradeCard(card);
                        return `数据解析完成！${card.name.replace('+', '')} 已升级！`;
                    }
                    return '没有可升级的卡牌。';
                }
            },
            {
                text: '🗑️ 删除数据',
                effect: (state) => {
                    if (state.player.deck.length > 5) {
                        const idx = Utils.randomInt(0, state.player.deck.length - 1);
                        const removed = state.player.deck.splice(idx, 1)[0];
                        return `删除了卡牌：${removed.name}`;
                    }
                    return '卡组太小，无法删除。';
                }
            }
        ]
    },
    {
        id: 'rift',
        icon: '🌀',
        title: '时空裂缝',
        description: '一道诡异的紫色裂缝出现在面前，里面传来嗡嗡声。',
        choices: [
            {
                text: '🌀 进入裂缝',
                effect: (state) => {
                    const roll = Math.random();
                    if (roll < 0.3) {
                        state.player.hp = Math.min(state.player.maxHp, state.player.hp + 20);
                        return '裂缝中的能量治愈了你！回复 20 HP。';
                    } else if (roll < 0.6) {
                        state.player.gold += 30;
                        return '发现了宝藏！获得 30 金币。';
                    } else {
                        state.player.hp = Math.max(1, state.player.hp - 10);
                        return '裂缝中冲出能量波！受到 10 点伤害。';
                    }
                }
            },
            {
                text: '🚶 绕路走',
                effect: () => '你决定不冒险，绕路前进。'
            }
        ]
    },
    {
        id: 'ancient_shrine',
        icon: '⛩️',
        title: '古老神殿',
        description: '一座被遗忘的古老神殿，祭坛上放着三件神器。',
        choices: [
            {
                text: '🗡️ 力量之刃',
                effect: (state) => {
                    const pool = Cards.getRewardPool().filter(id => CardData[id].type === 'attack');
                    if (pool.length > 0) {
                        const cardId = Utils.randomChoice(pool);
                        const card = Cards.createCard(cardId);
                        Cards.upgradeCard(card);
                        Cards.addToDeck(state.player.deck, card);
                        return `获得升级卡牌：${card.name}！`;
                    }
                    return '没有合适的卡牌。';
                }
            },
            {
                text: '🛡️ 守护之盾',
                effect: (state) => {
                    state.player.maxHp += 10;
                    state.player.hp += 10;
                    return '神殿的祝福！最大 HP +10，并回复 10 HP。';
                }
            },
            {
                text: '💰 财富之杯',
                effect: (state) => {
                    state.player.gold += 50;
                    return '杯中装满金币！获得 50 金币。';
                }
            }
        ]
    },
    {
        id: 'trapped_chest',
        icon: '📦',
        title: '可疑的宝箱',
        description: '一个华丽的宝箱出现在路边，但看起来有些可疑。',
        choices: [
            {
                text: '🔓 打开宝箱',
                effect: (state) => {
                    if (Math.random() < 0.7) {
                        const gold = Utils.randomInt(20, 40);
                        state.player.gold += gold;
                        return `宝箱里有 ${gold} 金币！`;
                    } else {
                        state.player.hp = Math.max(1, state.player.hp - 12);
                        return '宝箱是陷阱！受到 12 点伤害。';
                    }
                }
            },
            {
                text: '🚫 无视宝箱',
                effect: () => '你谨慎地绕过了宝箱。'
            }
        ]
    },
    {
        id: 'wandering_merchant',
        icon: '🧳',
        title: '流浪商人',
        description: '一个背着大包小包的商人向你招手。',
        choices: [
            {
                text: '💊 购买药水（15 金币）',
                effect: (state) => {
                    if (state.player.gold >= 15) {
                        state.player.gold -= 15;
                        state.player.hp = Math.min(state.player.maxHp, state.player.hp + 25);
                        return '购买成功！回复 25 HP。';
                    }
                    return '金币不足！';
                }
            },
            {
                text: '🎲 赌博游戏（10 金币）',
                effect: (state) => {
                    if (state.player.gold >= 10) {
                        state.player.gold -= 10;
                        if (Math.random() < 0.5) {
                            state.player.gold += 30;
                            return '运气不错！赢得 30 金币。';
                        } else {
                            return '运气不佳，输掉了 10 金币。';
                        }
                    }
                    return '金币不足！';
                }
            },
            {
                text: '👋 离开',
                effect: () => '你继续前进。'
            }
        ]
    },
    {
        id: 'corrupted_ai',
        icon: '🤖',
        title: '失控的AI',
        description: '一个AI核心正在发出混乱的信号，似乎需要帮助。',
        choices: [
            {
                text: '🔧 尝试修复',
                effect: (state) => {
                    if (Math.random() < 0.6) {
                        const relics = Relics.getRandom(1, state.player.relics.map(r => r.id));
                        if (relics.length > 0) {
                            state.player.relics.push(relics[0]);
                            return `修复成功！AI赠予你：${relics[0].name}`;
                        }
                        return '修复成功，但AI没有多余的东西给你。';
                    } else {
                        state.player.hp = Math.max(1, state.player.hp - 8);
                        return '修复失败！AI暴走，受到 8 点伤害。';
                    }
                }
            },
            {
                text: '💥 摧毁它',
                effect: (state) => {
                    state.player.gold += 20;
                    return '摧毁AI核心，获得 20 金币。';
                }
            }
        ]
    },
    {
        id: 'training_ground',
        icon: '🎯',
        title: '训练场',
        description: '一个废弃的训练场，可以用来提升技能。',
        choices: [
            {
                text: '⚔️ 攻击训练',
                effect: (state) => {
                    const attackCards = state.player.deck.filter(c => c.type === 'attack' && !c.upgraded);
                    if (attackCards.length > 0) {
                        const card = Utils.randomChoice(attackCards);
                        Cards.upgradeCard(card);
                        return `训练完成！${card.name.replace('+', '')} 已升级！`;
                    }
                    return '没有可升级的攻击卡牌。';
                }
            },
            {
                text: '🛡️ 防御训练',
                effect: (state) => {
                    const skillCards = state.player.deck.filter(c => c.type === 'skill' && !c.upgraded);
                    if (skillCards.length > 0) {
                        const card = Utils.randomChoice(skillCards);
                        Cards.upgradeCard(card);
                        return `训练完成！${card.name.replace('+', '')} 已升级！`;
                    }
                    return '没有可升级的技能卡牌。';
                }
            },
            {
                text: '🚪 离开',
                effect: () => '你决定继续前进。'
            }
        ]
    },
    {
        id: 'quantum_anomaly',
        icon: '✨',
        title: '量子异常',
        description: '空间中出现了一个闪烁的量子异常点。',
        choices: [
            {
                text: '🔬 研究异常',
                effect: (state) => {
                    const roll = Math.random();
                    if (roll < 0.4) {
                        state.player.maxHp += 5;
                        state.player.hp += 5;
                        return '研究成功！最大 HP +5。';
                    } else if (roll < 0.7) {
                        state.player.gold += 25;
                        return '从异常中提取能量，获得 25 金币。';
                    } else {
                        state.player.hp = Math.max(1, state.player.hp - 6);
                        return '异常不稳定！受到 6 点伤害。';
                    }
                }
            },
            {
                text: '⚡ 吸收能量',
                effect: (state) => {
                    state.player.hp = Math.max(1, state.player.hp - 5);
                    const pool = Cards.getRewardPool();
                    const cardId = Utils.randomChoice(pool);
                    const card = Cards.createCard(cardId);
                    Cards.addToDeck(state.player.deck, card);
                    return `吸收能量（受到 5 伤害），获得卡牌：${card.name}`;
                }
            }
        ]
    },
    {
        id: 'abandoned_ship',
        icon: '🚀',
        title: '废弃飞船',
        description: '一艘废弃的飞船漂浮在太空中，可能还有物资。',
        choices: [
            {
                text: '🔍 搜索货舱',
                effect: (state) => {
                    const gold = Utils.randomInt(15, 35);
                    state.player.gold += gold;
                    return `在货舱找到 ${gold} 金币！`;
                }
            },
            {
                text: '🔧 拆卸零件',
                effect: (state) => {
                    const relics = Relics.getRandom(1, state.player.relics.map(r => r.id));
                    if (relics.length > 0) {
                        state.player.relics.push(relics[0]);
                        return `拆卸成功！获得：${relics[0].name}`;
                    }
                    return '没有找到有用的零件。';
                }
            },
            {
                text: '🚪 离开',
                effect: () => '你决定不冒险。'
            }
        ]
    },
    {
        id: 'healing_spring',
        icon: '💧',
        title: '治愈之泉',
        description: '一个散发着柔和光芒的治愈之泉。',
        choices: [
            {
                text: '💧 饮用泉水',
                effect: (state) => {
                    state.player.hp = Math.min(state.player.maxHp, state.player.hp + 30);
                    return '泉水治愈了你的伤口！回复 30 HP。';
                }
            },
            {
                text: '🍶 装瓶带走',
                effect: (state) => {
                    state.player.hp = Math.min(state.player.maxHp, state.player.hp + 15);
                    state.player.maxHp += 3;
                    return '装瓶带走！回复 15 HP，最大 HP +3。';
                }
            }
        ]
    },
    {
        id: 'card_forge',
        icon: '🔨',
        title: '卡牌锻造炉',
        description: '一个古老的卡牌锻造炉，可以将普通卡牌转化为强力卡牌。',
        choices: [
            {
                text: '🔨 锻造卡牌（25 金币）',
                effect: (state) => {
                    if (state.player.gold >= 25) {
                        state.player.gold -= 25;
                        const upgradeable = state.player.deck.filter(c => !c.upgraded);
                        if (upgradeable.length > 0) {
                            const card = Utils.randomChoice(upgradeable);
                            Cards.upgradeCard(card);
                            return `锻造成功！${card.name.replace('+', '')} 已升级！`;
                        }
                        return '没有可锻造的卡牌。';
                    }
                    return '金币不足！';
                }
            },
            {
                text: '🚪 离开',
                effect: () => '你决定继续前进。'
            }
        ]
    },
    {
        id: 'mysterious_portal',
        icon: '🌌',
        title: '神秘传送门',
        description: '一个闪烁着星光的传送门出现在面前。',
        choices: [
            {
                text: '🌌 进入传送门',
                effect: (state) => {
                    const roll = Math.random();
                    if (roll < 0.25) {
                        state.player.hp = state.player.maxHp;
                        return '传送门治愈了你！HP 完全恢复。';
                    } else if (roll < 0.5) {
                        state.player.gold += 40;
                        return '传送门通向宝藏！获得 40 金币。';
                    } else if (roll < 0.75) {
                        const pool = Cards.getRewardPool();
                        const cardId = Utils.randomChoice(pool);
                        const card = Cards.createCard(cardId);
                        Cards.upgradeCard(card);
                        Cards.addToDeck(state.player.deck, card);
                        return `传送门赠予你：${card.name}！`;
                    } else {
                        state.player.hp = Math.max(1, state.player.hp - 15);
                        return '传送门不稳定！受到 15 点伤害。';
                    }
                }
            },
            {
                text: '🚶 绕道而行',
                effect: () => '你谨慎地绕过了传送门。'
            }
        ]
    }
];

const Events = {
    getRandom() {
        return Utils.randomChoice(EventData);
    }
};
