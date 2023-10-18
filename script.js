function ToggleMenu() {
    const menu = document.querySelector('.menu_link')
    const icon = document.querySelector('.hamburger-icon')

    menu.classList.toggle('open')
    icon.classList.toggle('open')
}

const carousel = document.querySelector('.wrapper');
const arrowBtns = document.querySelectorAll('.skill-details-containers span');
const firstCardWidth = carousel.querySelector('.color-container').offsetWidth;

// Get references to the left and right buttons
const leftArrow = document.querySelector('#left');
const rightArrow = document.querySelector('#right');

let isDragging = false;
let startX, startScrollLeft;

// Function to show or hide the left and right arrows based on scroll position
const toggleArrowsVisibility = () => {
    // Calculate the remaining scroll width on the right side
    const remainingScroll = carousel.scrollWidth - carousel.offsetWidth - carousel.scrollLeft;

    // Set the threshold (e.g., 10 pixels) for showing the arrows
    const threshold = 10;

    if (carousel.scrollLeft > threshold) {
        leftArrow.style.opacity = 1; // Show the left arrow
    } else {
        leftArrow.style.opacity = 0; // Hide the left arrow
    }

    if (remainingScroll > threshold) {
        rightArrow.style.opacity = 1; // Show the right arrow
    } else {
        rightArrow.style.opacity = 0; // Hide the right arrow
        leftArrow.style.opacity = 1;
    }
};

// Added event listener for the arrow buttons to go from left to right
arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
        toggleArrowsVisibility();
    });
});

// Function to handle drag start
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

// Function to handle dragging
const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    toggleArrowsVisibility();
};

// Function to handle drag stop
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    toggleArrowsVisibility();
};

// Add event listeners
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);

// Add a scroll event listener to continuously update button visibility
carousel.addEventListener('scroll', toggleArrowsVisibility);

// Initial check for button visibility
toggleArrowsVisibility();
