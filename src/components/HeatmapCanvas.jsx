import React from 'react';
import './HeatmapCanvas.css';

export default function HeatmapCanvas() {
    return (
        <div className="heatmap-canvas-container">
            <canvas id="heatmap-canvas" className="heatmap-canvas" />
        </div>
    );
}
