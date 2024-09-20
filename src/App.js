import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/signin" element={<UserSignIn />} />
          </Routes>
    </Router>
  );
}

export default App;
