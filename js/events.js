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
                        state.player.deck.push(card);
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
                        state.player.deck.push(card);
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
                        card.upgraded = true;
                        card.name = card.name + '+';
                        if (card.damage) card.damage = Math.ceil(card.damage * 1.3);
                        if (card.block) card.block = Math.ceil(card.block * 1.3);
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
    }
];

const Events = {
    getRandom() {
        return Utils.randomChoice(EventData);
    }
};
