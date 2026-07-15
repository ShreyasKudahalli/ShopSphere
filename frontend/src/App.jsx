import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Checkout from './pages/Checkout.jsx'
import Navbar from './components/Navbar.jsx'
import AuthProvider from './context/AuthContext.jsx'
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  return (
    <>
    <AuthProvider>
      <Navbar /> 
      {/* 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Checkout' element={<Checkout />} />
      </Routes>
      */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
