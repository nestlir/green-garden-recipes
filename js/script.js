document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const ingredientsInput = document.getElementById('ingredientsInput');
    const generateBtn = document.getElementById('generateBtn');
    const recipeContainer = document.getElementById('recipeContainer');
    const noRecipe = document.getElementById('noRecipe');
    
    // Sample recipes database
    const recipes = [
        {
            name: "Fresh Tomato Basil Omelette",
            difficulty: "Easy",
            time: "15 min",
            ingredients: [
                { name: "eggs", has: true },
                { name: "tomatoes", has: true },
                { name: "basil", has: true },
                { name: "mozzarella cheese", has: false },
                { name: "olive oil", has: true },
                { name: "salt and pepper", has: false }
            ],
            instructions: [
                "Whisk the eggs in a bowl with salt and pepper",
                "Heat olive oil in a non-stick pan over medium heat",
                "Add tomatoes and cook for 3 minutes until softened",
                "Pour in the eggs and let set for 1 minute",
                "Sprinkle with basil and mozzarella cheese",
                "Fold the omelette and cook for another 2 minutes",
                "Serve immediately while hot!"
            ],
            tip: "For extra flavor, add a pinch of red pepper flakes!"
        },
        {
            name: "Caprese Stuffed Tomatoes",
            difficulty: "Easy",
            time: "20 min",
            ingredients: [
                { name: "tomatoes", has: true },
                { name: "mozzarella cheese", has: false },
                { name: "basil", has: true },
                { name: "olive oil", has: true },
                { name: "balsamic vinegar", has: false },
                { name: "garlic", has: false }
            ],
            instructions: [
                "Cut tops off tomatoes and scoop out seeds",
                "Chop mozzarella and basil",
                "Mix mozzarella, basil, olive oil, and balsamic vinegar",
                "Stuff tomatoes with the mixture",
                "Chill for 10 minutes before serving"
            ],
            tip: "Use vine-ripened tomatoes for best flavor!"
        },
        {
            name: "Tomato Basil Pasta",
            difficulty: "Medium",
            time: "25 min",
            ingredients: [
                { name: "pasta", has: false },
                { name: "tomatoes", has: true },
                { name: "basil", has: true },
                { name: "olive oil", has: true },
                { name: "garlic", has: false },
                { name: "red pepper flakes", has: false }
            ],
            instructions: [
                "Cook pasta according to package directions",
                "Heat olive oil in a pan, add garlic and red pepper flakes",
                "Add chopped tomatoes and simmer for 10 minutes",
                "Stir in chopped basil",
                "Toss cooked pasta with tomato sauce"
            ],
            tip: "Add a splash of pasta water to the sauce to help it cling better!"
        }
    ];
    
    // Function to check which ingredients the user has
    function getAvailableIngredients(userInput) {
        if (!userInput.trim()) return [];
        
        // Split by commas and clean up
        return userInput.split(',')
            .map(ing => ing.trim().toLowerCase())
            .filter(ing => ing.length > 0);
    }
    
    // Function to calculate matching recipes
    function findMatchingRecipes(userIngredients) {
        return recipes.filter(recipe => {
            // Count how many ingredients the user has
            let matchCount = 0;
            recipe.ingredients.forEach(ing => {
                if (userIngredients.includes(ing.name.toLowerCase())) {
                    matchCount++;
                    ing.has = true;
                } else {
                    ing.has = false;
                }
            });
            
            // Only show recipes with at least 50% match
            return matchCount / recipe.ingredients.length >= 0.5;
        });
    }
    
    // Function to render a recipe
    function renderRecipe(recipe) {
        // Build ingredients list HTML
        let ingredientsHTML = '';
        recipe.ingredients.forEach(ing => {
            const statusClass = ing.has ? 'has-ingredient' : 'missing-ingredient';
            const icon = ing.has ? 'fa-check-circle' : 'fa-times-circle';
            ingredientsHTML += `
                <li class="${statusClass}">
                    <i class="fas ${icon}"></i> 
                    ${ing.name} ${!ing.has ? '(add to shopping list)' : ''}
                </li>
            `;
        });
        
        // Build instructions list HTML
        let instructionsHTML = '';
        recipe.instructions.forEach(step => {
            instructionsHTML += `<li>${step}</li>`;
        });
        
        // Update the recipe container
        recipeContainer.innerHTML = `
            <div class="recipe-header">
                <h2 class="recipe-title">${recipe.name}</h2>
                <span class="difficulty">${recipe.difficulty} • ${recipe.time}</span>
            </div>
            
            <div class="recipe-ingredients">
                <h3 class="instructions-title"><i class="fas fa-shopping-basket"></i> Ingredients</h3>
                <ul class="ingredient-list">
                    ${ingredientsHTML}
                </ul>
            </div>
            
            <div class="recipe-instructions">
                <h3 class="instructions-title"><i class="fas fa-book"></i> Instructions</h3>
                <ol class="instructions-list">
                    ${instructionsHTML}
                </ol>
                <div class="tip">
                    <i class="fas fa-lightbulb"></i> ${recipe.tip}
                </div>
            </div>
        `;
        
        // Show the recipe container
        recipeContainer.style.display = 'block';
        noRecipe.style.display = 'none';
    }
    
    // Main function to handle recipe generation
    function generateRecipes() {
        const userIngredients = getAvailableIngredients(ingredientsInput.value);
        
        if (userIngredients.length === 0) {
            alert('Please enter some ingredients!');
            return;
        }
        
        const matchingRecipes = findMatchingRecipes(userIngredients);
        
        if (matchingRecipes.length > 0) {
            // For simplicity, we'll show the first matching recipe
            renderRecipe(matchingRecipes[0]);
        } else {
            recipeContainer.style.display = 'none';
            noRecipe.style.display = 'block';
        }
    }
    
    // Event Listeners
    generateBtn.addEventListener('click', generateRecipes);
    
    // Allow Enter key to trigger generation
    ingredientsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateRecipes();
        }
    });
    
    // Initialize with sample recipe
    window.onload = function() {
        generateRecipes();
    };
});