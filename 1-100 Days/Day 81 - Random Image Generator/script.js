// List of image URLs
const imageList = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhr0pCvOx7EavkM2Tdkue8tVJZi7yrt8WlJg&s',
    'https://m.economictimes.com/thumb/height-450,width-600,imgsize-254162,msid-94010587/ai-generated-artworkwins-prize-in-art-competition-in-us.jpg',
    'https://www.ghacks.net/wp-content/uploads/2023/08/AI-generated-art-copyright.jpg',
    'https://neuroflash.com/wp-content/uploads/2022/11/ai-generated-images-new.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF3tXySIktj8NyIyBMqB788DqAgCYNHK7ebw&s',
];

// Get the button and image element
const generateBtn = document.getElementById('generateBtn');
const randomImage = document.getElementById('randomImage');

// Event listener for the button
generateBtn.addEventListener('click', () => {
    // Pick a random image from the list
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const selectedImage = imageList[randomIndex];

    // Update the image element's source
    randomImage.src = selectedImage;
});
