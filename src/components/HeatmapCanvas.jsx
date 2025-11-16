

import React, { useRef, useState } from 'react';
import './HeatmapCanvas.css';
import HeatmapView from './HeatmapView';

export default function HeatmapCanvas({ onJsonChange, clearSignal }) {
    const [jsonContent, setJsonContent] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef();
    // Notify parent when JSON is present or cleared
    React.useEffect(() => {
        if (onJsonChange) {
            onJsonChange(!!jsonContent);
        }
    }, [jsonContent, onJsonChange]);

    // Clear canvas when clearSignal changes
    React.useEffect(() => {
        setJsonContent(null);
    }, [clearSignal]);

    const handleDrop = (e) => {
        if (jsonContent) return;
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
        if (jsonContent) return;
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        if (jsonContent) return;
        setDragActive(false);
    };

    const handleFileChange = (e) => {
        if (jsonContent) return;
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
            onClick={() => {
                if (!jsonContent && fileInputRef.current) fileInputRef.current.click();
            }}
            tabIndex={0}
            style={{ cursor: jsonContent ? 'default' : 'pointer', position: 'relative', overflow: 'hidden' }}
        >
            <input
                type="file"
                accept="application/json"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={!!jsonContent}
            />
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                {!jsonContent && (
                    <div className="canvas-hint-text">
                        <span>Drop a JSON file here or click to select.</span>
                    </div>
                )}
                {jsonContent && (
                    <HeatmapView json={jsonContent} />
                )}
            </div>
        </div>
    );
}
