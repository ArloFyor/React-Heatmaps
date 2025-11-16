
import HeatmapCanvas from './components/HeatmapCanvas';
import './App.css';


import React, { useState } from 'react';

export default function App() {
  const [hasJson, setHasJson] = useState(false);

  const handleJsonChange = (present) => {
    setHasJson(present);
  };

  const [clearSignal, setClearSignal] = useState(0);
  const handleClear = () => {
    if (hasJson) {
      setClearSignal((c) => c + 1);
      setHasJson(false);
    }
  };

  return (
    <>
      <HeatmapCanvas
        onJsonChange={handleJsonChange}
        clearSignal={clearSignal}
      />
      <h1 style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 600 }}>
        Heatmap Viewer
      </h1>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={handleClear}
          style={{
            background: hasJson ? '#ffe066' : '#e0e0e0',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 500,
            cursor: hasJson ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
            boxShadow: hasJson ? '0 2px 8px 0 #ffe06655' : 'none',
            outline: 'none',
          }}
          disabled={!hasJson}
        >
          Clear Canvas
        </button>
      </div>
    </>
  );
}


