import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); 
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        console.log("Product details response:", response);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = (e) => {
    e.preventDefault(); // Prevent any default action that might refresh the page

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const cartKey = `cart_${user.id}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    const productIndex = cart.findIndex(item => item.id === product.id);
    console.log(productIndex);

    if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    console.log("Product added to cart:", product);
    navigate('/cart'); 

    window.location.reload(); 
  };

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10">
        {/* Product Image */}
        <div className="md:w-96 mb-6 md:mb-0">
          <img
            src={`.${product.image}`}
            alt={product.name}
            className="w-96 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-bold text-indigo-600">{product.name}</h1>
          <p className="text-2xl text-gray-700 mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button 
              onClick={addToCart} 
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Information Section */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            <ul className="mt-2 text-gray-600">
              <li>SKU: {product.id}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
