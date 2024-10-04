import React, { useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [sizes, setSizes] = useState(['Small', 'Medium', 'Large']);
    const [colors, setColors] = useState(['Red', 'Blue']);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Resizer.imageFileResizer(
                file,
                800, // max width
                800, // max height
                'JPEG', // format
                70, // quality
                0, // rotation
                (uri) => {
                    setImage(uri); // Set the resized image URI (base64)
                },
                'base64' // Output type
            );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            productName: name,
            description,
            price: parseFloat(price),
            ImgUrl: image, // The base64 image
            variants: [
                {
                    sizes: selectedSizes.map(size => ({ name: size })),
                    colors: selectedColors.map(color => ({ name: color })),
                },
            ],
        };

        try {
            const response = await axios.post('https://e-come-hyh8.onrender.com/products', productData);
            console.log('Product added successfully:', response.data);

            // Reset form
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setSelectedSizes([]);
            setSelectedColors([]);
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Sizes</label>
                    {sizes.map(size => (
                        <div key={size}>
                            <input
                                type="checkbox"
                                id={size}
                                value={size}
                                checked={selectedSizes.includes(size)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedSizes([...selectedSizes, size]);
                                    } else {
                                        setSelectedSizes(selectedSizes.filter(s => s !== size));
                                    }
                                }}
                            />
                            <label htmlFor={size} className="ml-2">{size}</label>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Colors</label>
                    {colors.map(color => (
                        <div key={color}>
                            <input
                                type="checkbox"
                                id={color}
                                value={color}
                                checked={selectedColors.includes(color)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedColors([...selectedColors, color]);
                                    } else {
                                        setSelectedColors(selectedColors.filter(c => c !== color));
                                    }
                                }}
                            />
                            <label htmlFor={color} className="ml-2">{color}</label>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;

