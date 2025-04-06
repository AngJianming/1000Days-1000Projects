// 1st method
const quotes = [
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
    { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" }
];

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    const randomQuote = getRandomQuote();
    quoteElement.textContent = randomQuote.quote;
    authorElement.textContent = `- ${randomQuote.author}`;
}

newQuoteButton.addEventListener('click', displayQuote);

// Show a quote as soon as the page loads!
displayQuote();

// there is 2 ways to make a random, the 1st is adding it yourself in the const quote variable and the 2nd is fetching if form an API such as Quotable, where you'll have to add your own api key for the demo purposed I'm just going to use the 1st method.

// 2nd method is use to fetch the API
/*
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');

async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const data = await response.json();
        quoteElement.textContent = data.content;
        authorElement.textContent = `- ${data.author}`;
    } catch (error) {
        quoteElement.textContent = "Oops, something went wrong.";
        authorElement.textContent = '';
        console.error("Error fetching quote:", error);
    }
}

newQuoteButton.addEventListener('click', fetchQuote);

// Load a random quote when the page loads
fetchQuote();

*/


