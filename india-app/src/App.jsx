import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import IntermediatePage from './IntermediatePage';
import ThirdPage from './ThirdPage';
import Loader from './components/Loader'; // Loader import

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5 sec
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Show loader full screen
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/intermediate-page" element={<IntermediatePage />} />
        <Route path="/third-page" element={<ThirdPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
