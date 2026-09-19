import fs from "fs";
import path from "path";

interface InvoiceData {
  transactionId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
}

const generateInvoice = (data: InvoiceData): string => {
  const invoiceDir = path.join(process.cwd(), "invoices");

  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir);
  }

  const fileName = `invoice-${data.transactionId}.txt`;
  const filePath = path.join(invoiceDir, fileName);

  const invoiceContent = `
SaaS Application
-------------------------
INVOICE

Transaction ID: ${data.transactionId}
Amount: ₹${data.amount}
Payment Status: ${data.status}
Payment Method: ${data.paymentMethod}
Date: ${data.createdAt.toISOString()}

Thank you for your subscription.
`;

  fs.writeFileSync(filePath, invoiceContent.trim());

  return filePath;
};

export default generateInvoice;