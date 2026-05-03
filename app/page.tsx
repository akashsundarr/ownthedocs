'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeaderForm } from '@/components/HeaderForm';
import { ClientForm } from '@/components/ClientForm';
import { LineItemsTable } from '@/components/LineItemsTable';
import { SummaryBox } from '@/components/SummaryBox';
import { NotesSection } from '@/components/NotesSection';
import { PDFPreview } from '@/components/PDFPreview';
import {
  LineItem,
  calculateLineItemTotal,
  calculateSubtotal,
  calculateGST,
  calculateTotal,
} from '@/lib/calculateTotals';
import { exportToPDF } from '@/lib/pdfExport';
import { Download, RotateCcw } from 'lucide-react';

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
  const [documentType, setDocumentType] = useState<'quotation' | 'invoice'>(
    'quotation'
  );

  // Header
  const [documentNumber, setDocumentNumber] = useState(
    generateDocumentNumber('quotation')
  );
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validTill, setValidTill] = useState(getNextDate(30));
  const [dueDate, setDueDate] = useState(getNextDate(15));

  // Business Info
  const [businessName, setBusinessName] = useState('OwnTheSite');
  const [businessEmail, setBusinessEmail] = useState('hello@ownthesite.com');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');
  const [businessAddress, setBusinessAddress] = useState('');

  // Client
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');

  // Line Items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      serviceName: '',
      description: '',
      quantity: 0,
      price: 0,
      total: 0,
    },
  ]);

  // Pricing
  const [gstEnabled, setGstEnabled] = useState(true);
  const [gstPercentage, setGstPercentage] = useState(18);

  // Notes
  const [notes, setNotes] = useState(
    '50% upfront, 50% on completion\nTimeline: 5–10 days\nHosting/domain not included'
  );

  const pdfRef = useRef<HTMLDivElement>(null);

  // Calculations
  const updatedLineItems = lineItems.map((item) => ({
    ...item,
    total: calculateLineItemTotal(item.quantity, item.price),
  }));

  const subtotal = calculateSubtotal(updatedLineItems);
  const gst = calculateGST(subtotal, gstEnabled, gstPercentage);
  const total = calculateTotal(subtotal, gst);

  // Handlers
  const handleDocumentTypeChange = (type: 'quotation' | 'invoice') => {
    setDocumentType(type);
    setDocumentNumber(generateDocumentNumber(type));
  };

  const handleAddLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      serviceName: '',
      description: '',
      quantity: 0,
      price: 0,
      total: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleDeleteLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const handleDuplicateLineItem = (id: string) => {
    const item = lineItems.find((i) => i.id === id);
    if (item) {
      const newItem = {
        ...item,
        id: Date.now().toString(),
      };
      setLineItems([...lineItems, newItem]);
    }
  };

  const handleUpdateLineItem = (
    id: string,
    field: keyof LineItem,
    value: any
  ) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleExportPDF = () => {
    exportToPDF({
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
      lineItems: updatedLineItems,
      subtotal,
      gstEnabled,
      gstPercentage,
      gst,
      total,
      notes,
    });
  };

  const handleReset = () => {
    setDocumentNumber(generateDocumentNumber(documentType));
    setDate(new Date().toISOString().split('T')[0]);
    setValidTill(getNextDate(30));
    setDueDate(getNextDate(15));
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientCompany('');
    setLineItems([
      {
        id: '1',
        serviceName: '',
        description: '',
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
    setNotes(
      '50% upfront, 50% on completion\nTimeline: 5–10 days\nHosting/domain not included'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Document Builder
          </h1>
          <p className="text-gray-600">
            Create and export quotations and invoices as PDF
          </p>
        </div>

        {/* Document Type Toggle */}
        <div className="mb-8">
          <Tabs
            value={documentType}
            onValueChange={(value) =>
              handleDocumentTypeChange(value as 'quotation' | 'invoice')
            }
            className="w-full"
          >
            <TabsList className="grid w-full max-w-sm">
              <TabsTrigger value="quotation">Quotation</TabsTrigger>
              <TabsTrigger value="invoice">Invoice</TabsTrigger>
            </TabsList>

            <TabsContent value="quotation" className="space-y-8 mt-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <HeaderForm
                  documentType="quotation"
                  documentNumber={documentNumber}
                  date={date}
                  validTill={validTill}
                  dueDate={dueDate}
                  onDocumentNumberChange={setDocumentNumber}
                  onDateChange={setDate}
                  onValidTillChange={setValidTill}
                  onDueDateChange={setDueDate}
                />
                <div className="py-8" />
                <ClientForm
                  businessName={businessName}
                  businessEmail={businessEmail}
                  businessPhone={businessPhone}
                  businessAddress={businessAddress}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  clientPhone={clientPhone}
                  clientCompany={clientCompany}
                  onBusinessNameChange={setBusinessName}
                  onBusinessEmailChange={setBusinessEmail}
                  onBusinessPhoneChange={setBusinessPhone}
                  onBusinessAddressChange={setBusinessAddress}
                  onClientNameChange={setClientName}
                  onClientEmailChange={setClientEmail}
                  onClientPhoneChange={setClientPhone}
                  onClientCompanyChange={setClientCompany}
                />
                <div className="py-8" />
                <LineItemsTable
                  items={updatedLineItems}
                  onAddItem={handleAddLineItem}
                  onDeleteItem={handleDeleteLineItem}
                  onDuplicateItem={handleDuplicateLineItem}
                  onUpdateItem={handleUpdateLineItem}
                />
                <div className="py-8" />
                <SummaryBox
                  subtotal={subtotal}
                  gstEnabled={gstEnabled}
                  gstPercentage={gstPercentage}
                  gst={gst}
                  total={total}
                  onGstToggle={setGstEnabled}
                  onGstPercentageChange={setGstPercentage}
                />
                <div className="py-8" />
                <NotesSection notes={notes} onNotesChange={setNotes} />

                <div className="py-8 flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-gray-300"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleExportPDF}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="invoice" className="space-y-8 mt-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <HeaderForm
                  documentType="invoice"
                  documentNumber={documentNumber}
                  date={date}
                  validTill={validTill}
                  dueDate={dueDate}
                  onDocumentNumberChange={setDocumentNumber}
                  onDateChange={setDate}
                  onValidTillChange={setValidTill}
                  onDueDateChange={setDueDate}
                />
                <div className="py-8" />
                <ClientForm
                  businessName={businessName}
                  businessEmail={businessEmail}
                  businessPhone={businessPhone}
                  businessAddress={businessAddress}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  clientPhone={clientPhone}
                  clientCompany={clientCompany}
                  onBusinessNameChange={setBusinessName}
                  onBusinessEmailChange={setBusinessEmail}
                  onBusinessPhoneChange={setBusinessPhone}
                  onBusinessAddressChange={setBusinessAddress}
                  onClientNameChange={setClientName}
                  onClientEmailChange={setClientEmail}
                  onClientPhoneChange={setClientPhone}
                  onClientCompanyChange={setClientCompany}
                />
                <div className="py-8" />
                <LineItemsTable
                  items={updatedLineItems}
                  onAddItem={handleAddLineItem}
                  onDeleteItem={handleDeleteLineItem}
                  onDuplicateItem={handleDuplicateLineItem}
                  onUpdateItem={handleUpdateLineItem}
                />
                <div className="py-8" />
                <SummaryBox
                  subtotal={subtotal}
                  gstEnabled={gstEnabled}
                  gstPercentage={gstPercentage}
                  gst={gst}
                  total={total}
                  onGstToggle={setGstEnabled}
                  onGstPercentageChange={setGstPercentage}
                />
                <div className="py-8" />
                <NotesSection notes={notes} onNotesChange={setNotes} />

                <div className="py-8 flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-gray-300"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleExportPDF}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* PDF Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <PDFPreview
              ref={pdfRef}
              documentType={documentType}
              documentNumber={documentNumber}
              date={date}
              validTill={validTill}
              dueDate={dueDate}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
