import React from 'react'
import {BrowserRouter as Router ,Route,Routes, Navigate} from 'react-router-dom';
import './App.css';

import Login from './Auth/login';
import Dashboard from './pages/dashboard';
import Register from './Auth/register';
import Trello from './pages/trello';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const {isAuthenticated}=useAuth();
  console.log(isAuthenticated);

  
  return (
    
    <Router>
      <Routes>
      <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" /> } />
      <Route path='/trelloBoard/:id' element={<Trello /> }/>
      </Routes>
    </Router>
  )
}

export default App;
