import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import useAuth from './utils/hooks/useAuth';
import Login from './pages/login';
import Signup from './pages/signup';
import './App.css';
import Header from './components/header';
import Home from './pages/home';

function App() {
  const validToken = useAuth();

  if(!validToken){
    return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route
              path="*"
              element={<Navigate to="/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
  
  return (
    
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
