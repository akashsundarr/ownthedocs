import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Currency } from '@/lib/currency';

interface CurrencySelectorProps {
  currency: Currency;
  conversionEnabled: boolean;
  onCurrencyChange: (currency: Currency) => void;
  onConversionToggle: (enabled: boolean) => void;
}

export function CurrencySelector({
  currency,
  conversionEnabled,
  onCurrencyChange,
  onConversionToggle,
}: CurrencySelectorProps) {
  const currencies: Currency[] = ['INR', 'USD', 'AED'];

  return (
    <div className="border-b border-gray-200 pb-6 space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <Label htmlFor="currency-select" className="text-sm text-gray-600 mb-2 block">
            Currency
          </Label>
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-6">
          <Label
            htmlFor="conversion-toggle"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Auto Convert
          </Label>
          <Switch
            id="conversion-toggle"
            checked={conversionEnabled}
            onCheckedChange={onConversionToggle}
          />
        </div>
      </div>

      {conversionEnabled && (
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          Base currency: INR. Conversions use fixed rates (1 USD = ₹83, 1 AED = ₹22.5)
        </div>
      )}
    </div>
  );
}
