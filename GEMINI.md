# Recipe Book Website

A simple, modern, and high-performance recipe book website. Each recipe is stored as a Markdown file and rendered dynamically in the browser.

## Project Structure

- `recipes/`: Individual recipe Markdown files with YAML frontmatter.
- `templates/recipe-template.md`: Template for new recipes.
- `scripts/build-index.js`: A Node.js script that scans `recipes/` and generates `recipes.json`.
- `recipes.json`: The generated index of all recipes (used by the frontend).
- `index.html`, `style.css`, `app.js`: The frontend files.

## Development Workflow

### 1. Adding a New Recipe
1. Create a new `.md` file in the `recipes/` folder (you can use the template).
2. Ensure you fill out the YAML frontmatter (title, yield, tags, etc.).
3. Run the index generator to update the website:
   ```bash
   node scripts/build-index.js
   ```

### 2. Running Locally
To see your changes locally, you can use any static file server:
```bash
# Example using servor (pre-configured in package.json)
npm run dev
```

### 3. Deploying to GitHub Pages
1. Push this entire directory to a GitHub repository.
2. Go to **Settings > Pages** in your GitHub repository.
3. Select the `main` branch as the source and click **Save**.
4. Your website will be live at `https://<username>.github.io/<repo-name>/`.

*Note: Since this is a static site, you must ensure `recipes.json` is updated and committed to GitHub for new recipes to appear.*

## Frontend Details
- **Markdown Parsing**: Uses [marked](https://marked.js.org/).
- **Metadata**: Parsed from YAML frontmatter in recipes using `js-yaml` (during build) or can be parsed client-side if needed.
- **Routing**: Simple hash-based routing (`#/recipe/slug`).
