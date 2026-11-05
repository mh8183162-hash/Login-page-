import React, { useState, useEffect, useRef } from 'react';
import { Mail, KeyRound, Lock, ArrowLeft, ArrowRight, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { Language, AuthMode } from '../types';
import { translations } from '../translations';

interface ForgotPasswordFormProps {
  language: Language;
  onModeChange: (mode: AuthMode) => void;
  showToast: (type: 'success' | 'error' | 'info', msg: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  language,
  onModeChange,
  showToast
}) => {
  const t = translations[language];
  const isUrdu = language === 'ur';

  const [step, setStep] = useState<'request' | 'verify' | 'done'>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'verify' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(t.invalidEmail);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
      setTimer(45);
      setCanResend(false);
      showToast('info', t.codeSent);
      // Prefill demo OTP digits for instant convenience after 1 sec
      setTimeout(() => {
        setOtp(['8', '4', '2', '9', '1', '6']);
      }, 800);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);
      otpInputsRef.current[Math.min(pasted.length, 5)]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance focus
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;
    setCanResend(false);
    setTimer(45);
    showToast('info', t.codeSent);
  };

  const handleVerifyAndReset = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setErrorMsg(t.invalidCode);
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMsg(t.shortPassword);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(t.passwordsDontMatch);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      setStep('done');
      showToast('success', t.passwordResetSuccess);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Back button */}
      <button
        type="button"
        onClick={() => onModeChange('login')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className={`w-3.5 h-3.5 ${isUrdu ? 'rotate-180' : ''}`} />
        <span>{t.backToLogin}</span>
      </button>

      {step === 'request' && (
        <>
          <div className="text-start mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.forgotTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {t.forgotSubtitle}
            </p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 animate-in fade-in">
                {errorMsg}
              </div>
            )}

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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-md shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending code...</span>
                </>
              ) : (
                <>
                  <span>{t.sendCodeBtn}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </>
              )}
            </button>
          </form>
        </>
      )}

      {step === 'verify' && (
        <>
          <div className="text-start mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.otpTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {t.otpSubtitle} <strong className="text-indigo-600 dark:text-indigo-400">{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerifyAndReset} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 animate-in fade-in">
                {errorMsg}
              </div>
            )}

            {/* 6 Digit PIN Inputs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                6-Digit Security Code
              </label>
              <div className="flex items-center justify-between gap-2" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-13 text-center text-xl font-bold font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition-all shadow-xs"
                  />
                ))}
              </div>
            </div>

            {/* Resend Timer */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>{t.didntReceiveCode}</span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  {t.resendNow}
                </button>
              ) : (
                <span className="font-mono tabular-nums text-slate-400">
                  {t.resendIn} {timer}s
                </span>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.enterNewPassword}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t.newPasswordPlaceholder}
                  required
                  className={`w-full ${isUrdu ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.confirmPasswordPlaceholder}
                  required
                  className={`w-full ${isUrdu ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'} py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-md shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span>{t.verifyCodeBtn}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </>
              )}
            </button>
          </form>
        </>
      )}

      {step === 'done' && (
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Your credentials have been securely updated. You can now sign in using your new password.
          </p>
          <button
            type="button"
            onClick={() => onModeChange('login')}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {t.signInBtn}
          </button>
        </div>
      )}
    </div>
  );
};
