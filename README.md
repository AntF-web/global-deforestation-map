# Global Deforestation — Offline Vector Map

A no-API, no-tile-server edition of the animated shrinking-forest-area map. Preserves the original eras, hotspot records, forest halo animation, regional information, filters, playback and zoom controls.

The basemap comes from bundled Natural Earth country geometry (`world-data.js`). No account or map key required.

### Usage
Open `index.html` in a browser, or upload the five files together to the root of a GitHub Pages repository.

### Important
Green areas are **symbolic circles representing regional change**, not measured forest boundaries. Historical radius estimates are illustrative, not verified deforestation statistics. Use research-backed spatial forest-loss datasets for quantitative claims.


## Visual impact update
This version replaces small dot-style hotspots with animated hotspot symbols and more visible canopy-zone overlays. Forest areas now combine a filled canopy zone with a pulsing loss ring, making shrinkage and pressure easier to read on the map.


## Before / after circle visualization
Orange outer circle = the largest symbolic forest radius in that region's series. Green inner circle = the symbolic radius for the selected timeline era. When eras change, the green circle animates to its new size while the reference circle stays fixed. **Not proportional to measured forest cover**: the source series uses illustrative radii, not satellite-derived measured forest areas.

## Slower playback
The automatic timeline now advances every 4.2 seconds (previously 1.8 seconds), and forest shrink animations last 2.4 seconds.
