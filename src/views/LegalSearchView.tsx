import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  FolderOpen,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { KNOWLEDGE_BASE_TOPICS } from '../data/knowledgeBase';
import { LegalCategory, SearchTopic } from '../types/legal';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/dbService';

interface LegalSearchViewProps {
  onStartAnalysisWithTopic?: (topic: SearchTopic) => void;
}

export const LegalSearchView: React.FC<LegalSearchViewProps> = ({
  onStartAnalysisWithTopic
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const quickExampleSearches = [
    'online payment fraud',
    'tenant security deposit',
    'consumer complaint',
    'workplace harassment',
    'identity theft'
  ];

  const categories: { label: string; value: string }[] = [
    { label: 'All Topics', value: 'ALL' },
    { label: 'Consumer', value: 'CONSUMER' },
    { label: 'Cyber & Fraud', value: 'CYBER / ONLINE FRAUD' },
    { label: 'Tenant & Rental', value: 'TENANT / RENTAL' },
    { label: 'Workplace', value: 'WORKPLACE' },
    { label: 'Contracts', value: 'CONTRACT' },
    { label: 'Harassment', value: 'HARASSMENT' },
    { label: 'Identity Theft', value: 'IDENTITY THEFT' },
    { label: 'Traffic', value: 'TRAFFIC' },
    { label: 'General Procedures', value: 'GENERAL' }
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (user && searchQuery.trim()) {
      dbService.recordSearch(user.id, searchQuery.trim());
    }
  };

  const handleSelectQuickExample = (example: string) => {
    setSearchQuery(example);
    setSelectedCategory('ALL');
    if (user) {
      dbService.recordSearch(user.id, example);
    }
  };

  // Filter topics based on search query and category
  const filteredTopics = useMemo(() => {
    return KNOWLEDGE_BASE_TOPICS.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'ALL' || topic.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        topic.title.toLowerCase().includes(q) ||
        topic.explanation.toLowerCase().includes(q) ||
        topic.category_label.toLowerCase().includes(q) ||
        topic.common_examples.some((ex) => ex.toLowerCase().includes(q)) ||
        topic.general_steps.some((st) => st.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Legal Awareness Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
          Explore Legal Information
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Search verified educational guides on common dispute topics, essential documentation to
          preserve, and safe procedural awareness.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a legal topic… (e.g. security deposit, online fraud, refund)"
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Search
          </button>
        </form>

        {/* Quick Example Searches */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {quickExampleSearches.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectQuickExample(ex)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none text-xs">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition ${
              selectedCategory === cat.value
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count & Topic Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong>{filteredTopics.length}</strong> verified legal awareness topic
            {filteredTopics.length === 1 ? '' : 's'}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>

        {filteredTopics.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">
              No topics matched your search for “{searchQuery}”.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try searching with broader terms such as "fraud", "deposit", "salary", or "contract",
              or use the Complaint Assistant to describe your scenario.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;

              return (
                <div
                  key={topic.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition"
                >
                  {/* Topic Card Header */}
                  <div
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-50/50 transition"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded text-xs border border-blue-200">
                          {topic.category_label}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {topic.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {topic.explanation}
                      </p>
                    </div>

                    <button
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-lg shrink-0 mt-1"
                      aria-label={isExpanded ? 'Collapse topic' : 'Expand topic'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Detailed Section */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50/60 p-5 sm:p-6 space-y-6 text-xs sm:text-sm">
                      {/* Common Examples */}
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs text-slate-500">
                          <Tag className="w-3.5 h-3.5 text-blue-600" /> Common Scenarios
                        </h4>
                        <ul className="space-y-1.5 text-slate-700 pl-4 list-disc text-xs leading-relaxed">
                          {topic.common_examples.map((ex, i) => (
                            <li key={i}>{ex}</li>
                          ))}
                        </ul>
                      </div>

                      {/* General Steps */}
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider text-xs text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> General Procedural Steps
                        </h4>
                        <div className="space-y-2">
                          {topic.general_steps.map((step, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs"
                            >
                              <span className="w-4 h-4 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Documents / Evidence to Preserve */}
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs text-slate-500">
                          <FolderOpen className="w-3.5 h-3.5 text-amber-600" /> Documents / Evidence to Preserve
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {topic.documents_to_preserve.map((doc, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* When to Seek Professional Help */}
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                        <h4 className="font-bold mb-1.5 flex items-center gap-1.5 text-rose-800">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          When to Consider Professional Legal Assistance
                        </h4>
                        <ul className="space-y-1 list-disc pl-5 text-rose-900/90 leading-relaxed">
                          {topic.when_to_seek_help.map((w, i) => (
                            <li key={i}>{w}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Official Resource Placeholder */}
                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200">
                        <div className="text-xs text-slate-500 italic flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>{topic.official_resource}</span>
                        </div>

                        {onStartAnalysisWithTopic && (
                          <button
                            onClick={() => onStartAnalysisWithTopic(topic)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Analyze a case like this</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
