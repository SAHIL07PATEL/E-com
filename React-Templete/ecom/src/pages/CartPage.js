import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CreditCard, Trash, Trash2, Plus, PlusCircle, Minus, MinusCircleIcon, Square, SquareMinus, SquarePlus } from 'lucide-react';

// CartPage Component
const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ultra HD Smart TV', price: 799.99, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Noise-Cancelling Headphones', price: 249.99, quantity: 2, image: '/api/placeholder/80/80' },
    { id: 3, name: 'Smartphone X12', price: 699.99, quantity: 1, image: '/api/placeholder/80/80' },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl mb-4 text-gray-600">Your cart is empty</p>
            <Link
              to="/products"
              className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 inline-flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6 flex items-center">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                          >
                            <SquareMinus className="h-5 w-5" />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                          >
                            <SquarePlus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <p className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-600 focus:outline-none mt-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">${getTotalPrice()}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;