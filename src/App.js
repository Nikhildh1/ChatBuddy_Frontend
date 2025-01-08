import { useEffect } from "react";
import Login from "./Login_Signup/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./Login_Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
function App() {



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;