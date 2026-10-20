import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  AlertCircle,
  FileText,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  X,
  File,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { categorizeComplaint } from '../services/cModuleCategorizer';
import { analyzeLegalIssue } from '../services/aiLegalService';
import { dbService } from '../services/dbService';
import { useAuth } from '../context/AuthContext';
import { ComplaintRecord, ReportRecord, SearchTopic } from '../types/legal';
import { DEMO_SAMPLE_COMPLAINTS } from '../data/knowledgeBase';
import { AnalysisResultView } from './AnalysisResultView';

interface ComplaintAssistantViewProps {
  initialTopic?: SearchTopic | null;
  onGoToReports: () => void;
}

export const ComplaintAssistantView: React.FC<ComplaintAssistantViewProps> = ({
  initialTopic,
  onGoToReports
}) => {
  const { user, isAuthenticated } = useAuth();

  const [complaintText, setComplaintText] = useState<string>(
    initialTopic ? `I am facing an issue regarding ${initialTopic.title.toLowerCase()}: ` : ''
  );
  const [location, setLocation] = useState<string>('India');
  const [contactedParty, setContactedParty] = useState<'Yes' | 'No' | 'Not sure'>('Not sure');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  // Completed results
  const [analysisOutput, setAnalysisOutput] = useState<{
    complaint: ComplaintRecord;
    report: ReportRecord;
  } | null>(null);

  // Quick fill demo sample
  const handleSelectSample = (sample: typeof DEMO_SAMPLE_COMPLAINTS[0]) => {
    setComplaintText(sample.text);
    setErrorMessage(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext === 'pdf' || ext === 'jpg' || ext === 'jpeg' || ext === 'png';
      });

      if (validFiles.length < filesArray.length) {
        setErrorMessage('Only PDF, JPG, and PNG files are supported for mock document preview.');
      } else {
        setErrorMessage(null);
      }

      setUploadedFiles((prev) => [...prev, ...validFiles].slice(0, 3));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!complaintText.trim()) {
      setErrorMessage('Please describe your issue before continuing.');
      return;
    }

    if (complaintText.trim().length < 15) {
      setErrorMessage('Please provide a little more detail so our categorization engine can understand the context.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisStep('Tokenizing input and initiating C Categorization Engine...');

    try {
      // Step 1: C Engine Categorization
      await new Promise((r) => setTimeout(r, 450));
      setAnalysisProgress(45);
      setAnalysisStep('Executing deterministic keyword matching rules...');

      const catResult = categorizeComplaint(complaintText);

      // Step 2: AI Legal Awareness Service
      await new Promise((r) => setTimeout(r, 450));
      setAnalysisProgress(80);
      setAnalysisStep('Synthesizing plain-language guidance & document preservation steps...');

      const aiResult = await analyzeLegalIssue({
        complaintText,
        category: catResult.category,
        categoryLabel: catResult.categoryLabel,
        location,
        contactedParty,
        uploadedDocumentNames: uploadedFiles.map((f) => f.name)
      });

      setAnalysisProgress(100);
      setAnalysisStep('Finalizing legal awareness report...');
      await new Promise((r) => setTimeout(r, 200));

      const activeUserId = user ? user.id : 'guest-session';

      // Save complaint in database
      const savedComplaint = dbService.saveComplaint({
        user_id: activeUserId,
        complaint_text: complaintText.trim(),
        category: catResult.category,
        category_label: catResult.categoryLabel,
        location,
        contacted_party: contactedParty,
        uploaded_document_names: uploadedFiles.map((f) => f.name)
      });

      // Save report in database
      const savedReport = dbService.saveReport({
        complaint_id: savedComplaint.id,
        user_id: activeUserId,
        complaint_text: complaintText.trim(),
        category: catResult.category,
        category_label: catResult.categoryLabel,
        summary: aiResult.summary,
        what_this_may_relate_to: aiResult.whatThisMayRelateTo,
        suggested_actions: aiResult.suggestedActions,
        evidence_items: aiResult.evidenceItems,
        when_to_seek_help: aiResult.whenToSeekHelp,
        disclaimer: aiResult.disclaimer
      });

      setAnalysisOutput({
        complaint: savedComplaint,
        report: savedReport
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisOutput(null);
    setComplaintText('');
    setUploadedFiles([]);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If analysis is already performed, render the Analysis Result View
  if (analysisOutput) {
    return (
      <AnalysisResultView
        complaint={analysisOutput.complaint}
        report={analysisOutput.report}
        onReset={handleReset}
        onGoToReports={onGoToReports}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated First-Level Legal Triage</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
          Describe what happened
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          You don’t need to know legal terminology. Explain the situation in your own words.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Sample Complaints Dropdown / Pills for quick student testing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Test Scenarios (Demo):</span>
            <span className="text-[11px] text-slate-400">Click to auto-populate textarea</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_SAMPLE_COMPLAINTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition font-medium"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Large Textarea */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Your Narrative / Concern Description <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <textarea
              rows={6}
              value={complaintText}
              onChange={(e) => {
                setComplaintText(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="For example: My landlord has not returned my security deposit even though I moved out and completed all the requirements…"
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition leading-relaxed"
            />
            <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 font-mono">
              {complaintText.length} characters
            </div>
          </div>
        </div>

        {/* Additional Optional Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Field 1: Issue Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Issue Location / Jurisdiction (Optional)
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="India">India (National / Central)</option>
              <option value="State/Region">State / Regional Jurisdiction</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Field 2: Have you contacted other party */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Have you already contacted the other party?
            </label>
            <div className="flex items-center gap-4 pt-1.5 text-sm text-slate-700">
              {(['Yes', 'No', 'Not sure'] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="contactedParty"
                    value={opt}
                    checked={contactedParty === opt}
                    onChange={() => setContactedParty(opt)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Supporting Document UI */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-700">
            Upload Supporting Document (Optional)
          </label>
          <p className="text-xs text-slate-500">
            Attach relevant agreements, receipts, or screenshots for your records (Supported: PDF, JPG, PNG).
          </p>

          <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-5 text-center bg-slate-50/50 transition">
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-700">
                <span className="text-blue-600 underline">Click to upload documents</span> or drag and drop
              </div>
              <p className="text-[11px] text-slate-400">PDF, JPG, or PNG (Max 3 files)</p>
            </label>
          </div>

          {/* Uploaded File List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-1.5 pt-2">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-100 text-xs text-slate-800"
                >
                  <div className="flex items-center gap-2 truncate">
                    <File className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">{file.name}</span>
                    <span className="text-[10px] text-slate-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Strict Privacy Warning Banner */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Privacy Warning:</strong> Do not upload Aadhaar, passwords, bank PINs, OTPs, or
              other highly sensitive personal information. Files are retained client-side only in this
              prototype.
            </p>
          </div>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Engine Pipeline Diagnostics Box (Highlights C & AI Modules for Jury) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Cpu className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">
              Pipeline: Complaint Categorization Engine + AI Awareness Service
            </p>
            <p className="text-[11px] text-slate-500">
              Text will be analyzed through deterministic token classification (C module interface
              specification) followed by structured legal education synthesis.
            </p>
          </div>
        </div>

        {/* Analyze Button / Progress */}
        <div className="pt-2">
          {isAnalyzing ? (
            <div className="space-y-3 p-4 bg-blue-50/70 border border-blue-200 rounded-2xl">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                  {analysisStep}
                </span>
                <span className="font-mono">{analysisProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAnalyze}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition" />
              <span>Analyze My Issue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          )}
        </div>

        {/* Small Disclaimer */}
        <p className="text-center text-[11px] text-slate-400 italic">
          “This information is provided for general legal awareness and does not constitute legal
          advice.”
        </p>
      </div>
    </div>
  );
};
