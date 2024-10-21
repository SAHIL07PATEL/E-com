import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white shadow-md mt-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <Link to="/" className="text-indigo-600 hover:text-indigo-400 transition duration-300">
              ShopLogo
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <Link
              to="/privacy-policy"
              className="hover:text-indigo-400 transition duration-300 mb-2 md:mb-0"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-indigo-400 transition duration-300 mb-2 md:mb-0"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="hover:text-indigo-400 transition duration-300 mb-2 md:mb-0"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="hover:text-indigo-400 transition duration-300 mb-2 md:mb-0"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 border-t border-gray-600 pt-4 text-center text-gray-400">
          <p>© 2024 ShopLogo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
