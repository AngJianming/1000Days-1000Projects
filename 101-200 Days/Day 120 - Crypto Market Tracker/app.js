const cryptoContainer = document.getElementById('crypto-container');
const searchInput = document.getElementById('search-input');
const currencySelect = document.getElementById('currency-select');
const toggleModeBtn = document.getElementById('toggle-mode');
const errorMessageDiv = document.getElementById('error-message');

let cryptoData = [];

// Fetch crypto data from CoinGecko API with error handling
async function fetchCryptoData() {
    const currency = currencySelect.value;
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('API response not ok');
        }
        const data = await response.json();
        cryptoData = data;
        displayCryptos(cryptoData);
        errorMessageDiv.textContent = '';
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        errorMessageDiv.textContent = 'Error fetching data. Please try again later.';
    }
}

// Display crypto cards based on data and search filter
function displayCryptos(data) {
    cryptoContainer.innerHTML = '';

    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(
        coin =>
            coin.name.toLowerCase().includes(searchTerm) ||
            coin.symbol.toLowerCase().includes(searchTerm)
    );

    filteredData.forEach(coin => {
        const card = document.createElement('div');
        card.classList.add('crypto-card');

        const priceChangeClass =
            coin.price_change_percentage_24h >= 0 ? 'green' : 'red';

        card.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}" width="50">
      <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
      <p>Price: ${currencySelect.value.toUpperCase()} ${coin.current_price.toFixed(2)}</p>
      <p class="${priceChangeClass}">24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
    `;
        cryptoContainer.appendChild(card);
    });
}

// Event listeners for interactive features
searchInput.addEventListener('input', () => {
    displayCryptos(cryptoData);
});

currencySelect.addEventListener('change', () => {
    fetchCryptoData();
});

toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
});

// Initial fetch and update every 30 seconds
fetchCryptoData();
setInterval(fetchCryptoData, 30000);
