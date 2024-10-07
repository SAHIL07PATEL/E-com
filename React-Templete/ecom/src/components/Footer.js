import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are dedicated to offering the best products with excellent customer service.
              Your satisfaction is our top priority.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/products" className="text-gray-400 hover:text-white">Shop</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Your Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
