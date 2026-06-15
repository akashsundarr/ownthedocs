import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export interface WelcomeExportData {
  companyName: string;
  clientName: string;
}

export async function exportWelcomeToPDF(data: WelcomeExportData) {
  if (typeof window === 'undefined') return;

  const element = document.getElementById('welcome-pdf-content');
  if (!element) {
    console.error('Welcome PDF container not found');
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      style: {
        width: '794px', // A4 width in pixels at 96 DPI
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

    // Calculate image dimensions to fit width
    const img = new Image();
    img.src = dataUrl;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = img.width;
    const imgHeight = img.height;
    const ratio = pdfWidth / (imgWidth / 2); // /2 because of pixelRatio: 2
    const scaledHeight = (imgHeight / 2) * ratio;

    if (scaledHeight <= pdfHeight) {
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, scaledHeight);
    } else {
      // Multi-page logic
      let heightLeft = scaledHeight;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }
    }

    const fileName = `welcome-packet-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`;
    pdf.save(fileName);
  } catch (err) {
    console.error('Welcome PDF generation failed:', err);
  }
}
