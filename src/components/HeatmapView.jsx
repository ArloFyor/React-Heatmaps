import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

// Heatmap overlay using leaflet-heatmap 
export default function HeatmapView({ json }) {
    if (!json || !json.map_container_details || !json.data) return null;

    const center = [
        json.map_container_details.center[0],
        json.map_container_details.center[1],
    ];
    const zoom = Number(json.map_container_details.zoom) || 15;
    const maxIntensity = Number(json.report_details.max_intensity) || 1;
    const heatPoints = json.data.map((pt) => [pt[0], pt[1], pt[2]]);

    // Custom Heatmap Layer using leaflet.heat
    function HeatmapLayer({ points }) {
        const map = useMap();
        console.log('Max Intensity:', maxIntensity);
        useEffect(() => {
            if (!map || !points || points.length === 0) return;
            if (map._heatLayer) {
                map.removeLayer(map._heatLayer);
            }

            // Create heat layer
            const heatLayer = L.heatLayer(points, {
                radius: 12,
                blur: 15,
                maxZoom: 18,
                maxOpacity: 0.8,
                minOpacity: 0.2,
                max: maxIntensity,
                gradient: {
                    0.1: '#482173',
                    0.25: '#2E6F8E',
                    0.5: '#29AF7F',
                    0.75: '#BDDF26',
                    1.0: '#FFFD37',
                },
            }).addTo(map);
            map._heatLayer = heatLayer;
            return () => {
                if (map._heatLayer) {
                    map.removeLayer(map._heatLayer);
                    map._heatLayer = null;
                }
            };
        }, [map, points]);
        return null;
    }

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={true}
            dragging={true}
            doubleClickZoom={true}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <HeatmapLayer points={heatPoints} />
        </MapContainer>
    );
}
