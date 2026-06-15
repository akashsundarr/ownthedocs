import React, { forwardRef } from "react";
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

export const PDFPreview = forwardRef<HTMLDivElement, PDFPreviewProps>(
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
        ref={ref}
        id="pdf-content"
        className="bg-white text-black font-inter p-16 shadow-2xl min-h-[1123px] w-[794px] mx-auto flex flex-col"
      >
        {/* Header Title */}
        <div className="w-[45%] mb-24">
            <h1 className="text-[120px] leading-[0.85] font-anton uppercase tracking-tighter text-black">
                {documentType === 'quotation' ? 'PROJECT' : 'OFFICIAL'}<br/>{documentType === 'quotation' ? 'QUOTE' : 'INVOICE'}
            </h1>
        </div>

        <div className="flex-1 space-y-12">
            {/* Section: Reference */}
            <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Reference</div>
                <div className="grid grid-cols-2 gap-8 text-sm">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Document No.</p>
                        <p className="font-bold">{documentNumber}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Issue Date</p>
                        <p className="font-bold">{dateFormatted}</p>
                    </div>
                    {documentType === 'quotation' && validTillFormatted && (
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Valid Until</p>
                            <p className="font-bold text-red-500">{validTillFormatted}</p>
                        </div>
                    )}
                    {documentType === 'invoice' && dueDateFormatted && (
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Due Date</p>
                            <p className="font-bold text-red-500">{dueDateFormatted}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section: Parties */}
            <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">The Parties</div>
                <div className="grid grid-cols-2 gap-8 text-sm">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">From</p>
                        <p className="font-bold text-lg leading-tight">{businessName}</p>
                        <p className="text-gray-500 text-xs mt-1">{businessEmail}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">To</p>
                        <p className="font-bold text-lg leading-tight">{clientName || '—'}</p>
                        {clientCompany && <p className="font-medium text-xs">{clientCompany}</p>}
                        <p className="text-gray-500 text-xs mt-1">{clientEmail}</p>
                    </div>
                </div>
            </div>

            {/* Section: Line Items */}
            <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Line Items</div>
                <div className="space-y-4">
                    {lineItems.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-[1fr_80px_120px] gap-4 items-start pb-4 border-b border-black/5 last:border-0">
                            <div>
                                <p className="font-bold uppercase font-anton tracking-tight text-md">{item.serviceName || 'Service Item'}</p>
                                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Qty</p>
                                <p className="font-medium text-xs">{item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Total</p>
                                <p className="font-bold text-sm">{formatCurrency(item.total, currency)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section: Summary */}
            <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Totals</div>
                <div className="bg-black text-white p-8 rounded-sm">
                    <div className="space-y-2 border-b border-white/10 pb-4 mb-4">
                        <div className="flex justify-between text-xs">
                            <span className="uppercase tracking-widest text-white/40">Subtotal</span>
                            <span>{formatCurrency(subtotal, currency)}</span>
                        </div>
                        {gstEnabled && (
                            <div className="flex justify-between text-xs">
                                <span className="uppercase tracking-widest text-white/40">Tax ({gstPercentage}%)</span>
                                <span>{formatCurrency(gst, currency)}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Total Balance</span>
                        <span className="text-3xl font-anton uppercase tracking-tighter leading-none">
                            {formatCurrency(total, currency)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Section: Notes */}
            {notes && (
                <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Additional Notes</div>
                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{notes}</p>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-black/10 flex justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">
                LET'S BUILD SOMETHING GREAT
            </p>
        </div>
      </div>
    );
  },
);

PDFPreview.displayName = "PDFPreview";
