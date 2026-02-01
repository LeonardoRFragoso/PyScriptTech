// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initGA } from './services/analytics';

// Initialize Google Analytics
initGA();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(metric);
  }
});
