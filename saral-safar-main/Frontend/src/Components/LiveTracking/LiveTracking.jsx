/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LiveTracking.css';

const LiveTracking = () => {
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showBuses, setShowBuses] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredFromCities, setFilteredFromCities] = useState([]); 
  const [filteredToCities, setFilteredToCities] = useState([]); 
  const navigate = useNavigate(); 

  const rajasthanCities = [
    'Jaipur',
    'Jodhpur',
    'Kota',
    'Ajmer',
    'Udaipur',
    'Bikaner',
    'Alwar',
    'Bharatpur',
    'Tonk',
    'Churu',
    'Jhunjhunu',
  ];

  const busData = [
    {
      busNumber: 'RJ14PE4874',
      duration: '4 hr 52 min',
      passengerCount: '47/50',
      departureTime: '4:00',
      arrivalTime: '8:50',
    },
    {
      busNumber: 'RJ14PE4674',
      duration: '5 hr 30 min',
      passengerCount: '36/50',
      departureTime: '5:00',
      arrivalTime: '10:30',
    },
    {
      busNumber: 'RJ14PE4694',
      duration: '5 hr 10 min',
      passengerCount: '28/50',
      departureTime: '6:00',
      arrivalTime: '11:10',
    },
  ];


  const handleFromInputChange = (e) => {
    const input = e.target.value;
    setFromStop(input);

    if (input.length > 0) {
      const filteredCities = rajasthanCities.filter((city) =>
        city.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredFromCities(filteredCities);
      setShowFromDropdown(true);
    } else {
      setShowFromDropdown(false);
    }
  };

  const handleToInputChange = (e) => {
    const input = e.target.value;
    setToStop(input);

    if (input.length > 0) {
      const filteredCities = rajasthanCities.filter((city) =>
        city.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredToCities(filteredCities);
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  };

  const handleSelectFrom = (city) => {
    setFromStop(city);
    setShowFromDropdown(false);
  };

  const handleSelectTo = (city) => {
    setToStop(city);
    setShowToDropdown(false);
  };

  const handleSearch = () => {
    const trimmedFromStop = fromStop.trim();
    const trimmedToStop = toStop.trim();

    // Validate if the entered city is in the predefined list
    const isValidFromCity = rajasthanCities.includes(trimmedFromStop);
    const isValidToCity = rajasthanCities.includes(trimmedToStop);

    if (!isValidFromCity || !isValidToCity) {
      setErrorMessage('Please enter a valid city name from the dropdown.');
    } else if (trimmedFromStop && trimmedToStop) {
      setErrorMessage('');
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setShowBuses(true);
        setTimeout(() => {
          smoothScrollToBuses();
        }, 500);
      }, 3000);
    } else {
      setErrorMessage('Please enter both "From" and "To" stops.');
    }
  };

  const smoothScrollToBuses = () => {
    const busInfoSection = document.querySelector('.bus-info-container');
    if (busInfoSection) {
      busInfoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLiveClick = (busNumber) => {
    navigate(`/live-tracking/bus-live-tracking/${busNumber}`); 
  };

  return (
    <div className="live-tracking">
      {loading && (
        <div className="loading-animation">
          <div className="route-container">
            <svg className="route-svg" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                id="bus-path"
                d="M 50 150 Q 200 50, 400 150 Q 600 250, 750 100"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="10 10"
                fill="transparent"
              />
              <circle cx="50" cy="150" r="8" fill="red" />
              <circle cx="400" cy="150" r="8" fill="red" />
              <circle cx="750" cy="100" r="8" fill="red" />
            </svg>
            <img src="https://img.icons8.com/color/48/bus.png" alt="Bus" className="bus" />
            <div className="count-box">👨‍🦰 25</div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <div className="banner">
            <h1>India's First Live Bus Tracking & Passenger Counting Service</h1>
            <div className="search-section">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="From"
                  value={fromStop}
                  onChange={handleFromInputChange}
                  aria-label="From Bus Stop"
                />
                {showFromDropdown && (
                  <ul className="dropdown">
                    {filteredFromCities.map((city, index) => (
                      <li key={index} onClick={() => handleSelectFrom(city)}>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="swap-icon">⇄</div>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="To"
                  value={toStop}
                  onChange={handleToInputChange}
                  aria-label="To Bus Stop"
                />
                {showToDropdown && (
                  <ul className="dropdown">
                    {filteredToCities.map((city, index) => (
                      <li key={index} onClick={() => handleSelectTo(city)}>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button onClick={handleSearch}>Search Buses</button>
            </div>
            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
            <h2 className="tagline">Suffer nahi, सफ़र kariye!</h2>
          </div>

          {showBuses && (
            <div className="bus-info-container">
              {busData.map((bus, index) => (
                <div key={index} className="bus-info-box">
                  <div className="bus-details">
                    <div className="bus-number">{bus.busNumber}</div>
                    <div className="bus-route">
                      <div className="departure-info">
                        <span className="departure-time">{bus.departureTime}</span>
                        <span className="departure-location">{fromStop}</span>
                      </div>
                      <div className="bus-duration">{bus.duration}</div>
                      <div className="arrival-info">
                        <span className="arrival-time">{bus.arrivalTime}</span>
                        <span className="arrival-location">{toStop}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bus-status">
                    <button className="live-status" onClick={() => handleLiveClick(bus.busNumber)}>● Live</button>
                    <span className="passenger-count">{bus.passengerCount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LiveTracking;