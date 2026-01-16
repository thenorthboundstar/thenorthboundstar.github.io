/* =====================================
   MUSIC DATA
====================================== */

const songs = [
  { title: "Attention", file: "assets/music/attention.mp3", cover: "assets/herpics/her5.jpeg" },
  { title: "Blue", file: "assets/music/blue.mp3", cover: "assets/herpics/her6.jpeg" },
  { title: "Blue Hour", file: "assets/music/bluehour.mp3", cover: "assets/herpics/her7.jpeg" },
  { title: "Dandelions", file: "assets/music/dandelions.mp3", cover: "assets/herpics/her8.jpeg" },
  { title: "Golden Brown", file: "assets/music/goldenbrown.mp3", cover: "assets/herpics/her9.jpeg" },
  { title: "Golden Hour", file: "assets/music/goldenhour.mp3", cover: "assets/herpics/her10.jpeg" },
  { title: "Memories", file: "assets/music/memories.mp3", cover: "assets/herpics/her11.jpeg" },
  { title: "Parano", file: "assets/music/parano.mp3", cover: "assets/herpics/her12.jpeg" },
  { title: "Sweet But Psycho", file: "assets/music/sweetbutpsycho.mp3", cover: "assets/herpics/her13.jpeg" }
];

/* =====================================
   GLOBAL AUDIO STATE
====================================== */

let currentAudio = null;
let currentTimerInterval = null;

/* =====================================
   INIT MUSIC UI
====================================== */

window.addEventListener('load', () => {
  const grid = document.getElementById('musicGrid');

  songs.forEach((song, index) => {
    const card = document.createElement('div');
    card.className = 'music-card';

    card.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <p>${song.title}</p>
      <span class="timer" id="timer-${index}">0:00</span>
    `;

    card.addEventListener('click', () => playSong(index));
    grid.appendChild(card);
  });
});

/* =====================================
   PLAY SONG
====================================== */

function playSong(index) {
  // Stop previous song
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    clearInterval(currentTimerInterval);
  }

  currentAudio = new Audio(songs[index].file);
  currentAudio.loop = true;
  currentAudio.volume = 0.8;
  currentAudio.play();

  startTimer(index);
}

/* =====================================
   TIMER
====================================== */

function startTimer(index) {
  const timerEl = document.getElementById(`timer-${index}`);
  let seconds = 0;

  currentTimerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, 1000);
}

/* =====================================
   FADE OUT MUSIC (FINAL LETTER)
====================================== */

function fadeOutMusic(duration = 6000) {
  if (!currentAudio) return;

  const step = currentAudio.volume / (duration / 100);
  const fadeInterval = setInterval(() => {
    if (currentAudio.volume > step) {
      currentAudio.volume -= step;
    } else {
      currentAudio.volume = 0;
      currentAudio.pause();
      clearInterval(fadeInterval);
    }
  }, 100);
}
