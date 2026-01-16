/* =====================================
   GALLERY – DRAG & PLACE
====================================== */

const galleryBoard = document.getElementById('galleryBoard');

const galleryImages = [
  "assets/herpics/her5.jpeg",
  "assets/herpics/her6.jpeg",
  "assets/herpics/her7.jpeg",
  "assets/herpics/her8.jpeg",
  "assets/herpics/her9.jpeg",
  "assets/herpics/her10.jpeg",
  "assets/herpics/her11.jpeg",
  "assets/herpics/her12.jpeg",
  "assets/herpics/her13.jpeg",
  "assets/herpics/her14.jpeg",
  "assets/herpics/her15.jpeg",
  "assets/herpics/her16.jpeg"
];

/* =====================================
   INIT GALLERY
====================================== */

function initGallery() {
  if (!galleryBoard) return;

  galleryBoard.innerHTML = "";

  const boardWidth = galleryBoard.offsetWidth;
  const boardHeight = galleryBoard.offsetHeight;

  galleryImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-item';

    img.style.left = Math.random() * (boardWidth - 150) + 'px';
    img.style.top = Math.random() * (boardHeight - 200) + 'px';
    img.style.zIndex = index + 1;

    makeDraggable(img);
    galleryBoard.appendChild(img);
  });
}

window.addEventListener('load', initGallery);

/* =====================================
   DRAG LOGIC
====================================== */

function makeDraggable(el) {
  let offsetX, offsetY, dragging = false;

  el.addEventListener('pointerdown', (e) => {
    dragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    el.style.zIndex = 999;
  });

  el.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    el.style.left = e.clientX - offsetX + 'px';
    el.style.top = e.clientY - offsetY + 'px';
  });

  el.addEventListener('pointerup', () => {
    dragging = false;
    el.style.cursor = 'grab';
  });
}
