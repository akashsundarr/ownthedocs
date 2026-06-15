'use client';

import Link from 'next/link';
import { FileText, LayoutDashboard, ScrollText } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-anton uppercase tracking-tighter text-gray-900 mb-4">
            OwnTheDocs
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-sm font-bold">
            High-Impact Business Documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Client Agreement Card */}
          <Link href="/agreement" className="group">
            <div className="h-full p-8 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-black flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center mb-6 transition-colors group-hover:bg-[#EAE2D5]">
                <ScrollText className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-xl font-anton uppercase tracking-tight text-gray-900 mb-3">
                Client Agreement
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Generate high-end contracts with a minimalist aesthetic and premium typography.
              </p>
              <div className="mt-auto pt-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                  Open Builder →
                </span>
              </div>
            </div>
          </Link>

          {/* Document Builder Card */}
          <Link href="/documents" className="group">
            <div className="h-full p-8 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-black flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                <FileText className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-xl font-anton uppercase tracking-tight text-gray-900 mb-3">
                Invoice & Quote
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Professional invoices and quotations with automatic GST and currency support.
              </p>
              <div className="mt-auto pt-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                  Open Builder →
                </span>
              </div>
            </div>
          </Link>

          {/* Welcome Packet Card */}
          <Link href="/welcome" className="group">
            <div className="h-full p-8 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-black flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                <LayoutDashboard className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-xl font-anton uppercase tracking-tight text-gray-900 mb-3">
                Welcome Packet
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Onboard new clients with style. Create beautiful multi-page onboarding guides.
              </p>
              <div className="mt-auto pt-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                  Open Builder →
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-24 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/20">
            LET'S BUILD SOMETHING GREAT
          </p>
        </div>
      </div>
    </div>
  );
}
