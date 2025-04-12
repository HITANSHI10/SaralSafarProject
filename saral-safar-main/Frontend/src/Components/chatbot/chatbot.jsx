/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Set up the global config
    window.embeddedChatbotConfig = {
      chatbotId: "FmorRWwXr-Yv42PiIcM1F",
      domain: "www.chatbase.co"
    };

    // Create a script element
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("chatbotId", "FmorRWwXr-Yv42PiIcM1F");
    script.setAttribute("domain", "www.chatbase.co");

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up the script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Or return a loading indicator if needed
};

export default Chatbot;
