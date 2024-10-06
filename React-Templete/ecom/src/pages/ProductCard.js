import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useFavorites } from '../Context/FavoritesContext';

const ProductCard = ({ product }) => {
  const { _id, productName, description, price, ImgUrl } = product; // Use `productName` instead of `name`
  const { addToFavorites } = useFavorites();

  const handleAddToCart = () => {
    toast.success(`${productName} added to cart!`);
  };

  const handleAddToFavorites = () => {
    addToFavorites(product);
    toast.success(`${productName} added to favorites!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <Link to={`/product/${_id}`}>
          <img src={ImgUrl} alt={productName} className="w-full h-48 object-cover" />
        </Link>
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleAddToFavorites}
            className="p-1.5 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors duration-300"
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-1.5 rounded-full bg-indigo-600 bg-opacity-70 hover:bg-opacity-100 transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${_id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors duration-300">
            {productName} {/* Use `productName` */}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <span className="text-xl font-bold text-indigo-600">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
