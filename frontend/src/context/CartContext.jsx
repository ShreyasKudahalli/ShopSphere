// src/context/CartContext.jsx

import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get("/cart/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            });
            setCartItems(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to load cart.");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        setLoading(true);
        setError(null);

        try {
            await api.post("/cart/", {
                product: productId,
                product_id: productId,
                quantity,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            });

            await fetchCart();
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to add item to cart.");
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const updateCartItem = async (cartId, quantity) => {
        setLoading(true);
        setError(null);

        try {
            await api.patch(
                `/cart/${cartId}/`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            await fetchCart();
        } catch (err) {
            setError(
                err.response?.data?.detail || "Failed to update cart item."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("access")) {
            fetchCart();
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                loading,
                error,
                fetchCart,
                addToCart,
                updateCartItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}