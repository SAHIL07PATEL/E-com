const SKUForm = ({ selectedProduct, newSKU, onSubmit, onChange }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <h2 className="text-2xl font-semibold">Create SKU for {selectedProduct?.name}</h2>
    {selectedProduct?.options.map((option) => (
      <div key={option.name} className="space-y-2">
        <h3 className="font-semibold">{option.name}</h3>
        <select
          onChange={(e) => {
            const updatedValues = { ...newSKU.optionValues };
            updatedValues[option.name] = e.target.value;
            onChange({ ...newSKU, optionValues: updatedValues });
          }}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select {option.name}</option>
          {option.values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    ))}
    <input
      type="number"
      placeholder="Quantity"
      value={newSKU.quantity}
      onChange={(e) => onChange({ ...newSKU, quantity: e.target.value })}
      className="w-full p-2 border rounded"
      required
    />
    <input
      type="number"
      placeholder="Price"
      value={newSKU.price}
      onChange={(e) => onChange({ ...newSKU, price: e.target.value })}
      className="w-full p-2 border rounded"
      required
    />
    <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Create SKU
    </button>
  </form>
);

export default SKUForm;
