import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SimulatorPage } from './pages/SimulatorPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<SimulatorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;