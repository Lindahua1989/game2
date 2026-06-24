const Leaderboard = {
    storageKey: 'star_spire_leaderboard',

    getScores() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    },

    saveScores(scores) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(scores));
        } catch (e) {
            console.error('Failed to save leaderboard:', e);
        }
    },

    addScore(mode, score, playerName = '无名英雄') {
        const scores = this.getScores();
        if (!scores[mode]) {
            scores[mode] = [];
        }

        scores[mode].push({
            name: playerName,
            score: score,
            date: new Date().toISOString(),
            floor: Game.state ? Game.state.currentFloor : 0,
            battles: Game.state ? Game.state.stats.battlesWon : 0
        });

        scores[mode].sort((a, b) => b.score - a.score);
        scores[mode] = scores[mode].slice(0, 10);

        this.saveScores(scores);
    },

    getTopScores(mode, limit = 10) {
        const scores = this.getScores();
        return (scores[mode] || []).slice(0, limit);
    },

    getHighScore(mode) {
        const scores = this.getScores();
        const modeScores = scores[mode] || [];
        return modeScores.length > 0 ? modeScores[0].score : 0;
    },

    isHighScore(mode, score) {
        return score > this.getHighScore(mode);
    },

    showLeaderboard(mode = null) {
        const modal = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = '🏆 排行榜';

        let html = '<div class="leaderboard-container">';

        const modes = mode ? [mode] : Object.keys(GameModes.modes);

        modes.forEach(modeId => {
            const modeInfo = GameModes.modes[modeId];
            const scores = this.getTopScores(modeId, 5);

            html += `<div class="leaderboard-section">`;
            html += `<h3>${modeInfo.icon} ${modeInfo.name}</h3>`;

            if (scores.length === 0) {
                html += '<p class="no-scores">暂无记录</p>';
            } else {
                html += '<div class="score-list">';
                scores.forEach((score, index) => {
                    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
                    const date = new Date(score.date).toLocaleDateString('zh-CN');
                    html += `
                        <div class="score-item ${index < 3 ? 'top-three' : ''}">
                            <span class="rank">${medal}</span>
                            <span class="player-name">${score.name}</span>
                            <span class="score-value">${score.score.toLocaleString()}</span>
                            <span class="score-detail">第${score.floor}层 | ${score.battles}战</span>
                            <span class="score-date">${date}</span>
                        </div>
                    `;
                });
                html += '</div>';
            }

            html += `</div>`;
        });

        html += '</div>';
        modalBody.innerHTML = html;
        modal.classList.add('show');
    }
};
