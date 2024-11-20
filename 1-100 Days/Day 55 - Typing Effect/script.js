const dynamicText = document.querySelector("h1 span");
const words = ["Fun", "Love", "the World", "Life", "True Love"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChars;

    if (isDeleting) {
        // Deleting characters
        if (charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 100); // Backspace effect
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
            setTimeout(typeEffect, 500); // Delay before starting to type the next word
        }
    } else {
        // Typing characters
        if (charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100); // Typing effect
        } else {
            isDeleting = true;
            setTimeout(typeEffect, 1000); // Delay before starting to delete
        }
    }
};

typeEffect();
