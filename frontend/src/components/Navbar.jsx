import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

// ----- Data (inline for simplicity) -----
const categories = ['All Products', 'Hoodies', 'Pants & Shorts', 'Jackets', 'Shoes'];

const shopCategories = [
  { name: 'New Arrivals', icon: 'fa-solid fa-star' },
  { name: 'Best Sellers', icon: 'fa-solid fa-fire' },
  { name: 'Limited Edition', icon: 'fa-solid fa-gem' },
  { name: 'Accessories', icon: 'fa-solid fa-hat-cowboy' },
];

const shopCollections = [
  { name: 'Summer 2026', color: 'text-orange-500' },
  { name: 'Urban Street', color: 'text-blue-500' },
  { name: 'Minimalist', color: 'text-gray-600' },
  { name: 'Retro Vibes', color: 'text-purple-500' },
];

// ----- Simple Icon wrappers (using FontAwesome) -----
const Icons = {
  Search: () => <i className="fas fa-search text-gray-400" />,
  User: () => <i className="fas fa-user text-gray-700" />,
  Cart: () => <i className="fas fa-shopping-bag text-gray-700" />,
  Menu: () => <i className="fas fa-bars text-gray-700" />,
  Close: () => <i className="fas fa-times text-gray-700" />,
  ChevronDown: () => <i className="fas fa-chevron-down text-[10px] ml-1 text-gray-400" />,
  ChevronRight: () => <i className="fas fa-chevron-right text-[10px] ml-1 text-gray-400" />,
};

// ----- Navbar Component -----
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const shopDropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target)) {
        setIsShopDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) alert(`Searching for: "${searchQuery}"`);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    console.log(`Filtering by: ${cat}`);
  };

  const handleCartClick = () => alert('🛒 Your cart is empty.');
  
  const handleUserClick = () => {
    if (user) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ----- Main Navbar ----- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-800 hover:text-blue-600 transition-colors">
                Shopshere
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {/* Shop dropdown */}
              <div className="relative" ref={shopDropdownRef}>
                <button
                  onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                  className="nav-link flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md"
                >
                  Shop <Icons.ChevronDown />
                </button>
                {isShopDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-[640px] xl:w-[720px] bg-white rounded-xl shadow-2xl border border-gray-100 mega-dropdown p-6 z-50">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h4>
                        <ul className="space-y-2">
                          {shopCategories.map((item, idx) => (
                            <li key={idx}>
                              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <i className={`${item.icon} w-4 text-gray-400`}></i> {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Collections</h4>
                        <ul className="space-y-2">
                          {shopCollections.map((item, idx) => (
                            <li key={idx}>
                              <a href="#" className={`block px-3 py-2 text-sm font-medium ${item.color} hover:bg-blue-50 rounded-lg transition-colors`}>
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <a href="#" className="inline-flex items-center text-sm text-blue-600 font-medium hover:underline">
                            View All Products <Icons.ChevronRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="#" className="nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md">New Arrivals</a>
              <a href="#" className="nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md">Collections</a>
              <a href="#" className="nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md">Sale</a>
              <a href="#" className="nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md">Contact</a>
            </div>

            {/* Right section: Search + Icons + Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop search */}
              <form
                onSubmit={handleSearch}
                className={`search-wrapper hidden sm:flex items-center border rounded-full px-4 py-1.5 transition-all duration-300 ${
                  isSearchActive ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchActive(true)}
                  onBlur={() => setIsSearchActive(false)}
                  className="w-40 lg:w-52 xl:w-64 py-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
                <button type="submit" className="ml-1 text-gray-400 hover:text-blue-500 transition-colors">
                  <Icons.Search />
                </button>
              </form>

              {/* Mobile search icon */}
              <button
                className="sm:hidden text-gray-600 hover:text-blue-600 p-1.5"
                onClick={() => {
                  const query = prompt('Search for products:');
                  if (query?.trim()) alert(`Searching for: "${query}"`);
                }}
              >
                <i className="fas fa-search text-lg"></i>
              </button>

              {/* Profile Icon with Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={handleUserClick}
                  className="text-gray-600 hover:text-blue-600 p-1.5 transition-colors"
                  aria-label="User menu"
                >
                  <Icons.User />
                </button>

                {/* Profile Popup */}
                {isProfileOpen && user && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="px-2 py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <i className="fas fa-user-circle w-4"></i> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <i className="fas fa-box w-4"></i> Orders
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <i className="fas fa-sign-out-alt w-4"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button onClick={handleCartClick} className="relative text-gray-600 hover:text-blue-600 p-1.5 transition-colors">
                <Icons.Cart />
                <span className="cart-badge absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-blue-600 p-1.5 ml-1 transition-colors"
              >
                {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ----- Category Bar (below navbar) ----- */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="categories-scroll flex items-center gap-1 sm:gap-2 py-2.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`category-chip px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'active border-blue-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ----- Mobile Menu Drawer ----- */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
              <Icons.Close />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-1">
              {/* Shop dropdown in mobile */}
              <div>
                <button
                  onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                  className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Shop
                  <span className={`text-gray-400 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`}>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </span>
                </button>
                {isShopDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-3">
                    {[...shopCategories, ...shopCollections].map((item, idx) => (
                      <a key={idx} href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">New Arrivals</a>
              <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">Collections</a>
              <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">Sale</a>
              <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">Contact</a>
            </div>

            {/* Mobile search */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <form onSubmit={handleSearch} className="flex items-center border rounded-full px-4 py-2 border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
                <button type="submit" className="ml-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Icons.Search />
                </button>
              </form>
            </div>

            {/* Mobile user actions */}
            <div className="mt-4 flex items-center gap-4 pt-4 border-t border-gray-100">
              {user ? (
                <>
                  <span className="text-sm text-gray-700">Hello, {user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    <i className="fas fa-user"></i> Sign In
                  </Link>
                  <Link to="/register" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;