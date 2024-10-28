import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  const user = localStorage.getItem('user');
  if (user) {
    setIsLoggedIn(true);
    const userId = JSON.parse(user).id;
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCartItems(cart);
  } else {
    navigate('/login');
  }
}, [navigate]);

const handleRemoveFromCart = (productId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartKey = `cart_${user.id}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  setCartItems(cart);

  fetch(`http://localhost:3001/addtocart/${productId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        toast.success('Item removed from cart');
      }
    })
};

const handleQuantityChange = (productId, quantity) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartKey = `cart_${user.id}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart = cart.map(item => {
    if (item.id === productId) {
      return { ...item, quantity };
    }
    return item;
  });

  localStorage.setItem(cartKey, JSON.stringify(cart));
  setCartItems(cart);

  const productToUpdate = cart.find(item => item.id === productId);
  
  fetch(`http://localhost:3001/addtocart/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productToUpdate),
  })
    .then(response => {
      if (response.ok) {
        toast.success('Cart item quantity updated');
      }
    })
};

const handleCheckout = () => {
  alert('Proceeding to checkout...');
};

if (!isLoggedIn) {
  navigate('/login');
}

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img src={`${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                  disabled={item.quantity === 1}


                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
