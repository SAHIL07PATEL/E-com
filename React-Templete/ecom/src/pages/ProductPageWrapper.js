import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ product }) => {
  // State for selected quantity
  const [quantity, setQuantity] = useState(1);

  // Add product to cart (this could integrate with your cart system, API, or global state like Redux)
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.productName} to the cart`);
    // Logic to add product to cart
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.ImgUrl}
            alt={product.productName}
            className="w-full max-w-md object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.productName}</h1>
          <p className="text-2xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300" 
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products (Optional) */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Replace this with dynamic related product data */}
          <RelatedProductCard product={{ id: 1, name: 'Related Product 1', price: 19.99, image: '/api/placeholder/200/200' }} />
          <RelatedProductCard product={{ id: 2, name: 'Related Product 2', price: 29.99, image: '/api/placeholder/200/200' }} />
          <RelatedProductCard product={{ id: 3, name: 'Related Product 3', price: 39.99, image: '/api/placeholder/200/200' }} />
        </div>
      </div>
    </div>
  );
};

const RelatedProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={product.image} alt={product.productName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <button className="bg-indigo-600 text-white py-2 px-4 mt-2 rounded-lg hover:bg-indigo-700 transition duration-300">
          View Product
        </button>
      </div>
    </div>
  );
};

// Sample product data for illustration purposes
const sampleProduct = {
  id: 1,
  name: 'Sample Product',
  price: 49.99,
  description:
    'This is a detailed description of the sample product. It provides features, benefits, and any other important information for the user.',
  image: '/api/placeholder/500/500',
};


const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
  </div>
);

const ProductPageWrapper = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store the product
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://e-come-hyh8.onrender.com/products/${id}`);
            console.log("Fetched product data:", response.data); // Check fetched data
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to load product.");
        } finally {
            setLoading(false); // Ensure loading is false in both success and error cases
        }
    };

    fetchProduct();
}, [id]);


  
  // Handle loading and error states
  if (loading) {
      return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Render error as a string
  }

  return <ProductPage product={product} />; // Render the ProductPage component with the fetched product
};

export default ProductPageWrapper;
