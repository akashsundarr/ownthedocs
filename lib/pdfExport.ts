// lib/pdfExport.ts

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

export async function exportToPDF(data: DocumentData) {
  if (typeof window === 'undefined') return;

  const element = document.getElementById('pdf-content');
  if (!element) {
    console.error('PDF container not found');
    return;
  }

  try {
    // 1. Generate a high-quality PNG using html-to-image
    // This bypasses the html2canvas parser entirely and safely reads oklch()
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // High resolution for crisp text
      backgroundColor: '#ffffff',
      style: {
        // ALIGNMENT FIX: Force desktop sizing so it never captures mobile layouts
        width: '800px', 
        margin: '0',
      },
    });

    // 2. Initialize an A4 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // 3. Calculate proportions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    
    // Convert DOM element dimensions to PDF units to maintain aspect ratio
    const imgProps = pdf.getImageProperties(dataUrl);
    const totalPdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 4. Handle Multi-Page PDFs (if the invoice is very long)
    let heightLeft = totalPdfHeight;
    let position = 0;

    // Add first page
    pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, totalPdfHeight);
    heightLeft -= pdfPageHeight;

    // Add subsequent pages if needed
    while (heightLeft > 0) {
      position = heightLeft - totalPdfHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, totalPdfHeight);
      heightLeft -= pdfPageHeight;
    }

    // 5. Download the file
    pdf.save(`${data.documentType}-${data.documentNumber}.pdf`);

  } catch (err) {
    console.error('PDF generation failed:', err);
  }
}