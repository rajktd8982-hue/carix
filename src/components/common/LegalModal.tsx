import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2, FileText, AlertTriangle } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { legalModalType, setLegalModalType } = useApp();

  if (!legalModalType) return null;

  const contentMap = {
    disclaimer: {
      title: 'Automotive Modification & Safety Disclaimer',
      icon: <ShieldAlert className="w-5 h-5 text-[#E50914]" />,
      body: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
          <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-lg text-red-200">
            <strong>Official Notice:</strong> “CARIX provides discovery, community and marketplace tools. Vehicle modifications should be checked for compatibility, safety, legality and insurance implications by the vehicle owner and qualified professionals.”
          </div>
          <p>
            <strong>1. Central Motor Vehicle Rules (CMVR) Compliance:</strong> In India, vehicle alterations are governed by Section 52 of the Motor Vehicles Act, 1988, and the Supreme Court directives. Changes to structural chassis frames, engine swaps without RTO endorsement, dark sun-control films exceeding statutory VLT limits, and exhaust decibel levels exceeding 80 dB are subject to local traffic policing.
          </p>
          <p>
            <strong>2. OEM Warranty & Insurance:</strong> Modifying electrical harnesses, cutting factory body wiring, installing aggressive ECU remaps, or altering suspension geometry may affect your manufacturer warranty and comprehensive insurance claims. CARIX advises all enthusiasts to check with their insurer and authorized service centers before installation.
          </p>
          <p>
            <strong>3. Verified Fitment:</strong> While CARIX displays compatibility matrices submitted by shops and manufacturers, dimensional tolerances can vary across model years and variant revisions. Physical test-fitment by an automotive workshop is recommended before final fastening or painting.
          </p>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <FileText className="w-5 h-5 text-neutral-300" />,
      body: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
          <p>
            <strong>Privacy at CARIX:</strong> We believe in user anonymity and vehicle security. CARIX never publicly discloses your exact vehicle registration number (high-security registration plates are blurred in community media by default), VIN, or private residential addresses.
          </p>
          <p>
            <strong>Location Data:</strong> When discovering shops or tagging local car meets, location data is only published at the city, neighborhood, or verified public venue level unless explicitly marked public by the creator.
          </p>
          <p>
            <strong>Data Protection:</strong> We do not sell user data to telemarketing or third-party vehicle brokers. You retain ownership of your build photos and modification lists.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-5 h-5 text-neutral-300" />,
      body: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
          <p>
            <strong>Acceptance of Terms:</strong> By creating an automotive profile, uploading car photos, or enquiring about modification parts on CARIX, you agree to abide by Indian digital platform laws and these Terms.
          </p>
          <p>
            <strong>User Conduct:</strong> Users must not upload stolen vehicle photographs, impersonate vehicle owners, or share hate speech, abusive comments, or defamatory content regarding local automobile shops or other car community members.
          </p>
          <p>
            <strong>Intellectual Property:</strong> CARIX, “YOUR CAR. YOUR IDENTITY.” and associated logo marks are trademarks of CARIX. You grant CARIX a non-exclusive license to display your build showcases on platform feeds and editorial highlights.
          </p>
        </div>
      )
    },
    guidelines: {
      title: 'CARIX Community Guidelines',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      body: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
          <p>
            <strong>Respect Every Build:</strong> Every car has an identity, whether it’s a tastefully lowered Maruti Swift, a lifted Mahindra Thar, or a track-spec Virtus GT. CARIX is built to inspire and educate, not gatekeep.
          </p>
          <p>
            <strong>Constructive Suggestions:</strong> When a user asks "Which spoiler suits this build?" or "Which wheel finish should I get?", keep advice technical, aesthetic, and friendly.
          </p>
          <p>
            <strong>No Street Racing Endorsement:</strong> Do not upload media showing hazardous street racing, public road endangerment, or illegal stunts in high-density pedestrian areas.
          </p>
        </div>
      )
    },
    refund: {
      title: 'Refund & Subscription Policy',
      icon: <FileText className="w-5 h-5 text-neutral-300" />,
      body: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
          <p>
            <strong>Shop Partner Subscriptions (₹399/month):</strong> Shop subscriptions can be canceled at any time from the Shop Partner Portal. Cancelled subscriptions remain active until the end of the current billing cycle.
          </p>
          <p>
            <strong>Verification Fee Notice:</strong> Payment of the monthly shop partner subscription provides access to business catalog tools and does NOT guarantee automated verification. Verification is approved strictly based on business authenticity checks.
          </p>
          <p>
            <strong>Parts Enquiries & Orders:</strong> For direct shop transactions, the individual shop’s refund, exchange, and return policies apply. CARIX recommends inspecting parts for shipping damage upon delivery.
          </p>
        </div>
      )
    },
    partner_terms: {
      title: 'CARIX Shop Partner Terms (₹399/mo)',
      icon: <AlertTriangle className="w-5 h-5 text-[#E50914]" />,
      body: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-300">
          <div className="p-3 bg-[#181818] border border-[#2a2a2a] rounded-lg">
            <span className="font-semibold text-white">Partner Program inclusions:</span>
            <ul className="list-disc pl-4 mt-2 space-y-1 text-neutral-300">
              <li>Verified business listing & profile badge (post-review)</li>
              <li>Unlimited product catalog uploads & vehicle tagging</li>
              <li>Direct customer WhatsApp/CARIX enquiries</li>
              <li>Completed car build showcase portfolio</li>
              <li>2–4 editorial featured slots per month (subject to quality standards)</li>
            </ul>
          </div>
          <p>
            <strong>Strict Verification Requirement:</strong> Paying the ₹399/month subscription does NOT automatically verify your shop. Our administration desk manually validates physical shop premises, GST/registration details, and customer track record to protect car owners from fraud.
          </p>
        </div>
      )
    }
  }[legalModalType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#121212] border border-[#262626] rounded-2xl shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <div className="flex items-center gap-2.5">
            {contentMap.icon}
            <h3 className="text-sm font-semibold text-white font-display">
              {contentMap.title}
            </h3>
          </div>
          <button
            onClick={() => setLegalModalType(null)}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {contentMap.body}
        </div>

        <div className="mt-6 pt-4 border-t border-[#222222] flex justify-end">
          <button
            onClick={() => setLegalModalType(null)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#c90812] rounded-lg transition-colors"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
