/* ===============================
   LETTER & ENVELOPE CONTROLLER
================================ */

const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

let letterOpen = false;

/* ===============================
   TOGGLE LETTER
================================ */
function toggleLetter() {

    // Play paper rustle
    const paper = new Audio('assets/soundeffects/paperrustle.aiff');
    paper.volume = 0.4;
    paper.play().catch(() => {});

    if (!letterOpen) {
        openLetter();
    } else {
        closeLetter();
    }
}

/* ===============================
   OPEN LETTER
================================ */
function openLetter() {
    letterOpen = true;

    envelope.classList.add('open');

    letter.classList.add('show');
    letter.style.display = 'block';

    // Smooth scroll into view (mobile friendly)
    setTimeout(() => {
        letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
}

/* ===============================
   CLOSE LETTER
================================ */
function closeLetter() {
    letterOpen = false;

    envelope.classList.remove('open');

    letter.classList.remove('show');

    // Delay hide so animation finishes
    setTimeout(() => {
        letter.style.display = 'none';
    }, 400);
}

/* ===============================
   SAFETY: ENSURE LETTER IS HIDDEN INITIALLY
================================ */
window.addEventListener('load', () => {
    letter.style.display = 'none';
});
