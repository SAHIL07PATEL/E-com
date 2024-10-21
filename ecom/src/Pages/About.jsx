import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-12 h-12 text-blue-500 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?ecommerce)' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">Welcome to ShopSmart</h1>
          <p className="text-lg md:text-xl mb-8 text-center md:text-left">Your one-stop destination for all things trendy and essential</p>
          <div className="flex justify-center md:justify-start">
            <a href="#learn-more" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" id="learn-more">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-lg mb-6">
                Founded in 2010, ShopSmart has grown from a small local business to a leading online retailer. Our journey began with a simple idea: to make quality products accessible to everyone, everywhere.
              </p>
              <p className="text-lg mb-6">
                Over the years, we've expanded our product range, improved our services, and built a community of happy shoppers. But our core mission remains the same - to provide you with the best shopping experience possible.
              </p>
              <p className="text-lg">
                We're more than just an online store. We're a team of passionate individuals who believe in the power of great products to improve people's lives. From cutting-edge electronics to timeless fashion pieces, we curate our selection with you in mind.
              </p>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Team" className="rounded-lg shadow-xl w-full object-cover" />
              <div className="absolute bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg">
                <p className="font-semibold">10+ Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
              title="Wide Selection" 
              description="From fashion to electronics, find everything you need in one place."
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Fast Delivery" 
              description="Enjoy quick and reliable shipping to your doorstep."
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
              title="24/7 Support" 
              description="Our customer service team is always here to help you."
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
              title="Community" 
              description="Join our community of smart shoppers and stay updated on the latest trends."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers and experience the ShopSmart difference today!</p>
          <a href="/shop" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors duration-300">Shop Now</a>
        </div>
      </section>
    </div>
  );
};

export default About;
