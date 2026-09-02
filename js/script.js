document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('ingredientsInput');
    const generateBtn = document.getElementById('generateBtn');
    const recipeContainer = document.getElementById('recipeContainer');
    const noRecipe = document.getElementById('noRecipe');
    const catalog = document.getElementById('recipeCatalog');
    const openCatalog = document.getElementById('openCatalog');
    const closeCatalog = document.getElementById('closeCatalog');
    const drinkButton = document.getElementById('drinkButton');

    const recipes = [
        {name:'Fresh Tomato Basil Omelette',difficulty:'Easy',time:'15 min',ingredients:['eggs','tomatoes','basil','mozzarella','olive oil','salt and pepper'],instructions:['Whisk the eggs with salt and pepper.','Heat olive oil in a pan over medium heat.','Add tomatoes and cook until softened.','Pour in the eggs and let them set.','Add basil and mozzarella, then fold.'],tip:'For extra flavor, add a pinch of red pepper flakes.'},
        {name:'Caprese Stuffed Tomatoes',difficulty:'Easy',time:'20 min',ingredients:['tomatoes','mozzarella','basil','olive oil','balsamic vinegar','garlic'],instructions:['Cut the tops off tomatoes and scoop out the seeds.','Chop mozzarella and basil.','Mix with olive oil and balsamic vinegar.','Stuff tomatoes and chill before serving.'],tip:'Use vine-ripened tomatoes for the best flavor.'},
        {name:'Tomato Basil Pasta',difficulty:'Medium',time:'25 min',ingredients:['pasta','tomatoes','basil','olive oil','garlic','red pepper flakes'],instructions:['Cook pasta according to the package directions.','Heat oil and gently cook garlic and pepper flakes.','Add tomatoes and simmer for 10 minutes.','Stir in basil and toss with pasta.'],tip:'A splash of pasta water helps the sauce cling to the pasta.'}
    ];

    const normalize = value => value.split(',').map(v => v.trim().toLowerCase()).filter(Boolean);

    function renderRecipe(recipe, available) {
        const items = recipe.ingredients.map(name => {
            const has = available.some(item => item === name || item.includes(name) || name.includes(item));
            return `<li class="${has ? 'has-ingredient' : 'missing-ingredient'}"><i class="fa-solid ${has ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> ${name}${has ? '' : ' · add to list'}</li>`;
        }).join('');
        const steps = recipe.instructions.map(step => `<li>${step}</li>`).join('');
        recipeContainer.innerHTML = `<div class="recipe-header"><h2 class="recipe-title">${recipe.name}</h2><span class="difficulty">${recipe.difficulty} · ${recipe.time}</span></div><div class="recipe-ingredients"><h3 class="instructions-title">Ingredients</h3><ul class="ingredient-list">${items}</ul></div><div class="recipe-instructions"><h3 class="instructions-title">How to make it</h3><ol class="instructions-list">${steps}</ol><div class="tip">✦ ${recipe.tip}</div></div>`;
        recipeContainer.style.display = 'block';
        noRecipe.style.display = 'none';
    }

    function generateRecipes() {
        const available = normalize(input.value);
        if (!available.length) { noRecipe.style.display = 'block'; recipeContainer.style.display = 'none'; return; }
        let best = null; let bestScore = 0;
        recipes.forEach(recipe => {
            const score = recipe.ingredients.reduce((sum, item) => sum + (available.some(v => v === item || v.includes(item) || item.includes(v)) ? 1 : 0), 0) / recipe.ingredients.length;
            if (score > bestScore) { bestScore = score; best = recipe; }
        });
        if (best && bestScore >= .5) renderRecipe(best, available);
        else { recipeContainer.style.display = 'none'; noRecipe.style.display = 'block'; }
    }

    function showCatalog() {
        catalog.classList.add('is-open');
        catalog.setAttribute('aria-hidden', 'false');
        catalog.scrollIntoView({behavior:'smooth', block:'start'});
        generateRecipes();
    }

    openCatalog.addEventListener('click', showCatalog);
    closeCatalog.addEventListener('click', () => { catalog.classList.remove('is-open'); catalog.setAttribute('aria-hidden', 'true'); });
    generateBtn.addEventListener('click', generateRecipes);
    input.addEventListener('keydown', event => { if (event.key === 'Enter') generateRecipes(); });
    drinkButton.addEventListener('click', () => { drinkButton.textContent = '✓'; drinkButton.setAttribute('aria-label','Drink special selected'); });

    document.querySelectorAll('.pill-nav a').forEach(link => link.addEventListener('click', () => {
        document.querySelectorAll('.pill-nav a').forEach(item => item.classList.remove('nav-active'));
        link.classList.add('nav-active');
    }));
});
