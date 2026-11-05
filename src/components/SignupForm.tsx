import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, X, ArrowRight, Loader2 } from 'lucide-react';
import { Language, AuthMode, UserProfile } from '../types';
import { translations } from '../translations';

interface SignupFormProps {
  language: Language;
  onModeChange: (mode: AuthMode) => void;
  onSignupSuccess: (user: UserProfile) => void;
  showToast: (type: 'success' | 'error' | 'info', msg: string) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  language,
  onModeChange,
  onSignupSuccess,
  showToast
}) => {
  const t = translations[language];
  const isUrdu = language === 'ur';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password criteria evaluations
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const passedCount = [hasMinLength, hasNumber, hasUppercase, hasSpecial].filter(Boolean).length;
  
  let strengthLabel = t.strengthWeak;
  let strengthColor = 'bg-rose-500';
  let strengthWidth = 'w-1/4';

  if (passedCount === 2) {
    strengthLabel = t.strengthFair;
    strengthColor = 'bg-amber-500';
    strengthWidth = 'w-2/4';
  } else if (passedCount === 3) {
    strengthLabel = t.strengthGood;
    strengthColor = 'bg-blue-500';
    strengthWidth = 'w-3/4';
  } else if (passedCount === 4) {
    strengthLabel = t.strengthStrong;
    strengthColor = 'bg-emerald-500';
    strengthWidth = 'w-full';
  }

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg(isUrdu ? 'براہ کرم اپنا پورا نام درج کریں۔' : 'Please enter your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMsg(t.invalidEmail);
      return;
    }

    if (!hasMinLength) {
      setErrorMsg(t.shortPassword);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t.passwordsDontMatch);
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg(t.mustAcceptTerms);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: fullName,
        email: email,
        role: 'User',
        twoFactorEnabled: false,
        loginAlerts: true,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ipAddress: '192.168.1.104 (Newly Registered)',
        device: 'Current Browser'
      };

      showToast('success', t.accountCreated);
      onSignupSuccess(newUser);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-start mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.signUpTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {t.signUpSubtitle}
        </p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.fullName}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              required
              className={`w-full ${isUrdu ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 transition-all`}
            />
          </div>
        </div>

        {/* Email */}
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className={`w-full ${isUrdu ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 transition-all`}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.password}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              required
              className={`w-full ${isUrdu ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 ${isUrdu ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors`}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2.5 p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Strength</span>
                <span className={`font-semibold ${passedCount >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {strengthLabel}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full ${strengthColor} ${strengthWidth} transition-all duration-300 rounded-full`} />
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''}`}>
                  {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
                  {t.reqLength}
                </span>
                <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''}`}>
                  {hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
                  {t.reqNumber}
                </span>
                <span className={`flex items-center gap-1 ${hasUppercase ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''}`}>
                  {hasUppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
                  {t.reqUppercase}
                </span>
                <span className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''}`}>
                  {hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
                  {t.reqSpecial}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.confirmPassword}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.confirmPasswordPlaceholder}
              required
              className={`w-full ${isUrdu ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-2.5 text-sm rounded-xl border ${
                passwordsMismatch
                  ? 'border-rose-400 dark:border-rose-700'
                  : passwordsMatch
                  ? 'border-emerald-400 dark:border-emerald-700'
                  : 'border-slate-300 dark:border-slate-700'
              } bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
            />
            {passwordsMatch && (
              <div className={`absolute inset-y-0 ${isUrdu ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center text-emerald-500`}>
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
          {passwordsMismatch && (
            <p className="text-[11px] text-rose-500 mt-1">{t.passwordsDontMatch}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-800"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              {t.acceptTerms}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-md shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.creatingAccount}</span>
            </>
          ) : (
            <>
              <span>{t.signUpBtn}</span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </>
          )}
        </button>
      </form>

      {/* Switch to Sign In */}
      <div className="mt-8 text-center text-xs text-slate-600 dark:text-slate-400">
        <span>{t.haveAccount}</span>{' '}
        <button
          type="button"
          onClick={() => onModeChange('login')}
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          {t.signInLink}
        </button>
      </div>
    </div>
  );
};
