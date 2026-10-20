import React, { useEffect, useState } from 'react';
import {
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Eye,
  PlusCircle,
  FolderCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/dbService';
import { ComplaintRecord, ReportRecord } from '../types/legal';

interface DashboardViewProps {
  setCurrentTab: (tab: string) => void;
  onViewReport: (report: ReportRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setCurrentTab,
  onViewReport
}) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    issuesAnalyzedCount: 0,
    savedReportsCount: 0,
    recentSearchesCount: 0,
    lastAnalysisCategory: 'None yet',
    recentComplaints: [] as ComplaintRecord[]
  });

  const loadData = () => {
    if (user) {
      const data = dbService.getDashboardMetrics(user.id);
      setMetrics(data);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleViewComplaint = (complaint: ComplaintRecord) => {
    if (!user) return;
    // Find matching report if exists
    const reports = dbService.getReportsByUser(user.id);
    const matched = reports.find((r) => r.complaint_id === complaint.id);
    if (matched) {
      onViewReport(matched);
    } else {
      // If no report saved, navigate to reports or assistant
      setCurrentTab('reports');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Academic User Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Welcome back, {user?.full_name || 'Student Researcher'}
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Access your legal awareness workspace, review previous complaint analyses, and explore
            verified public assistance information.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('assistant')}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>New Complaint Analysis</span>
        </button>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Issues Analyzed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Issues Analyzed
            </p>
            <h3 className="text-3xl font-black text-slate-900 font-mono">
              {metrics.issuesAnalyzedCount}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Processed through engine</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Saved Reports */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Saved Reports
            </p>
            <h3 className="text-3xl font-black text-slate-900 font-mono">
              {metrics.savedReportsCount}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Available for print / export</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Recent Searches */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Recent Searches
            </p>
            <h3 className="text-3xl font-black text-slate-900 font-mono">
              {metrics.recentSearchesCount}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Knowledge base queries</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Last Analysis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="max-w-[170px]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Last Analysis
            </p>
            <h3 className="text-base font-bold text-slate-900 truncate" title={metrics.lastAnalysisCategory}>
              {metrics.lastAnalysisCategory}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Most recent classification</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FolderCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions (Large Buttons) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentTab('assistant')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left group flex items-start justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-blue-600 transition">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>Analyze a New Issue</span>
              </div>
              <p className="text-xs text-slate-500">
                Describe a problem in plain words and receive categorized next-step guidance.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0 ml-2 mt-1" />
          </button>

          <button
            onClick={() => setCurrentTab('search')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left group flex items-start justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-blue-600 transition">
                <Search className="w-5 h-5 text-purple-600" />
                <span>Search Legal Information</span>
              </div>
              <p className="text-xs text-slate-500">
                Browse our verified 10-topic knowledge base on consumer, cyber, tenancy and rights.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0 ml-2 mt-1" />
          </button>

          <button
            onClick={() => setCurrentTab('reports')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left group flex items-start justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-blue-600 transition">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>View My Reports</span>
              </div>
              <p className="text-xs text-slate-500">
                Review, download, or print previously saved legal awareness reports.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0 ml-2 mt-1" />
          </button>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recent Activity</h3>
            <p className="text-xs text-slate-500">
              Complaints and analyses associated with your account
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('reports')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            View All Reports →
          </button>
        </div>

        {metrics.recentComplaints.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-medium">No complaints analyzed yet.</p>
            <button
              onClick={() => setCurrentTab('assistant')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
            >
              Analyze Your First Issue
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Issue Summary</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentComplaints.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md truncate font-medium text-slate-800">
                      {item.complaint_text}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md text-xs border border-blue-200">
                        {item.category_label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item.analysis_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleViewComplaint(item)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
