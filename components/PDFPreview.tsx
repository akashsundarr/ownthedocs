import React from "react";
import { LineItem } from "@/lib/calculateTotals";
import { Currency, formatCurrency } from "@/lib/currency";

interface PDFPreviewProps {
  documentType: "quotation" | "invoice";
  documentNumber: string;
  date: string; 
  dateFormatted: string; 
  validTill?: string; 
  validTillFormatted?: string; 
  dueDate?: string; 
  dueDateFormatted?: string; 
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  lineItems: LineItem[];
  subtotal: number;
  gstEnabled: boolean;
  gstPercentage: number;
  gst: number;
  total: number;
  notes: string;
  currency: Currency;
}

export const PDFPreview = React.forwardRef<HTMLDivElement, PDFPreviewProps>(
  (props, ref) => {
    const {
      documentType,
      documentNumber,
      dateFormatted,
      validTillFormatted,
      dueDateFormatted,
      businessName,
      businessEmail,
      businessPhone,
      businessAddress,
      clientName,
      clientEmail,
      clientPhone,
      clientCompany,
      lineItems,
      subtotal,
      gstEnabled,
      gstPercentage,
      gst,
      total,
      notes,
      currency,
    } = props;

    return (
      <div 
        id="pdf-content" 
        ref={ref} 
        // Force exact A4 dimensions at 96 DPI, add generous page margins (p-12), 
        // and use shrink-0 so parent web containers can't squish it.
        className="pdf-safe bg-white text-black w-[794px] min-h-[1123px] p-12 shrink-0 mx-auto box-border shadow-sm"
        style={{
          width: '794px',
          minHeight: '1123px'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-[50%]">
            <h1 className="text-3xl font-bold mb-1 text-gray-900">{businessName}</h1>
            <p className="text-sm text-gray-600">{businessEmail}</p>
            <p className="text-sm text-gray-600">{businessPhone}</p>
            {businessAddress && (
              <p className="text-sm text-gray-600 whitespace-pre-line mt-2">
                {businessAddress}
              </p>
            )}
          </div>
          <div className="text-right max-w-[50%]">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wider">
              {documentType === "quotation" ? "QUOTATION" : "INVOICE"}
            </h2>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-gray-500">Number:</span>
                <span className="ml-2 font-semibold text-gray-900">{documentNumber}</span>
              </p>
              <p>
                <span className="text-gray-500">Date:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {dateFormatted}
                </span>
              </p>
              {documentType === "quotation" && validTillFormatted && (
                <p>
                  <span className="text-gray-500">Valid Till:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {validTillFormatted}
                  </span>
                </p>
              )}
              {documentType === "invoice" && dueDateFormatted && (
                <p>
                  <span className="text-gray-500">Due Date:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {dueDateFormatted}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="mb-12">
          <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">BILL TO</h3>
          <p className="text-lg font-semibold text-gray-900">{clientName}</p>
          {clientCompany && (
            <p className="text-sm text-gray-600 font-medium">{clientCompany}</p>
          )}
          <p className="text-sm text-gray-600 mt-1">{clientEmail}</p>
          <p className="text-sm text-gray-600">{clientPhone}</p>
        </div>

        {/* Line Items */}
        <div className="mb-12 min-h-[300px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider w-1/3">
                  Service Name
                </th>
                <th className="text-left py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Description
                </th>
                <th className="text-right py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider w-16">
                  Qty
                </th>
                <th className="text-right py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider w-24">
                  Price
                </th>
                <th className="text-right py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider w-28">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-4 px-2 text-sm font-medium text-gray-900 align-top">
                    {item.serviceName}
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600 align-top">
                    {item.description}
                  </td>
                  <td className="py-4 px-2 text-sm text-right text-gray-900 align-top">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-2 text-sm text-right text-gray-900 align-top">
                    {formatCurrency(item.price, currency)}
                  </td>
                  <td className="py-4 px-2 text-sm text-right font-semibold text-gray-900 align-top">
                    {formatCurrency(item.total, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-12">
          <div className="w-full max-w-[320px]">
            <div className="flex justify-between py-3 border-t-2 border-gray-900">
              <span className="text-sm font-semibold text-gray-600">
                Subtotal
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(subtotal, currency)}
              </span>
            </div>
            {gstEnabled && (
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">
                  GST ({gstPercentage}%)
                </span>
                <span className="text-sm text-gray-900">
                  {formatCurrency(gst, currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-4 mt-2 border-t border-b-2 border-gray-900 bg-gray-50 px-2">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900 text-lg">
                {formatCurrency(total, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-auto">
            <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
              NOTES & TERMS
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>Thank you for your business!</p>
        </div>
      </div>
    );
  },
);

PDFPreview.displayName = "PDFPreview";