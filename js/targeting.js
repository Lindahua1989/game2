const Targeting = {
    svg: null,
    line: null,
    arrow: null,
    crosshair: null,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isTargeting: false,
    cardType: 'attack',
    lockedEnemy: null,
    mouseMoveHandler: null,

    init() {
        this.svg = document.getElementById('targeting-svg');
        this.mouseMoveHandler = this.onMouseMove.bind(this);
    },

    startTargeting(cardIndex, cardType) {
        this.isTargeting = true;
        this.cardType = cardType;
        this.lockedEnemy = null;

        const handArea = document.getElementById('hand-area');
        const cards = handArea.querySelectorAll('.card');
        const cardEl = cards[cardIndex];
        
        if (!cardEl) return;

        cardEl.classList.add('targeting-selected');
        if (cardType === 'skill') {
            cardEl.classList.add('skill-card');
        }

        const rect = cardEl.getBoundingClientRect();
        this.startX = rect.left + rect.width / 2;
        this.startY = rect.top;

        this.createLine();
        this.createArrow();

        document.addEventListener('mousemove', this.mouseMoveHandler);
    },

    stopTargeting() {
        this.isTargeting = false;
        this.lockedEnemy = null;

        document.removeEventListener('mousemove', this.mouseMoveHandler);

        if (this.line) {
            this.line.remove();
            this.line = null;
        }
        if (this.arrow) {
            this.arrow.remove();
            this.arrow = null;
        }
        if (this.crosshair) {
            this.crosshair.remove();
            this.crosshair = null;
        }

        const handArea = document.getElementById('hand-area');
        const cards = handArea.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('targeting-selected', 'skill-card');
        });

        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            enemy.classList.remove('target-highlight');
        });
    },

    createLine() {
        this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line.setAttribute('class', `targeting-line ${this.cardType}`);
        this.line.setAttribute('x1', this.startX);
        this.line.setAttribute('y1', this.startY);
        this.line.setAttribute('x2', this.startX);
        this.line.setAttribute('y2', this.startY);
        this.svg.appendChild(this.line);
    },

    createArrow() {
        this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        this.arrow.setAttribute('class', `targeting-arrow ${this.cardType}`);
        this.svg.appendChild(this.arrow);
    },

    createCrosshair(enemyEl) {
        if (this.crosshair) {
            this.crosshair.remove();
        }

        this.crosshair = document.createElement('div');
        this.crosshair.className = 'enemy-crosshair';
        
        const rect = enemyEl.getBoundingClientRect();
        this.crosshair.style.left = (rect.left + rect.width / 2 - 30) + 'px';
        this.crosshair.style.top = (rect.top + rect.height / 2 - 30) + 'px';
        
        document.body.appendChild(this.crosshair);
    },

    onMouseMove(e) {
        if (!this.isTargeting) return;

        this.endX = e.clientX;
        this.endY = e.clientY;

        this.updateLine();
        this.updateArrow();
        this.checkEnemyHover(e);
    },

    updateLine() {
        if (!this.line) return;

        this.line.setAttribute('x2', this.endX);
        this.line.setAttribute('y2', this.endY);
    },

    updateArrow() {
        if (!this.arrow) return;

        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;
        const angle = Math.atan2(dy, dx);
        const arrowSize = 12;

        const tipX = this.endX;
        const tipY = this.endY;
        
        const leftX = tipX - arrowSize * Math.cos(angle - Math.PI / 6);
        const leftY = tipY - arrowSize * Math.sin(angle - Math.PI / 6);
        
        const rightX = tipX - arrowSize * Math.cos(angle + Math.PI / 6);
        const rightY = tipY - arrowSize * Math.sin(angle + Math.PI / 6);

        const points = `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`;
        this.arrow.setAttribute('points', points);
    },

    checkEnemyHover(e) {
        const enemies = document.querySelectorAll('.enemy.targetable');
        let hoveredEnemy = null;

        enemies.forEach(enemy => {
            const rect = enemy.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                hoveredEnemy = enemy;
            }
            enemy.classList.remove('target-highlight');
        });

        if (hoveredEnemy) {
            hoveredEnemy.classList.add('target-highlight');
            this.lockedEnemy = hoveredEnemy;
            this.createCrosshair(hoveredEnemy);

            const rect = hoveredEnemy.getBoundingClientRect();
            this.endX = rect.left + rect.width / 2;
            this.endY = rect.top + rect.height / 2;
            
            this.updateLine();
            this.updateArrow();
            
            this.line.classList.add('locked');
        } else {
            this.lockedEnemy = null;
            if (this.crosshair) {
                this.crosshair.remove();
                this.crosshair = null;
            }
            if (this.line) {
                this.line.classList.remove('locked');
            }
        }
    },

    lockToEnemy(enemyEl) {
        const rect = enemyEl.getBoundingClientRect();
        this.endX = rect.left + rect.width / 2;
        this.endY = rect.top + rect.height / 2;
        
        this.updateLine();
        this.updateArrow();
        
        if (this.line) {
            this.line.classList.add('locked');
        }
        
        this.createCrosshair(enemyEl);
    },

    showBeamFlash(callback) {
        if (!this.line) {
            if (callback) callback();
            return;
        }

        const beam = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        beam.setAttribute('class', `targeting-beam ${this.cardType}`);
        beam.setAttribute('x1', this.startX);
        beam.setAttribute('y1', this.startY);
        beam.setAttribute('x2', this.endX);
        beam.setAttribute('y2', this.endY);
        this.svg.appendChild(beam);

        setTimeout(() => {
            beam.remove();
            this.stopTargeting();
            if (callback) callback();
        }, 300);
    },

    getLockedEnemyIndex() {
        if (!this.lockedEnemy) return -1;
        
        const enemies = document.querySelectorAll('.enemy');
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i] === this.lockedEnemy) {
                return i;
            }
        }
        return -1;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Targeting.init();
});
