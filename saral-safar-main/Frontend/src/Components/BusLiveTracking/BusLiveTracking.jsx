/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BusLiveTracking.css';

// Custom bus icon for the animated bus
const busIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/color/48/bus.png',
  iconSize: [48, 48],
  iconAnchor: [24, 48], // Align the icon correctly on the path
});

const BusLiveTracking = ({ busNumber }) => {
  const [passengerCount, setPassengerCount] = useState(25); // Initial passenger count
  const [liveBusPosition, setLiveBusPosition] = useState([26.9124, 75.7873]); // Starting from Jaipur
  const [isPaused, setIsPaused] = useState(false);

  // Coordinates for the route from Jaipur to Kota with three stops
  const route = [
    { coords: [26.9124, 75.7873], count: 46 }, // Jaipur
    { coords: [26.1665, 75.7885], count: 52 }, // Tonk (Midpoint)
    { coords: [25.2138, 75.8648], count: 20 }, // Kota
  ];

  // Function to calculate incremental movement between two points
  const moveBus = (start, end, progress) => {
    const lat = start[0] + progress * (end[0] - start[0]);
    const lng = start[1] + progress * (end[1] - start[1]);
    return [lat, lng];
  };

  // Move the bus along the route slowly with pauses
  useEffect(() => {
    let stopIndex = 0; // Start from first location
    let progress = 0; // Progress between stops

    const moveToNextStop = () => {
      if (stopIndex >= route.length - 1) return; // End of route

      const interval = setInterval(() => {
        if (progress < 1) {
          // Increment progress to move bus smoothly
          progress += 0.005; // Adjust this value to change speed
          const newPos = moveBus(route[stopIndex].coords, route[stopIndex + 1].coords, progress);
          setLiveBusPosition(newPos);
        } else {
          clearInterval(interval); // Stop movement when reached
          setIsPaused(true); // Pause at stop

          setTimeout(() => {
            // After 3 seconds pause, move to the next stop
            stopIndex++;
            progress = 0;
            setPassengerCount(route[stopIndex].count); // Update passenger count
            setIsPaused(false);
            moveToNextStop(); // Start moving to next stop
          }, 3000); // Pause for 3 seconds
        }
      }, 50); // Adjust this value to smooth out the movement
    };

    moveToNextStop();
  }, []);

  return (
    <div className="bus-live-tracking">
      <div className="left-section">
        <h1 className="live-tracking-title">Live Tracking</h1>
        <h2 className="subheading">Jaipur ⇄ Kota</h2>

        {/* Map showing the route from Jaipur to Kota */}
        <div className="map-container">
          <MapContainer center={route[0].coords} zoom={8} scrollWheelZoom={false} className="leaflet-container">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Polyline for the route */}
            <Polyline positions={route.map((stop) => stop.coords)} color="blue" />
            {/* Marker for live bus */}
            <Marker position={liveBusPosition} icon={busIcon}>
              <Popup>Bus is here! Live Passenger Count: {passengerCount}</Popup>
            </Marker>
            {/* Markers for the stops */}
            {route.map((stop, index) => (
              <Marker key={index} position={stop.coords}>
                <Popup>Stop {index + 1}: Passenger Count: {stop.count}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="right-section">
        <div className="live-count-box">
          <h2>Live Passenger Count</h2>
          <div className="count-display">
            <span>{passengerCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusLiveTracking;
