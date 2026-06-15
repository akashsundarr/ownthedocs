'use client';

import Link from 'next/link';
import { FileText, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            OwnTheDocs
          </h1>
          <p className="text-xl text-gray-600">
            Professional document generation tools for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Document Builder Card */}
          <Link href="/documents" className="group">
            <div className="h-full p-8 border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                <FileText className="h-8 w-8 text-gray-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-sans">
                Document Builder
              </h2>
              <p className="text-gray-500 font-sans leading-relaxed">
                Generate professional quotations and invoices with automatic calculations, GST support, and multi-currency formatting.
              </p>
              <div className="mt-auto pt-8">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                  Open Builder →
                </span>
              </div>
            </div>
          </Link>

          {/* Welcome Packet Card */}
          <Link href="/welcome" className="group">
            <div className="h-full p-8 border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                <LayoutDashboard className="h-8 w-8 text-gray-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-sans">
                Welcome Packet
              </h2>
              <p className="text-gray-500 font-sans leading-relaxed">
                Onboard new clients with style. Create beautiful multi-page guides covering your process, policies, team, and FAQs.
              </p>
              <div className="mt-auto pt-8">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                  Open Builder →
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center text-gray-400 text-sm font-sans tracking-wide">
          © {new Date().getFullYear()} OwnTheSite — All rights reserved
        </div>
      </div>
    </div>
  );
}
