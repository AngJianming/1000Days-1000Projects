const track = document.getElementById('carousel-track');
const slides = Array.from(track.children);

const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');
const dotsNav = document.getElementById('dots');

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentSlide;

// Set up the carousel
function setupCarousel() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });

    updateCarousel();
    createDots();
}

// Update carousel to show current, prev, and next slides
function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove('current', 'prev', 'next');
        if (index === currentIndex) {
            slide.classList.add('current');
        } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        } else if (index === (currentIndex + 1) % slides.length) {
            slide.classList.add('next');
        }
        slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });

    updateDots();
}

// Move to next slide
function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

// Move to previous slide
function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Create dots for indicators
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsNav.appendChild(dot);
    });
}

// Update dots to reflect current slide
function updateDots() {
    const dots = Array.from(dotsNav.children);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Touch and mouse events for dragging/swiping
slides.forEach((slide, index) => {
    const image = slide.querySelector('img');
    // Disable default image drag
    image.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    // Mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mousemove', touchMove);
    slide.addEventListener('mouseleave', touchEnd);
});

function touchStart(index) {
    return function (event) {
        currentSlide = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        track.classList.add('grabbing');
    };
}

function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
        moveToNextSlide();
    } else if (movedBy > 100) {
        moveToPrevSlide();
    } else {
        setPositionByIndex();
    }

    track.classList.remove('grabbing');
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = prevTranslate = -currentIndex * track.clientWidth;
    track.style.transform = `translateX(${currentTranslate}px)`;
}

// Update carousel on window resize
window.addEventListener('resize', () => {
    setPositionByIndex();
});

// Initialize the carousel
setupCarousel();
