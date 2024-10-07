import React from 'react';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

const ProductList = ({ products, onEdit, onDelete, onView, onCreateSku }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product._id}>
            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <button onClick={() => onEdit(product)} className="p-1 rounded-full hover:bg-gray-100">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(product._id)} className="p-1 rounded-full hover:bg-gray-100">
                  <Trash2 className="h-4 w-4" />
                </button>
                <button onClick={() => onView(product)} className="p-1 rounded-full hover:bg-gray-100">
                  <Eye className="h-4 w-4" />
                </button>
                <button onClick={() => onCreateSku(product)} className="p-1 rounded-full hover:bg-gray-100">
                  <PlusCircle className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductList;