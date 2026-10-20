import React from 'react';
import { Scale, Shield, AlertTriangle, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openDisclaimerModal?: () => void;
  openPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  openDisclaimerModal,
  openPrivacyModal
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                <Scale className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight font-serif">
                Legal Guardian <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-300">
              Smart Legal Awareness & Complaint Assistance System
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              “Understand your issue. Know your options. Take the next step.”
              <br />
              An engineering college project prototype developed for 2nd-year B.Tech CSE / AIML
              curriculum demonstration.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="hover:text-amber-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('search')}
                  className="hover:text-amber-400 transition"
                >
                  Legal Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('assistant')}
                  className="hover:text-amber-400 transition"
                >
                  Complaint Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('reports')}
                  className="hover:text-amber-400 transition"
                >
                  My Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('about')}
                  className="hover:text-amber-400 transition"
                >
                  About Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Awareness */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Compliance & Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={openDisclaimerModal || (() => setCurrentTab('about'))}
                  className="hover:text-amber-400 transition text-left"
                >
                  Legal Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={openPrivacyModal || (() => setCurrentTab('about'))}
                  className="hover:text-amber-400 transition text-left"
                >
                  Privacy Guidelines
                </button>
              </li>
              <li>
                <span className="text-xs text-slate-500 block">
                  Official resource links to be verified before deployment.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 sm:p-5 mb-8 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-1">
              IMPORTANT LEGAL AWARENESS NOTICE
            </span>
            “Legal Guardian AI provides general legal awareness and educational information. It is
            not a law firm and does not provide legal representation or definitive legal advice.
            Information generated by automated systems may contain errors and should be independently
            verified. For advice about a specific situation, consult a qualified legal professional
            or the appropriate official authority.”
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Legal Guardian AI. Academic Engineering Prototype.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>B.Tech CSE/AIML Project Prototype</span>
            <span className="text-slate-600">•</span>
            <span>React + Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
