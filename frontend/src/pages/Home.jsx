import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx'; // use the new grid component
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ProductContext } from '../context/ProductContext';


export default function Home() {
  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);




  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Welcome to ShopSphere
            {user && <span className="block mt-2 text-2xl text-blue-100">Hi, {user.username}! 👋</span>}
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-blue-100">
            Discover a world of endless shopping possibilities with ShopSphere.
            Your one-stop destination for all your fashion, electronics, and lifestyle needs.
          </p>
          {!user && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
          )}
        </div>
      </div>


      {/* Products Section */}
      <ProductCard products={products} />
    </div>
  );
}