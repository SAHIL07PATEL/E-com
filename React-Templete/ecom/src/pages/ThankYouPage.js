import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

// ThankYouPage Component
const ThankYouPage = () => {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-6">Your order has been successfully placed and is being processed.</p>
          <ShoppingBag className="mx-auto h-16 w-16 text-indigo-600 mb-6" />
          <p className="text-gray-600 mb-8">We'll send you an email with your order details and tracking information once your item(s) have shipped.</p>
          <Link
            to="/"
            className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 inline-flex items-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  };

  export default ThankYouPage;