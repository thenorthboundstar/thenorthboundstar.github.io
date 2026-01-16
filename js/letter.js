/* =====================================
   LETTER STATE
====================================== */

const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const finalMessage = document.getElementById('finalMessage');

let letterOpen = false;
let letterSealed = false;

/* =====================================
   TOGGLE LETTER
====================================== */

function toggleLetter() {
  if (letterSealed) return;

  const paper = new Audio('assets/soundeffects/paperrustle.aiff');
  paper.volume = 0.4;
  paper.play().catch(() => {});

  if (!letterOpen) {
    openLetter();
  } else {
    closeLetter();
  }
}

/* =====================================
   OPEN LETTER
====================================== */

function openLetter() {
  letterOpen = true;

  envelope.classList.add('open');
  letter.classList.add('show');
  letter.style.display = 'block';

  // Heart explosion
  triggerHeartExplosion();

  setTimeout(() => {
    letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}

/* =====================================
   CLOSE LETTER (WITHOUT SEALING)
====================================== */

function closeLetter() {
  letterOpen = false;

  envelope.classList.remove('open');
  letter.classList.remove('show');

  setTimeout(() => {
    letter.style.display = 'none';
  }, 400);
}

/* =====================================
   SEAL LETTER (FINAL RITUAL)
====================================== */

function sealLetter() {
  if (letterSealed) return;

  letterSealed = true;

  // Close letter
  closeLetter();

  // Start petals
  startPetalShower();

  // Fade music
  fadeOutMusic(6000);

  // Show final message
  setTimeout(() => {
    finalMessage.classList.remove('hidden');
    finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 3000);
}

/* =====================================
   SAFETY: INITIAL STATE
====================================== */

window.addEventListener('load', () => {
  letter.style.display = 'none';
  finalMessage.classList.add('hidden');
});
