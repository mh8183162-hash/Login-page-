import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck, Sparkles, Loader2 } from 'lucide-react';
import { Language, AuthMode, UserProfile } from '../types';
import { translations } from '../translations';

interface LoginFormProps {
  language: Language;
  onModeChange: (mode: AuthMode) => void;
  onLoginSuccess: (user: UserProfile) => void;
  showToast: (type: 'success' | 'error' | 'info', msg: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  language,
  onModeChange,
  onLoginSuccess,
  showToast
}) => {
  const t = translations[language];
  const isUrdu = language === 'ur';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Quick Demo Filler
  const fillDemoAccount = (type: 'user' | 'admin') => {
    if (type === 'user') {
      setEmail('ali.khan@example.com');
      setPassword('P@ssword2026!');
      showToast('info', isUrdu ? 'علی خان کی اسناد درج ہو گئیں!' : 'Loaded Demo User: Ali Khan');
    } else {
      setEmail('sarah.jenkins@safeauth.io');
      setPassword('Admin#Secure99');
      showToast('info', isUrdu ? 'ایڈمن سارہ احمد کی اسناد درج ہو گئیں!' : 'Loaded Demo Admin: Sarah Jenkins');
    }
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg(t.invalidEmail);
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg(t.shortPassword);
      return;
    }

    setIsLoading(true);

    // Realistic authentication delay
    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('sarah');
      
      const loggedUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: isAdmin ? (isUrdu ? 'سارہ احمد' : 'Sarah Jenkins') : (isUrdu ? 'علی خان' : 'Ali Khan'),
        email: email,
        role: isAdmin ? 'Administrator' : 'User',
        twoFactorEnabled: true,
        loginAlerts: true,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ipAddress: '192.168.1.104 (Islamabad / Lahore)',
        device: 'Chrome v122 on macOS Ventura'
      };

      showToast('success', t.loginSuccess);
      onLoginSuccess(loggedUser);
    }, 900);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const socialUser: UserProfile = {
        id: 'soc_' + Math.random().toString(36).substring(2, 9),
        name: isUrdu ? 'محمد شاہد' : 'Muhammad Shahid',
        email: `shahid.${provider.toLowerCase()}@domain.com`,
        role: 'User',
        twoFactorEnabled: true,
        loginAlerts: true,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ipAddress: '110.38.24.12 (Direct Gateway)',
        device: `${provider} OAuth 2.0 Web Client`
      };
      showToast('success', `${provider} - ${t.loginSuccess}`);
      onLoginSuccess(socialUser);
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-start mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.signInTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {t.signInSubtitle}
        </p>
      </div>

      {/* Quick Demo Autofill Bar */}
      <div className="mb-6 p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {t.quickDemo}
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400">1-Click Test</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fillDemoAccount('user')}
            className="flex-1 text-xs py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 transition-colors font-medium flex items-center justify-center gap-1.5 shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{t.fillUser}</span>
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('admin')}
            className="flex-1 text-xs py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 transition-colors font-medium flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>{t.fillAdmin}</span>
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.email}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder={t.emailPlaceholder}
              required
              className={`w-full ${isUrdu ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 transition-all`}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t.password}
            </label>
            <button
              type="button"
              onClick={() => onModeChange('forgot')}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {t.forgotPassword}
            </button>
          </div>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder={t.passwordPlaceholder}
              required
              className={`w-full ${isUrdu ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 ${isUrdu ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors`}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 bg-white dark:bg-slate-800"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {t.rememberMe}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-md shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.signingIn}</span>
            </>
          ) : (
            <>
              <span>{t.signInBtn}</span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </>
          )}
        </button>
      </form>

      {/* Social Logins Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-slate-50 dark:bg-slate-950 px-3 text-slate-500 dark:text-slate-400 font-medium">
            {t.orContinueWith}
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="hidden sm:inline">Google</span>
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleSocialLogin('GitHub')}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">GitHub</span>
        </button>

        {/* Microsoft */}
        <button
          type="button"
          onClick={() => handleSocialLogin('Microsoft')}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          <span className="hidden sm:inline">Microsoft</span>
        </button>
      </div>

      {/* Switch to Signup */}
      <div className="mt-8 text-center text-xs text-slate-600 dark:text-slate-400">
        <span>{t.noAccount}</span>{' '}
        <button
          type="button"
          onClick={() => onModeChange('signup')}
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          {t.signUpLink}
        </button>
      </div>
    </div>
  );
};
