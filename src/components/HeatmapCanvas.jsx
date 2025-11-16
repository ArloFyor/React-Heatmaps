
import React, { useRef, useState } from 'react';
import './HeatmapCanvas.css';

export default function HeatmapCanvas() {
    const [jsonContent, setJsonContent] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    setJsonContent(parsed);
                } catch {
                    setJsonContent({ error: 'Invalid JSON file.' });
                }
            };
            reader.readAsText(file);
        } else {
            setJsonContent({ error: 'Please upload a valid JSON file.' });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    setJsonContent(parsed);
                } catch {
                    setJsonContent({ error: 'Invalid JSON file.' });
                }
            };
            reader.readAsText(file);
        } else {
            setJsonContent({ error: 'Please upload a valid JSON file.' });
        }
    };

    return (
        <div
            className={`heatmap-canvas-container${dragActive ? ' drag-active' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            tabIndex={0}
            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
            <input
                type="file"
                accept="application/json"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <canvas id="heatmap-canvas" className="heatmap-canvas" />
            {!jsonContent && (
                <div className="canvas-hint-text">
                    <span>Drop a JSON file here or click to select.</span>
                </div>
            )}
            {jsonContent && (
                <pre className="canvas-json-content">
                    {JSON.stringify(jsonContent, null, 2)}
                </pre>
            )}
        </div>
    );
}
