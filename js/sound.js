const Sound = {
    ctx: null,
    enabled: true,
    volume: 0.3,
    bgmEnabled: true,
    currentBGM: null,
    bgmNodes: [],

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    },

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopBGM();
        }
        return this.enabled;
    },

    toggleBGM() {
        this.bgmEnabled = !this.bgmEnabled;
        if (!this.bgmEnabled) {
            this.stopBGM();
        }
        return this.bgmEnabled;
    },

    play(type) {
        if (!this.enabled || !this.ctx) return;
        this.resume();

        switch (type) {
            case 'card_play': this.playCardSound(); break;
            case 'damage': this.playDamageSound(); break;
            case 'heal': this.playHealSound(); break;
            case 'enemy_attack': this.playEnemyAttackSound(); break;
            case 'victory': this.playVictorySound(); break;
            case 'defeat': this.playDefeatSound(); break;
            case 'click': this.playClickSound(); break;
            case 'hover': this.playHoverSound(); break;
            case 'draw': this.playDrawSound(); break;
            case 'block': this.playBlockSound(); break;
            case 'energy': this.playEnergySound(); break;
            case 'buff': this.playBuffSound(); break;
        }
    },

    createOscillator(freq, type = 'sine', duration = 0.1, volume = this.volume) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    playCardSound() {
        this.createOscillator(440, 'sine', 0.15, 0.2);
        setTimeout(() => this.createOscillator(660, 'sine', 0.1, 0.15), 50);
    },

    playDamageSound() {
        this.createOscillator(200, 'sawtooth', 0.2, 0.3);
        setTimeout(() => this.createOscillator(150, 'sawtooth', 0.15, 0.25), 30);
    },

    playHealSound() {
        this.createOscillator(523, 'sine', 0.2, 0.2);
        setTimeout(() => this.createOscillator(659, 'sine', 0.2, 0.2), 100);
        setTimeout(() => this.createOscillator(784, 'sine', 0.3, 0.2), 200);
    },

    playEnemyAttackSound() {
        this.createOscillator(100, 'sawtooth', 0.3, 0.4);
        setTimeout(() => this.createOscillator(80, 'sawtooth', 0.2, 0.3), 50);
    },

    playVictorySound() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => this.createOscillator(freq, 'sine', 0.4, 0.25), i * 150);
        });
    },

    playDefeatSound() {
        const notes = [400, 350, 300, 250];
        notes.forEach((freq, i) => {
            setTimeout(() => this.createOscillator(freq, 'sawtooth', 0.5, 0.3), i * 200);
        });
    },

    playClickSound() {
        this.createOscillator(800, 'sine', 0.05, 0.15);
    },

    playHoverSound() {
        this.createOscillator(600, 'sine', 0.03, 0.1);
    },

    playDrawSound() {
        this.createOscillator(500, 'sine', 0.08, 0.15);
        setTimeout(() => this.createOscillator(600, 'sine', 0.08, 0.15), 40);
    },

    playBlockSound() {
        this.createOscillator(300, 'square', 0.15, 0.2);
        setTimeout(() => this.createOscillator(350, 'square', 0.1, 0.15), 50);
    },

    playEnergySound() {
        this.createOscillator(440, 'sine', 0.1, 0.2);
        setTimeout(() => this.createOscillator(550, 'sine', 0.1, 0.2), 80);
        setTimeout(() => this.createOscillator(660, 'sine', 0.15, 0.2), 160);
    },

    playBuffSound() {
        this.createOscillator(600, 'triangle', 0.2, 0.2);
        setTimeout(() => this.createOscillator(750, 'triangle', 0.25, 0.2), 100);
    },

    stopBGM() {
        this.bgmNodes.forEach(node => {
            try {
                node.stop();
            } catch (e) {}
        });
        this.bgmNodes = [];
        this.currentBGM = null;
    },

    playBGM(type) {
        if (!this.enabled || !this.bgmEnabled || !this.ctx) return;
        if (this.currentBGM === type) return;
        
        this.stopBGM();
        this.currentBGM = type;
        this.resume();

        switch (type) {
            case 'title': this.playTitleBGM(); break;
            case 'map': this.playMapBGM(); break;
            case 'combat': this.playCombatBGM(); break;
        }
    },

    playTitleBGM() {
        const playLoop = () => {
            if (this.currentBGM !== 'title') return;
            
            const notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    if (this.currentBGM !== 'title') return;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
                    
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + 1.5);
                    
                    this.bgmNodes.push(osc);
                }, i * 800);
            });
            
            setTimeout(playLoop, 3200);
        };
        playLoop();
    },

    playMapBGM() {
        const playLoop = () => {
            if (this.currentBGM !== 'map') return;
            
            const notes = [196.00, 246.94, 293.66, 349.23, 293.66, 246.94];
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    if (this.currentBGM !== 'map') return;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
                    
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + 0.8);
                    
                    this.bgmNodes.push(osc);
                }, i * 400);
            });
            
            setTimeout(playLoop, 2400);
        };
        playLoop();
    },

    playCombatBGM() {
        const playLoop = () => {
            if (this.currentBGM !== 'combat') return;
            
            const bassNotes = [110, 110, 146.83, 130.81];
            bassNotes.forEach((freq, i) => {
                setTimeout(() => {
                    if (this.currentBGM !== 'combat') return;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    
                    osc.type = 'sawtooth';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
                    
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + 0.3);
                    
                    this.bgmNodes.push(osc);
                }, i * 250);
            });
            
            setTimeout(playLoop, 1000);
        };
        playLoop();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Sound.init();
    document.addEventListener('click', () => Sound.resume(), { once: true });
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn') && Sound.enabled) {
            Sound.play('click');
        }
    });
});
