// SKUDetails Component
const SKUDetails = ({ selectedProduct, skuDetails }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">SKU Details for {selectedProduct?.name}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skuDetails.map((sku) => (
            <tr key={sku._id}>
              <td className="px-6 py-4 whitespace-nowrap">{sku._id}</td>
              <td className="px-6 py-4">
                {Object.entries(sku.optionValues).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{sku.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">${sku.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SKUDetails;