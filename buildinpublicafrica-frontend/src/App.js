import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import './App.css';

function App() {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;

    // Set initial camera position
    globeEl.current.pointOfView({ altitude: 2.5 });

    // Function to update dimensions
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="App">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        width={dimensions.width}
        height={dimensions.height}
      />
      <div className="overlay">
        <h1 className="centered-heading">Build In Public, Africa</h1>
      </div>
    </div>
  );
}

export default App;
