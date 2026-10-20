/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LegalDisclaimerBanner } from './components/LegalDisclaimerBanner';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { LegalSearchView } from './views/LegalSearchView';
import { ComplaintAssistantView } from './views/ComplaintAssistantView';
import { MyReportsView } from './views/MyReportsView';
import { AboutView } from './views/AboutView';
import { ProfileView } from './views/ProfileView';
import { PrintableReportModal } from './components/PrintableReportModal';
import { ReportRecord, SearchTopic } from './types/legal';
import { VERIFIED_DISCLAIMER } from './data/knowledgeBase';

function MainApp() {
  const { isAuthenticated, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login'
  });

  // Prefill state for Complaint Assistant when navigating from Legal Search
  const [assistantPrefillTopic, setAssistantPrefillTopic] = useState<SearchTopic | null>(null);

  // Active report modal for viewing from Dashboard or elsewhere
  const [activeReportModal, setActiveReportModal] = useState<ReportRecord | null>(null);

  // Legal modal / privacy popup
  const [simpleModalInfo, setSimpleModalInfo] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleStartAnalysisWithTopic = (topic: SearchTopic) => {
    setAssistantPrefillTopic(topic);
    setCurrentTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrivacyGuidelines = () => {
    setSimpleModalInfo({
      title: 'Data Privacy & Ethics Guidelines',
      content:
        'Legal Guardian AI adheres to strict data minimization. Users are advised never to input government identification numbers (Aadhaar, PAN), bank account passwords, PINs, OTPs, or private biometric credentials. In this student engineering prototype, all generated reports and search queries remain user-scoped and isolated.'
    });
  };

  const handleOpenDisclaimerDetails = () => {
    setSimpleModalInfo({
      title: 'Official Legal Disclaimer',
      content: VERIFIED_DISCLAIMER
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header & Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'assistant') {
            setAssistantPrefillTopic(null);
          }
          setCurrentTab(tab);
        }}
        openAuthModal={openAuthModal}
      />

      {/* Persistent Legal Awareness Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full no-print">
        <LegalDisclaimerBanner compact={currentTab !== 'home'} />
      </div>

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={setCurrentTab}
            openAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            setCurrentTab={setCurrentTab}
            onViewReport={(rep) => setActiveReportModal(rep)}
          />
        )}

        {currentTab === 'search' && (
          <LegalSearchView
            onStartAnalysisWithTopic={handleStartAnalysisWithTopic}
          />
        )}

        {currentTab === 'assistant' && (
          <ComplaintAssistantView
            initialTopic={assistantPrefillTopic}
            onGoToReports={() => setCurrentTab('reports')}
          />
        )}

        {currentTab === 'reports' && (
          <MyReportsView
            setCurrentTab={setCurrentTab}
            openAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'about' && <AboutView />}

        {currentTab === 'profile' && (
          <ProfileView
            onLogout={() => {
              logout();
              setCurrentTab('home');
            }}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        openDisclaimerModal={handleOpenDisclaimerDetails}
        openPrivacyModal={handleOpenPrivacyGuidelines}
      />

      {/* Authentication Modal */}
      {authModalState.isOpen && (
        <AuthModal
          initialMode={authModalState.mode}
          onClose={closeAuthModal}
          onSuccess={() => {
            setCurrentTab('dashboard');
          }}
        />
      )}

      {/* Full Report Preview / Printable Modal */}
      {activeReportModal && (
        <PrintableReportModal
          report={activeReportModal}
          onClose={() => setActiveReportModal(null)}
        />
      )}

      {/* Simple Information / Compliance Modal */}
      {simpleModalInfo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              {simpleModalInfo.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {simpleModalInfo.content}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSimpleModalInfo(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
