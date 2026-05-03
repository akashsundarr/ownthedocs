import { Input } from './ui/input';
import { Label } from './ui/label';

interface HeaderFormProps {
  documentType: 'quotation' | 'invoice';
  documentNumber: string;
  date: string;
  validTill: string;
  dueDate: string;
  onDocumentNumberChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onValidTillChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
}

export function HeaderForm({
  documentType,
  documentNumber,
  date,
  validTill,
  dueDate,
  onDocumentNumberChange,
  onDateChange,
  onValidTillChange,
  onDueDateChange,
}: HeaderFormProps) {
  return (
    <div className="space-y-6 border-b border-gray-200 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="doc-number" className="text-sm text-gray-600 mb-2 block">
            {documentType === 'quotation' ? 'Quotation' : 'Invoice'} Number
          </Label>
          <Input
            id="doc-number"
            value={documentNumber}
            onChange={(e) => onDocumentNumberChange(e.target.value)}
            className="text-lg font-semibold border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="date" className="text-sm text-gray-600 mb-2 block">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="text-lg font-semibold border-gray-300"
          />
        </div>
      </div>

      {documentType === 'quotation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="valid-till" className="text-sm text-gray-600 mb-2 block">
              Valid Till
            </Label>
            <Input
              id="valid-till"
              type="date"
              value={validTill}
              onChange={(e) => onValidTillChange(e.target.value)}
              className="text-lg font-semibold border-gray-300"
            />
          </div>
        </div>
      )}

      {documentType === 'invoice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="due-date" className="text-sm text-gray-600 mb-2 block">
              Due Date
            </Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
              className="text-lg font-semibold border-gray-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}
