# jankoprester.com — static v1

Personal website for Janko Prester. Plain HTML/CSS/JS, no build step, deploys directly to GitHub Pages.

## Local development

```bash
python3 -m http.server 8787
```

Then open [http://localhost:8787](http://localhost:8787).

A local server is required because the nav links use absolute paths (`/work/`, `/projects/`, etc.) that resolve correctly on the deployed site and on `localhost`, but not when opening files directly via `file://`.

## Structure

```
index.html          Homepage
work/index.html     Career narrative + CV link
projects/index.html Personal projects
art/index.html      Blender renders
writing/index.html  Blog index
styles/style.css    Shared stylesheet (single file, all pages)
scripts/site.js     Mobile nav toggle (progressive enhancement)
public/             Static assets — art images, cv.pdf go here
```

## Adding content

**New writing post** — add a card to `writing/index.html` and a matching entry in the "Recent writing" stream in `index.html`.

**New project** — add a card to `projects/index.html` and a matching entry in the "Recent projects" stream in `index.html`.

**New art** — add an entry to `art/index.html` and update the two art items in the "Recent art" strip in `index.html`. Place the image in `public/art/` and replace the `.art-thumb` placeholder element with an `<img>` tag.

**CV PDF** — drop the file into `public/` and update the link in `work/index.html`.

## Deployment

The site is deployed via GitHub Pages with a custom domain. The `CNAME` file in the repo root controls the domain. Push to `main` to deploy.

## Future migration to Astro

The URL structure and content model deliberately match the Astro content-collections spec in `new_website_claude_code_context.md`. When content updates become frequent enough to justify a build step, the migration path is:

1. `npm create astro@latest` in a new folder
2. Move page HTML into Astro layout components
3. Convert hand-authored stream items into markdown files in `src/content/writing/`, `src/content/projects/`, `src/content/art/`
4. Replace homepage stream sections with `getCollection()` queries
5. Build to static output (`astro build`) — GitHub Pages deployment stays the same
