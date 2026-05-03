import html2pdf from 'html2pdf.js';
import { Currency } from './currency';

export interface DocumentData {
  documentType: 'quotation' | 'invoice';
  documentNumber: string;
  date: string;
  validTill?: string;
  dueDate?: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  lineItems: Array<{
    serviceName: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  gstEnabled: boolean;
  gstPercentage: number;
  gst: number;
  total: number;
  notes: string;
  currency: Currency;
}

export function exportToPDF(data: DocumentData) {
  const element = document.getElementById('pdf-content');
  if (!element) {
    console.error('PDF content element not found');
    return;
  }

  const opt = {
    margin: 10,
    filename: `${data.documentType}-${data.documentNumber}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(element).save();
}
