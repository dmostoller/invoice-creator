import React from "react";

function InvoicePreview({ invoiceData }) {
  const themeColor = invoiceData.themeColor || "#1A7DFF";
  const fontFamily = invoiceData.font || "sans-serif";
  const backgroundColor = invoiceData.backgroundColor || "#E0E0E0";
  const tableThemeColor = invoiceData.tableThemeColor || "#D1D1D1";
  const textThemeColor = invoiceData.textThemeColor || "#000000";

  return (
    <div
      id="invoice-preview"
      className="p-8 rounded-md shadow-md w-full lg:w-1/2 relative"
      style={{
        backgroundColor: backgroundColor,
        fontFamily: fontFamily,
        color: textThemeColor,
      }}
    >
      {invoiceData.logo && (
        <img
          src={invoiceData.logo}
          alt="Logo"
          className="absolute top-4 right-4 w-24 h-24 object-contain rounded-full"
        />
      )}
      <h2 className="text-4xl font-bold mb-8" style={{ color: themeColor }}>
        INVOICE
      </h2>
      <p className="text-lg">Invoice #: {invoiceData.invoiceNumber || 1001}</p>
      <p className="text-lg mb-8">Date: {invoiceData.invoiceDate}</p>
      <div className="flex justify-between mb-2">
        <div>
          <h3 className="text-xl font-bold">Bill to:</h3>
          <p className="font-semibold">{invoiceData.clientName}</p>
          <p>{invoiceData.clientAddress}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Payable to:</h3>
          <p className="font-semibold">{invoiceData.payableName}</p>
          <p>{invoiceData.payableAddress}</p>
        </div>
      </div>

      <div
        className="rounded-sm p-3 mt-8"
        style={{ backgroundColor: tableThemeColor }}
      >
        <div
          className="grid grid-cols-[50px_2fr_1fr_1fr_1fr] gap-4 font-bold p-2 border-b"
          style={{ borderColor: themeColor, color: themeColor }}
        >
          <p>No</p>
          <p>Items</p>
          <p>QTY</p>
          <p>Price</p>
          <p className="text-right">Total</p>
        </div>
        {invoiceData.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[50px_2fr_1fr_1fr_1fr] gap-4 p-2 border-b"
            style={{ borderColor: themeColor }}
          >
            <p>{index + 1}</p>
            <p>{item.description}</p>
            <p>{item.quantity}</p>
            <p>${item.price}</p>
            <p className="text-right">${item.quantity * item.price}</p>
          </div>
        ))}
        <div
          className="grid grid-cols-[50px_2fr_1fr_1fr_1fr] p-2 font-bold"
          style={{ color: themeColor }}
        >
          <p className="col-span-5 text-right">
            Total:
            <span style={{ color: textThemeColor }}>
              {" "}
              $
              {invoiceData.items.reduce(
                (total, item) => total + item.quantity * item.price,
                0
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Payment information:</h3>
        <p>Bank: {invoiceData.bankName}</p>
        <p>Name: {invoiceData.payableName}</p>
        <p>Routing: {invoiceData.routingNumber}</p>
        <p>Account: {invoiceData.accountNumber}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Terms & Conditions:</h3>
        <p>
          {invoiceData.terms ||
            "Please send payment within 30 days of receiving this invoice."}
        </p>
      </div>
    </div>
  );
}

export default InvoicePreview;