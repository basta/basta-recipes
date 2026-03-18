const app = document.getElementById('app');
let recipesCache = null;

async function fetchRecipes() {
    if (recipesCache) return recipesCache;
    const response = await fetch('recipes.json');
    recipesCache = await response.json();
    return recipesCache;
}

async function renderList() {
    app.innerHTML = '<div class="loading">Loading recipes...</div>';
    try {
        const recipes = await fetchRecipes();
        app.innerHTML = `
            <div class="recipe-list">
                ${recipes.map(recipe => `
                    <div class="recipe-card" onclick="location.hash='#/recipe/${recipe.slug}'">
                        <h2>${recipe.title}</h2>
                        <p>${recipe.yield}</p>
                        <div class="tags">
                            ${(recipe.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        app.innerHTML = '<div class="error">Failed to load recipes.</div>';
    }
}

async function renderRecipe(slug) {
    try {
        const recipes = await fetchRecipes();
        const recipe = recipes.find(r => r.slug === slug);
        
        if (!recipe) throw new Error('Recipe not found');
        
        app.innerHTML = `
            <div class="container">
                <div class="recipe-detail">
                    ${marked.parse(recipe.content)}
                    <br>
                    <a href="#/" class="back-link">← Back to Recipes</a>
                </div>
            </div>
        `;
        window.scrollTo(0, 0);
    } catch (error) {
        app.innerHTML = `
            <div class="container">
                <div class="recipe-detail">
                    <h2>Oops!</h2>
                    <p>Sorry, we couldn't find that recipe.</p>
                    <br>
                    <a href="#/" class="back-link">← Back to Recipes</a>
                </div>
            </div>
        `;
    }
}

async function router() {
    const hash = location.hash;
    if (hash.startsWith('#/recipe/')) {
        const slug = hash.replace('#/recipe/', '');
        await renderRecipe(slug);
    } else {
        await renderList();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
