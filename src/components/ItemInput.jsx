import PropTypes from 'prop-types';

const inputStyle =
  'w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white';

export default function ItemInput(props) {
  const { item, index, handleItemChange, deleteItem } = props;
  ItemInput.propTypes = {
    item: PropTypes.shape({
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleItemChange: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  return (
    <div key={index} className="mb-2">
      <label className="block">Item Description</label>
      <input
        type="text"
        name="description"
        value={item.description}
        onChange={(e) => handleItemChange(index, e)}
        className={inputStyle}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block">Price</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={(e) => handleItemChange(index, e)}
            className={inputStyle}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => deleteItem(index)}
          className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white text-xs p-1 rounded mt-2 font-bold hover:bg-gray-400 dark:hover:bg-gray-600 hover:scale-105 transform transition"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}
