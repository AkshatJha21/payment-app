import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Transfer from './components/Transfer';
import { useEffect, useState } from 'react';
import { Toaster } from "react-hot-toast";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setLoggedIn(!!token);
    };

    checkAuth();
  }, []);
  return (
    <>
      <Toaster position='top-center'/>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Login />}/>
          <Route path='/' element={loggedIn ? <Dashboard /> : <Navigate to={'/signin'}/>}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/send' element={loggedIn ? <Transfer /> : <Navigate to={'/signin'}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
