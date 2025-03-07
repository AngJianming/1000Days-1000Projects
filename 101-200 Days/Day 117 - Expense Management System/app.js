console.log('about to fetch a rainbow')

fetch('rainbow.jpg').then(response => {
    console.log(response);
});