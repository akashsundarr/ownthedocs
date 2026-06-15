'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Download } from 'lucide-react';
import { exportWelcomeToPDF } from '@/lib/welcomeExport';

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

  const handleExportPDF = () => {
    exportWelcomeToPDF({
        clientName: client,
        companyName: company
    });
  };

  const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-sans">
              Welcome Packet Builder
            </h1>
            <p className="text-gray-600 font-sans">
              Professional 3-step onboarding guide
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Side */}
          <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar">
            {/* Section 1: Intro */}
            <section className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 border-b pb-2 font-sans">1. Intro & Branding</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Company Name</Label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Studio Clarity" className="font-sans" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Tagline</Label>
                  <Input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Design that converts" className="font-sans" />
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <Label className="text-xs font-sans">Client Name / Company</Label>
                <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Nora Bakery Co." className="font-sans" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-sans">Welcome Message</Label>
                <Textarea value={welcome} onChange={(e) => setWelcome(e.target.value)} rows={4} className="font-sans" />
              </div>
            </section>

            {/* Section 2: Portal & Delivery */}
            <section className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 border-b pb-2 font-sans">2. Client Portal & Delivery</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Client Portal Link</Label>
                  <Input value={portalLink} onChange={(e) => setPortalLink(e.target.value)} placeholder="https://portal.yoursite.com" className="font-sans" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Delivery Email (for files/invoices)</Label>
                  <Input value={deliveryEmail} onChange={(e) => setDeliveryEmail(e.target.value)} placeholder="billing@client.com" className="font-sans" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Onboarding Notes</Label>
                  <Textarea value={onboardingNotes} onChange={(e) => setOnboardingNotes(e.target.value)} rows={3} className="font-sans" />
                </div>
              </div>
            </section>

            {/* Section 3: Questionnaire */}
            <section className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 border-b pb-2 font-sans">3. Onboarding Questionnaire</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Questionnaire Link</Label>
                  <Input value={questionnaireLink} onChange={(e) => setQuestionnaireLink(e.target.value)} placeholder="Link to Google Forms / Typeform" className="font-sans" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-sans">Instruction Blurb</Label>
                  <Textarea value={questionnaireInstructions} onChange={(e) => setQuestionnaireInstructions(e.target.value)} rows={3} className="font-sans" />
                </div>
              </div>
            </section>

            <div className="pt-4 sticky bottom-0 bg-gray-50 pb-4">
              <Button onClick={handleExportPDF} size="lg" className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-lg font-sans">
                <Download className="h-4 w-4 mr-2" />
                Export Welcome Packet PDF
              </Button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-200 p-8 rounded-lg shadow-inner custom-scrollbar">
             <div id="welcome-pdf-content" ref={pdfRef} className="bg-white text-black font-sans p-10 shadow-2xl min-h-[1123px] w-[794px] mx-auto origin-top scale-[0.75] xl:scale-[0.9] 2xl:scale-100">
                {/* Header */}
                <div className="border-b-2 border-black pb-6 mb-12 flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">{company || 'Your Company'}</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">{tagline}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold uppercase tracking-wider">Client Welcome Packet</h2>
                    <p className="text-sm text-gray-400 mt-1">{now}</p>
                    <div className="mt-4">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Prepared for</p>
                      <p className="text-lg font-bold text-gray-800">{client || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 1: Intro */}
                <div className="mb-12">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b pb-1">Introduction</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{welcome}</p>
                </div>

                {/* Section 2: Portal & Delivery */}
                <div className="mb-12">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b pb-1">Client Portal & Delivery</h3>
                  <div className="space-y-4">
                    {portalLink && (
                      <div className="bg-gray-50 p-4 rounded border border-gray-100">
                        <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Your Project Portal</p>
                        <p className="text-sm text-blue-600 font-medium break-all">{portalLink}</p>
                      </div>
                    )}
                    <div className="flex gap-8">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Delivery Email</p>
                        <p className="text-sm text-gray-800 font-medium">{deliveryEmail || '—'}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                        <p className="text-xs text-gray-600 leading-relaxed italic">{onboardingNotes}</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Questionnaire */}
                <div className="mb-12">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b pb-1">Onboarding Questionnaire</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{questionnaireInstructions}</p>
                    {questionnaireLink && (
                      <div className="bg-gray-50 p-4 rounded border border-gray-100">
                        <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Questionnaire Link</p>
                        <p className="text-sm text-blue-600 font-medium break-all">{questionnaireLink}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer (Not editable) */}
                <div className="border-t border-gray-100 mt-auto pt-8 flex justify-between items-end text-[10px] text-gray-400">
                  <div className="space-y-1">
                    <p className="font-bold uppercase tracking-wider text-gray-500">{company}</p>
                    <p>Confidential Client Document</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p>Generated on {now}</p>
                    <p>© {new Date().getFullYear()} — Proprietary & Confidential</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
