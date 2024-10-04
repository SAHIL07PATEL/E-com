import React from 'react';
import { Link } from 'react-router-dom';

const Aboutus = () => {
    return (
        <div>
            <section className="mb-12 bg-gray-50 py-12 rounded-lg shadow-lg">
                <div className="container mx-auto px-4 lg:flex lg:items-center lg:space-x-8">
                    {/* About Us Intro */}
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold text-indigo-600 mb-6">About Us</h2>
                        <p className="text-gray-700 text-lg mb-4">
                            At <span className="font-semibold text-indigo-600">Our Store</span>, we are dedicated to delivering the best shopping experience with our curated selection of high-quality products. From fashion to electronics, we ensure you find exactly what you're looking for.
                        </p>
                        <p className="text-gray-700 text-lg mb-4">
                            Our customer-centric approach and commitment to excellence have made us a trusted name in the industry. Whether you're shopping online or in-store, we strive to exceed your expectations with top-notch service and competitive prices.
                        </p>
                        <Link to="/contact" className="inline-block mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
                            Get in Touch
                        </Link>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0">
                        <img
                            src="./images/our-team.jpg"
                            alt="Our Team"
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mb-12 py-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-6">Our Mission</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Our mission is to provide quality products at competitive prices while offering exceptional customer service. We believe in making shopping easy, enjoyable, and accessible to everyone, everywhere.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="mb-12 bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Our Core Values</h2>
                    <div className="lg:flex lg:space-x-8">
                        <div className="lg:w-1/3 text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality</h3>
                            <p className="text-gray-600">We offer only the finest products sourced from reputable brands. We believe in quality over quantity.</p>
                        </div>
                        <div className="lg:w-1/3 text-center mt-8 lg:mt-0">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
                            <p className="text-gray-600">Your happiness is our priority. We are committed to providing excellent customer service at all times.</p>
                        </div>
                        <div className="lg:w-1/3 text-center mt-8 lg:mt-0">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrity</h3>
                            <p className="text-gray-600">We build trust through transparency, responsibility, and honesty in all that we do.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section className="mb-12 py-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-8">Meet the Team</h2>
                    <div className="lg:flex lg:space-x-8">
                        <div className="lg:w-1/3">
                            <img src="./images/team-member-1.jpg" alt="Team Member 1" className="w-full h-56 object-cover rounded-lg mb-4 shadow-md" />
                            <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                            <p className="text-gray-600">CEO & Founder</p>
                        </div>
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <img src="./images/team-member-2.jpg" alt="Team Member 2" className="w-full h-56 object-cover rounded-lg mb-4 shadow-md" />
                            <h3 className="text-xl font-semibold text-gray-900">Jane Smith</h3>
                            <p className="text-gray-600">Chief Marketing Officer</p>
                        </div>
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <img src="./images/team-member-3.jpg" alt="Team Member 3" className="w-full h-56 object-cover rounded-lg mb-4 shadow-md" />
                            <h3 className="text-xl font-semibold text-gray-900">Michael Brown</h3>
                            <p className="text-gray-600">Lead Developer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="mb-12 bg-gray-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-8">What Our Customers Say</h2>
                    <div className="lg:flex lg:space-x-8">
                        <div className="lg:w-1/3">
                            <p className="text-gray-600 italic">"Amazing service! I found exactly what I needed and the delivery was fast. Highly recommended!"</p>
                            <h4 className="text-lg font-semibold text-gray-900 mt-4">- Alex P.</h4>
                        </div>
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <p className="text-gray-600 italic">"Great quality products and the customer support is superb. I'll definitely be shopping here again."</p>
                            <h4 className="text-lg font-semibold text-gray-900 mt-4">- Maria G.</h4>
                        </div>
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <p className="text-gray-600 italic">"I’ve never had a better online shopping experience. Highly efficient and trustworthy service."</p>
                            <h4 className="text-lg font-semibold text-gray-900 mt-4">- John K.</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-6">Join Our Community</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Stay updated with the latest products, exclusive deals, and special offers.
                    </p>
                    <Link to="/register" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Sign Up Now
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Aboutus;
