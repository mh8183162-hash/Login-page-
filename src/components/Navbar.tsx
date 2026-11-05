import React from 'react';
import { Shield, Moon, Sun, Globe, Sparkles } from 'lucide-react';
import { Language, AuthMode } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  currentMode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  currentMode,
  onModeChange,
  isAuthenticated
}) => {
  const t = translations[language];

  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div
          onClick={() => !isAuthenticated && onModeChange('login')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t.brandName}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline leading-none">
              Enterprise Access
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links or Status */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            256-Bit TLS Secured
          </span>
          <span>·</span>
          <span>SOC2 Type II</span>
          <span>·</span>
          <span>Biometric Passkey Ready</span>
        </div>

        {/* Zone 3: Actions (Language switcher, Theme toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            title="Switch Language / زبان تبدیل کریں"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
