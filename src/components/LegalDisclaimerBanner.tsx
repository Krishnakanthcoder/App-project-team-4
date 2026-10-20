import React, { useState } from 'react';
import { ShieldAlert, X, Info } from 'lucide-react';
import { VERIFIED_DISCLAIMER } from '../data/knowledgeBase';

export const LegalDisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3.5 py-2 rounded-lg flex items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>General Awareness Notice:</strong> This system does not constitute legal advice.
            Consult official authorities for case-specific counsel.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm p-4 rounded-xl flex items-start justify-between gap-3 shadow-xs">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-amber-900">
            For General Legal Awareness Only — Not Legal Advice
          </p>
          <p className="text-amber-800/90 text-xs leading-relaxed">
            {VERIFIED_DISCLAIMER}
          </p>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-700 hover:text-amber-950 p-1 rounded-md hover:bg-amber-100 transition shrink-0"
        title="Dismiss notice"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
