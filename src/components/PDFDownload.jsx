import React from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

function PDFDownload({ invoiceData }) {
  const MyDocument = () => (
    <Document>
      <Page>
        <Text>Invoice</Text>
        <Text>Client Name: {invoiceData.clientName}</Text>
        <Text>Client Address: {invoiceData.clientAddress}</Text>
        {/* Render more details as needed */}
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 hover:scale-110 transform transition"
      document={<MyDocument />}
      fileName="invoice.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  );
}

export default PDFDownload;
