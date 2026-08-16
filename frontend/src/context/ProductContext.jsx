// src/context/ProductContext.jsx
import { useState, useEffect, createContext, useCallback } from "react";
import api from "../api/axios";

// Create the context
export const ProductContext = createContext();
    
export default function Productcontext({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


    // ---- Fetch all products ----
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get("/products/");
            setProducts(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to load products.");
            console.error("Fetch products error:", err);
        } finally {
            setLoading(false);
        }
    };



    const fetchProduct = async (id) => {
        const response = await api.get(`/products/${id}/`);
        return response.data;
    };


    useEffect(() => {
        fetchProducts();
        }, []);
  // ---- Provide context value ----
    const value = {
        products,
        loading,
        error,
        fetchProducts,
        fetchProduct,
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}