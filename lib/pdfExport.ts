import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
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
    name: string;
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

export async function exportToPDF(data: DocumentData) {
  if (typeof window === 'undefined') return;

  const element = document.getElementById('pdf-content');
  if (!element) {
    console.error('PDF container not found');
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      style: {
        width: '800px',
        margin: '0',
      },
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(dataUrl);

    // 🔑 SCALE to fit entire content inside ONE page
    const scale = Math.min(
      pdfWidth / imgProps.width,
      pdfHeight / imgProps.height
    );

    const imgWidth = imgProps.width * scale;
    const imgHeight = imgProps.height * scale;

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(dataUrl, 'PNG', x, y, imgWidth, imgHeight);

    pdf.save(`${data.documentType}-${data.documentNumber}.pdf`);
  } catch (err) {
    console.error('PDF generation failed:', err);
  }
}