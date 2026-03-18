const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const recipesDir = path.join(__dirname, '../recipes');
const output = path.join(__dirname, '../recipes.json');

const recipes = fs.readdirSync(recipesDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
    const match = content.match(/^---([\s\S]*?)---/);
    let meta = {};
    if (match) {
      try {
        meta = yaml.load(match[1]);
      } catch (e) {
        console.error(`Error parsing YAML in ${file}:`, e);
      }
    }
    return {
      filename: file,
      slug: file.replace('.md', ''),
      ...meta
    };
  });

fs.writeFileSync(output, JSON.stringify(recipes, null, 2));
console.log('Successfully generated recipes.json index.');
