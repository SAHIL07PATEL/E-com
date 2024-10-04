import React from 'react';

const collections = [
  {
    id: 1,
    name: 'Summer Collection',
    image: './images/summer.jpg',
    description: 'Discover the latest trends for summer.',
  },
  {
    id: 2,
    name: 'Winter Collection',
    image: './images/winter.jpg',
    description: 'Stay warm with our cozy winter wear.',
  },
  {
    id: 3,
    name: 'Spring Collection',
    image: './images/spring.jpg',
    description: 'Refresh your wardrobe with spring styles.',
  },
  {
    id: 4,
    name: 'Autumn Collection',
    image: './images/autumn.jpg',
    description: 'Fall into style with our autumn selection.',
  },
  {
    id: 5,
    name: 'Tech Gadgets',
    image: './images/tech.jpg',
    description: 'Upgrade your life with the latest gadgets.',
  },
  {
    id: 6,
    name: 'Fitness Gear',
    image: './images/fitness.jpg',
    description: 'Get fit with our top fitness accessories.',
  },
];

const Collections = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Featured Collections</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={collection.image} alt={collection.name} className="h-48 w-full object-cover" />

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{collection.name}</h3>
                <p className="text-gray-600 mt-2">{collection.description}</p>

                <div className="mt-4">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Explore Collection
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

export default Collections;
