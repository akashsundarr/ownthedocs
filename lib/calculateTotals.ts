export interface LineItem {
  id: string;
  serviceName: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export function calculateLineItemTotal(quantity: number, price: number): number {
  return parseFloat((quantity * price).toFixed(2));
}

export function calculateSubtotal(items: LineItem[]): number {
  return parseFloat(
    items.reduce((sum, item) => sum + item.total, 0).toFixed(2)
  );
}

export function calculateGST(
  subtotal: number,
  gstEnabled: boolean,
  gstPercentage: number
): number {
  if (!gstEnabled) return 0;
  return parseFloat((subtotal * (gstPercentage / 100)).toFixed(2));
}

export function calculateTotal(
  subtotal: number,
  gst: number
): number {
  return parseFloat((subtotal + gst).toFixed(2));
}
