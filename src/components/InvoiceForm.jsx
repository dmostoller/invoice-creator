import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

function InvoiceForm({ invoiceData, setInvoiceData }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Formats date to YYYY-MM-DD
  };

  // Prefill today's date if not already set
  useEffect(() => {
    if (!invoiceData.invoiceDate) {
      setInvoiceData((prevData) => ({
        ...prevData,
        invoiceDate: getTodayDate(),
      }));
    }
  }, [invoiceData, setInvoiceData]);

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
      items: [...invoiceData.items, { description: "", quantity: 1, price: 0 }],
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
    setAccountNumber(e.target.value);
  };

  const handleConfirmAccountNumberChange = (e) => {
    setConfirmAccountNumber(e.target.value);
  };

  const validateAccountNumbers = () => {
    if (accountNumber !== confirmAccountNumber) {
      setAccountNumberError("Account numbers do not match.");
    } else {
      setAccountNumberError("");
      setInvoiceData({ ...invoiceData, accountNumber });
    }
  };
  const handleTableThemeChange = (e) => {
    setInvoiceData({ ...invoiceData, tableThemeColor: e.target.value });
  };

  const handleThemeChange = (e) => {
    setInvoiceData({ ...invoiceData, themeColor: e.target.value });
  };

  const handleFontChange = (e) => {
    setInvoiceData({ ...invoiceData, font: e.target.value });
  };

  const handleBackgroundChange = (e) => {
    setInvoiceData({ ...invoiceData, backgroundColor: e.target.value });
  };

  const handleTextThemeChange = (e) => {
    setInvoiceData({ ...invoiceData, textThemeColor: e.target.value });
  };

  return (
    <div className="bg-gray-600 p-6 rounded-md shadow-md w-full lg:w-1/2">
      <div className="grid grid-cols-5">
        <div>
          <h3 className="text-xl font-semibold mb-4">BgColor</h3>
          <input
            type="color"
            name="backgroundColor"
            value={invoiceData.backgroundColor || "#E0E0E0"}
            onChange={handleBackgroundChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Color 1</h3>
          <input
            type="color"
            name="themeColor"
            value={invoiceData.themeColor || "#1A7DFF"}
            onChange={handleThemeChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Color 2</h3>
          <input
            type="color"
            name="tableThemeColor"
            value={invoiceData.tableThemeColor || "#D1D1D1"}
            onChange={handleTableThemeChange}
            className="bg-transparent"
          />
        </div>
        <div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Color 3</h3>
            <input
              type="color"
              name="textThemeColor"
              value={invoiceData.textThemeColor || "#000000"}
              onChange={handleTextThemeChange}
              className="bg-transparent"
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Font Style</h3>
          <select
            name="font"
            value={invoiceData.font || "sans-serif"}
            onChange={handleFontChange}
            className="w-full p-2 mb-4 border rounded"
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
              className="w-full p-2 mb-4 border rounded"
            />{" "}
          </div>
          <div>
            <label className="block mb-2">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              value={invoiceData.invoiceDate}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        </div>
        <label className="block">Client Name</label>
        <input
          type="text"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label className="block">Client Address</label>
        <input
          type="text"
          name="clientAddress"
          value={invoiceData.clientAddress}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label className="block">Payable Name</label>
        <input
          type="text"
          name="payableName"
          value={invoiceData.payableName}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label className="block">Payable Address</label>
        <input
          type="text"
          name="payableAddress"
          value={invoiceData.payableAddress}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={invoiceData.bankName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Routing Number</label>
            <input
              type="text"
              name="routingNumber"
              value={invoiceData.routingNumber}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              onBlur={validateAccountNumbers}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
          <div>
            <label className="block">Confirm Account Number</label>
            <input
              type="text"
              value={confirmAccountNumber}
              onChange={handleConfirmAccountNumberChange}
              onBlur={validateAccountNumbers}
              className="w-full p-2 mb-4 border rounded"
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
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex items-center justify-between mt-2 mb-2">
          <h3 className="text-xl font-semibold">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 hover:scale-110 transform transition"
          >
            <FaPlus />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="mb-2">
              <label className="block">Item Description</label>
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
                className="w-full p-2 border rounded"
              />
              <label className="block">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                className="w-full p-2 border rounded"
              />
              <label className="block">Price</label>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => deleteItem(index)}
                  className="ml-auto bg-black text-white p-1 text-xs font-bold rounded mt-2 hover:bg-gray-800 hover:scale-110 transform transition"
                >
                  Delete Item
                </button>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-8">Terms & Conditions</h3>
        <textarea
          name="terms"
          value={invoiceData.terms}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded h-32"
        />
      </form>
    </div>
  );
}

export default InvoiceForm;
