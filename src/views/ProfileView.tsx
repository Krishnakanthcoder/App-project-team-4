import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileViewProps {
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const { user, isDemoMode, updateProfileName } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameSaveMsg, setNameSaveMsg] = useState<string | null>(null);

  // Simulated password change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p className="text-sm text-slate-500">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    const ok = updateProfileName(fullName);
    if (ok) {
      setIsEditingName(false);
      setNameSaveMsg('Name updated successfully!');
      setTimeout(() => setNameSaveMsg(null), 3000);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword.trim() || !newPassword.trim()) {
      setPasswordMsg({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    // In prototype, passwords are encrypted or simulated in storage
    setPasswordMsg({ type: 'success', text: 'Password successfully updated (Prototype session).' });
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setPasswordMsg(null), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
            Account & User Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your credentials and view data privacy settings
          </p>
        </div>

        {isDemoMode && (
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Demo Account
          </span>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 font-serif font-black text-2xl flex items-center justify-center shadow-xs">
            {user.full_name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">{user.full_name}</h2>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        {/* Edit Name Form */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Full Name
            </label>
            {!isEditingName && (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Edit Name
              </button>
            )}
          </div>

          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setFullName(user.full_name);
                  setIsEditingName(false);
                }}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </form>
          ) : (
            <p className="text-sm font-medium text-slate-800">{user.full_name}</p>
          )}

          {nameSaveMsg && (
            <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {nameSaveMsg}
            </p>
          )}
        </div>

        {/* Account Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
          <div>
            <span className="text-slate-400 block text-xs">Account ID</span>
            <span className="font-mono text-slate-700 text-xs">{user.id}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Account Created</span>
            <span className="text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-600" />
          Change Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              New Password (Min 6 characters)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {passwordMsg && (
            <p
              className={`text-xs font-medium flex items-center gap-1 ${
                passwordMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {passwordMsg.type === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              {passwordMsg.text}
            </p>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Privacy Notice Box */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          Data Privacy & Personal Information Guidelines
        </h4>
        <p className="leading-relaxed text-slate-600">
          To protect your personal security, please avoid entering unnecessary sensitive identifiers
          (such as Aadhaar numbers, net-banking passwords, debit card CVVs, or OTPs) into the
          complaint narrative or filename fields. Legal Guardian AI operates under a data minimization
          standard and isolates your complaint records to your authenticated session.
        </p>
      </div>

      {/* Logout Action */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 font-bold text-xs transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Account</span>
        </button>
      </div>
    </div>
  );
};
