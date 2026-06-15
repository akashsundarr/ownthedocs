'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function ClientAgreementBuilder() {
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [projectName, setProjectName] = useState('Website Redesign');
  const [effectiveDate, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [scope, setScope] = useState('A complete overhaul of the existing website including UI/UX design and development.');
  const [paymentTerms, setPaymentTerms] = useState('50% upfront, 50% on completion.');
  
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;
    try {
      const dataUrl = await toPng(pdfRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#F5F0E8',
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`agreement-${clientName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-anton uppercase tracking-tighter text-gray-900">
              Agreement Builder
            </h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-medium">
              Professional Client Contracts
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
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 border-b pb-2">Contract Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Client Name</Label>
                  <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Doe" className="border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Company</Label>
                  <Input value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} placeholder="Acme Corp" className="border-gray-200" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Project Name</Label>
                  <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Date</Label>
                  <Input type="date" value={effectiveDate} onChange={(e) => setDate(e.target.value)} className="border-gray-200" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Scope of Work</Label>
                <Textarea value={scope} onChange={(e) => setScope(e.target.value)} rows={4} className="border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Payment Terms</Label>
                <Textarea value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} rows={2} className="border-gray-200" />
              </div>
            </section>

            <div className="pt-4 sticky bottom-0 bg-gray-50 pb-4">
              <Button onClick={handleExportPDF} size="lg" className="w-full bg-black text-white hover:bg-gray-800 shadow-xl font-anton uppercase tracking-widest text-lg py-8">
                <Download className="h-5 w-5 mr-3" />
                Generate Agreement
              </Button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-300 p-12 rounded-2xl shadow-inner custom-scrollbar">
             <div 
               id="agreement-preview" 
               ref={pdfRef} 
               className="bg-[#F5F0E8] text-black font-inter p-16 shadow-2xl min-h-[1123px] w-[794px] mx-auto origin-top scale-[0.75] xl:scale-[0.85] 2xl:scale-100 flex flex-col"
             >
                {/* Header Title */}
                <div className="w-[45%] mb-24">
                    <h1 className="text-[120px] leading-[0.85] font-anton uppercase tracking-tighter text-black">
                        CLIENT<br/>AGREEMENT
                    </h1>
                </div>

                <div className="flex-1 space-y-12">
                    {/* Section: Parties */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">The Parties</div>
                        <div className="text-sm space-y-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Contractor</p>
                                <p className="font-bold text-lg">OwnTheSite</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Client</p>
                                <p className="font-bold text-lg">{clientName || '—'} {clientCompany ? `(${clientCompany})` : ''}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section: Project */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Assignment</div>
                        <div className="text-sm">
                            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Project Name</p>
                            <p className="font-bold text-xl uppercase font-anton tracking-tight">{projectName}</p>
                            <div className="mt-6">
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Scope</p>
                                <p className="leading-relaxed text-gray-800">{scope}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section: Financials */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Terms</div>
                        <div className="text-sm">
                            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Payment Schedule</p>
                            <p className="leading-relaxed font-bold">{paymentTerms}</p>
                        </div>
                    </div>

                    {/* Section: Execution */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Execution</div>
                        <div className="grid grid-cols-2 gap-12">
                            <div className="border-b border-black pb-2 mt-8">
                                <p className="text-[9px] uppercase tracking-widest text-black/40 mb-8">Contractor Signature</p>
                            </div>
                            <div className="border-b border-black pb-2 mt-8">
                                <p className="text-[9px] uppercase tracking-widest text-black/40 mb-8">Client Signature</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-24 pt-8 border-t border-black/10 flex justify-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">
                        LET'S BUILD SOMETHING GREAT
                    </p>
                </div>
             </div>
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
