const CardLimits = {
    STORAGE_KEY: 'card_limits_settings',
    
    getLimits() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return this.getDefaultLimits();
    },
    
    getDefaultLimits() {
        const limits = {};
        Object.keys(CardData).forEach(cardId => {
            const card = CardData[cardId];
            limits[cardId] = card.maxCopies !== undefined ? card.maxCopies : 2;
        });
        return limits;
    },
    
    saveLimits(limits) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limits));
    },
    
    getCardLimit(cardId) {
        const limits = this.getLimits();
        return limits[cardId] !== undefined ? limits[cardId] : 2;
    },
    
    setCardLimit(cardId, maxCopies) {
        const limits = this.getLimits();
        limits[cardId] = maxCopies;
        this.saveLimits(limits);
    },
    
    showSettings() {
        const modal = document.createElement('div');
        modal.id = 'card-limits-modal';
        modal.className = 'modal';
        
        const limits = this.getLimits();
        const cards = Object.keys(CardData).map(id => ({
            id,
            ...CardData[id],
            currentLimit: limits[id] !== undefined ? limits[id] : 2
        }));
        
        // Group by type
        const attackCards = cards.filter(c => c.type === 'attack');
        const skillCards = cards.filter(c => c.type === 'skill');
        const powerCards = cards.filter(c => c.type === 'power');
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2>卡牌数量限制设置</h2>
                    <button class="btn btn-small" onclick="CardLimits.closeSettings()">关闭</button>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 20px; color: #aaa;">
                        设置每种卡牌在卡组中的最大数量。初始卡牌（激光射击、能量护盾、等离子炮）不受限制。
                    </p>
                    
                    <h3 style="color: #ff6b6b; margin: 20px 0 10px;">攻击牌 (${attackCards.length})</h3>
                    <div class="card-limits-grid">
                        ${attackCards.map(card => this.renderCardLimitItem(card)).join('')}
                    </div>
                    
                    <h3 style="color: #4dabf7; margin: 20px 0 10px;">技能牌 (${skillCards.length})</h3>
                    <div class="card-limits-grid">
                        ${skillCards.map(card => this.renderCardLimitItem(card)).join('')}
                    </div>
                    
                    <h3 style="color: #9775fa; margin: 20px 0 10px;">能力牌 (${powerCards.length})</h3>
                    <div class="card-limits-grid">
                        ${powerCards.map(card => this.renderCardLimitItem(card)).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="CardLimits.saveAllLimits()">保存设置</button>
                    <button class="btn btn-secondary" onclick="CardLimits.resetToDefault()">恢复默认</button>
                    <button class="btn btn-secondary" onclick="CardLimits.closeSettings()">关闭</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    },
    
    renderCardLimitItem(card) {
        const isInitial = ['laser_shot', 'energy_shield', 'plasma_cannon'].includes(card.id);
        const disabled = isInitial ? 'disabled' : '';
        const limitValue = isInitial ? '∞' : card.currentLimit;
        
        return `
            <div class="card-limit-item" data-card-id="${card.id}">
                <div class="card-limit-info">
                    <span class="card-icon">${card.icon}</span>
                    <span class="card-name">${card.name}</span>
                    ${card.rarity ? `<span class="card-rarity card-rarity-${card.rarity}">${card.rarity}</span>` : ''}
                </div>
                <div class="card-limit-control">
                    ${isInitial ? '<span style="color: #aaa;">无限</span>' : `
                        <button class="btn btn-small" onclick="CardLimits.decrementLimit('${card.id}')">-</button>
                        <span class="limit-value">${card.currentLimit}</span>
                        <button class="btn btn-small" onclick="CardLimits.incrementLimit('${card.id}')">+</button>
                    `}
                </div>
            </div>
        `;
    },
    
    incrementLimit(cardId) {
        const limits = this.getLimits();
        const current = limits[cardId] !== undefined ? limits[cardId] : 2;
        if (current < 10) {
            limits[cardId] = current + 1;
            this.saveLimits(limits);
            this.updateLimitDisplay(cardId, limits[cardId]);
        }
    },
    
    decrementLimit(cardId) {
        const limits = this.getLimits();
        const current = limits[cardId] !== undefined ? limits[cardId] : 2;
        if (current > 1) {
            limits[cardId] = current - 1;
            this.saveLimits(limits);
            this.updateLimitDisplay(cardId, limits[cardId]);
        }
    },
    
    updateLimitDisplay(cardId, value) {
        const item = document.querySelector(`[data-card-id="${cardId}"]`);
        if (item) {
            const limitValue = item.querySelector('.limit-value');
            if (limitValue) {
                limitValue.textContent = value;
            }
        }
    },
    
    saveAllLimits() {
        const limits = this.getLimits();
        this.saveLimits(limits);
        alert('设置已保存！');
    },
    
    resetToDefault() {
        if (confirm('确定要恢复默认设置吗？')) {
            const defaultLimits = this.getDefaultLimits();
            this.saveLimits(defaultLimits);
            this.closeSettings();
            this.showSettings();
        }
    },
    
    closeSettings() {
        const modal = document.getElementById('card-limits-modal');
        if (modal) {
            modal.remove();
        }
    }
};
