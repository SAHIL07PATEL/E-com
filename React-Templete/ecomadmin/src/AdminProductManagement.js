import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://e-come-hyh8.onrender.com';

const AdminProductManagement = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imgUrl: '',
    category: '',
    options: [{ name: '', values: [''] }]
  });
  const [newSKU, setNewSKU] = useState({
    optionValues: {},
    quantity: '',
    price: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [skuDetails, setSkuDetails] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setAlertMessage('Failed to fetch products');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        setAlertMessage('Product created successfully');
        fetchProducts();
        setNewProduct({
          name: '',
          description: '',
          price: '',
          imgUrl: '',
          category: '',
          options: [{ name: '', values: [''] }]
        });
      } else {
        setAlertMessage('Failed to create product');
      }
    } catch (error) {
      setAlertMessage('Error creating product');
    }
  };

  const handleCreateSKU = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      setAlertMessage('Please select a product first');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/products/${selectedProduct._id}/sku-from-options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSKU),
      });
      if (response.ok) {
        setAlertMessage('SKU created successfully');
        fetchSkuDetails(selectedProduct._id); // Fetch SKU details after creating
        setNewSKU({
          optionValues: {},
          quantity: '',
          price: ''
        });
      } else {
        setAlertMessage('Failed to create SKU');
      }
    } catch (error) {
      setAlertMessage('Error creating SKU');
    }
  };

  const fetchSkuDetails = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/skus`);
      const data = await response.json();
      setSkuDetails(data);
    } catch (error) {
      setAlertMessage('Failed to fetch SKU details');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAlertMessage('Product deleted successfully');
        fetchProducts();
      } else {
        setAlertMessage('Failed to delete product');
      }
    } catch (error) {
      setAlertMessage('Error deleting product');
    }
  };

  const handleAddOption = () => {
    setNewProduct({
      ...newProduct,
      options: [...newProduct.options, { name: '', values: [''] }]
    });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newProduct.options];
    updatedOptions[index][field] = value;
    setNewProduct({ ...newProduct, options: updatedOptions });
  };

  const handleAddOptionValue = (index) => {
    const updatedOptions = [...newProduct.options];
    updatedOptions[index].values.push('');
    setNewProduct({ ...newProduct, options: updatedOptions });
  };

  const handleOptionValueChange = (optionIndex, valueIndex, value) => {
    const updatedOptions = [...newProduct.options];
    updatedOptions[optionIndex].values[valueIndex] = value;
    setNewProduct({ ...newProduct, options: updatedOptions });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Admin Product Management</h1>

        {alertMessage && (
          <div className="mb-6 p-4 text-red-500 text-center bg-red-50 rounded-lg shadow">
            {alertMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
              activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('create-product')}
            className={`py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
              activeTab === 'create-product' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Create Product
          </button>
          <button
            onClick={() => setActiveTab('create-sku')}
            className={`py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
              activeTab === 'create-sku' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Create SKU
          </button>
        </div>

        {/* Products List */}
        {activeTab === 'products' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product List</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-6 py-3 text-gray-800">Product Name</th>
                  <th className="px-6 py-3 text-gray-800">Price</th>
                  <th className="px-6 py-3 text-gray-800">Category</th>
                  <th className="px-6 py-3 text-gray-800">Options</th>
                  <th className="px-6 py-3 text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {product.options?.length > 0 ? (
                        <ul className="list-disc pl-4">
                          {product.options.map((option, i) => (
                            <li key={i}>
                              <strong>{option.name}:</strong> {option.values.join(', ')}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No Options</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:underline mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setActiveTab('create-sku');
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Add SKU
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create Product Form */}
        {activeTab === 'create-product' && (
          <form onSubmit={handleCreateProduct} className="mt-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.imgUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imgUrl: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Options</h3>
              {newProduct.options.map((option, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <input
                    type="text"
                    placeholder="Option Name"
                    value={option.name}
                    onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div>
                    <h4 className="font-semibold mb-2">Values</h4>
                    {option.values.map((value, valueIndex) => (
                      <input
                        key={valueIndex}
                        type="text"
                        placeholder="Value"
                        value={value}
                        onChange={(e) => handleOptionValueChange(index, valueIndex, e.target.value)}
                        className="w-full mb-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddOptionValue(index)}
                      className="text-blue-500 hover:underline mb-2"
                    >
                      Add Value
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="text-blue-500 hover:underline"
              >
                Add Option
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Product
            </button>
          </form>
        )}

        {/* Create SKU Form */}
        {activeTab === 'create-sku' && selectedProduct && (
          <form onSubmit={handleCreateSKU} className="mt-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create SKU for {selectedProduct.name}</h2>
            {selectedProduct.options.map((option) => (
              <div key={option.name}>
                <h3 className="font-semibold">{option.name}</h3>
                {option.values.map((value) => (
                  <label key={value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const updatedValues = { ...newSKU.optionValues };
                        if (e.target.checked) {
                          updatedValues[option.name] = value;
                        } else {
                          delete updatedValues[option.name];
                        }
                        setNewSKU({ ...newSKU, optionValues: updatedValues });
                      }}
                    />
                    <span className="ml-2">{value}</span>
                  </label>
                ))}
              </div>
            ))}
            <input
              type="number"
              placeholder="Quantity"
              value={newSKU.quantity}
              onChange={(e) => setNewSKU({ ...newSKU, quantity: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={newSKU.price}
              onChange={(e) => setNewSKU({ ...newSKU, price: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create SKU
            </button>
          </form>
        )}

        {/* SKU Details */}
        {skuDetails.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">SKU Details</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-6 py-3 text-gray-800">SKU ID</th>
                  <th className="px-6 py-3 text-gray-800">Options</th>
                  <th className="px-6 py-3 text-gray-800">Quantity</th>
                  <th className="px-6 py-3 text-gray-800">Price</th>
                </tr>
              </thead>
              <tbody>
                {skuDetails.map((sku) => (
                  <tr key={sku._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">{sku._id}</td>
                    <td className="px-6 py-4">
                      {Object.entries(sku.optionValues).map(([key, value]) => (
                        <span key={key}>
                          <strong>{key}:</strong> {value} <br />
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4">{sku.quantity}</td>
                    <td className="px-6 py-4">${sku.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductManagement;
