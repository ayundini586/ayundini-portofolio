# Scattered Pieces — Data Lifecycle Animation FIX

This is the **same portfolio** that was uploaded, with the Data Lifecycle animation corrected. No redesign of the remaining sections or project data was performed.

## Run

1. Extract the ZIP into a new folder (keep the previous version as backup).
2. Open the extracted folder in VS Code and run **Live Server** on `index.html`.
3. No npm, build step, or additional dependencies are required.

**Important:** The original uploaded ZIP contained `assets/.gitkeep` only, not the actual screenshots or photo. If you have additional images, keep or copy your existing `assets/` folder into this version. The animation itself does not require any image files.

## What changed

- Replaced the original hard-coded, conflicting CSS positions and fixed-coordinate particle animation.
- Added **07 / New Data** to complete the seven-step cycle.
- The diagram now follows **Raw Data → ETL → Data Warehouse → Query → Insight → New Question → New Data → Raw Data**.
- The connecting arrows are calculated from the real positions of the cards, so they stay correct on resize/mobile.
- One moving yellow pixel follows the arrows **in that exact order** while each active step is highlighted.
- Click **EXPAND** to view the full layout like the provided reference (01–05 left-to-right, then 06 → 07, feeding back to 01).
- **Pause / Play**, **Replay**, animation pause when out of view, light/dark mode and accessibility with reduced motion.

## Files

- `index.html` — unchanged page sections; replaced lifecycle markup and added expanded diagram.
- `styles.css` — original site styles with obsolete lifecycle rules removed.
- `script.js`, `projects.js` — same original site logic and content.
- `flow.css`, `flow.js` — new isolated lifecycle animation.

## Testing

Tested programmatically on 1536, 1280, 390 and 320px viewports using Chromium. Checked all 7 arrows, no runtime errors, modal open/close, pause/resume/replay, dark theme and reduced-motion behavior. Visual tests used local fallback fonts because remote Google Fonts were not available in the test environment.


## Update: QUERY → INSIGHT
Connector 04 → 05 is now a clean rectilinear route with square 90-degree corners, rather than a diagonal/curved reverse-L. It follows the free corridor on mobile. All other flow arrows and the moving pixel still use the same SVG paths.


## Perbaikan layout animasi (21 Oktober 2026)
- Kartu 05 (INSIGHT) dan 06 (NEW QUESTION) dipindah lebih ke tengah pada panel desktop.
- Jalur 04 → 05: garis horizontal ke kiri kemudian siku 90° turun menuju kartu 05.
- Jalur 06 → 07: garis horizontal ke kiri kemudian siku 90° naik menuju kartu 07.
- Animasi pixel bergerak mengikuti garis baru karena menggunakan SVG path yang sama.
- View diperbesar, tampilan HP, dan seluruh section lain tetap dipertahankan.


## Final approved diagram
Diagram mengikuti susunan visual yang disetujui: 01→02→03, 03↓04, 04↓←05, 05←06, 06←↑07, 07↑01. Kontrol Pause/Replay/Expand tetap berfungsi.
