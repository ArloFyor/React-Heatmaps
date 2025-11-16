import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Heatmap overlay using leaflet-heatmap (or similar)
// For demo, we use a simple overlay, but you can swap for leaflet-heatmap plugin

export default function HeatmapView({ json }) {
    if (!json || !json.map_container_details || !json.data) return null;

    const center = [
        json.map_container_details.center[0],
        json.map_container_details.center[1],
    ];
    const zoom = Number(json.map_container_details.zoom) || 15;

    // Convert data to [lat, lng, intensity]
    const points = json.data.map((pt) => ({
        lat: pt[0],
        lng: pt[1],
        intensity: pt[2],
    }));

    // For now, just render points as circle markers
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
            {points.map((pt, idx) => (
                <circle
                    key={idx}
                    center={[pt.lat, pt.lng]}
                    radius={Math.max(10, pt.intensity * 2)}
                    fillColor="red"
                    fillOpacity={0.4}
                    stroke={false}
                />
            ))}
        </MapContainer>
    );
}
