
const characters = document.querySelectorAll('.characters span');

characters.forEach(character => {
    character.addEventListener('click', () => {
        character.classList.remove('active');  // .remove = Reset animation
        void character.offsetWidth;            // void click() .offsetWidth = Trigger reflow
        character.classList.add('active');     // .add = Restart animation
    });
});
