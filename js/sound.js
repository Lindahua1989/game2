const Sound = {
    ctx: null,
    enabled: true,
    volume: 0.3,

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
        return this.enabled;
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
