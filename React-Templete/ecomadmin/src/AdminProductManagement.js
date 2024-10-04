import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://your-api-base-url';

const AdminProductManagement = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    price: '',
    ImgUrl: '',
    category: { name: '', description: '' },
    availableOptions: [
      { name: '', values: [''] }, // Start with one option for Product
    ],
  });
  const [newSKU, setNewSKU] = useState({
    quantity: '',
    product: '',
    category: { name: '' },
    options: [{ name: '', value: '' }] // Start with one option for SKU
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
      console.error('Error fetching products:', error);
      setAlertMessage('Failed to fetch products');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
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
        body: JSON.stringify(newSKU)
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
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAlertMessage('Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      setAlertMessage('Error deleting product');
    }
  };

  // Handle changes for SKU Options
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

  return (
    <div>
      <h1>Admin Product Management</h1>

      {alertMessage && <div>{alertMessage}</div>}

      <div>
        <button onClick={() => setActiveTab('products')}>Products</button>
        <button onClick={() => setActiveTab('create-product')}>Create Product</button>
        <button onClick={() => setActiveTab('create-sku')}>Create SKU</button>
      </div>

      {activeTab === 'products' && (
        <div>
          <h2>Product List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>${product.price}</td>
                  <td>{product.category?.name}</td>
                  <td>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'create-product' && (
        <div>
          <h2>Create New Product</h2>
          <form onSubmit={handleCreateProduct}>
            <div>
              <label>
                Product Name:
                <input
                  value={newProduct.productName}
                  onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <input
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Price:
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Image URL:
                <input
                  value={newProduct.ImgUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, ImgUrl: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Category Name:
                <input
                  value={newProduct.category.name}
                  onChange={(e) => setNewProduct({ ...newProduct, category: { ...newProduct.category, name: e.target.value } })}
                  required
                />
              </label>
            </div>

            {/* Available Options for Product can go here */}
            <div>
              <h3>Available Options</h3>
              {/* Option inputs for product */}
            </div>

            <button type="submit">Create Product</button>
          </form>
        </div>
      )}

      {activeTab === 'create-sku' && (
        <div>
          <h2>Create New SKU</h2>
          <form onSubmit={handleCreateSKU}>
            <div>
              <label>
                Quantity:
                <input
                  type="number"
                  value={newSKU.quantity}
                  onChange={(e) => setNewSKU({ ...newSKU, quantity: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Product ID:
                <input
                  value={newSKU.product}
                  onChange={(e) => setNewSKU({ ...newSKU, product: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Category Name:
                <input
                  value={newSKU.category.name}
                  onChange={(e) => setNewSKU({ ...newSKU, category: { ...newSKU.category, name: e.target.value } })}
                  required
                />
              </label>
            </div>

            <div>
              <h3>SKU Options</h3>
              {newSKU.options.map((option, index) => (
                <div key={index}>
                  <label>
                    Option Name:
                    <input
                      value={option.name}
                      onChange={(e) => handleSKUOptionChange(index, 'name', e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Option Value:
                    <input
                      value={option.value}
                      onChange={(e) => handleSKUOptionChange(index, 'value', e.target.value)}
                      required
                    />
                  </label>
                  <button type="button" onClick={() => removeSKUOption(index)}>
                    Remove Option
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSKUOption}>
                Add Option
              </button>
            </div>

            <button type="submit">Create SKU</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
