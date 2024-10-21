import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-100 py-8">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-6">
        <div className="bg-indigo-600 text-white text-center py-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Discover Our Exclusive Collection</h2>
          <p className="text-lg">Find the best products at unbeatable prices!</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={product.image} // Make sure your product object has an 'image' property
                alt={product.name}
                className="w-full  object-contain"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                {/* Star Rating */}
                <p className="text-gray-500 mb-4">{product.description}</p>
                <Link
                  to={`/product/${product.id}`} // Link to the product detail page
                  className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
