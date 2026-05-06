import Papa from 'papaparse';
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
      const csv = event.target?.result as string;

      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const items: LineItem[] = (results.data as any[])
            .map((row) => ({
              id: Date.now().toString() + Math.random().toString(),
              name: row.name?.trim() || '',
              description: row.description?.trim() || '',
              quantity: Math.max(0, parseInt(row.quantity, 10) || 0),
              price: Math.max(0, parseFloat(row.price) || 0),
              total: 0,
            }))
            .filter((item) => item.name);

          resolve({
            success: items.length > 0,
            items,
            message: items.length
              ? `Successfully imported ${items.length} items`
              : 'No valid items found in CSV.',
            itemCount: items.length,
          });
        },
        error: () => {
          resolve({
            success: false,
            items: [],
            message: 'Error parsing CSV.',
          });
        },
      });
    };

    reader.readAsText(file);
  });
}