import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ProductsPage from './pages/ProductsPage';
// import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import ProductPageWrapper from './pages/ProductPageWrapper';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './Context/FavoritesContext';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import Aboutus from './pages/Aboutus';
import ContactUs from './pages/Contactus';
import Deals from './pages/Deals';
import Collections from './pages/Collection';
// import OrderPage from './pages/OrderPage';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <FavoritesProvider>

        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/products" element={<ProductsPage />} />
            {/* 
            <Route path="/order" element={<OrderPage />} /> */}
            <Route path="/product/:id" element={<ProductPageWrapper />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
             <Route path="/login" element={<LoginPage />} />
             <Route path="/register" element={<RegisterPage />} />
             <Route path='/checkout' element={<CheckoutPage/>}></Route>
             <Route path='/thank-you' element={<ThankYouPage/>}></Route>
             <Route path="/favorites" element={<FavoritesPage />} />
             <Route path="/about" element={<Aboutus />} />
             <Route path="/contact-us" element={<ContactUs />} />
             <Route path="/deals" element={<Deals />} />
             <Route path="/collections" element={<Collections />} />

             
          </Routes>
          <Toaster position="bottom-right" />
          <Footer/>
        </div>
            </FavoritesProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;