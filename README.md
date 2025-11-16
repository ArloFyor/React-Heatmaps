
# Heatmap-JS

**Version:** 1.0

Heatmap-JS is a fast, modern React 19 + Vite application for visualizing heatmaps from user-uploaded JSON data. It features interactive pan/zoom, instant HMR, and a lightweight architecture with zero TypeScript.

## Features

- **Drag & Drop JSON Upload:** Upload heatmap data using a simple dropzone or file selector.
- **Interactive Heatmap Rendering:** Visualize data points on a map-like canvas with pan and zoom controls.
- **Live Hot Module Replacement (HMR):** Edit components and styles with instant updates during development.
- **No TypeScript:** Pure JavaScript/JSX for rapid prototyping and simplicity.
- **Minimal Dependencies:** Uses React 19, Vite, and ESLint for fast builds and code quality.
- **Customizable Projection:** Equirectangular projection for mapping longitude/latitude to canvas coordinates.
- **Sample Data Included:** Example JSON files for testing in `src/assets/json/`.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Open http://localhost:5173 in your browser
```

### Build for Production
```bash
npm run build
npm run preview
# Preview at http://localhost:5173
```

### Linting
```bash
npm run lint
```

## Usage

1. Start the dev server (`npm run dev`).
2. Use the left-side dropzone to upload a sample JSON file (see `src/assets/json/`).
3. The heatmap will render interactively. Pan and zoom with mouse controls.
4. Click "Clear Canvas" to reset and upload a new file.

## JSON Schema

- `map_container_details`: `{ center: [latitude, longitude], zoom: number }`
- `data`: Array of `[longitude, latitude, intensity]` points

## Project Structure

- `src/App.jsx`: Main application component
- `src/components/HeatmapCanvas.jsx`: Upload UI and heatmap container
- `src/components/HeatmapView.jsx`: Heatmap renderer
- `src/assets/json/`: Sample JSON files
- `public/`: Static assets

## License

MIT
