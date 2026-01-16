/* ===============================
   DRAGGABLE PUZZLE GALLERY
================================ */

const galleryBoard = document.getElementById('gallery-board');

const galleryImages = [
    'assets/herpics/her11.jpeg',
    'assets/herpics/her12.jpeg',
    'assets/herpics/her13.jpeg',
    'assets/herpics/her14.jpeg',
    'assets/herpics/her15.jpeg',
    'assets/herpics/her16.jpeg',
    'assets/herpics/her17.jpeg',
    'assets/herpics/her18.jpeg',
    'assets/herpics/her19.jpeg'
];

const placedImages = [];

/* ===============================
   INITIALIZE GALLERY
================================ */
function initGallery() {

    const boardRect = galleryBoard.getBoundingClientRect();
    const cols = 3;
    const rows = Math.ceil(galleryImages.length / cols);
    const pieceWidth = boardRect.width / cols;
    const pieceHeight = boardRect.height / rows;

    galleryImages.forEach((src, index) => {

        const img = document.createElement('img');
        img.src = src;
        img.classList.add('puzzle-piece');

        // Correct position
        const correctX = (index % cols) * pieceWidth;
        const correctY = Math.floor(index / cols) * pieceHeight;

        img.dataset.correctX = correctX;
        img.dataset.correctY = correctY;

        // Random start position
        img.style.left = Math.random() * (boardRect.width - pieceWidth) + 'px';
        img.style.top = Math.random() * (boardRect.height - pieceHeight) + 'px';

        img.style.width = pieceWidth - 10 + 'px';
        img.style.height = pieceHeight - 10 + 'px';

        makeDraggable(img);

        galleryBoard.appendChild(img);
    });
}

/* ===============================
   DRAG LOGIC
================================ */
function makeDraggable(element) {

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        element.style.zIndex = 10;

        const rect = element.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function drag(e) {
        if (!isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        element.style.left = clientX - offsetX - galleryBoard.offsetLeft + 'px';
        element.style.top = clientY - offsetY - galleryBoard.offsetTop + 'px';
    }

    function stopDrag() {
        isDragging = false;
        element.style.zIndex = 1;

        snapIfClose(element);

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
}

/* ===============================
   SNAP INTO PLACE
================================ */
function snapIfClose(piece) {

    const tolerance = 30;

    const currentX = parseFloat(piece.style.left);
    const currentY = parseFloat(piece.style.top);
    const correctX = parseFloat(piece.dataset.correctX);
    const correctY = parseFloat(piece.dataset.correctY);

    if (
        Math.abs(currentX - correctX) < tolerance &&
        Math.abs(currentY - correctY) < tolerance
    ) {
        piece.style.left = correctX + 'px';
        piece.style.top = correctY + 'px';
        piece.style.pointerEvents = 'none';
        piece.style.boxShadow = '0 0 0 transparent';

        placedImages.push(piece);

        // Soft chime
        const chime = new Audio('assets/soundeffects/chime.wav');
        chime.volume = 0.4;
        chime.play();
    }
}

/* ===============================
   START
================================ */
window.addEventListener('load', initGallery);

