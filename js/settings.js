const Settings = {
    data: {
        sfxVolume: 80,
        bgmVolume: 60,
        graphicsQuality: 'high',
        particlesEnabled: true,
        animationsEnabled: true,
        screenShakeEnabled: true,
        combatLogSize: 10,
        autoSave: true,
        showDamageNumbers: true
    },

    init() {
        this.load();
        this.apply();
    },

    load() {
        try {
            const saved = localStorage.getItem('game_settings');
            if (saved) {
                this.data = { ...this.data, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Failed to load settings:', e);
        }
    },

    save() {
        try {
            localStorage.setItem('game_settings', JSON.stringify(this.data));
        } catch (e) {
            console.warn('Failed to save settings:', e);
        }
    },

    apply() {
        if (typeof Sound !== 'undefined') {
            Sound.sfxVolume = this.data.sfxVolume / 100;
            Sound.bgmVolume = this.data.bgmVolume / 100;
        }
    },

    set(key, value) {
        this.data[key] = value;
        this.save();
        this.apply();
    },

    get(key) {
        return this.data[key];
    },

    reset() {
        this.data = {
            sfxVolume: 80,
            bgmVolume: 60,
            graphicsQuality: 'high',
            particlesEnabled: true,
            animationsEnabled: true,
            screenShakeEnabled: true,
            combatLogSize: 10,
            autoSave: true,
            showDamageNumbers: true
        };
        this.save();
        this.apply();
    },

    showSettingsModal() {
        const modal = document.getElementById('settings-modal');
        const content = document.getElementById('settings-content');
        
        content.innerHTML = `
            <h2>⚙️ 游戏设置</h2>
            
            <div class="settings-section">
                <h3>🔊 音频设置</h3>
                <div class="setting-item">
                    <label>音效音量</label>
                    <input type="range" min="0" max="100" value="${this.data.sfxVolume}" 
                           oninput="Settings.set('sfxVolume', parseInt(this.value)); document.getElementById('sfx-value').textContent = this.value + '%';">
                    <span id="sfx-value">${this.data.sfxVolume}%</span>
                </div>
                <div class="setting-item">
                    <label>背景音乐音量</label>
                    <input type="range" min="0" max="100" value="${this.data.bgmVolume}" 
                           oninput="Settings.set('bgmVolume', parseInt(this.value)); document.getElementById('bgm-value').textContent = this.value + '%';">
                    <span id="bgm-value">${this.data.bgmVolume}%</span>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>🎨 图形设置</h3>
                <div class="setting-item">
                    <label>画质</label>
                    <select onchange="Settings.set('graphicsQuality', this.value);">
                        <option value="low" ${this.data.graphicsQuality === 'low' ? 'selected' : ''}>低</option>
                        <option value="medium" ${this.data.graphicsQuality === 'medium' ? 'selected' : ''}>中</option>
                        <option value="high" ${this.data.graphicsQuality === 'high' ? 'selected' : ''}>高</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.data.particlesEnabled ? 'checked' : ''} 
                               onchange="Settings.set('particlesEnabled', this.checked);">
                        粒子效果
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.data.animationsEnabled ? 'checked' : ''} 
                               onchange="Settings.set('animationsEnabled', this.checked);">
                        动画效果
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.data.screenShakeEnabled ? 'checked' : ''} 
                               onchange="Settings.set('screenShakeEnabled', this.checked);">
                        屏幕震动
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.data.showDamageNumbers ? 'checked' : ''} 
                               onchange="Settings.set('showDamageNumbers', this.checked);">
                        显示伤害数字
                    </label>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>⚙️ 游戏设置</h3>
                <div class="setting-item">
                    <label>战斗日志显示条数</label>
                    <input type="number" min="5" max="20" value="${this.data.combatLogSize}" 
                           onchange="Settings.set('combatLogSize', parseInt(this.value));">
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.data.autoSave ? 'checked' : ''} 
                               onchange="Settings.set('autoSave', this.checked);">
                        自动存档
                    </label>
                </div>
                <div class="setting-item">
                    <button class="btn btn-secondary" onclick="CardLimits.showSettings()">🃏 卡牌数量限制设置</button>
                </div>
            </div>
            
            <div class="settings-buttons">
                <button class="btn btn-secondary" onclick="Settings.reset(); Settings.showSettingsModal();">恢复默认</button>
                <button class="btn btn-primary" onclick="Settings.closeSettingsModal()">关闭</button>
            </div>
        `;
        
        modal.classList.add('show');
    },

    closeSettingsModal() {
        const modal = document.getElementById('settings-modal');
        modal.classList.remove('show');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Settings.init();
});
