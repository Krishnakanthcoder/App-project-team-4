import React, { useState } from 'react';
import {
  Scale,
  Shield,
  Search,
  FileText,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openAuthModal
}) => {
  const { user, isAuthenticated, isDemoMode, logout, enableDemoMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-bar for Demo Mode indication */}
      {isDemoMode && (
        <div className="bg-amber-500/10 border-b border-amber-300/60 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5 mx-auto font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Demo Evaluation Mode Active — Showing sample student prototype data (Safe non-real information)
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick(isAuthenticated ? 'dashboard' : 'home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md group-hover:bg-slate-800 transition">
              <Shield className="w-6 h-6 absolute text-slate-800 fill-slate-900 stroke-amber-400" />
              <Scale className="w-5 h-5 text-amber-400 relative z-10" />
              <Sparkles className="w-3 h-3 text-emerald-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight font-serif">
                  Legal Guardian
                </span>
                <span className="bg-slate-900 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Smart Legal Awareness & Assistance
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {!isAuthenticated ? (
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                  currentTab === 'home'
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Home
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                  currentTab === 'dashboard'
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                Dashboard
              </button>
            )}

            <button
              onClick={() => handleNavClick('search')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                currentTab === 'search'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4 text-slate-500" />
              Legal Search
            </button>

            <button
              onClick={() => handleNavClick('assistant')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                currentTab === 'assistant'
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              Complaint Assistant
            </button>

            <button
              onClick={() => handleNavClick('reports')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                currentTab === 'reports'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              My Reports
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                currentTab === 'about'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Info className="w-4 h-4 text-slate-500" />
              About
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={enableDemoMode}
                  title="Instant Demo for Jury Evaluation"
                  className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold px-3 py-1.5 rounded-lg border border-amber-200 transition flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Demo Mode
                </button>
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                    currentTab === 'profile'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="max-w-[130px] truncate">{user?.full_name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {!isAuthenticated && (
              <button
                onClick={enableDemoMode}
                className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-1 rounded border border-amber-300"
              >
                Demo
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {!isAuthenticated ? (
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              Home
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => handleNavClick('search')}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <Search className="w-4 h-4" /> Legal Search
          </button>

          <button
            onClick={() => handleNavClick('assistant')}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-blue-700 bg-blue-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Complaint Assistant
          </button>

          <button
            onClick={() => handleNavClick('reports')}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> My Reports
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <Info className="w-4 h-4" /> About Project
          </button>

          {isAuthenticated ? (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Profile ({user?.full_name})
              </button>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center rounded-lg border border-slate-300 font-semibold text-slate-700"
              >
                Login
              </button>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center rounded-lg bg-slate-900 text-white font-semibold"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
