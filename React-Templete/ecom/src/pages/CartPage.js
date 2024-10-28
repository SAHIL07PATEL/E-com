import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, ArrowLeft, Trash2, SquareMinus, SquarePlus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get auth token from sessionStorage
  const getAuthToken = () => sessionStorage.getItem('token');

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('https://e-come-hyh8.onrender.com/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load cart items');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, sku, delta) => {
    try {
      const token = getAuthToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const item = cartItems.find(i => i._id === itemId);
      const newQuantity = Math.max(1, (item.quantity || 0) + delta);

      await axios.patch(
        `https://e-come-hyh8.onrender.com/cart/${itemId}`,
        {
          quantity: newQuantity,
          sku: sku
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state
      setCartItems(items =>
        items.map(item =>
          item._id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`https://e-come-hyh8.onrender.com/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update local state
      setCartItems(items => items.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

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

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                    <li key={item._id} className="p-6 flex items-center">
                      <img 
                        src={item.product.imgUrl || '/api/placeholder/80/80'} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-500 mt-1">
                          SKU: {item.sku}
                        </p>
                        <p className="text-gray-500">
                          ${item.product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.sku, -1)}
                            className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                          >
                            <SquareMinus className="h-5 w-5" />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.sku, 1)}
                            className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                          >
                            <SquarePlus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
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
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </button>
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