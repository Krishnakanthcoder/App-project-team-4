import React from 'react';
import {
  Scale,
  Shield,
  Search,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  AlertCircle,
  HelpCircle,
  Home,
  ShoppingBag,
  Briefcase,
  FileSignature,
  UserX,
  Car,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab, openAuthModal }) => {
  const { isAuthenticated, enableDemoMode } = useAuth();

  const handleStartAnalysis = () => {
    setCurrentTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTopics = () => {
    setCurrentTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 sm:pt-20 pb-8 text-center max-w-4xl mx-auto px-4">
        {/* Subtle decorative glow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-semibold tracking-wide mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>2nd-Year B.Tech CSE / AIML Academic Prototype</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 font-serif tracking-tight leading-tight mb-4">
          LEGAL GUARDIAN <span className="text-blue-700">AI</span>
        </h1>

        <p className="text-lg sm:text-xl font-bold text-slate-700 mb-2">
          Smart Legal Awareness & Complaint Assistance System
        </p>

        <p className="text-xl sm:text-2xl font-serif italic text-blue-900 mb-6">
          “Understand your issue. Know your options. Take the next step.”
        </p>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Turn complex legal information into simple, understandable guidance. Describe your
          concern, explore legal-awareness information, and identify possible next steps.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <button
            onClick={handleStartAnalysis}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition flex items-center justify-center gap-2 group text-base"
          >
            <span>Analyze My Issue</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={handleExploreTopics}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-300 shadow-xs hover:border-slate-400 transition flex items-center justify-center gap-2 text-base"
          >
            <Search className="w-5 h-5 text-slate-500" />
            <span>Explore Legal Information</span>
          </button>
        </div>

        {/* Mandatory Small Disclaimer */}
        <p className="text-xs text-slate-500 italic">
          “For general legal awareness only — not legal advice.”
        </p>

        {/* Demo Fast Track Card for Academic Evaluation */}
        {!isAuthenticated && (
          <div className="mt-10 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-left max-w-xl mx-auto shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-200/60 text-amber-900 flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 fill-amber-700 text-amber-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">Evaluating for College Jury?</h4>
                <p className="text-xs text-amber-800">
                  Launch safe pre-seeded student demo mode with sample complaints & reports.
                </p>
              </div>
            </div>
            <button
              onClick={enableDemoMode}
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition shrink-0"
            >
              Start Demo Mode
            </button>
          </div>
        )}
      </section>

      {/* ================= SECTION 1: WHAT CAN IT DO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Can Legal Guardian AI Do?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Demystifying legal processes through structured computer science techniques and domain
            awareness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Search Legal Information</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find simple explanations of common legal topics across consumer, cyber, tenancy, and
              workplace issues.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Describe Your Problem</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explain your issue in natural language without needing to know statutes, sections, or
              complex jargon.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-600 group-hover:text-white transition">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Understand Your Situation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Identify the broad category of the dispute and receive simplified, educational context.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Generate an Awareness Report
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Organize the issue, category, information, and suggested next steps in an official
              printable format.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: HOW IT WORKS ================= */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Workflow Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">How It Works</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              A transparent four-step pipeline transitioning from natural language input to
              structured guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-3 relative">
              <div className="text-4xl font-black text-amber-400/80 font-mono">01</div>
              <h3 className="text-lg font-bold text-white">Describe</h3>
              <p className="text-sm text-slate-300 italic">
                “Tell us what happened in your own words.”
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Type your scenario directly without fearing formal legal phraseology.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 relative">
              <div className="text-4xl font-black text-blue-400/80 font-mono">02</div>
              <h3 className="text-lg font-bold text-white">Categorize</h3>
              <p className="text-sm text-slate-300 italic">
                “The system identifies the broad issue category.”
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated keyword rules (designed for C-engine native module) triage the topic.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 relative">
              <div className="text-4xl font-black text-emerald-400/80 font-mono">03</div>
              <h3 className="text-lg font-bold text-white">Understand</h3>
              <p className="text-sm text-slate-300 italic">
                “Receive simplified legal-awareness information.”
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Synthesized plain-language briefing on rights, obligations, and general norms.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 relative">
              <div className="text-4xl font-black text-purple-400/80 font-mono">04</div>
              <h3 className="text-lg font-bold text-white">Take the next step</h3>
              <p className="text-sm text-slate-300 italic">
                “Review possible actions and useful documents to preserve.”
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Action checklist, evidence preservation guidelines, and professional help criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: EXAMPLE CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Example Categories
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            The system provides initial awareness across diverse real-world domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Consumer Issues',
              icon: ShoppingBag,
              color: 'text-blue-600 bg-blue-50',
              desc: 'Defective products, service deficiency, refused refunds, and unfair trade.'
            },
            {
              title: 'Cybercrime & Online Fraud',
              icon: Lock,
              color: 'text-indigo-600 bg-indigo-50',
              desc: 'UPI scams, unauthorized debits, phishing links, and malware intrusions.'
            },
            {
              title: 'Rental / Tenant Issues',
              icon: Home,
              color: 'text-emerald-600 bg-emerald-50',
              desc: 'Unreturned security deposits, eviction disputes, and lease agreements.'
            },
            {
              title: 'Workplace Issues',
              icon: Briefcase,
              color: 'text-amber-600 bg-amber-50',
              desc: 'Unpaid salary, wrongful termination, discrimination, and labor norms.'
            },
            {
              title: 'Contract Disputes',
              icon: FileSignature,
              color: 'text-purple-600 bg-purple-50',
              desc: 'Breach of agreement, unpaid freelance milestones, and contract terms.'
            },
            {
              title: 'Harassment & Safety',
              icon: UserX,
              color: 'text-rose-600 bg-rose-50',
              desc: 'Threatening messages, online stalking, intimidation, and safety hazards.'
            },
            {
              title: 'Identity Theft',
              icon: Shield,
              color: 'text-cyan-600 bg-cyan-50',
              desc: 'Aadhaar / ID misuse, fraudulent credit lines, and SIM-swap scams.'
            },
            {
              title: 'Traffic-related Issues',
              icon: Car,
              color: 'text-orange-600 bg-orange-50',
              desc: 'Disputed electronic challans, accident liabilities, and impounded vehicles.'
            }
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{cat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Scope */}
        <p className="text-center text-xs text-slate-500 mt-6 italic">
          *Note: These categories are provided for foundational awareness and do not cover all
          potential legal situations or jurisdictions.
        </p>
      </section>

      {/* ================= SECTION 4: SAFETY & PRIVACY ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Safety, Ethics & Privacy Principles</h3>
              <p className="text-xs text-slate-500">Student engineering governance standards</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> General Awareness Only
              </span>
              <p className="text-slate-600 text-xs">
                The application provides general legal awareness and does not replace qualified lawyers,
                advocates, or court filings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" /> Privacy & Minimization
              </span>
              <p className="text-slate-600 text-xs">
                Users should avoid sharing unnecessary sensitive personal information (such as bank PINs,
                Aadhaar passwords, or private keys).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Verification Requirement
              </span>
              <p className="text-slate-600 text-xs">
                All information should be verified through appropriate official government sources and
                certified legal practitioners.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-600" /> Automated Model Disclosures
              </span>
              <p className="text-slate-600 text-xs">
                AI and rule-based responses may contain inaccuracies or oversights and must never be
                treated as definitive judicial statements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
