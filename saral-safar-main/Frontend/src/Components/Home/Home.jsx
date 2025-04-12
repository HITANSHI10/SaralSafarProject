/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Home.css';
import { assets } from '../../assets/assets';
import Chatbot from '../chatbot/chatbot';

const Home = () => {
  const [scrolled, setScrolled] = useState(false); // State to track if user scrolled
  const [activeCard, setActiveCard] = useState(null); // State to track which card is clicked
  const [busAnimation, setBusAnimation] = useState(false); // Track if the bus has started moving

  useEffect(() => {
    // Scroll event listener to trigger zoom and disappear effects for the "Welcome" section and bus animation
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.7; // Trigger animation when 70% down the page
      const section = document.querySelector('.why-choose-section');
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerPoint) {
        setBusAnimation(true); // Start bus animation when we scroll to the section
      } else {
        setBusAnimation(false); // Reset animation if we scroll back up
      }

      if (window.scrollY > 100) {
        setScrolled(true); // Set state to true after scrolling 100px down
      } else {
        setScrolled(false); // Reset state when at the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup scroll listener
    };
  }, []);

  const toggleActiveCard = (card) => {
    setActiveCard(activeCard === card ? null : card); // Toggle the clicked card, close others
  };

  return (
    <div className="home">
      <Header />
      <main>
        {/* Welcome Section */}
        <section className={`welcome ${scrolled ? 'grow-small' : ''}`}>
          <h2>Track your bus with Saral Safar</h2>
          <h4> Suffer nahi, सफ़र kariye! </h4>
        </section>

        {/* Services Section */}
        <div className="services-section">
          <div
            className={`service-card ${activeCard === 'track' ? 'active centered' : ''} ${activeCard && activeCard !== 'track' ? 'blurred' : ''}`}
            onClick={() => toggleActiveCard('track')}
          >
            <img src={assets.LiveTrack} alt="Real-Time Tracking" />
            <h3>Real-Time Tracking</h3>
            <p>Get live updates on bus locations and arrival times to plan your journey better.</p>
            {activeCard === 'track' && (
              <div className="additional-info">
                <p>With real-time tracking, you can monitor your bus in real-time, avoiding unnecessary waiting at the stop. Stay informed, plan your journey, and travel smart.</p>
              </div>
            )}
          </div>

          <div
            className={`service-card ${activeCard === 'passenger' ? 'active centered' : ''} ${activeCard && activeCard !== 'passenger' ? 'blurred' : ''}`}
            onClick={() => toggleActiveCard('passenger')}
          >
            <img src={assets.LivePasse} alt="Live Counting Passenger" />
            <h3>Live Counting Passenger</h3>
            <p>Real-time passenger updates for a safer, smoother, and stress-free journey.</p>
            {activeCard === 'passenger' && (
              <div className="additional-info">
                <p>Know the real-time passenger count of the bus to ensure safety and comfort during your journey. Travel stress-free with live passenger updates.</p>
              </div>
            )}
          </div>

          <div
            className={`service-card ${activeCard === 'route' ? 'active centered' : ''} ${activeCard && activeCard !== 'route' ? 'blurred' : ''}`}
            onClick={() => toggleActiveCard('route')}
          >
            <img src={assets.RouteInfo} alt="Comprehensive Route Info" />
            <h3>Comprehensive Route Info</h3>
            <p>Access detailed information on bus routes, stops, and schedules.</p>
            {activeCard === 'route' && (
              <div className="additional-info">
                <p>Access the most comprehensive route information with detailed bus stop locations, estimated arrival times, and alternate routes to avoid delays.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bus Animation and Why Choose Section */}
        <div className={`bus-container ${busAnimation ? 'animate' : ''}`}>
          <img src={assets.BusMove} alt="Bus" className="bus-image" style={{ width: '500px' }}/>
        </div>

        <div className={`why-choose-section ${busAnimation ? 'show-text' : ''}`}>
          <h2>Why Choose Saral Safar?</h2>
          <div className="features">
            <div className={`feature-box ${busAnimation ? 'drop-box' : ''}`}>
              <h3>Reliable Service</h3>
              <p>We ensure timely and accurate updates to make your travel experience smooth and reliable.</p>
            </div>
            <div className={`feature-box ${busAnimation ? 'drop-box' : ''}`}>
              <h3>Passenger Safety</h3>
              <p>We ensure passenger safety with camera recordings in buses, enabling real-time monitoring for added security.</p>
            </div>
            <div className={`feature-box ${busAnimation ? 'drop-box' : ''}`}>
              <h3>User-Friendly Interface</h3>
              <p>Our app is easy to navigate, providing you with all the information you need at your fingertips.</p>
            </div>
            <div className={`feature-box ${busAnimation ? 'drop-box' : ''}`}>
              <h3>24/7 Customer Support</h3>
              <p>We are here to assist you round the clock with any queries or issues you may have.</p>
              <Chatbot/>
            </div>
          </div>
        </div>
      </main>     
    </div>   
  );
};


export default Home;
