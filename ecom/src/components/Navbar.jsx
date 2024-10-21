import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State to track cart count
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);

      // Fetch initial cart count from localStorage
      const cartKey = `cart_${JSON.parse(user).id}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCartCount(cart.length);
      
    } else {
      setIsLoggedIn(false);
      setCartCount(0); // No items in cart if the user is not logged in
    }
  }, []); // This useEffect will run on component mount and when the page is refreshed

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-indigo-600">
            <Link to="/">ShopLogo</Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold transition duration-300'
                  : 'text-gray-700 hover:text-indigo-600 transition duration-300'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold transition duration-300'
                  : 'text-gray-700 hover:text-indigo-600 transition duration-300'
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold transition duration-300'
                  : 'text-gray-700 hover:text-indigo-600 transition duration-300'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold transition duration-300'
                  : 'text-gray-700 hover:text-indigo-600 transition duration-300'
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Cart and Login/Signup */}
          <div className="hidden md:flex items-center space-x-4">
            <Link onClick={handleCartClick} className="relative">
              <ShoppingCartIcon className="h-8 w-8 text-gray-700 hover:text-indigo-600 transition duration-300" />
              {/* Cart badge */}
              {cartCount > 0 ? (
                <span className="absolute top-[-5px] right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full text-[10px]">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute top-[-5px] right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full text-[10px]">
                0
              </span>
              )
              }
            </Link>

            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-indigo-600 font-semibold transition duration-300'
                      : 'text-gray-700 hover:text-indigo-600 transition duration-300'
                  }
                >
                  Login
                </NavLink>
                
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300'
                      : 'bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300'
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/welcome"
                className={({ isActive }) =>
                  isActive
                    ? 'text-indigo-600 font-semibold transition duration-300'
                    : 'text-gray-700 hover:text-indigo-600 transition duration-300'
                }
              >
                Profile
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              {menuOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {menuOpen && (
          <div className="md:hidden px-4 py-3 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'block text-indigo-600 font-semibold transition duration-300'
                  : 'block text-gray-700 hover:text-indigo-600 transition duration-300'
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? 'block text-indigo-600 font-semibold transition duration-300'
                  : 'block text-gray-700 hover:text-indigo-600 transition duration-300'
              }
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'block text-indigo-600 font-semibold transition duration-300'
                  : 'block text-gray-700 hover:text-indigo-600 transition duration-300'
              }
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'block text-indigo-600 font-semibold transition duration-300'
                  : 'block text-gray-700 hover:text-indigo-600 transition duration-300'
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-indigo-600 font-semibold transition duration-300'
                      : 'block text-gray-700 hover:text-indigo-600 transition duration-300'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? 'block bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300'
                      : 'block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/welcome"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-indigo-600 font-semibold transition duration-300'
                    : 'block text-gray-700 hover:text-indigo-600 transition duration-300'
                }
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
