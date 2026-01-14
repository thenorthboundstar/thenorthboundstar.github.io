/* ===============================
   GLOBAL AUDIO CONTROLLER
================================ */

let currentAudio = null;
let currentTimerInterval = null;
let currentCard = null;

/* ===============================
   PLAY SONG
================================ */
function playSong(fileName, card) {

    // Stop previous song
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Reset previous timer
    if (currentTimerInterval && currentCard) {
        clearInterval(currentTimerInterval);
        currentCard.querySelector('.timer').innerText = '0:00';
    }

    // Create new audio
    currentAudio = new Audio(`assets/music/${fileName}`);
    currentAudio.loop = true;
    currentAudio.volume = 0.7;

    // Mobile-friendly play
    currentAudio.play().catch(() => {});

    currentCard = card;

    // Start timer
    const timerElement = card.querySelector('.timer');
    currentTimerInterval = setInterval(() => {
        const time = Math.floor(currentAudio.currentTime);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}
