import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Footer from './components/Footer';
import About from './Pages/About';
import Contact from './Pages/Contect';
import ProductList from './Pages/ProductList';
import ProductDetails from './Pages/ProductDetils';
import AddToCartPage from './Pages/AddToCartPage';
import Profile from './Pages/Profile';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<ProductList/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<AddToCartPage />} />
            <Route path="/welcome" element={<Profile />} />

            {/* Uncomment and add routes for product details and cart as needed */}
            {/* <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
