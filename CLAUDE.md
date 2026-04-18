# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Plain HTML/CSS/JS — no framework, no build step, no package manager. Deployed to GitHub Pages at `www.jankoprester.com` via the `CNAME` file. Push to `master` to deploy.

## Local development

```bash
python3 -m http.server 8787
```

A local server is required because nav links use absolute paths (`/work/`, `/art/`, etc.) that break under `file://`.

## Architecture

There is no templating system. The header, nav, and footer are duplicated verbatim across all five HTML files. Any change to shared structure (nav links, footer links) must be made in each file manually:

- `index.html`
- `work/index.html`
- `projects/index.html`
- `art/index.html`
- `writing/index.html`

`styles/style.css` is a single shared stylesheet for all pages. `scripts/site.js` handles only the mobile nav toggle (progressive enhancement — adds a `js` class to `<html>`, then shows the hamburger button).

## Adding content

**New project** — add a `<article class="project-card">` to `projects/index.html`, and a matching `<a class="entry-card">` in the "Recent projects" stream in `index.html`.

**New writing post** — add a `<article class="list-card">` to `writing/index.html`, and a matching entry in the "Recent writing" stream in `index.html`.

**New art** — add an `<article>` to `art/index.html` and update the two art items in the "Recent art" strip in `index.html`. Place images in `public/art/` as an AVIF + JPG pair (see image workflow below).

## Image workflow

Art images must be provided as both AVIF and JPG. On macOS use `sips`:

```bash
sips -s format avif -s formatOptions 75 input.png --resampleWidth 1920 --out output.avif
sips -s format jpeg -s formatOptions 82 input.png --resampleWidth 1920 --out output.jpg
```

Wrap in a `<picture>` element with AVIF as the primary source and JPG as fallback:

```html
<picture>
  <source srcset="/public/art/filename.avif" type="image/avif" />
  <img class="art-thumb-image" src="/public/art/filename.jpg" alt="..." loading="lazy" decoding="async" />
</picture>
```

Remove `loading="lazy"` on above-the-fold images (first two items on `art/index.html`).

## SVG icons

Icons are defined once as a `<svg hidden>` sprite at the top of `<body>` in `projects/index.html` using `<symbol id="icon-*">`. Usage: `<svg viewBox="..."><use href="#icon-name" /></svg>`.

Source icons from Lucide (`unpkg.com/lucide-static/icons/<name>.svg`). Browse at lucide.dev.

## Fonts

Lora (serif, body text) and DM Sans (sans, UI) loaded from Google Fonts. Defined as CSS variables `--font-serif` and `--font-sans`.

## Future migration

The URL structure deliberately matches the Astro content-collections spec. When content updates become frequent enough to justify a build step, migrate by moving page HTML into Astro layout components and converting stream items into markdown files in `src/content/`.
