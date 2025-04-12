/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './Components/context/AuthContext'; // Import AuthProvider
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import LiveTracking from './Components/LiveTracking/LiveTracking';
import LoginPage from './Components/LoginPage/LoginPage';
import BusLiveTracking from './Components/BusLiveTracking/BusLiveTracking'; // Import BusLiveTracking
import './App.css';
import Chatbot from './Components/chatbot/chatbot';

function LayoutWithFooter({ children }) {
  const location = useLocation();

  return (
    <>
      {children}
      {location.pathname === '/' && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWithFooter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Chatbot/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            {/* Add BusLiveTracking Route with dynamic busNumber */}
            <Route path="/live-tracking/bus-live-tracking/:busNumber" element={<BusLiveTracking />} />
          </Routes>
        </LayoutWithFooter>
      </Router>
    </AuthProvider>
  );
}

export default App;