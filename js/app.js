/* ===============================
   SCREEN NAVIGATION
================================ */
const screens = document.querySelectorAll('.screen');
let currentScreen = 0;

function nextScreen() {
    screens[currentScreen].classList.remove('active');
    currentScreen++;
    if (currentScreen < screens.length) {
        screens[currentScreen].classList.add('active');
        window.scrollTo(0, 0);
    }
}

/* ===============================
   FLOATING EMOJIS SYSTEM
   - Random positions
   - Random directions
   - No overlap clustering
================================ */
const emojiLayer = document.getElementById('emoji-layer');
const emojiList = ['❤️','💖','✨','🥰','🌸','💫','💝','💗'];

function spawnEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('floating-emoji');
    emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];

    const startX = Math.random() * window.innerWidth;
    const driftX = (Math.random() * 200 - 100) + 'px';

    emoji.style.left = startX + 'px';
    emoji.style.setProperty('--x', driftX);
    emoji.style.animationDuration = (10 + Math.random() * 8) + 's';

    emojiLayer.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 18000);
}

// Spawn emojis gradually
setInterval(spawnEmoji, 900);

/* ===============================
   FLIP CARD INTERACTION
================================ */
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});
