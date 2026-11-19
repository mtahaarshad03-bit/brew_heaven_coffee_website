# Brew Heaven website (frontend demo)

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Run
Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000`. Fonts load from Google Fonts when online and fall back to Georgia and system-ui offline.

## Structure
- 5 main pages in the root, 10 customer pages in `pages/`
- `css/style.css`: design tokens at the top (`:root`)
- `js/main.js`: product data (`P`), offer codes (`CODES`), cart, forms, tracking
- `assets/logo.svg`, `logo-light.svg`, `favicon.svg`: replace with the client's branding

## Demo-only features (need a backend before launch)
Accounts and login, checkout and payment, order tracking (simulated timeline; sample order BH-1042), reservations, contact and careers forms (CV file is not uploaded), newsletter, offer codes. Data is saved in browser localStorage only.

## Placeholders to replace
Addresses, hours, phone and email, sample reviews, brand story, and the generated SVG artwork (see `assets/images/README.txt`). Prices and products live in `js/main.js`.

Currency is PKR (prices in `P`, delivery fee and free-delivery threshold in `totals()`). Addresses on the Locations page are sample entries for Faisalabad: replace them with real ones. Real photos: see `assets/images/README.txt`.

Build note: pages were generated from a script, so edit the HTML files directly.
