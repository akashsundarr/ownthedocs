import { LineItem } from './calculateTotals';

export interface CSVImportResult {
  success: boolean;
  items: LineItem[];
  message: string;
  itemCount?: number;
}

export function parseCSV(file: File): Promise<CSVImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n').filter((line) => line.trim());

        if (lines.length === 0) {
          resolve({
            success: false,
            items: [],
            message: 'CSV file is empty',
          });
          return;
        }

        const headerLine = lines[0];
        const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());

        const nameIndex = headers.indexOf('name');
        const descriptionIndex = headers.indexOf('description');
        const quantityIndex = headers.indexOf('quantity');
        const priceIndex = headers.indexOf('price');

        if (nameIndex === -1 || quantityIndex === -1 || priceIndex === -1) {
          resolve({
            success: false,
            items: [],
            message: 'CSV must contain columns: name, description, quantity, price',
          });
          return;
        }

        const items: LineItem[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cells = lines[i].split(',').map((cell) => cell.trim());

          if (cells.length === 1 && cells[0] === '') {
            continue;
          }

          const name = cells[nameIndex] || '';
          const description = cells[descriptionIndex] || '';
          const quantityRaw = cells[quantityIndex] || '0';
          const priceRaw = cells[priceIndex] || '0';

          if (!name) {
            continue;
          }

          const quantity = Math.max(0, parseInt(quantityRaw, 10) || 0);
          const price = Math.max(0, parseFloat(priceRaw) || 0);

          const item: LineItem = {
            id: Date.now().toString() + Math.random().toString(),
            name,
            description,
            quantity,
            price,
            total: quantity * price,
          };

          items.push(item);
        }

        if (items.length === 0) {
          resolve({
            success: false,
            items: [],
            message: 'No valid items found in CSV.',
          });
        } else {
          resolve({
            success: true,
            items,
            message: `Successfully imported ${items.length} item${items.length !== 1 ? 's' : ''}`,
            itemCount: items.length,
          });
        }
      } catch (error) {
        resolve({
          success: false,
          items: [],
          message: 'Error parsing CSV. Please check the format.',
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        items: [],
        message: 'Error reading file. Please ensure it is a valid CSV.',
      });
    };

    reader.readAsText(file);
  });
}

export function downloadSampleCSV(): void {
  if (typeof window === 'undefined') return;

  const sampleData = [
    ['name', 'description', 'quantity', 'price'],
    ['5 Page Website', 'Custom business site', '1', '15000'],
    ['Extra Page', 'Additional pages', '2', '2000'],
  ];

  const csvContent = sampleData.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sample_line_items.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
