import React from 'react';
import { LineItem } from '@/lib/calculateTotals';

interface PDFPreviewProps {
  documentType: 'quotation' | 'invoice';
  documentNumber: string;
  date: string;
  validTill?: string;
  dueDate?: string;
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
}

export const PDFPreview = React.forwardRef<HTMLDivElement, PDFPreviewProps>(
  (props, ref) => {
    const {
      documentType,
      documentNumber,
      date,
      validTill,
      dueDate,
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
    } = props;

    return (
      <div
        ref={ref}
        id="pdf-content"
        className="bg-white p-12 max-w-4xl mx-auto text-gray-900 leading-relaxed"
        style={{ pageBreakAfter: 'avoid' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-1">{businessName}</h1>
            <p className="text-sm text-gray-600">{businessEmail}</p>
            <p className="text-sm text-gray-600">{businessPhone}</p>
            {businessAddress && (
              <p className="text-sm text-gray-600 whitespace-pre-line mt-2">
                {businessAddress}
              </p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {documentType === 'quotation' ? 'QUOTATION' : 'INVOICE'}
            </h2>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-gray-600">Number:</span>
                <span className="ml-2 font-semibold">{documentNumber}</span>
              </p>
              <p>
                <span className="text-gray-600">Date:</span>
                <span className="ml-2 font-semibold">
                  {new Date(date).toLocaleDateString()}
                </span>
              </p>
              {documentType === 'quotation' && validTill && (
                <p>
                  <span className="text-gray-600">Valid Till:</span>
                  <span className="ml-2 font-semibold">
                    {new Date(validTill).toLocaleDateString()}
                  </span>
                </p>
              )}
              {documentType === 'invoice' && dueDate && (
                <p>
                  <span className="text-gray-600">Due Date:</span>
                  <span className="ml-2 font-semibold">
                    {new Date(dueDate).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">BILL TO</h3>
          <p className="font-semibold text-gray-900">{clientName}</p>
          {clientCompany && (
            <p className="text-sm text-gray-600">{clientCompany}</p>
          )}
          <p className="text-sm text-gray-600">{clientEmail}</p>
          <p className="text-sm text-gray-600">{clientPhone}</p>
        </div>

        {/* Line Items */}
        <div className="mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900">
                  Service Name
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900">
                  Description
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-900 w-16">
                  Qty
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-900 w-20">
                  Price
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-900 w-20">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-2 text-sm text-gray-900">
                    {item.serviceName}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-600">
                    {item.description}
                  </td>
                  <td className="py-3 px-2 text-sm text-right text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 text-sm text-right text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-medium text-gray-900">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-12">
          <div className="w-full max-w-xs">
            <div className="flex justify-between py-2 border-t-2 border-gray-900">
              <span className="text-sm font-semibold text-gray-900">Subtotal</span>
              <span className="text-sm font-semibold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {gstEnabled && (
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">
                  GST ({gstPercentage}%)
                </span>
                <span className="text-sm text-gray-900">
                  ${gst.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-3 border-t-2 border-b-2 border-gray-900">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-12">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              NOTES & TERMS
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>Thank you for your business!</p>
        </div>
      </div>
    );
  }
);

PDFPreview.displayName = 'PDFPreview';
