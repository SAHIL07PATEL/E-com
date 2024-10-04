import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://e-come-hyh8.onrender.com';

const AdminProductManagement = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    price: '',
    ImgUrl: '',
    category: { name: '', description: '' },
    availableOptions: [{ name: '', values: [''] }],
  });
  const [newSKU, setNewSKU] = useState({
    quantity: '',
    product: '',
    category: { name: '' },
    options: [{ name: '', value: '' }],
  });
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
          productName: '',
          description: '',
          price: '',
          ImgUrl: '',
          category: { name: '', description: '' },
          availableOptions: [{ name: '', values: [''] }],
        });
      }
    } catch (error) {
      setAlertMessage('Error creating product');
    }
  };

  const handleCreateSKU = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/products/sku`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSKU),
      });
      if (response.ok) {
        setAlertMessage('SKU created successfully');
        setNewSKU({
          quantity: '',
          product: '',
          category: { name: '' },
          options: [{ name: '', value: '' }],
        });
      }
    } catch (error) {
      setAlertMessage('Error creating SKU');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAlertMessage('Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      setAlertMessage('Error deleting product');
    }
  };

  // Handle SKU Option changes
  const handleSKUOptionChange = (index, field, value) => {
    const updatedOptions = [...newSKU.options];
    updatedOptions[index][field] = value;
    setNewSKU((prevState) => ({
      ...prevState,
      options: updatedOptions,
    }));
  };

  // Add new SKU Option
  const addSKUOption = () => {
    setNewSKU((prevState) => ({
      ...prevState,
      options: [...prevState.options, { name: '', value: '' }],
    }));
  };

  // Remove SKU Option
  const removeSKUOption = (index) => {
    const updatedOptions = [...newSKU.options];
    updatedOptions.splice(index, 1);
    setNewSKU((prevState) => ({
      ...prevState,
      options: updatedOptions,
    }));
  };

  // Functions for handling product available options:

  // Handle change for option name
  const handleOptionNameChange = (index, value) => {
    const updatedOptions = [...newProduct.availableOptions];
    updatedOptions[index].name = value;
    setNewProduct({ ...newProduct, availableOptions: updatedOptions });
  };

  // Handle change for option values (comma-separated)
  const handleOptionValueChange = (index, value) => {
    const updatedOptions = [...newProduct.availableOptions];
    updatedOptions[index].values = value.split(',').map((v) => v.trim()); // Split by comma
    setNewProduct({ ...newProduct, availableOptions: updatedOptions });
  };

  // Add a new option value (defaulting to an empty string)
  const addOptionValue = (optionIndex) => {
    const updatedOptions = [...newProduct.availableOptions];
    updatedOptions[optionIndex].values.push(''); // Add a new empty value
    setNewProduct({ ...newProduct, availableOptions: updatedOptions });
  };

  // Remove an option value
  const removeOptionValue = (optionIndex, valueIndex) => {
    const updatedOptions = [...newProduct.availableOptions];
    updatedOptions[optionIndex].values.splice(valueIndex, 1); // Remove the value
    setNewProduct({ ...newProduct, availableOptions: updatedOptions });
  };

  // Add a new option field (name and value set)
  const addOptionField = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      availableOptions: [...prevProduct.availableOptions, { name: '', values: [''] }],
    }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Product Management</h1>

        {alertMessage && <div className="mb-4 text-red-500 text-center">{alertMessage}</div>}

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-6 rounded-lg text-white font-medium ${activeTab === 'products' ? 'bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('create-product')}
            className={`py-2 px-6 rounded-lg text-white font-medium ${activeTab === 'create-product' ? 'bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
          >
            Create Product
          </button>
          <button
            onClick={() => setActiveTab('create-sku')}
            className={`py-2 px-6 rounded-lg text-white font-medium ${activeTab === 'create-sku' ? 'bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
          >
            Create SKU
          </button>
        </div>

        {/* Products List */}
        {activeTab === 'products' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <table className="min-w-full bg-white table-auto border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Options</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-center border-t">
                    <td className="px-4 py-2">{product.productName}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2">{product.category?.name}</td>
                    <td className="px-4 py-2">
                      {product.availableOptions.length > 0 ? (
                        <ul>
                          {product.availableOptions.map((option, i) => (
                            <li key={i}>
                              <strong>{option.name}:</strong> {option.values.join(', ')}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No Options</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
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
          <form onSubmit={handleCreateProduct} className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.ImgUrl}
                onChange={(e) => setNewProduct({ ...newProduct, ImgUrl: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Category Name"
                value={newProduct.category.name}
                onChange={(e) => setNewProduct({ ...newProduct, category: { ...newProduct.category, name: e.target.value } })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Category Description"
                value={newProduct.category.description}
                onChange={(e) => setNewProduct({ ...newProduct, category: { ...newProduct.category, description: e.target.value } })}
                className="w-full p-2 border border-gray-300 rounded"
              />

              {/* Available Options */}
              <h3 className="text-lg font-semibold">Available Options</h3>
              {newProduct.availableOptions.map((option, index) => (
                <div key={index} className="border p-4 rounded bg-gray-50 mb-4">
                  <input
                    type="text"
                    placeholder="Option Name"
                    value={option.name}
                    onChange={(e) => handleOptionNameChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Option Values (comma-separated)"
                    value={option.values.join(', ')} // Join values with comma for display
                    onChange={(e) => handleOptionValueChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <button type="button" onClick={() => addOptionValue(index)} className="text-blue-500 hover:underline">
                    Add Value
                  </button>
                  <button
                    type="button"
                    onClick={() => removeOptionValue(index, 0)} // Remove first value for demonstration
                    className="text-red-500 hover:underline ml-2"
                  >
                    Remove First Value
                  </button>
                </div>
              ))}
              <button type="button" onClick={addOptionField} className="text-blue-500 hover:underline">
                Add Option
              </button>

              <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Create Product
              </button>
            </div>
          </form>
        )}

        {/* Create SKU Form */}
        {activeTab === 'create-sku' && (
          <form onSubmit={handleCreateSKU} className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Create SKU</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Quantity"
                value={newSKU.quantity}
                onChange={(e) => setNewSKU({ ...newSKU, quantity: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Product ID"
                value={newSKU.product}
                onChange={(e) => setNewSKU({ ...newSKU, product: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Category Name"
                value={newSKU.category.name}
                onChange={(e) => setNewSKU({ ...newSKU, category: { name: e.target.value } })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />

              {/* SKU Options */}
              <h3 className="text-lg font-semibold">Options</h3>
              {newSKU.options.map((option, index) => (
                <div key={index} className="border p-4 rounded bg-gray-50 mb-4">
                  <input
                    type="text"
                    placeholder="Option Name"
                    value={option.name}
                    onChange={(e) => handleSKUOptionChange(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Option Value"
                    value={option.value}
                    onChange={(e) => handleSKUOptionChange(index, 'value', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeSKUOption(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove Option
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSKUOption} className="text-blue-500 hover:underline">
                Add Option
              </button>

              <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Create SKU
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProductManagement;
