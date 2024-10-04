import React from 'react';

const deals = [
  {
    id: 1,
    name: 'Smartphone X100',
    image: './images/smartphone.jpg',
    originalPrice: 899,
    discountedPrice: 599,
  },
  {
    id: 2,
    name: 'Gaming Laptop Pro',
    image: './images/laptop.jpg',
    originalPrice: 1500,
    discountedPrice: 1200,
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    image: './images/headphones.jpg',
    originalPrice: 299,
    discountedPrice: 199,
  },
  {
    id: 4,
    name: '4K Ultra HD TV',
    image: './images/tv.jpg',
    originalPrice: 999,
    discountedPrice: 749,
  },
  {
    id: 5,
    name: 'Smartwatch S7',
    image: './images/smartwatch.jpg',
    originalPrice: 249,
    discountedPrice: 179,
  },
];

const Deals = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Today's Hot Deals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={deal.image} alt={deal.name} className="h-48 w-full object-cover" />

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{deal.name}</h3>
                <div className="mt-2 flex items-center">
                  <p className="text-gray-500 line-through mr-4">${deal.originalPrice}</p>
                  <p className="text-indigo-600 font-bold text-xl">${deal.discountedPrice}</p>
                </div>

                <div className="mt-4">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
