const Particles = {
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
    }
};
