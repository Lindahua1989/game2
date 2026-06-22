const Map = {
    data: null,

    generate(floor) {
        const rows = 15;
        const nodesPerRow = 4;
        const map = [];

        for (let row = 0; row < rows; row++) {
            const rowNodes = [];
            const count = (row === 0 || row === rows - 1) ? 1 : Utils.randomInt(2, nodesPerRow);

            for (let i = 0; i < count; i++) {
                let type;
                if (row === 0) {
                    type = 'combat';
                } else if (row === rows - 1) {
                    type = 'boss';
                } else if (row === 7) {
                    type = Utils.randomChoice(['rest', 'shop']);
                } else if (row === 12) {
                    type = 'elite';
                } else {
                    type = this.getRandomNodeType(row);
                }

                rowNodes.push({
                    id: `${row}-${i}`,
                    row,
                    col: i,
                    type,
                    connections: [],
                    visited: false,
                    available: false
                });
            }
            map.push(rowNodes);
        }

        for (let row = 0; row < map.length - 1; row++) {
            const currentRow = map[row];
            const nextRow = map[row + 1];

            currentRow.forEach((node, idx) => {
                const minCol = Math.max(0, idx - 1);
                const maxCol = Math.min(nextRow.length - 1, idx + 1);

                for (let c = minCol; c <= maxCol; c++) {
                    node.connections.push(nextRow[c].id);
                }

                if (node.connections.length === 0) {
                    node.connections.push(nextRow[0].id);
                }
            });

            nextRow.forEach((node) => {
                const hasParent = currentRow.some(n => n.connections.includes(node.id));
                if (!hasParent) {
                    const parent = currentRow[currentRow.length - 1];
                    parent.connections.push(node.id);
                }
            });
        }

        map[0].forEach(n => { n.available = true; });

        this.data = map;
        return map;
    },

    getRandomNodeType(row) {
        if (row < 3) {
            return Utils.randomChoice(['combat', 'combat', 'combat', 'event']);
        }
        if (row < 6) {
            return Utils.randomChoice(['combat', 'combat', 'event', 'event', 'shop']);
        }
        if (row < 10) {
            return Utils.randomChoice(['combat', 'combat', 'event', 'rest', 'elite']);
        }
        return Utils.randomChoice(['combat', 'elite', 'rest', 'event']);
    },

    getNodeIcon(type) {
        switch (type) {
            case 'combat': return '⚔️';
            case 'elite': return '💀';
            case 'boss': return '👑';
            case 'event': return '❓';
            case 'shop': return '🏪';
            case 'rest': return '⛺';
            case 'treasure': return '📦';
            default: return '?';
        }
    },

    getNodeName(type) {
        switch (type) {
            case 'combat': return '战斗';
            case 'elite': return '精英';
            case 'boss': return 'Boss';
            case 'event': return '事件';
            case 'shop': return '商店';
            case 'rest': return '休息';
            case 'treasure': return '宝箱';
            default: return '未知';
        }
    },

    selectNode(nodeId) {
        const [row, col] = nodeId.split('-').map(Number);
        const node = this.data[row][col];

        if (!node.available || node.visited) return;

        this.data.forEach(row => row.forEach(n => { n.available = false; }));

        node.visited = true;

        node.connections.forEach(connId => {
            const [cr, cc] = connId.split('-').map(Number);
            if (this.data[cr] && this.data[cr][cc]) {
                this.data[cr][cc].available = true;
            }
        });

        Game.state.currentNode = node;
        Game.handleNodeEvent(node);
    },

    render() {
        const container = document.getElementById('map-container');
        container.innerHTML = '';

        if (!this.data) return;

        this.data.forEach((row, rowIdx) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'map-row';

            row.forEach(node => {
                const nodeDiv = document.createElement('div');
                nodeDiv.className = 'map-node';
                nodeDiv.setAttribute('data-node-id', node.id);

                if (node.type === 'boss') nodeDiv.classList.add('boss');
                if (node.visited) nodeDiv.classList.add('visited');
                if (node.available) nodeDiv.classList.add('available');
                if (!node.visited && !node.available) nodeDiv.classList.add('locked');

                if (Game.state.currentNode && Game.state.currentNode.id === node.id) {
                    nodeDiv.classList.add('current');
                }

                nodeDiv.textContent = this.getNodeIcon(node.type);
                nodeDiv.title = this.getNodeName(node.type);

                if (node.available) {
                    nodeDiv.onclick = () => this.selectNode(node.id);
                }

                rowDiv.appendChild(nodeDiv);
            });

            container.appendChild(rowDiv);
        });

        requestAnimationFrame(() => this.drawConnections());
    },

    drawConnections() {
        const container = document.getElementById('map-container');
        const oldSvg = container.querySelector('.map-lines');
        if (oldSvg) oldSvg.remove();

        const containerRect = container.getBoundingClientRect();
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('map-lines');
        svg.setAttribute('width', container.scrollWidth);
        svg.setAttribute('height', container.scrollHeight);
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '0';

        this.data.forEach(row => {
            row.forEach(node => {
                const fromEl = container.querySelector(`[data-node-id="${node.id}"]`);
                if (!fromEl) return;
                const fromRect = fromEl.getBoundingClientRect();
                const fromX = fromRect.left + fromRect.width / 2 - containerRect.left + container.scrollLeft;
                const fromY = fromRect.top + fromRect.height / 2 - containerRect.top + container.scrollTop;

                node.connections.forEach(connId => {
                    const toEl = container.querySelector(`[data-node-id="${connId}"]`);
                    if (!toEl) return;
                    const toRect = toEl.getBoundingClientRect();
                    const toX = toRect.left + toRect.width / 2 - containerRect.left + container.scrollLeft;
                    const toY = toRect.top + toRect.height / 2 - containerRect.top + container.scrollTop;

                    const [toRow] = connId.split('-').map(Number);
                    const toNode = this.data[toRow] && this.data[toRow].find(n => n.id === connId);

                    let lineClass = 'map-line-locked';
                    if (node.visited && toNode && toNode.visited) {
                        lineClass = 'map-line-visited';
                    } else if (node.visited && toNode && toNode.available) {
                        lineClass = 'map-line-available';
                    }

                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', fromX);
                    line.setAttribute('y1', fromY);
                    line.setAttribute('x2', toX);
                    line.setAttribute('y2', toY);
                    line.classList.add(lineClass);
                    svg.appendChild(line);
                });
            });
        });

        container.insertBefore(svg, container.firstChild);

        const currentEl = container.querySelector('.map-node.current') || container.querySelector('.map-node.available');
        if (currentEl) {
            currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};
