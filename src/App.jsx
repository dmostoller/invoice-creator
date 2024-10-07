import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import PDFDownload from "./components/PDFDownload";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const downloadPdf = () => {
    const invoiceElement = document.getElementById("invoice-preview");
    html2canvas(invoiceElement, {
      scale: 2, // Increase the scaling for better quality
      useCORS: true,
      windowWidth: invoiceElement.scrollWidth, // Use full width of the invoice element
      windowHeight: invoiceElement.scrollHeight, // Use full height of the invoice element
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    clientAddress: "",
    invoiceNumber: "",
    items: [{ description: "", quantity: 1, price: 0 }],
  });

  return (
    <div className="min-h-screen p-8 bg-gray-800">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Invoice Creator</h1>
        {/* <PDFDownload invoiceData={invoiceData} /> */}

        <button
          type="button"
          onClick={downloadPdf}
          className="bg-black text-white p-3 rounded w-96 font-bold hover:bg-gray-700 hover:scale-105 transform transition"
        >
          Download PDF
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <InvoiceForm
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        />
        <InvoicePreview invoiceData={invoiceData} />
      </div>
    </div>
  );
}

export default App;
