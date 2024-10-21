import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ product, productOptions }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedValue, setSelectedValue] = useState('');


  const handleAddToCart = () => {
    if (!selectedValue) {
      alert('Please select a Value before adding to cart.');
      return;
    }
   
    // Logic to add product to cart with the selected options
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.imgUrl}
            alt={product.productName}
            className="w-full max-w-md object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 ">{product.name}</h1>
          <p className="text-2xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
          <h3 className='font-bold'>Description :</h3>
          <p className="text-gray-700">{product.description}</p>

          {/* Size and Color Selectors */}
          <div className="space-y-4">
            {/* Size Selector */}

            {
              productOptions.map((v) => (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="size">
                    {v.name}
                  </label>
                  <select
                    id="size"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select {v.name}</option>
                    {v.values.map(values => (
                      <option key={values} value={values}>
                        {values}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            }


          </div>

          <div className="flex items-center space-x-4">
            {/* Quantity Selector */}
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

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
  </div>
);

const ProductPageWrapper = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store the product
  const [productOptions, setProductOptions] = useState(); // State to store the product options
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`https://e-come-hyh8.onrender.com/products/${id}`);
        const optionsResponse = await axios.get(`https://e-come-hyh8.onrender.com/products/${id}/options`);

        // Check if the data from the API is correct
        console.log("Fetched product options:", optionsResponse.data);

        // Update the states with the fetched data
        setProduct(productResponse.data);
        setProductOptions(optionsResponse.data.options)

      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product.");
      } finally {
        setLoading(false); // Ensure loading is false in both success and error cases
      }
    };

    fetchProduct();
  }, [id]);

  // Log productOptions when it changes
  useEffect(() => {
    console.log("Updated product options:", productOptions);
  }, [productOptions]);

  // Handle loading and error states
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Render error as a string
  }

  return <ProductPage product={product} productOptions={productOptions} />; // Render the ProductPage component with the fetched product and options
};

export default ProductPageWrapper;
