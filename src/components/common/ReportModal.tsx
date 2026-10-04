import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flag, X, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ReportItem } from '../../types';

export const ReportModal: React.FC = () => {
  const { reportModalData, closeReportModal, submitReport } = useApp();

  const [reason, setReason] = useState<ReportItem['reason']>('inappropriate_content');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!reportModalData || !reportModalData.isOpen) return null;

  const reasonOptions: { id: ReportItem['reason']; label: string; desc: string }[] = [
    {
      id: 'inappropriate_content',
      label: 'Inappropriate or Explicit Content',
      desc: 'Nudity, violence, offensive imagery or profanity'
    },
    {
      id: 'spam_scam',
      label: 'Spam, Fraud or Counterfeit Parts Scam',
      desc: 'Fake seller, duplicate replica parts without disclaimer, or phishing'
    },
    {
      id: 'fake_mod_claims',
      label: 'Fake Modification Claims',
      desc: 'Claiming dyno numbers, stages or parts that do not exist on the car'
    },
    {
      id: 'dangerous_driving',
      label: 'Reckless / Dangerous Driving',
      desc: 'Unsafe public stunts, extreme speeding without track supervision'
    },
    {
      id: 'harassment',
      label: 'Harassment or Bullying',
      desc: 'Targeted abuse in comments, DMs or community threads'
    },
    {
      id: 'other',
      label: 'Other Violations',
      desc: 'Any other violation of CARIX Community Guidelines'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitReport({
        targetType: reportModalData.targetType,
        targetId: reportModalData.targetId,
        targetUsername: reportModalData.targetUsername,
        targetTitle: reportModalData.targetTitle,
        reason,
        details: details.trim() || 'No additional details provided.'
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#121212] border border-[#2b2b2b] rounded-3xl p-6 shadow-2xl text-white space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-900/60 flex items-center justify-center text-[#E50914]">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Report {reportModalData.targetType.toUpperCase()}
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Target: <span className="text-red-400 font-bold">@{reportModalData.targetUsername}</span>
              </p>
            </div>
          </div>

          <button
            onClick={closeReportModal}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {reportModalData.targetTitle && (
          <div className="p-3 rounded-xl bg-[#181818] border border-[#262626] text-xs text-neutral-300">
            <span className="text-neutral-500 font-mono text-[10px] block">REPORTED ITEM</span>
            <p className="font-medium truncate">{reportModalData.targetTitle}</p>
          </div>
        )}

        {/* Reason Selector */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-semibold">
              Select Reason for Report
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {reasonOptions.map((opt) => (
                <label
                  key={opt.id}
                  onClick={() => setReason(opt.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    reason === opt.id
                      ? 'bg-red-950/40 border-[#E50914] text-white'
                      : 'bg-[#181818] border-[#262626] text-neutral-300 hover:border-neutral-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    checked={reason === opt.id}
                    onChange={() => setReason(opt.id)}
                    className="mt-1 accent-[#E50914]"
                  />
                  <div>
                    <p className="text-xs font-bold">{opt.label}</p>
                    <p className="text-[11px] text-neutral-400">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional details */}
          <div>
            <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-semibold mb-1">
              Additional Details & Evidence (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Explain why this content violates community trust or safety..."
              className="w-full bg-[#181818] border border-[#282828] rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

          {/* Admin Note */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 flex items-start gap-2.5 text-[11px] text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              Your report goes directly to the Founder & Admin Moderation Desk. Violating accounts can be temporarily warned or permanently blocked from CARIX.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeReportModal}
              className="px-4 py-2 rounded-xl bg-[#181818] text-xs font-medium text-neutral-300 hover:bg-[#222222] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
