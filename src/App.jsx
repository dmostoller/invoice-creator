import React, { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import PDFDownload from "./components/PDFDownload";
import NightModeToggle from "./components/NightModeToggle";
import "./index.css";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const downloadPdf = () => {
    const invoiceElement = document.getElementById("invoice-preview");

    // Calculate the dimensions of A4 in pixels at 96 DPI
    const pixelsPerMM = 3.2; // 1 mm = 3.7795 pixels at 96 DPI
    const pdfWidthPx = Math.floor(210 * pixelsPerMM); // A4 width: 210mm
    const pdfHeightPx = Math.floor(297 * pixelsPerMM); // A4 height: 297mm

    html2canvas(invoiceElement, {
      // Set the width and height to match A4 dimensions
      width: pdfWidthPx,
      height: pdfHeightPx, // Use the actual height of the invoice
      // Use a higher scale for better quality
      scale: 3,
      // Allow cross-origin images
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Adjust the image size to fully fit the PDF dimensions (taking the height into account)
      const imgWidth = pdfWidth;
      const imgHeight = canvas.height * (pdfWidth / canvas.width);

      // If the image height is larger than the PDF, we need to scale it down proportionally
      if (imgHeight > pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      } else {
        // Add the image to the PDF with appropriate dimensions
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      // Save the PDF
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
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {" "}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <NightModeToggle onToggle={setIsDarkMode} />

          <h1 className="text-3xl font-bold ml-2">Invoice Creator</h1>
        </div>
        {/* <PDFDownload invoiceData={invoiceData} /> */}

        <button
          type="button"
          onClick={downloadPdf}
          className="bg-gray-300 dark:bg-gray-500 text-black dark:text-white p-3 rounded w-96 font-bold hover:bg-gray-400 dark:hover:bg-gray-600 hover:scale-105 transform transition"
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
