// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import {toast} from 'react-hot-toast';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';


const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL
  const navigate = useNavigate();

  // Contexts
  const { fetchProduct } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  console.log("Cart Context:", cartContext);

  const { addToCart } = cartContext;
  // Local state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product on mount or when ID changes
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProduct(id);
        setProduct(data);
        console.log(data)
      } catch (err) {
        setError(err.response?.data?.detail || 'Product not found.');
        // Optionally redirect to 404 or home after a delay
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, fetchProduct]);

  // Handle add to cart (placeholder – replace with actual cart logic)
  const handleAddToCart = async () => {
      if (!user) {
          navigate("/login");
          return;
      }

      try {
          setAddingToCart(true);

          await addToCart(product.id, quantity);

          toast.success("Product added to cart!");
      } catch (err) {
          console.error("Add to cart error:", err);

          toast.error("Failed to add product to cart.");
      } finally {
          setAddingToCart(false);
      }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <i className="fas fa-exclamation-triangle text-5xl text-red-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800">Oops!</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // If product is null (should not happen after error check)
  if (!product) {
    return null;
  }

  // Render product details
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb / back link */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Products
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={`http://localhost:8000${product.image}` || 'https://via.placeholder.com/600x600?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover md:aspect-square"
                loading="lazy"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              {/* Category / badge (if available) */}
              {product.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full w-fit mb-3">
                  {product.category}
                </span>
              )}

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
              </p>

              {/* Description */}
              <div className="mt-4 prose prose-sm text-gray-600">
                <p>{product.description || 'No description available.'}</p>
              </div>

              {/* Quantity selector */}
              <div className="mt-6 flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Qty:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition rounded-l-lg"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-0 focus:ring-0 text-sm py-1"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition rounded-r-lg"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Adding...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-bag"></i> Add to Cart
                    </>
                  )}
                </button>
                {!user && (
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    <i className="fas fa-info-circle mr-1"></i> You need to be signed in to add items to your cart.
                  </p>
                )}
              </div>

              {/* Additional info (stock, etc.) */}
              {product.stock !== undefined && (
                <div className="mt-4 text-sm text-gray-500">
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;