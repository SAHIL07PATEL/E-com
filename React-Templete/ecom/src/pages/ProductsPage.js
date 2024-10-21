import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
  </div>
);


// ProductsPage component
const ProductsPage = () => {
  const [products, setProducts] = useState([]); // State to store the fetched products
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://e-come-hyh8.onrender.com/products');
        setProducts(response.data); // Assuming the response is an array of products
        setLoading(false);
      } catch (err) {
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  

  // Get unique categories from products
  // const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter and sort products
  // const filteredProducts = products
  //   .filter(product =>
  //     (selectedCategory === 'All' || product.category === selectedCategory) &&
  //     product.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   .sort((a, b) => {
  //     switch (sortBy) {
  //       case 'price-low-high':
  //         return a.price - b.price;
  //       case 'price-high-low':
  //         return b.price - a.price;
  //       case 'name-a-z':
  //         return a.name.localeCompare(b.name);
  //       case 'name-z-a':
  //         return b.name.localeCompare(a.name);
  //       default:
  //         return 0;
  //     }
  //   });

  // Loading and error handling
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Products</h1>
          {/* <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div> */}
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <SlidersHorizontal className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl mb-4 text-gray-600">No products found</p>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
