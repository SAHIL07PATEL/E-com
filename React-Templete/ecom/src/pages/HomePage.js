import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const HomePage = () => {
  const sliderSettings = {
    dots: false,  // Changed this to false to remove the dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false  // Also removed arrows for a cleaner look
  };

  const featuredProducts = [
    { id: 1, name: "Wireless Earbuds", description: "Compact wireless earbuds with noise cancellation and long battery life.", price: 19.99, image: "./images/air-buds.jpg" },
    { id: 2, name: "Smartwatch", description: "Advanced smartwatch with fitness tracking and heart rate monitor.", price: 29.99, image: "./images/smart-watch.jpg" },
    { id: 3, name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with rich sound and waterproof design.", price: 39.99, image: "./images/blootuth speker.jpg" },
    { id: 4, name: "4K Action Camera", description: "High-resolution action camera with 4K recording and wide-angle lens.", price: 49.99, image: "./images/camara.jpg" },
  ];

  const sliderData = [
    {
      id: 1,
      imgSrc: './images/slide1.jpg',
      title: 'Welcome to Our Store',
      link: '/products',
    },
    {
      id: 2,
      imgSrc: './images/slide4.jpg',
      title: 'Discover Our Exclusive Offers',
      link: '/products',
    },
    {
      id: 3,
      imgSrc: './images/slide3.jpg',
      title: 'Shop the Latest Trends',
      link: '/products',
    },
  ];
  

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <Slider {...sliderSettings}>
          {sliderData.map((v) => (
            <div key={v.id} className="relative">
              <img src={`${v.imgSrc}`} alt={`Slide ${v}`} className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-4">{v.title}</h2>
                  <Link to={`${v.link}`} className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </header>

      {/* Rest of the component remains unchanged */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

     



    </div>
  );
};

export default HomePage;