document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const ingredientsInput = document.getElementById('ingredients');
    const recipesContainer = document.getElementById('recipes');
    const errorMessage = document.getElementById('error-message');

    const APP_ID = 'YOUR_EDAMAM_APP_ID'; // Replace with your Edamam App ID
    const APP_KEY = 'YOUR_EDAMAM_APP_KEY'; // Replace with your Edamam App Key

    recipeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const ingredients = ingredientsInput.value.trim();
        if (ingredients === '') return;

        try {
            const response = await fetch(
                `https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`
            );

            if (!response.ok) {
                throw new Error('Error fetching recipes');
            }

            const data = await response.json();
            displayRecipes(data.hits);
        } catch (error) {
            showError(error.message);
        }
    });

    function displayRecipes(recipes) {
        errorMessage.classList.add('hidden');
        recipesContainer.innerHTML = '';

        if (recipes.length === 0) {
            showError('No recipes found.');
            return;
        }

        recipes.forEach(recipeData => {
            const recipe = recipeData.recipe;
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.label}">
                <div class="recipe-details">
                    <h3>${recipe.label}</h3>
                    <a href="${recipe.url}" target="_blank">View Recipe</a>
                </div>
            `;
            recipesContainer.appendChild(card);
        });
    }

    function showError(message) {
        recipesContainer.innerHTML = '';
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = message;
    }
});
