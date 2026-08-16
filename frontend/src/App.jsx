import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";


import Home from './pages/Home.jsx'
import Checkout from './pages/Checkout.jsx'
import Navbar from './components/Navbar.jsx'
import AuthProvider from './context/AuthContext.jsx'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductContext from './context/ProductContext';
import ProductDetails from './pages/ProductDetails.jsx';
import CartProvider from './context/CartContext.jsx';
import Cart from "./pages/Cart";




function App() {

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <AuthProvider>
      <ProductContext>
      <CartProvider>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </CartProvider>
      </ProductContext>
    </AuthProvider>
    </>
  )
}

export default App
