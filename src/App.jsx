import { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import NightModeToggle from './components/NightModeToggle';
import './index.css';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const INVOICE_DIMENSIONS = {
    width: 794, // A4 width in pixels at 96 DPI
    height: 1123, // A4 height in pixels at 96 DPI
  };

  async function downloadPdf() {
    // Create hidden container
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '-9999px';
    printContainer.style.width = `${INVOICE_DIMENSIONS.width}px`;
    printContainer.style.height = `${INVOICE_DIMENSIONS.height}px`;
    document.body.appendChild(printContainer);

    // Clone invoice content
    const element = document.getElementById('invoice-preview');
    if (!element) return;
    const clone = element.cloneNode(true);
    clone.style.width = '100%';
    clone.style.height = '100%';
    printContainer.appendChild(clone);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [INVOICE_DIMENSIONS.width, INVOICE_DIMENSIONS.height],
      });

      const canvas = await html2canvas(printContainer, {
        width: INVOICE_DIMENSIONS.width,
        height: INVOICE_DIMENSIONS.height,
        scale: 2, // Increase for better quality
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        INVOICE_DIMENSIONS.width,
        INVOICE_DIMENSIONS.height
      );
      pdf.save('invoice.pdf');
    } finally {
      // Cleanup
      document.body.removeChild(printContainer);
    }
  }

  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    clientAddress: '',
    invoiceNumber: '',
    items: [{ description: '', quantity: 1, price: 0 }],
  });

  return (
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      {' '}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <NightModeToggle onToggle={setIsDarkMode} />

          <h1 className="text-3xl font-bold ml-2">Invoice Creator</h1>
        </div>
        <button
          type="button"
          onClick={downloadPdf}
          className="bg-gray-300 dark:bg-gray-500 text-black dark:text-white p-3 rounded w-96 font-bold hover:bg-gray-400 dark:hover:bg-gray-600 hover:scale-105 transform transition"
        >
          Download PDF
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
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
