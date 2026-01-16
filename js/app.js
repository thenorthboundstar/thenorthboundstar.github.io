/* =====================================
   GLOBAL STATE
====================================== */
let currentSection = 0;
const sections = document.querySelectorAll('.section');

/* =====================================
   INITIAL LOAD
====================================== */
window.addEventListener('load', () => {
  sections[0].classList.add('active');
  spawnFloatingEmojis();
});

/* =====================================
   SECTION NAVIGATION
====================================== */
function goNext() {
  if (currentSection < sections.length - 1) {
    sections[currentSection].classList.remove('active');
    currentSection++;
    sections[currentSection].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* =====================================
   FLOATING EMOJIS SYSTEM
====================================== */
const emojiSet = ['💖', '✨', '🌸', '💫', '💕', '🦋'];

function spawnFloatingEmojis() {
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];

    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
    emoji.style.animationDuration = 8 + Math.random() * 6 + 's';

    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 15000);
  }, 700);
}

/* =====================================
   HEART EXPLOSION (LETTER OPEN)
====================================== */
function triggerHeartExplosion() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💖';

    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.setProperty('--x', `${Math.random() * 300 - 150}px`);
    heart.style.setProperty('--y', `${Math.random() * 300 - 150}px`);

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}

/* =====================================
   PETAL SHOWER (LETTER SEAL)
====================================== */
function startPetalShower() {
  const petals = ['🌸', '💮', '🌷'];
  const interval = setInterval(() => {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];

    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
    petal.style.animationDuration = 6 + Math.random() * 4 + 's';

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);
  }, 500);

  setTimeout(() => clearInterval(interval), 8000);
}

/* =====================================
   RESTART EXPERIENCE
====================================== */
function restartExperience() {
  document.querySelector('#finalMessage').classList.add('hidden');
  currentSection = 0;
  sections.forEach(sec => sec.classList.remove('active'));
  sections[0].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

