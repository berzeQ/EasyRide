import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";

const Getgeolocation = (props) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      // Get the current location using the provided options
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = parseFloat(position.coords.latitude);
          const longitude = parseFloat(position.coords.longitude);

          // Update the position in the Redux store
          props.setCurrentPos({ lat: latitude, lng: longitude });
          props.setDestinationPos({ lat: latitude, lng: longitude });

          // Do something with the latitude and longitude data
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        options // Pass the options object here
      );
    } else {
      console.error("Geolocation is not available in your browser.");
    }
  }, []); // An empty dependency array runs the effect once on component mount

  return <div>{/* Your component JSX */}</div>;
};

export default Getgeolocation;
