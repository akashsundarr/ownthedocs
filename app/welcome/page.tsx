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

export default function WelcomePacketBuilder() {
  // Section 1: Intro
  const [company, setCompany] = useState('OwnTheSite');
  const [tagline, setTagline] = useState('Design that converts');
  const [client, setClient] = useState('');
  const [welcome, setWelcome] = useState("We're so excited to welcome you aboard! This packet covers everything you need to know as we kick off your project…");
  
  // Section 2: Client Portal & Delivery
  const [portalLink, setPortalLink] = useState('https://portal.ownthesite.com');
  const [deliveryEmail, setDeliveryEmail] = useState('billing@client.com');
  const [onboardingNotes, setOnboardingNotes] = useState('All project files, invoices, and design drafts will be shared via the portal and sent to your delivery email.');

  // Section 3: Questionnaire
  const [questionnaireLink, setQuestionnaireLink] = useState('https://forms.gle/your-form-id');
  const [questionnaireInstructions, setQuestionnaireInstructions] = useState('Please complete this brand strategy questionnaire. It helps us understand your goals and design preferences before we start.');

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;
    try {
      const dataUrl = await toPng(pdfRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Basic multi-page if needed (for long welcome packets)
      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
          // Simplistic slicing for now, standard A4 is ~297mm
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } else {
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save(`welcome-${client.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-anton uppercase tracking-tighter text-gray-900">
              Welcome Builder
            </h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-medium">
              Client Onboarding Experience
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
            {/* Section 1: Intro */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 border-b pb-2">1. Intro & Branding</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Company Name</Label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Studio Clarity" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Tagline</Label>
                  <Input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Design that converts" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Client Name / Company</Label>
                <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Nora Bakery Co." />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Welcome Message</Label>
                <Textarea value={welcome} onChange={(e) => setWelcome(e.target.value)} rows={4} />
              </div>
            </section>

            {/* Section 2: Portal & Delivery */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 border-b pb-2">2. Client Portal & Delivery</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Client Portal Link</Label>
                  <Input value={portalLink} onChange={(e) => setPortalLink(e.target.value)} placeholder="https://portal.yoursite.com" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Delivery Email</Label>
                  <Input value={deliveryEmail} onChange={(e) => setDeliveryEmail(e.target.value)} placeholder="billing@client.com" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Onboarding Notes</Label>
                  <Textarea value={onboardingNotes} onChange={(e) => setOnboardingNotes(e.target.value)} rows={3} />
                </div>
              </div>
            </section>

            {/* Section 3: Questionnaire */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 border-b pb-2">3. Questionnaire</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Questionnaire Link</Label>
                  <Input value={questionnaireLink} onChange={(e) => setQuestionnaireLink(e.target.value)} placeholder="Link to Google Forms / Typeform" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Instruction Blurb</Label>
                  <Textarea value={questionnaireInstructions} onChange={(e) => setQuestionnaireInstructions(e.target.value)} rows={3} />
                </div>
              </div>
            </section>

            <div className="pt-4 sticky bottom-0 bg-gray-50 pb-4">
              <Button onClick={handleExportPDF} size="lg" className="w-full bg-black text-white hover:bg-gray-800 shadow-xl font-anton uppercase tracking-widest text-lg py-8">
                <Download className="h-5 w-5 mr-3" />
                Export Welcome Packet
              </Button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-300 p-12 rounded-2xl shadow-inner custom-scrollbar">
             <div 
               id="welcome-pdf-content" 
               ref={pdfRef} 
               className="bg-white text-black font-inter p-16 shadow-2xl min-h-[1123px] w-[794px] mx-auto origin-top scale-[0.75] xl:scale-[0.85] 2xl:scale-100 flex flex-col"
             >
                {/* Header Title */}
                <div className="w-[45%] mb-24">
                    <h1 className="text-[120px] leading-[0.85] font-anton uppercase tracking-tighter text-black">
                        WELCOME<br/>PACKET
                    </h1>
                </div>

                <div className="flex-1 space-y-12">
                    {/* Section: Welcome */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Introduction</div>
                        <div className="text-sm">
                            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Company</p>
                            <p className="font-bold text-lg leading-tight uppercase font-anton tracking-tight">{company}</p>
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">{tagline}</p>
                            <div className="mt-8">
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1 text-red-500">Prepared for</p>
                                <p className="font-bold text-xl">{client || '—'}</p>
                            </div>
                            <div className="mt-6 border-l-2 border-black pl-6 py-1">
                                <p className="leading-relaxed text-gray-700 italic">{welcome}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section: Portal */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Delivery</div>
                        <div className="text-sm space-y-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Project Portal</p>
                                <p className="font-bold text-blue-600 break-all">{portalLink || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Delivery Email</p>
                                <p className="font-bold">{deliveryEmail || '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 leading-relaxed italic">{onboardingNotes}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section: Action */}
                    <div className="grid grid-cols-[200px_1fr] gap-8 border-t border-black/10 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Next Step</div>
                        <div className="text-sm">
                            <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Onboarding Questionnaire</p>
                            <p className="leading-relaxed font-medium mb-4">{questionnaireInstructions}</p>
                            <div className="bg-black text-white p-4 rounded-sm inline-block">
                                <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Complete here</p>
                                <p className="font-bold text-xs">{questionnaireLink || '—'}</p>
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
