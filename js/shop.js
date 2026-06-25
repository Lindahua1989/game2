const Shop = {
    generateShop(state) {
        const shopData = {
            cards: [],
            relics: [],
            services: [],
            purchased: new Set()
        };

        const pool = Cards.getRewardPool();
        const cardIds = Utils.pickRandom(pool, 3);
        cardIds.forEach(id => {
            const card = Cards.createCard(id);
            const price = card.cost >= 2 ? Utils.randomInt(100, 150) : Utils.randomInt(50, 100);
            shopData.cards.push({ card, price });
        });

        const ownedRelicIds = state.player.relics.map(r => r.id);
        const availableRelics = Relics.getRandom(2, ownedRelicIds);
        availableRelics.forEach(relic => {
            const price = relic.rarity === 'rare' ? Utils.randomInt(150, 200) : Utils.randomInt(100, 150);
            shopData.relics.push({ relic, price });
        });

        shopData.services.push({
            id: 'remove_card',
            name: '移除卡牌',
            icon: '🗑️',
            description: '从卡组中移除一张卡牌',
            price: 75
        });
        shopData.services.push({
            id: 'heal',
            name: '修复装甲',
            icon: '💚',
            description: '回复 20 HP',
            price: 50
        });

        return shopData;
    },

    buyCard(index, shopData, state) {
        const item = shopData.cards[index];
        if (!item || shopData.purchased.has('card_' + index)) return false;
        if (state.player.gold < item.price) return false;
        if (!Cards.canAddToDeck(state.player.deck, item.card)) return false;
        state.player.gold -= item.price;
        Cards.addToDeck(state.player.deck, item.card);
        shopData.purchased.add('card_' + index);
        return true;
    },

    buyRelic(index, shopData, state) {
        const item = shopData.relics[index];
        if (!item || shopData.purchased.has('relic_' + index)) return false;
        if (state.player.gold < item.price) return false;
        state.player.gold -= item.price;
        state.player.relics.push(item.relic);
        shopData.purchased.add('relic_' + index);
        return true;
    },

    buyService(serviceId, shopData, state) {
        const service = shopData.services.find(s => s.id === serviceId);
        if (!service || shopData.purchased.has('service_' + serviceId)) return false;
        if (state.player.gold < service.price) return false;

        if (serviceId === 'heal') {
            state.player.gold -= service.price;
            state.player.hp = Math.min(state.player.maxHp, state.player.hp + 20);
            shopData.purchased.add('service_' + serviceId);
            return true;
        }

        if (serviceId === 'remove_card') {
            state.player.gold -= service.price;
            shopData.purchased.add('service_' + serviceId);
            UI.showRemoveCard();
            return true;
        }

        return false;
    }
};
