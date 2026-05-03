import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Currency, formatCurrency } from '@/lib/currency';

interface SummaryBoxProps {
  subtotal: number;
  gstEnabled: boolean;
  gstPercentage: number;
  gst: number;
  total: number;
  currency: Currency;
  onGstToggle: (enabled: boolean) => void;
  onGstPercentageChange: (percentage: number) => void;
}

export function SummaryBox({
  subtotal,
  gstEnabled,
  gstPercentage,
  gst,
  total,
  currency,
  onGstToggle,
  onGstPercentageChange,
}: SummaryBoxProps) {
  return (
    <div className="border-b border-gray-200 py-8">
      <div className="max-w-md ml-auto space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{formatCurrency(subtotal, currency)}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Label htmlFor="gst-toggle" className="text-sm text-gray-600 cursor-pointer">
              Add GST
            </Label>
            <Switch
              id="gst-toggle"
              checked={gstEnabled}
              onCheckedChange={onGstToggle}
            />
          </div>
        </div>

        {gstEnabled && (
          <div className="flex items-center space-x-4">
            <Label htmlFor="gst-percent" className="text-sm text-gray-600 w-16">
              GST %
            </Label>
            <Input
              id="gst-percent"
              type="number"
              value={gstPercentage}
              onChange={(e) =>
                onGstPercentageChange(parseFloat(e.target.value) || 0)
              }
              className="w-20 border-gray-300 text-sm text-right"
              min="0"
              step="0.01"
            />
            <span className="text-sm text-gray-600">
              = {formatCurrency(gst, currency)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-4">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">{formatCurrency(total, currency)}</span>
        </div>
      </div>
    </div>
  );
}
