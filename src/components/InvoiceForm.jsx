import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ItemInput from './ItemInput';
import PropTypes from 'prop-types';

const inputStyle =
  'w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white';

function InvoiceForm({ invoiceData, setInvoiceData }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');

  InvoiceForm.propTypes = {
    invoiceData: PropTypes.shape({
      invoiceDate: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          quantity: PropTypes.number,
          price: PropTypes.number,
        })
      ),
      backgroundColor: PropTypes.string,
      themeColor: PropTypes.string,
      tableThemeColor: PropTypes.string,
      textThemeColor: PropTypes.string,
      font: PropTypes.string,
      invoiceNumber: PropTypes.string,
      clientName: PropTypes.string,
      clientAddress: PropTypes.string,
      payableName: PropTypes.string,
      payableAddress: PropTypes.string,
      bankName: PropTypes.string,
      routingNumber: PropTypes.string,
      terms: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
    }).isRequired,
    setInvoiceData: PropTypes.func.isRequired,
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formats date to YYYY-MM-DD
  };

  // Prefill today's date if not already set
  useEffect(() => {
    if (!invoiceData.invoiceDate) {
      setInvoiceData((prevData) => ({
        ...prevData,
        invoiceDate: getTodayDate(),
      }));
    }
  }, [invoiceData.invoiceDate, setInvoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    items[index] = { ...items[index], [name]: value };
    setInvoiceData({ ...invoiceData, items });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const deleteItem = (index) => {
    const items = [...invoiceData.items];
    items.splice(index, 1);
    setInvoiceData({ ...invoiceData, items });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData({ ...invoiceData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccountNumberChange = (e) => {
    const { name, value } = e.target;
    if (name === 'accountNumber') {
      setAccountNumber(value);
    } else if (name === 'confirmAccountNumber') {
      setConfirmAccountNumber(value);
    }
  };

  const validateAccountNumbers = () => {
    if (accountNumber !== confirmAccountNumber) {
      setAccountNumberError('Account numbers do not match.');
    } else {
      setAccountNumberError('');
      setInvoiceData({ ...invoiceData, accountNumber });
    }
  };

  return (
    <div
      style={{ width: '100%' }}
      className="bg-gray-200 dark:bg-gray-700 p-6 rounded-md shadow-md w-full lg:w-1/2"
    >
      <div className="grid grid-cols-5">
        <div>
          <h3 className="text-xl font-semibold mb-4">BgColor</h3>
          <input
            type="color"
            name="backgroundColor"
            value={invoiceData.backgroundColor || '#E0E0E0'}
            onChange={handleChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Color 1</h3>
          <input
            type="color"
            name="themeColor"
            value={invoiceData.themeColor || '#1A7DFF'}
            onChange={handleChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Color 2</h3>
          <input
            type="color"
            name="tableThemeColor"
            value={invoiceData.tableThemeColor || '#D1D1D1'}
            onChange={handleChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Color 3</h3>
          <input
            type="color"
            name="textThemeColor"
            value={invoiceData.textThemeColor || '#000000'}
            onChange={handleChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Font Style</h3>
          <select
            name="font"
            value={invoiceData.font || 'sans-serif'}
            onChange={handleChange}
            className={`${inputStyle} w-full mb-4 p-2`}
          >
            <option value="sans-serif">Sans-serif (Default)</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Open Sans, sans-serif">Open Sans</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Raleway, sans-serif">Raleway</option>
            <option value="Playfair Display, serif">Playfair Display</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Dancing Script, cursive">Dancing Script</option>
            <option value="Cursive">Cursive</option>
          </select>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Invoice Details</h2>
      <form>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Invoice Number</label>
            <input
              type="number"
              name="invoiceNumber"
              value={invoiceData.invoiceNumber || 1001}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-2">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              value={invoiceData.invoiceDate}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={invoiceData.clientName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block">Client Address</label>
            <input
              type="text"
              name="clientAddress"
              value={invoiceData.clientAddress}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Payable Name</label>
            <input
              type="text"
              name="payableName"
              value={invoiceData.payableName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block">Payable Address</label>
            <input
              type="text"
              name="payableAddress"
              value={invoiceData.payableAddress}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={invoiceData.bankName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block">Routing Number</label>
            <input
              type="text"
              name="routingNumber"
              value={invoiceData.routingNumber}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              onBlur={validateAccountNumbers}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block">Confirm Account Number</label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={confirmAccountNumber}
              onChange={handleAccountNumberChange}
              onBlur={validateAccountNumbers}
              className={inputStyle}
            />
          </div>
        </div>
        {accountNumberError && (
          <p className="text-red-500 mb-4">{accountNumberError}</p>
        )}
        <label className="block">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className={inputStyle}
        />
        <div className="flex items-center justify-between mt-2 mb-2">
          <h3 className="text-xl font-semibold">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white rounded-full mt-2 p-2 hover:bg-gray-400 dark:hover:bg-gray-600 hover:scale-110 transform transition"
          >
            <FaPlus />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {invoiceData.items.map((item, index) => (
            <ItemInput
              key={index}
              item={item}
              index={index}
              handleItemChange={handleItemChange}
              deleteItem={deleteItem}
            />
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-2">Terms & Conditions</h3>
        <textarea
          name="terms"
          value={invoiceData.terms}
          onChange={handleChange}
          className={`${inputStyle} w-full h-16 mb-4`}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Email</label>
            <input
              type="text"
              name="email"
              value={invoiceData.email}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={invoiceData.phone}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>
        <label className="block">Website</label>
        <input
          type="text"
          name="website"
          value={invoiceData.website}
          onChange={handleChange}
          className={inputStyle}
        />
      </form>
    </div>
  );
}

export default InvoiceForm;
