import { Input } from './ui/input';
import { Button } from './ui/button';
import { Trash2, Copy, Plus } from 'lucide-react';
import { LineItem } from '@/lib/calculateTotals';
import { Currency, formatCurrency } from '@/lib/currency';

interface LineItemsTableProps {
  items: LineItem[];
  currency: Currency;
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof LineItem, value: any) => void;
}

export function LineItemsTable({
  items,
  currency,
  onAddItem,
  onDeleteItem,
  onDuplicateItem,
  onUpdateItem,
}: LineItemsTableProps) {
  return (
    <div className="border-b border-gray-200 py-8">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Line Items</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">
                Service Name
              </th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">
                Description
              </th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 w-20">
                Qty
              </th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 w-24">
                Price
              </th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 w-24">
                Total
              </th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 px-3">
                  <Input
                    value={item.serviceName}
                    onChange={(e) =>
                      onUpdateItem(item.id, 'serviceName', e.target.value)
                    }
                    placeholder="Service name"
                    className="border-gray-300 text-sm"
                  />
                </td>
                <td className="py-4 px-3">
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      onUpdateItem(item.id, 'description', e.target.value)
                    }
                    placeholder="Description"
                    className="border-gray-300 text-sm"
                  />
                </td>
                <td className="py-4 px-3">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateItem(
                        item.id,
                        'quantity',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className="border-gray-300 text-sm text-right"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="py-4 px-3">
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      onUpdateItem(
                        item.id,
                        'price',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                    className="border-gray-300 text-sm text-right"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="py-4 px-3 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.total, currency)}
                  </span>
                </td>
                <td className="py-4 px-3 text-center space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicateItem(item.id)}
                    className="h-8 w-8 p-0"
                    title="Duplicate row"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteItem(item.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    title="Delete row"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        onClick={onAddItem}
        variant="outline"
        className="mt-4 text-sm border-gray-300"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Line Item
      </Button>
    </div>
  );
}
