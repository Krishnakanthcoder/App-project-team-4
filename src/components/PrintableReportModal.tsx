import React from 'react';
import {
  Printer,
  Download,
  X,
  Scale,
  Shield,
  FileCheck,
  AlertTriangle,
  Clock,
  User,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { ReportRecord } from '../types/legal';

interface PrintableReportModalProps {
  report: ReportRecord;
  onClose: () => void;
}

export const PrintableReportModal: React.FC<PrintableReportModalProps> = ({
  report,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const content = `# LEGAL GUARDIAN AI - LEGAL AWARENESS REPORT
Document ID: ${report.id}
Generated Date: ${new Date(report.created_at).toLocaleString()}
Preliminary Classification: ${report.category_label} (${report.category})

================================================================================
IMPORTANT DISCLAIMER:
${report.disclaimer}
================================================================================

1. USER ISSUE STATEMENT
${report.complaint_text}

2. SYSTEM SUMMARY & LEGAL CONTEXT
${report.summary}
What this may relate to: ${report.what_this_may_relate_to}

3. POSSIBLE GENERAL NEXT STEPS
${report.suggested_actions.map((s: string, idx: number) => `${idx + 1}. ${s}`).join('\n')}

4. EVIDENCE & DOCUMENTS TO PRESERVE
${report.evidence_items.map((e) => `• [ ] ${e}`).join('\n')}

5. WHEN TO CONSIDER QUALIFIED PROFESSIONAL ASSISTANCE
${report.when_to_seek_help.map((w) => `• ${w}`).join('\n')}

================================================================================
Classification Mode: Automated Keyword-Based Preliminary Triage (C Engine Interface Prototype)
Legal Guardian AI - Academic Prototype (2nd-Year B.Tech CSE/AIML)
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Legal_Awareness_Report_${report.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none">
        {/* Modal Top Actions Bar (Hidden in print) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Report Preview
            </span>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
              {report.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg shadow-xs transition"
              title="Download text file"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Download Report
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Report
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 print:overflow-visible print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                <Scale className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif tracking-tight">
                  Legal Guardian AI
                </h1>
                <p className="text-xs font-medium text-slate-500">
                  Smart Legal Awareness & Complaint Assistance System
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 space-y-1 font-mono">
              <div>
                <span className="font-semibold text-slate-700">Report ID:</span> {report.id}
              </div>
              <div>
                <span className="font-semibold text-slate-700">Date:</span>{' '}
                {new Date(report.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="inline-block bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                Preliminary Triage Complete
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Legal Awareness Report</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-500 font-medium">Preliminary Issue Classification:</span>
              <span className="bg-blue-100 text-blue-900 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                {report.category_label}
              </span>
              <span className="text-[11px] text-slate-500 italic">
                (Automated keyword-based classification)
              </span>
            </div>
          </div>

          {/* User Issue */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-600" />
              1. Original Issue Description
            </h3>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed font-sans bg-slate-50/50">
              "{report.complaint_text}"
            </div>
          </div>

          {/* What this may relate to */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              2. What This May Relate To
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              {report.summary}
            </p>
            <p className="text-xs text-slate-600 bg-blue-50/60 border border-blue-100 p-3 rounded-lg leading-relaxed">
              <strong>Contextual note:</strong> {report.what_this_may_relate_to}
            </p>
          </div>

          {/* Possible Next Steps */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Possible General Next Steps
            </h3>
            <div className="space-y-2">
              {report.suggested_actions.map((action: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence / Documents to Preserve */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-amber-600" />
              4. Evidence & Documents to Preserve
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {report.evidence_items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-amber-50/30 text-slate-800"
                >
                  <span className="w-4 h-4 rounded border border-slate-400 bg-white shrink-0 inline-block"></span>
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* When to seek professional help */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm">
            <h3 className="font-bold text-rose-900 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              5. When to Seek Qualified Professional Help
            </h3>
            <ul className="space-y-1.5 text-rose-900/90 text-xs list-disc pl-5">
              {report.when_to_seek_help.map((help, idx) => (
                <li key={idx}>{help}</li>
              ))}
            </ul>
          </div>

          {/* Mandatory Formal Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed space-y-1">
            <p className="font-bold text-slate-700">MANDATORY STATUTORY DISCLAIMER:</p>
            <p>{report.disclaimer}</p>
            <p className="text-[10px] text-slate-400">
              Classification Engine: Keyword-based deterministic rule engine (Academic Prototype).
              No attorney-client relationship is formed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
