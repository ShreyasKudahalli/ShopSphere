// src/pages/Cart.jsx

import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const {
        cartItems,
        loading,
        error,
        fetchCart,
    } = useContext(CartContext);

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading cart...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">
                {error}
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-10">
                Your cart is empty.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">
                Shopping Cart
            </h1>

            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-lg p-4 mb-4"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={`http://localhost:8000${item.product.image}`}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded"
                        />

                        <div>
                            <h2 className="font-semibold text-lg">
                                {item.product.name}
                            </h2>

                            <p className="text-gray-500">
                                ₹{item.product.price}
                            </p>

                            <p>
                                Quantity: {item.quantity}
                            </p>
                        </div>
                    </div>

                    <div className="font-bold text-lg">
                        ₹{item.product.price * item.quantity}
                    </div>
                </div>
            ))}
        </div>
    );
}