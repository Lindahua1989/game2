const Utils = {
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    },

    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    pickRandom(arr, count) {
        const shuffled = this.shuffle(arr);
        return shuffled.slice(0, count);
    }
};
