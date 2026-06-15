'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeaderForm } from '@/components/HeaderForm';
import { ClientForm } from '@/components/ClientForm';
import { LineItemsTable } from '@/components/LineItemsTable';
import { SummaryBox } from '@/components/SummaryBox';
import { NotesSection } from '@/components/NotesSection';
import { PDFPreview } from '@/components/PDFPreview';
import { CurrencySelector } from '@/components/CurrencySelector';
import { CSVImporter } from '@/components/CSVImporter';
import {
  LineItem,
  calculateLineItemTotal,
  calculateSubtotal,
  calculateGST,
  calculateTotal,
} from '@/lib/calculateTotals';
import { exportToPDF } from '@/lib/pdfExport';
import { Currency } from '@/lib/currency';
import { formatDateString } from '@/lib/utils';
import { Download, RotateCcw, ArrowLeft } from 'lucide-react';

function generateDocumentNumber(type: 'quotation' | 'invoice'): string {
  const timestamp = Date.now().toString().slice(-6);
  const prefix = type === 'quotation' ? 'Q' : 'INV';
  return `${prefix}-${timestamp}`;
}

function getNextDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export default function DocumentBuilder() {
  const [documentType, setDocumentType] = useState<'quotation' | 'invoice'>('quotation');
  const [documentNumber, setDocumentNumber] = useState(generateDocumentNumber('quotation'));
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validTill, setValidTill] = useState(getNextDate(30));
  const [dueDate, setDueDate] = useState(getNextDate(15));
  const [businessName, setBusinessName] = useState('OwnTheSite');
  const [businessEmail, setBusinessEmail] = useState('hello@ownthesite.com');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');
  const [businessAddress, setBusinessAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([{ id: '1', serviceName: '', description: '', quantity: 0, price: 0, total: 0 }]);
  const [gstEnabled, setGstEnabled] = useState(true);
  const [gstPercentage, setGstPercentage] = useState(18);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [conversionEnabled, setConversionEnabled] = useState(false);
  const [notes, setNotes] = useState('50% upfront, 50% on completion\nTimeline: 5–10 days\nHosting/domain not included');

  const pdfRef = useRef<HTMLDivElement>(null);
  const updatedLineItems = lineItems.map((item) => ({ ...item, total: calculateLineItemTotal(item.quantity, item.price) }));
  const subtotal = calculateSubtotal(updatedLineItems);
  const gst = calculateGST(subtotal, gstEnabled, gstPercentage);
  const total = calculateTotal(subtotal, gst);

  const handleDocumentTypeChange = (type: 'quotation' | 'invoice') => {
    setDocumentType(type);
    setDocumentNumber(generateDocumentNumber(type));
  };

  const handleUpdateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-anton uppercase tracking-tighter text-gray-900">
              Document Builder
            </h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-medium">
              Quotes & Invoices
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-gray-300 uppercase text-xs tracking-widest font-bold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Side */}
          <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar">
            <Tabs value={documentType} onValueChange={(v) => handleDocumentTypeChange(v as any)}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-1">
                <TabsTrigger value="quotation" className="uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-black data-[state=active]:text-white">Quotation</TabsTrigger>
                <TabsTrigger value="invoice" className="uppercase text-[10px] tracking-widest font-bold data-[state=active]:bg-black data-[state=active]:text-white">Invoice</TabsTrigger>
              </TabsList>
            </Tabs>

            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
              <CurrencySelector currency={currency} conversionEnabled={conversionEnabled} onCurrencyChange={setCurrency} onConversionToggle={setConversionEnabled} />
              <HeaderForm documentType={documentType} documentNumber={documentNumber} date={date} validTill={validTill} dueDate={dueDate} onDocumentNumberChange={setDocumentNumber} onDateChange={setDate} onValidTillChange={setValidTill} onDueDateChange={setDueDate} />
              <ClientForm businessName={businessName} businessEmail={businessEmail} businessPhone={businessPhone} businessAddress={businessAddress} clientName={clientName} clientEmail={clientEmail} clientPhone={clientPhone} clientCompany={clientCompany} onBusinessNameChange={setBusinessName} onBusinessEmailChange={setBusinessEmail} onBusinessPhoneChange={setBusinessPhone} onBusinessAddressChange={setBusinessAddress} onClientNameChange={setClientName} onClientEmailChange={setClientEmail} onClientPhoneChange={setClientPhone} onClientCompanyChange={setClientCompany} />
              <CSVImporter onImport={setLineItems} />
              <LineItemsTable items={updatedLineItems} currency={currency} onAddItem={() => setLineItems([...lineItems, { id: Date.now().toString(), serviceName: '', description: '', quantity: 0, price: 0, total: 0 }])} onDeleteItem={(id) => setLineItems(lineItems.filter(i => i.id !== id))} onDuplicateItem={(id) => { const i = lineItems.find(x => x.id === id); if(i) setLineItems([...lineItems, {...i, id: Date.now().toString()}]) }} onUpdateItem={handleUpdateLineItem} />
              <SummaryBox subtotal={subtotal} gstEnabled={gstEnabled} gstPercentage={gstPercentage} gst={gst} total={total} currency={currency} onGstToggle={setGstEnabled} onGstPercentageChange={setGstPercentage} />
              <NotesSection notes={notes} onNotesChange={setNotes} />
            </section>

            <div className="pt-4 sticky bottom-0 bg-gray-50 pb-4">
              <Button onClick={() => exportToPDF({ documentType, documentNumber, date, validTill, dueDate, businessName, businessEmail, businessPhone, businessAddress, clientName, clientEmail, clientPhone, clientCompany, lineItems: updatedLineItems, subtotal, gstEnabled, gstPercentage, gst, total, notes, currency })} size="lg" className="w-full bg-black text-white hover:bg-gray-800 shadow-xl font-anton uppercase tracking-widest text-lg py-8">
                <Download className="h-5 w-5 mr-3" />
                Generate {documentType}
              </Button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-300 p-12 rounded-2xl shadow-inner custom-scrollbar">
            <PDFPreview
              ref={pdfRef}
              documentType={documentType}
              documentNumber={documentNumber}
              date={date}
              dateFormatted={formatDateString(date)}
              validTill={validTill}
              validTillFormatted={validTill ? formatDateString(validTill) : undefined}
              dueDate={dueDate}
              dueDateFormatted={dueDate ? formatDateString(dueDate) : undefined}
              businessName={businessName}
              businessEmail={businessEmail}
              businessPhone={businessPhone}
              businessAddress={businessAddress}
              clientName={clientName}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
              clientCompany={clientCompany}
              lineItems={updatedLineItems}
              subtotal={subtotal}
              gstEnabled={gstEnabled}
              gstPercentage={gstPercentage}
              gst={gst}
              total={total}
              notes={notes}
              currency={currency}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}
