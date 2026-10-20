import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Eye,
  Calendar,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  ArrowUpDown,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/dbService';
import { ReportRecord } from '../types/legal';
import { PrintableReportModal } from '../components/PrintableReportModal';

interface MyReportsViewProps {
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const MyReportsView: React.FC<MyReportsViewProps> = ({
  setCurrentTab,
  openAuthModal
}) => {
  const { user, isAuthenticated, enableDemoMode } = useAuth();
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [activeReportModal, setActiveReportModal] = useState<ReportRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadReports = () => {
    if (user) {
      const data = dbService.getReportsByUser(user.id);
      setReports(data);
    } else {
      setReports([]);
    }
  };

  useEffect(() => {
    loadReports();
  }, [user]);

  const handleDelete = (reportId: string) => {
    if (!user) return;
    const ok = dbService.deleteReport(reportId, user.id);
    if (ok) {
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      setDeleteConfirmId(null);
    }
  };

  // Filter and sort reports
  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        const matchesCategory =
          selectedCategory === 'ALL' || r.category === selectedCategory;

        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          r.complaint_text.toLowerCase().includes(q) ||
          r.category_label.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [reports, searchQuery, selectedCategory, sortOrder]);

  // Categories present in user's reports
  const uniqueCategories = useMemo(() => {
    const set = new Set<string>();
    reports.forEach((r) => set.add(r.category));
    return Array.from(set);
  }, [reports]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 font-serif">
            Access Your Legal Awareness Reports
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Please log in or launch demo evaluation mode to save, review, and print your personal
            legal awareness reports.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition"
          >
            Log In
          </button>
          <button
            onClick={enableDemoMode}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-bold text-sm hover:bg-amber-100 transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            Launch Demo Evaluation Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Saved Reports & Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
            My Legal Awareness Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Secure, user-isolated archive of generated legal analysis documents and guidance.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('assistant')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Analyze New Issue</span>
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within your reports..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          >
            <option value="ALL">All Categories ({reports.length})</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Sorting */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>

      {/* Reports Table / Card View */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No reports found.</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {reports.length === 0
              ? 'You have not generated any legal awareness reports yet. Run an analysis in Complaint Assistant to create one.'
              : 'No reports matched your search filters. Try adjusting your search query.'}
          </p>
          {reports.length === 0 && (
            <button
              onClick={() => setCurrentTab('assistant')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
              Analyze Your First Concern
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Issue Summary</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">View</th>
                  <th className="py-3 px-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70 transition">
                    {/* Date */}
                    <td className="py-4 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {new Date(report.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Issue */}
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <div className="font-semibold text-slate-900 truncate">
                        {report.complaint_text}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {report.summary}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md text-xs border border-blue-200">
                        {report.category_label}
                      </span>
                    </td>

                    {/* View Button */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => setActiveReportModal(report)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>

                    {/* Delete Button */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {deleteConfirmId === report.id ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(report.id)}
                            className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold hover:bg-rose-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] hover:bg-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(report.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable / Full Report Modal */}
      {activeReportModal && (
        <PrintableReportModal
          report={activeReportModal}
          onClose={() => setActiveReportModal(null)}
        />
      )}
    </div>
  );
};
