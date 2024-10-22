import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Transition } from '@headlessui/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if token exists in sessionStorage
  useEffect(() => {
     // eslint-disable-next-line no-unused-vars
    const token = sessionStorage.getItem('token');
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
     // eslint-disable-next-line no-unused-vars
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
      console.log("login");
    }
  };

  const handleNavigateCart = (e) => {
    e.preventDefault();
     // eslint-disable-next-line no-unused-vars
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/cart');
    } else {
      navigate('/login');
      console.log("login");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center mr-14">
              <img className="h-16 w-auto" src="./images/shoplogo.png" alt="Logo" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <CustomNavLink to="/" exact>
                Home
              </CustomNavLink>
              <CustomNavLink to="/products" exact>
                Shop
              </CustomNavLink>
              <CustomNavLink to="/collections">
                Collections
              </CustomNavLink>
              <CustomNavLink to="/deals">
                Deals
              </CustomNavLink>
              <CustomNavLink to="/about">
                About Us
              </CustomNavLink>
              <CustomNavLink to="/contact-us">
                Contact Us
              </CustomNavLink>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <NavIcon
              to="/cart"
              icon={<ShoppingCart className="h-6 w-6" />}
              onClick={handleNavigateCart}
            />
            <NavIcon to="/favorites" icon={<Heart className="h-6 w-6" />} />
            <NavIcon to="/profile" icon={<User className="h-6 w-6" />} onClick={handleNavigate} />
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/products">Shop</MobileNavLink>
            <MobileNavLink to="/collections">Collections</MobileNavLink>
            <MobileNavLink to="/deals">Deals</MobileNavLink>
            <MobileNavLink to="/about">About Us</MobileNavLink>
            <MobileNavLink to="/contact-us">Contact Us</MobileNavLink>
            <MobileNavLink to="/cart">Cart</MobileNavLink>
            <MobileNavLink to="/favorites">Favorites</MobileNavLink>
            <MobileNavLink to="/profile">Profile</MobileNavLink>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

const CustomNavLink = ({ to, children, exact }) => (
  <RouterNavLink
    to={to}
    exact={exact}
    className={({ isActive }) =>
      isActive
        ? "text-indigo-600 border-b-2 border-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
        : "text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
    }
  >
    {children}
  </RouterNavLink>
);

// Modified NavIcon to use NavLink's isActive prop for styling
const NavIcon = ({ to, icon, onClick }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "text-indigo-600"
        : "text-gray-500 hover:text-gray-900"
    }
    onClick={onClick}
  >
    {icon}
  </RouterNavLink>
);

const MobileNavLink = ({ to, children }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-600 text-base font-medium text-indigo-600"
        : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
    }
  >
    {children}
  </RouterNavLink>
);

export default Navbar;
