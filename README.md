# Global Deforestation Interactive Map

A GitHub Pages-ready interactive map about the history of global deforestation from 1900 to today.

## Files

```text
deforestation-map-github-pages/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run locally

Open `index.html` directly in your browser.

Because the map uses Leaflet and online map tiles, you need an internet connection.

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Go to **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
6. Click **Save**.
7. Your site will appear at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## Customize the map

Edit `script.js`.

To add a new historical era, add an object to the `eras` array:

```js
{
  id: "new-era",
  label: "2030s",
  title: "Future forest politics",
  summary: "Your description here.",
  tags: ["climate", "policy"]
}
```

Then add matching hotspots in `hotspotsByEra`:

```js
"new-era": [
  createHotspot(
    "Amazon Basin",
    -6,
    -60,
    4,
    ["fire", "climate"],
    "Short description.",
    "Historical context.",
    "Critical note."
  )
]
```

## Credits

Built with:

- Leaflet
- OpenStreetMap
- CARTO basemap tiles
