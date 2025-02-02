let isOpen = false;
let isDragging = false;
let startX, startY, initialX = 0, initialY = 0;

// Toggle letter visibility
function toggleLetter() {
    const envelope = document.querySelector('.envelope');
    const letterContainer = document.getElementById('letterContainer');

    isOpen = !isOpen;
    envelope.classList.toggle('open', isOpen);
    letterContainer.classList.toggle('visible', isOpen);

    if (!isOpen) {
        resetLetterPosition();
    }
}

// Reset letter position and size
function resetLetterPosition() {
    const paper = document.getElementById('letterPaper');
    paper.style.transform = `translate(0, 0)`;
    paper.classList.remove('expanded');
    paper.style.width = '280px';
    paper.style.height = '400px';
}

// Drag functionality
const letterPaper = document.getElementById('letterPaper');

letterPaper.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
    isDragging = true;
    letterPaper.classList.add('dragging');
    startX = e.clientX - initialX;
    startY = e.clientY - initialY;
}

function drag(e) {
    if (!isDragging) return;

    const x = e.clientX - startX;
    const y = e.clientY - startY;

    initialX = x;
    initialY = y;

    letterPaper.style.transform = `translate(${x}px, ${y}px)`;
}

function endDrag() {
    isDragging = false;
    letterPaper.classList.remove('dragging');
}

// Double-click to expand
letterPaper.addEventListener('dblclick', () => {
    letterPaper.classList.toggle('expanded');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (isOpen && !e.target.closest('.envelope') && !e.target.closest('.letter-container')) {
        toggleLetter();
    }
});

// Reset position on window resize
window.addEventListener('resize', () => {
    if (isOpen) {
        resetLetterPosition();
    }
});