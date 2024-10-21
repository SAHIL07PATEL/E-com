import React from 'react';
import Slider from 'react-slick'; // Install react-slick and slick-carousel for slider functionality
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Smartphone',
      price: 699.99,
      image: './images/product-08.jpg',
    },
    {
      id: 2,
      name: 'Laptop',
      price: 1299.99,
      image: './images/product-10.jpg',
    },
    {
      id: 3,
      name: 'Headphones',
      price: 199.99,
      image: './images/product-11.jpg',
    },
    {
      id: 4,
      name: 'Smart Watch',
      price: 249.99,
      image: './images/product-12.jpg',
    },
    {
      id: 5,
      name: 'Gaming Console',
      price: 499.99,
      image: './images/product-14.jpg',
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 1 on mobile devices
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640, // Mobile screen breakpoint
        settings: {
          slidesToShow: 1, // 1 product at a time on mobile
        },
      },
      {
        breakpoint: 1024, // Tablet and above
        settings: {
          slidesToShow: 3, // 3 products per slide on larger screens
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100">
      {/* Banner Section */}
      <div className="relative h-64 bg-blue-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full text-white">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Welcome to Our E-commerce Store
          </h1>
        </div>
      </div>

      {/* Featured Products Slider */}
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Featured Products</h2>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 mx-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full  object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Additional Content Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold">Quality Products</h3>
            <p className="text-gray-600">We offer only the best products that pass our quality standards.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold">Fast Shipping</h3>
            <p className="text-gray-600">Get your products delivered quickly and efficiently.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold">24/7 Support</h3>
            <p className="text-gray-600">Our customer support team is here to help you at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
