import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Checkout from './pages/Checkout.jsx'
import Navbar from './components/Navbar.jsx'
import AuthProvider from './context/AuthContext.jsx'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductContex from './context/ProductContext';

// Inside your Routes:



function App() {

  return (
    <>
    <AuthProvider>
      <ProductContex>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </ProductContex>
    </AuthProvider>
    </>
  )
}

export default App
