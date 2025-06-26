import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login_Signup/Login";
import Signup from "./Login_Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Loader from './Loader/Loader';
import PrivateRoute from './Login_Signup/PrivateRoute';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return setIsAuthenticated(false);

      try {
        await axios.post("https://chatbuddy-backend-1.onrender.comhttps://chatbuddy-backend-1.onrender.com/api/users/validate", { token });
        setIsAuthenticated(true);
      } catch {
        sessionStorage.clear();
        setIsAuthenticated(false);
      }
    };

    validateToken();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* ✅ Protect dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;