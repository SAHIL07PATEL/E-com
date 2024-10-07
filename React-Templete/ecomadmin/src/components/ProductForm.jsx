const ProductForm = ({ product, isEditing, onSubmit, onChange }) => {
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...product.options];
    updatedOptions[index][field] = value;
    onChange({ ...product, options: updatedOptions });
  };

  const handleOptionValueChange = (optionIndex, valueIndex, value) => {
    const updatedOptions = [...product.options];
    updatedOptions[optionIndex].values[valueIndex] = value;
    onChange({ ...product, options: updatedOptions });
  };

  const handleAddOption = () => {
    onChange({
      ...product,
      options: [...product.options, { name: '', values: [''] }],
    });
  };

  const handleAddOptionValue = (index) => {
    const updatedOptions = [...product.options];
    updatedOptions[index].values.push('');
    onChange({ ...product, options: updatedOptions });
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension
          const MAX_DIMENSION = 800;
          
          if (width > height && width > MAX_DIMENSION) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Adjust quality as needed
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        onChange({ ...product, imgUrl: compressedImage });
      } catch (error) {
        console.error('Error compressing image:', error);
        // Handle error appropriately
      }
    }
  };


  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => onChange({ ...product, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Product Description"
        value={product.description}
        onChange={(e) => onChange({ ...product, description: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => onChange({ ...product, price: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {product.imgUrl && (
          <img 
            src={product.imgUrl} 
            alt="Product preview" 
            className="mt-2 h-32 w-32 object-cover rounded"
          />
        )}
      </div>


      <input
        type="text"
        placeholder="Category"
        value={product.category}
        onChange={(e) => onChange({ ...product, category: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Options</h3>
        {product.options.map((option, index) => (
          <div key={index} className="space-y-2 border p-4 rounded">
            <input
              type="text"
              placeholder="Option Name"
              value={option.name}
              onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="space-y-2">
              <h4 className="font-semibold">Values</h4>
              {option.values.map((value, valueIndex) => (
                <input
                  key={valueIndex}
                  type="text"
                  placeholder="Value"
                  value={value}
                  onChange={(e) =>
                    handleOptionValueChange(index, valueIndex, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddOptionValue(index)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Add Value
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Add Option
        </button>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isEditing ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductForm;
