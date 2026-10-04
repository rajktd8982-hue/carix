import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, AlertTriangle, Users, Store, 
  Package, FileText, CheckCircle2, XCircle, Trash2, 
  Ban, Eye, Flag, UserX, ShieldAlert, Sparkles, RefreshCw
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    shops, 
    products, 
    posts, 
    updateShopVerification, 
    showToast,
    reports,
    resolveReport,
    blockedUsers,
    blockUser,
    unblockUser
  } = useApp();

  const [adminTab, setAdminTab] = useState<'reports' | 'blocked' | 'shops' | 'products' | 'posts'>('reports');

  const pendingReports = reports.filter(r => r.status === 'pending');
  const resolvedReports = reports.filter(r => r.status === 'resolved');

  const handleBlockUserFromReport = (rep: typeof reports[0]) => {
    blockUser(rep.targetId, rep.targetUsername, rep.details);
    resolveReport(rep.id, 'blocked_user');
  };

  const handleDeleteContentFromReport = (rep: typeof reports[0]) => {
    resolveReport(rep.id, 'removed_content');
    showToast(`Reported content by @${rep.targetUsername} removed.`);
  };

  const handleDismissReport = (repId: string) => {
    resolveReport(repId, 'none');
    showToast('Report dismissed as false or invalid.');
  };

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>CARIX Founder & Platform Moderation Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Administrative Control Desk
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Supervise user reports, immediately ban or block abusive users, verify workshop partners, and maintain community integrity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400 bg-[#141414] border border-[#242424] px-3 py-1.5 rounded-xl">
              Founder: <strong className="text-white">Mantra Tiwari</strong>
            </span>
            <span className="text-xs font-mono text-red-400 bg-red-950/60 border border-red-900/60 px-3 py-1.5 rounded-xl font-bold">
              {pendingReports.length} Reports Pending
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#1f1f1f]">
          <button
            onClick={() => setAdminTab('reports')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'reports'
                ? 'bg-[#E50914] text-white shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Incoming Reports ({pendingReports.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('blocked')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'blocked'
                ? 'bg-[#E50914] text-white shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Blocked & Banned Users ({blockedUsers.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('shops')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'shops'
                ? 'bg-[#E50914] text-white shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Workshop Verifications ({shops.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'products'
                ? 'bg-[#E50914] text-white shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Parts Catalog ({products.length})</span>
          </button>
        </div>

        {/* Tab 1: Incoming Reports Queue (Requested: "aur koi kisi ko report kre toh mere pass option aaye aisa type taaki glt user ko block kr du") */}
        {adminTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Active User & Content Reports
              </h3>
              <span className="text-[11px] font-mono text-neutral-500">
                Total Submitted: {reports.length}
              </span>
            </div>

            {pendingReports.length === 0 ? (
              <div className="p-12 bg-[#121212] border border-[#222222] rounded-3xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-mono">No pending moderation reports!</h4>
                <p className="text-xs text-neutral-400">All community flags and suspicious activity reports are cleared.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 bg-[#141414] border border-[#2a2a2a] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl hover:border-red-950 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 font-bold border border-red-900/60 uppercase font-mono text-[10px]">
                          {rep.reason.replace('_', ' ')}
                        </span>
                        <span className="text-neutral-400 text-xs">
                          Reported by: <strong className="text-white">@{rep.reporterUsername}</strong>
                        </span>
                        <span className="text-neutral-500 text-xs">•</span>
                        <span className="text-neutral-500 text-[11px] font-mono">
                          {new Date(rep.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-neutral-400 font-mono uppercase">TARGET:</span>
                        <span className="text-sm font-bold text-red-400 font-mono bg-red-950/40 px-2.5 py-0.5 rounded-lg border border-red-900/40">
                          @{rep.targetUsername} ({rep.targetType})
                        </span>
                      </div>

                      {rep.targetTitle && (
                        <p className="text-xs text-neutral-200 font-semibold truncate pt-0.5">
                          "{rep.targetTitle}"
                        </p>
                      )}

                      <p className="text-xs text-neutral-300 leading-relaxed bg-[#191919] p-2.5 rounded-xl border border-[#292929] mt-2">
                        <strong className="text-neutral-400">Reporter's Details:</strong> {rep.details}
                      </p>
                    </div>

                    {/* Action Buttons for Founder/Admin */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#222222]">
                      
                      {/* One-Click BLOCK & BAN USER */}
                      <button
                        onClick={() => handleBlockUserFromReport(rep)}
                        className="px-3.5 py-2 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                        title="Ban user permanently from CARIX"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Block & Ban User</span>
                      </button>

                      {/* Delete Content */}
                      <button
                        onClick={() => handleDeleteContentFromReport(rep)}
                        className="px-3 py-2 bg-[#202020] hover:bg-[#2b2b2b] text-neutral-200 text-xs font-semibold rounded-xl border border-[#333333] transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Delete Content</span>
                      </button>

                      {/* Dismiss False Report */}
                      <button
                        onClick={() => handleDismissReport(rep.id)}
                        className="px-3 py-2 bg-[#181818] hover:bg-[#222222] text-neutral-400 hover:text-white text-xs font-medium rounded-xl border border-[#2b2b2b] transition-colors"
                      >
                        Dismiss
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resolved Reports Archive */}
            {resolvedReports.length > 0 && (
              <div className="pt-6 space-y-3">
                <h4 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Resolved Reports Archive ({resolvedReports.length})
                </h4>
                <div className="space-y-2">
                  {resolvedReports.map(res => (
                    <div key={res.id} className="p-3 bg-[#111111] border border-[#1f1f1f] rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-400">@{res.targetUsername}</span>
                        <span className="text-neutral-500 mx-2">•</span>
                        <span className="text-emerald-400 font-mono text-[11px] font-bold">Action: {res.actionTaken}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">RESOLVED</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Blocked & Banned Users Management */}
        {adminTab === 'blocked' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Permanently Blocked / Banned Users
              </h3>
              <span className="text-[11px] font-mono text-neutral-500">
                Total Banned: {blockedUsers.length}
              </span>
            </div>

            {blockedUsers.length === 0 ? (
              <div className="p-12 bg-[#121212] border border-[#222222] rounded-3xl text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-mono">No users currently banned</h4>
                <p className="text-xs text-neutral-400">All community accounts are in good standing.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {blockedUsers.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-[#141414] border border-red-950/60 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono text-sm">@{b.username}</span>
                        <span className="text-[10px] font-mono text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-900/60 font-bold">
                          BANNED
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">Reason: {b.reason}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Banned by {b.blockedBy} on {new Date(b.blockedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => unblockUser(b.userId)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#202020] hover:bg-[#2b2b2b] border border-[#333333] text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                    >
                      Unblock User
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Workshops */}
        {adminTab === 'shops' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              Workshop Verification Requests
            </h3>
            <div className="space-y-3">
              {shops.map(shop => (
                <div
                  key={shop.id}
                  className="p-5 bg-[#141414] border border-[#262626] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white font-display">{shop.name}</h4>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        shop.verificationStatus === 'verified'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {shop.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {shop.city}, {shop.state} · Phone: {shop.phone || '9820011223'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateShopVerification(shop.id, 'verified')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>

                    <button
                      onClick={() => updateShopVerification(shop.id, 'rejected')}
                      className="px-3.5 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Listing</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Products */}
        {adminTab === 'products' && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              Live Marketplace Listings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map(p => (
                <div key={p.id} className="p-3 bg-[#121212] border border-[#222222] rounded-xl flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                    <p className="text-[11px] text-neutral-400">By {p.shopName} · ₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono shrink-0">Verified</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
