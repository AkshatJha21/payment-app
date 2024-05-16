import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from './components/Transfer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/send' element={<Transfer />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
