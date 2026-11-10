import React from 'react';
import StarMap from './components/StarMap/StarMap';
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <a href="#star-map" id="skip-to-content-link">
        Skip to content
      </a>
      <main id="star-map" className="main-content">
        <StarMap />
      </main>
    </div>
  );
}

export default App;