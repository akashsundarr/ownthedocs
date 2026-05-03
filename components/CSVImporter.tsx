'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { parseCSV } from '@/lib/csvImport';
import { LineItem } from '@/lib/calculateTotals';

interface CSVImporterProps {
  onImport: (items: LineItem[]) => void;
}

export function CSVImporter({ onImport }: CSVImporterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setFeedback({ type: null, message: '' });

    const result = await parseCSV(file);

    if (result.success) {
      setFeedback({
        type: 'success',
        message: result.message,
      });
      onImport(result.items);
    } else {
      setFeedback({
        type: 'error',
        message: result.message,
      });
    }

    setIsLoading(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Clear feedback after 5 seconds
    setTimeout(() => {
      setFeedback({ type: null, message: '' });
    }, 5000);
  };

  const handleDownloadSample = () => {
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
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="border-gray-300"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isLoading ? 'Importing...' : 'Import CSV'}
        </Button>
        <Button
          variant="ghost"
          onClick={handleDownloadSample}
          className="text-gray-600 hover:text-gray-900"
        >
          <Download className="h-4 w-4 mr-2" />
          Sample
        </Button>
      </div>

      {feedback.type && (
        <div
          className={`flex gap-2 p-3 rounded-md text-sm ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <p className="text-xs text-gray-500">
        CSV format: name, description, quantity, price
      </p>
    </div>
  );
}
