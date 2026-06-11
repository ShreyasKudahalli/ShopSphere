import {getProducts} from '../data/products.js'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
    const products = getProducts();
  return (
    <div className="page">
        <div className="home-hero">
            <h1 className="hero-title">Welcome to ShopSphere</h1>
            <p className="home-subtitle">Discover a world of endless shopping possibilities with ShopSphere. Your one-stop destination for all your fashion, electronics, and lifestyle needs.</p>
        </div>
        <div className="container">
            <h2 className="page-title">Our Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    </div>
  );
}