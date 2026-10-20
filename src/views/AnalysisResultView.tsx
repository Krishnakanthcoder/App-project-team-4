import React, { useState } from 'react';
import {
  ShieldAlert,
  Printer,
  Download,
  BookmarkCheck,
  CheckCircle2,
  FolderOpen,
  AlertTriangle,
  ArrowLeft,
  Share2,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import { ComplaintRecord, ReportRecord } from '../types/legal';
import { dbService } from '../services/dbService';
import { useAuth } from '../context/AuthContext';
import { PrintableReportModal } from '../components/PrintableReportModal';

interface AnalysisResultViewProps {
  complaint: ComplaintRecord;
  report: ReportRecord;
  onReset: () => void;
  onGoToReports: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  complaint,
  report,
  onReset,
  onGoToReports
}) => {
  const { user, isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const handleSaveToReports = () => {
    if (!user) {
      setSaveToast('Please log in to save this report to your personal dashboard.');
      setTimeout(() => setSaveToast(null), 3000);
      return;
    }

    dbService.saveReport({
      complaint_id: complaint.id,
      user_id: user.id,
      complaint_text: complaint.complaint_text,
      category: report.category,
      category_label: report.category_label,
      summary: report.summary,
      what_this_may_relate_to: report.what_this_may_relate_to,
      suggested_actions: report.suggested_actions,
      evidence_items: report.evidence_items,
      when_to_seek_help: report.when_to_seek_help,
      disclaimer: report.disclaimer
    });

    setIsSaved(true);
    setSaveToast('Report saved successfully to your dashboard!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another Issue</span>
        </button>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={handleSaveToReports}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to Dashboard' : 'Save to Reports'}</span>
            </button>
          )}

          <button
            onClick={() => setShowPrintModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export Report</span>
          </button>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between">
          <span>{saveToast}</span>
          <button
            onClick={onGoToReports}
            className="text-emerald-800 underline hover:text-emerald-950 ml-3"
          >
            View in My Reports →
          </button>
        </div>
      )}

      {/* Main Analysis Document Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI & Rule-Engine Assisted Triage</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Date: {new Date(report.created_at).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Your Legal Awareness Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            First-level legal education analysis based on your description and automated keyword
            categorization.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* User's Original Complaint */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Issue Description
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
              "{complaint.complaint_text}"
            </div>
            {complaint.location && complaint.location !== 'Prefer not to say' && (
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span>
                  <strong>Jurisdiction / Location:</strong> {complaint.location}
                </span>
                {complaint.contacted_party && (
                  <span>
                    <strong>Contacted Other Party:</strong> {complaint.contacted_party}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Preliminary Category Card */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Preliminary Category
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-black text-slate-900">
                  {report.category_label}
                </h2>
                <span className="bg-blue-600 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                  Automated preliminary classification
                </span>
              </div>
              <p className="text-xs text-slate-600 italic">
                *Preliminary classification based on automated keyword pattern matching. Not a judicial determination.
              </p>
            </div>
          </div>

          {/* What This May Relate To */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              What This May Relate To
            </h3>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm space-y-2 shadow-xs">
              <p className="font-semibold text-slate-900">{report.summary}</p>
              <p className="text-slate-600 leading-relaxed">{report.what_this_may_relate_to}</p>
            </div>
          </div>

          {/* Possible Next Steps (Numbered Cards) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Possible General Next Steps
            </h3>
            <div className="space-y-2.5">
              {report.suggested_actions.map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 hover:border-slate-300 transition"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence / Documents to Preserve */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-amber-600" />
              Evidence & Documents to Preserve
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
              {report.evidence_items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-amber-50/40 text-slate-800 flex items-center gap-2.5"
                >
                  <span className="w-4 h-4 rounded border-2 border-amber-600 bg-white shrink-0 inline-block"></span>
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* When to Seek Professional Help */}
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm space-y-2">
            <h3 className="font-bold text-rose-900 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              When to Consider Seeking Qualified Professional Assistance
            </h3>
            <p className="text-xs text-rose-800">
              Professional legal counsel or approaching an authorized grievance commission is strongly
              advised when:
            </p>
            <ul className="space-y-1.5 text-rose-900 pl-4 list-disc text-xs leading-relaxed">
              {report.when_to_seek_help.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Mandatory Formal Legal Disclaimer Box */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block mb-0.5">
                LEGAL AWARENESS NOTICE
              </span>
              {report.disclaimer}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
            <button
              onClick={onReset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
            >
              Analyze Another Complaint
            </button>

            <button
              onClick={() => setShowPrintModal(true)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Generate Official Awareness Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Modal */}
      {showPrintModal && (
        <PrintableReportModal
          report={report}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
