import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardPage from './components/pages/DashboardPage';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for user authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/dashboard'); 
    } else {
      setIsAuthenticated(false);
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <div className="App">
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <HomePage />}
        />
      </Routes>
    </div>
  );
};

export default App;
