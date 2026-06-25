const Particles = {
    ambientInterval: null,

    spawn(element, type, count = 8) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle particle-${type} particle-animate`;
            
            const size = 4 + Math.random() * 8;
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const distance = 30 + Math.random() * 60;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const duration = 0.4 + Math.random() * 0.4;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${centerX - size / 2}px;
                top: ${centerY - size / 2}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
                --duration: ${duration}s;
            `;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        }
    },

    spawnAt(x, y, type, count = 8) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle particle-${type} particle-animate`;
            
            const size = 4 + Math.random() * 8;
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const distance = 30 + Math.random() * 60;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const duration = 0.4 + Math.random() * 0.4;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x - size / 2}px;
                top: ${y - size / 2}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
                --duration: ${duration}s;
            `;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        }
    },

    startAmbient(containerId = 'screen-combat') {
        this.stopAmbient();
        const container = document.getElementById(containerId);
        if (!container) return;

        this.ambientInterval = setInterval(() => {
            if (!document.getElementById(containerId) || !document.getElementById(containerId).classList.contains('active')) {
                this.stopAmbient();
                return;
            }

            const particle = document.createElement('div');
            particle.className = 'ambient-particle';
            
            const size = 2 + Math.random() * 3;
            const x = Math.random() * 100;
            const duration = 4 + Math.random() * 6;
            const drift = (Math.random() - 0.5) * 100;
            const opacity = 0.2 + Math.random() * 0.4;
            const colors = ['rgba(0, 212, 255, 0.6)', 'rgba(180, 74, 255, 0.5)', 'rgba(255, 255, 255, 0.4)'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                bottom: -10px;
                background: ${color};
                --drift: ${drift}px;
                --opacity: ${opacity};
                animation-duration: ${duration}s;
            `;

            container.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        }, 500);
    },

    stopAmbient() {
        if (this.ambientInterval) {
            clearInterval(this.ambientInterval);
            this.ambientInterval = null;
        }
        document.querySelectorAll('.ambient-particle').forEach(p => p.remove());
    }
};
