// src/pages/Cart.jsx
import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
    const {
        cartItems,
        loading,
        error,
        fetchCart,
        updateCartItem,
        removeCartItem,
    } = useContext(CartContext);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetchCart();
    }, []);

    if (!user) {
        return (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
            <p className="text-lg">
                Please sign in to view your cart.
            </p>
            <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
            Sign In
            </Link>
            <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors"
            >
            Create Account
            </Link>
        </div>
        );
    }

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

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.quantity,
        0
    );

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

                            <div className="flex items-center border rounded-lg w-fit">
                                <button
                                    onClick={() =>
                                        updateCartItem(item.id, Math.max(1, item.quantity - 1))
                                    }
                                    disabled={item.quantity <= 1}
                                    className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    -
                                </button>

                                <span className="px-4">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        updateCartItem(item.id, item.quantity + 1)
                                    }
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeCartItem(item.id)}
                                className="mt-3 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                    <div className="font-bold text-lg">
                        ₹{item.product.price * item.quantity}
                    </div>
                </div>
            ))}

            <div className="mt-8 border-t pt-6">
                <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                        ₹{subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between text-xl font-bold mt-4">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <button
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    onClick={() => console.log("Proceed to checkout")}
                >
                    Proceed to Checkout
                </button>
            </div>


        </div>
    );
}