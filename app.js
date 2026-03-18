const app = document.getElementById('app');

async function fetchRecipes() {
    const response = await fetch('recipes.json');
    return await response.json();
}

async function renderList() {
    const recipes = await fetchRecipes();
    app.innerHTML = `
        <div class="recipe-list">
            ${recipes.map(recipe => `
                <div class="recipe-card" onclick="location.hash='#/recipe/${recipe.slug}'">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.yield}</p>
                    <div class="tags">
                        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

async function renderRecipe(slug) {
    const response = await fetch(`recipes/${slug}.md`);
    const text = await response.text();
    
    // Remove frontmatter
    const content = text.replace(/^---[\s\S]*?---/, '');
    
    app.innerHTML = `
        <div class="container">
            <div class="recipe-detail">
                ${marked.parse(content)}
                <br>
                <a href="#/" class="back-link">← Back to Recipes</a>
            </div>
        </div>
    `;
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
