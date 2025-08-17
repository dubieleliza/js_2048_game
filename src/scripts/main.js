import { Game } from './modules/Game.class.js';

const game = new Game();
game.start();
updateUI();

document.addEventListener('keydown', e => {
    if (game.getStatus() !== 'playing') return;
    switch (e.key) {
        case 'ArrowLeft': game.moveLeft(); break;
        case 'ArrowRight': game.moveRight(); break;
        case 'ArrowUp': game.moveUp(); break;
        case 'ArrowDown': game.moveDown(); break;
    }
    updateUI();
});

function updateUI() {
    const boardEl = document.querySelector('#board');
    boardEl.innerHTML = '';
    game.getState().forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'row';
        row.forEach(cell => {
            const cellEl = document.createElement('div');
            cellEl.className = 'field-cell';
            if (cell > 0) cellEl.classList.add(`field-cell--${cell}`);
            cellEl.textContent = cell === 0 ? '' : cell;
            rowEl.appendChild(cellEl);
        });
        boardEl.appendChild(rowEl);
    });

    document.querySelector('#score').textContent = game.getScore();
    const statusEl = document.querySelector('#status');
    if (game.getStatus() === 'win') statusEl.textContent = 'You win!';
    else if (game.getStatus() === 'over') statusEl.textContent = 'Game over!';
    else statusEl.textContent = '';
}

document.querySelector('#restartBtn').addEventListener('click', () => {
    game.restart();
    updateUI();
});


