import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from './Alert';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import SKUForm from './SKUForm';
import SKUDetails from './SKUDetails';

const API_BASE_URL = 'https://e-come-hyh8.onrender.com';

const AdminProductManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
  const [skuDetails, setSkuDetails] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Extract the active tab from the URL
  const activeTab = new URLSearchParams(location.search).get('tab') || 'products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const setActiveTab = (tab) => {
    navigate(`/admin/products?tab=${tab}`);
  };

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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/products/editproduct/${selectedProduct._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        setAlertMessage('Product updated successfully');
        fetchProducts();
        setIsEditing(false);
        setNewProduct({
          name: '',
          description: '',
          price: '',
          imgUrl: '',
          category: '',
          options: [{ name: '', values: [''] }]
        });
      } else {
        setAlertMessage('Failed to update product');
      }
    } catch (error) {
      setAlertMessage('Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/deleteproduct/${id}`, {
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
        fetchSkuDetails(selectedProduct._id);
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

  // ... [previous code remains the same until fetchSkuDetails]

  const fetchSkuDetails = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/skus`);
      const data = await response.json();
      setSkuDetails(data);
    } catch (error) {
      setAlertMessage('Failed to fetch SKU details');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Product Management</h1>
      <Alert message={alertMessage} />
      
      <div className="mb-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`py-2 px-4 border-b-2 ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={`ml-8 py-2 px-4 border-b-2 ${
                activeTab === 'create-product'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('create-product')}
            >
              Create Product
            </button>
            {selectedProduct && (
              <>
                <button
                  className={`ml-8 py-2 px-4 border-b-2 ${
                    activeTab === 'create-sku'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('create-sku')}
                >
                  Create SKU
                </button>
                <button
                  className={`ml-8 py-2 px-4 border-b-2 ${
                    activeTab === 'sku-details'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('sku-details')}
                >
                  SKU Details
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'products' && (
          <ProductList
            products={products}
            onEdit={(product) => {
              setSelectedProduct(product);
              setNewProduct(product);
              setIsEditing(true);
              setActiveTab('create-product');
            }}
            onDelete={handleDeleteProduct}
            onView={(product) => {
              setSelectedProduct(product);
              fetchSkuDetails(product._id);
              setActiveTab('sku-details');
            }}
            onCreateSku={(product) => {
              setSelectedProduct(product);
              setNewSKU({
                optionValues: {},
                quantity: '',
                price: ''
              });
              setActiveTab('create-sku');
            }}
          />
        )}
        {activeTab === 'create-product' && (
          <ProductForm
            product={newProduct}
            isEditing={isEditing}
            onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct}
            onChange={setNewProduct}
          />
        )}
        {activeTab === 'create-sku' && selectedProduct && (
          <SKUForm
            selectedProduct={selectedProduct}
            newSKU={newSKU}
            onSubmit={handleCreateSKU}
            onChange={setNewSKU}
          />
        )}
        {activeTab === 'sku-details' && selectedProduct && (
          <SKUDetails
            selectedProduct={selectedProduct}
            skuDetails={skuDetails}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductManagement;