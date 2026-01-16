/* ===============================
   TIC TAC TOE
================================ */
const cells = document.querySelectorAll('.cell');
let currentPlayer = '❌';
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent !== '' || gameOver) return;

        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';

        checkGameEnd();
    });
});

function checkGameEnd() {
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    combos.forEach(combo => {
        const [a,b,c] = combo;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameOver = true;
            revealDog();
        }
    });
}

/* ===============================
   DOG REVEAL
================================ */
function revealDog() {
    const dogReveal = document.getElementById('dog-reveal');
    dogReveal.innerHTML = '';

    const dogs = [
        'assets/dogpics/dog1.jpg',
        'assets/dogpics/dog2.jpg',
        'assets/dogpics/dog3.jpg'
    ];

    const img = document.createElement('img');
    img.src = dogs[Math.floor(Math.random() * dogs.length)];
    img.alt = 'Cute dog';

    dogReveal.appendChild(img);
}

/* ===============================
   CAKE CUT (DRAG TO CUT)
================================ */
const cake = document.getElementById('cake');
let cakeCut = false;
let startX = null;

cake.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

cake.addEventListener('touchmove', e => {
    if (cakeCut || startX === null) return;

    const currentX = e.touches[0].clientX;
    if (Math.abs(currentX - startX) > 60) {
        cutCake();
    }
});

cake.addEventListener('mousedown', e => {
    startX = e.clientX;
});

cake.addEventListener('mousemove', e => {
    if (cakeCut || startX === null) return;

    if (Math.abs(e.clientX - startX) > 60) {
        cutCake();
    }
});

cake.addEventListener('mouseup', () => {
    startX = null;
});

function cutCake() {
    cakeCut = true;
    cake.src = 'assets/icons/cakecut.png';
    cake.classList.add('cut');
}
