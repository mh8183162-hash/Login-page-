import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  Laptop, 
  Smartphone, 
  Key, 
  Bell, 
  Lock, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { translations } from '../translations';

interface UserDashboardProps {
  user: UserProfile;
  language: Language;
  onLogout: () => void;
  showToast: (type: 'success' | 'error' | 'info', msg: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  language,
  onLogout,
  showToast
}) => {
  const t = translations[language];
  const isUrdu = language === 'ur';

  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);
  const [loginAlerts, setLoginAlerts] = useState(user.loginAlerts);
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 'sess_1',
      device: user.device,
      location: 'Islamabad / Lahore, PK',
      ip: user.ipAddress,
      isCurrent: true,
      time: 'Active now'
    },
    {
      id: 'sess_2',
      device: 'Safari on iPhone 15 Pro',
      location: 'Karachi, PK',
      ip: '39.45.18.22',
      isCurrent: false,
      time: '3 hours ago'
    }
  ]);

  const toggle2FA = () => {
    const nextVal = !twoFactor;
    setTwoFactor(nextVal);
    showToast(
      'success',
      nextVal
        ? (isUrdu ? 'ٹو فیکٹر تصدیق فعال کر دی گئی ہے۔' : 'Two-Factor Authentication enabled.')
        : (isUrdu ? 'ٹو فیکٹر تصدیق غیر فعال کر دی گئی۔' : 'Two-Factor Authentication disabled.')
    );
  };

  const toggleAlerts = () => {
    const nextVal = !loginAlerts;
    setLoginAlerts(nextVal);
    showToast(
      'info',
      nextVal
        ? (isUrdu ? 'ای میل لاگ ان الرٹس فعال ہیں۔' : 'Login email alerts turned ON.')
        : (isUrdu ? 'ای میل لاگ ان الرٹس بند ہیں۔' : 'Login email alerts turned OFF.')
    );
  };

  const revokeOtherSessions = () => {
    setActiveSessions(activeSessions.filter(s => s.isCurrent));
    showToast('success', isUrdu ? 'تمام دیگر سیشنز ختم کر دیے گئے۔' : 'All other active sessions revoked successfully.');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Top Banner / Welcome Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-indigo-500/20 shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer"
          >
            <LogOut className={`w-4 h-4 ${isUrdu ? 'rotate-180' : ''}`} />
            <span>{t.signOutBtn}</span>
          </button>
        </div>

        {/* Quick Session Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <span className="text-slate-400 dark:text-slate-500 block">{t.lastLogin}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                {user.lastLogin}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <span className="text-slate-400 dark:text-slate-500 block">{t.ip}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono tabular-nums truncate max-w-[180px] block">
                {user.ipAddress}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-violet-500 shrink-0" />
            <div>
              <span className="text-slate-400 dark:text-slate-500 block">{t.securityStatus}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {t.statusSecure}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-500" />
            <span>{isUrdu ? 'حفاظتی ترتیبات' : 'Security Preferences'}</span>
          </h2>

          <div className="space-y-4">
            {/* 2FA Toggle */}
            <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex-1">
                <span className="font-semibold text-xs text-slate-900 dark:text-white block">
                  {t.twoFactor}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed block mt-0.5">
                  {t.twoFactorDesc}
                </span>
              </div>
              <button
                type="button"
                onClick={toggle2FA}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  twoFactor ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    twoFactor ? (isUrdu ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Email Alerts Toggle */}
            <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex-1">
                <span className="font-semibold text-xs text-slate-900 dark:text-white block">
                  {t.loginAlerts}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed block mt-0.5">
                  {t.loginAlertsDesc}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAlerts}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  loginAlerts ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    loginAlerts ? (isUrdu ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Session Token / Cryptographic Stamp */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Session Token</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> Validated
                </span>
              </div>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 truncate">
                jwt_sec_{Math.random().toString(36).substring(2, 15)}.{btoa(user.email).substring(0, 16)}
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-indigo-500" />
                <span>{t.activeSessions}</span>
              </h2>
              {activeSessions.length > 1 && (
                <button
                  type="button"
                  onClick={revokeOtherSessions}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer"
                >
                  {isUrdu ? 'دیگر سیشنز منسوخ کریں' : 'Revoke Others'}
                </button>
              )}
            </div>

            <div className="space-y-3">
              {activeSessions.map((s) => (
                <div
                  key={s.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                      {s.device.toLowerCase().includes('iphone') ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Laptop className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <span>{s.device}</span>
                        {s.isCurrent && (
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {s.location} · {s.ip}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">
                    {s.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>TLS 1.3 · ChaCha20-Poly1305</span>
            <button
              onClick={onLogout}
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isUrdu ? 'لاگ ان صفحہ پر جائیں' : 'Back to Login Portal'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isUrdu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
