# DAD API Restaurant — Restaurant Menu (SPA)

Single-page React application that displays a restaurant menu using the public TheMealDB API. Prices are invented in euros, and the UI includes search, category selection, and sorting.

## Screenshot

![screenshot](./image.png)

## Features

- Fetch dishes from TheMealDB using native fetch + useEffect.
- Normalized data: id, name, category, thumb, and price (random price in €).
- Explicit loading and error states: Loading… and a clear message.
- Components: `App`, `Header`, `MenuPage`, `MenuList`, `MenuItem`.
- UI: search by name and category dropdown (Seafood, Dessert) in the header.
- Sorting: by price and by name (asc/desc) next to the list title.
- Responsive grid layout, black & gold palette with metallic gradients.

## Tech Stack

- React + Vite
- Plain CSS with CSS variables and gradients

## Endpoints used

- Seafood: https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
- Dessert: https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert

The API returns `meals[]` with `idMeal`, `strMeal`, `strMealThumb`.

## Folder structure (relevant)

```
src/
	App.jsx
	App.css
	components/
		header/
			Header.jsx
			Header.css
		menuList/
			MenuList.jsx
			MenuList.css
		menuItem/
			MenuItem.jsx
			MenuItem.css
		footer/
			Footer.jsx
			Footer.css
	pages/
		menuPage/
			MenuPage.jsx
			MenuPage.css
```

## How to run

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

## Implementation details

- Data loading: `MenuPage.jsx` fires two `fetch` requests in parallel (Seafood and Dessert), normalizes and merges them.
- Prices: generated randomly per item (range €5–€30, two decimals).
- Filters: search by name (case-insensitive) and category (`all`, `Seafood`, `Dessert`).
- Sorting: “Price” and “Name” buttons toggle asc/desc and show a direction indicator.
- Styling: CSS variables in `App.css` with a black+gold palette and metallic gradients; subtle card hover.
- Accessibility: hidden labels for inputs, visible focus on controls, sufficient contrast.

## Loading and error states

- While data is loading, “Loading…” is shown.
- If a network/parse error occurs, a message is displayed on the page.

> Note: with React 18 + StrictMode in development, certain effects may run twice. This does not affect the production build.

## Quick customization

- Tweak gold tones: edit `--gold-1/2/3` and `--accent` in `src/App.css`.
- Adjust global gradients (background) in `body { background-image: ... }`.
- Add/remove categories: edit `ENDPOINTS` and `availableCategories` in `src/pages/menuPage/MenuPage.jsx`.

## Possible extras (not included or minimal)

- Pagination or incremental loading.
- Shopping cart.
- Persist filters in the URL (query params).

## License

Educational use.
