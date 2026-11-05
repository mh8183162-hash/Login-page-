import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AuthSideBanner } from './components/AuthSideBanner';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { UserDashboard } from './components/UserDashboard';
import { Toast } from './components/Toast';
import { Language, AuthMode, UserProfile, ToastMessage } from './types';
import { translations } from './translations';
import { Shield, Image as ImageIcon, Check } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ur'); // Default to Urdu since user asked in Urdu/Roman Urdu!
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [currentMode, setCurrentMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Apply language direction to html element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr');
  }, [language]);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentMode('dashboard');
  };

  const handleLogout = () => {
    const t = translations[language];
    setCurrentUser(null);
    setCurrentMode('login');
    showToast('info', t.loggedOut);
  };

  const wallpapers = [
    {
      id: 'skyline',
      nameEn: 'Night Skyline',
      nameUr: 'شہر کا منظر',
      url: '/src/assets/images/auth_night_city_skyline_1793891934751.jpg'
    },
    {
      id: 'cyber',
      nameEn: 'Cyber Atrium',
      nameUr: 'سائبر ہال',
      url: '/src/assets/images/auth_cyber_glass_hall_1793891934055.jpg'
    },
    {
      id: 'atrium',
      nameEn: 'Glass Architecture',
      nameUr: 'شیشے کا پینل',
      url: '/src/assets/images/auth_portal_background_1793891692735.jpg'
    }
  ];

  const [activeBg, setActiveBg] = useState<string>(wallpapers[0].url);
  const [showWallpaperMenu, setShowWallpaperMenu] = useState(false);

  const t = translations[language];

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors select-none">
      {/* Cinematic Fullscreen Background Image - Vivid & High Contrast */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          key={activeBg}
          src={activeBg}
          alt="Login Page Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 transition-all duration-700 brightness-[0.88] dark:brightness-[0.72] contrast-[1.05]"
        />
        {/* Subtle translucent dark tint for text contrast while keeping image razor sharp */}
        <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/50 backdrop-blur-[1px] transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
      </div>

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        isAuthenticated={!!currentUser}
      />

      {/* Main Viewport Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-6">
        {currentMode === 'dashboard' && currentUser ? (
          <UserDashboard
            user={currentUser}
            language={language}
            onLogout={handleLogout}
            showToast={showToast}
          />
        ) : (
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-white/30 dark:border-white/10 bg-white/92 dark:bg-slate-900/90 backdrop-blur-2xl shadow-2xl shadow-black/50 flex flex-col lg:flex-row min-h-[640px] transition-all">
            {/* Left Column: Visual Security Banner (desktop only) */}
            <AuthSideBanner language={language} bgImage={activeBg} />

            {/* Right Column: Interactive Auth Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 xl:p-14 flex flex-col justify-between bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl">
              {/* Top Mode Segmented Bar */}
              <div className="flex items-center justify-end mb-6">
                <div className="inline-flex p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 text-xs font-semibold backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setCurrentMode('login')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      currentMode === 'login'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t.signInBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMode('signup')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      currentMode === 'signup'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t.signUpBtn}
                  </button>
                </div>
              </div>

              {/* Form Content Area */}
              <div className="my-auto">
                {currentMode === 'login' && (
                  <LoginForm
                    language={language}
                    onModeChange={setCurrentMode}
                    onLoginSuccess={handleLoginSuccess}
                    showToast={showToast}
                  />
                )}

                {currentMode === 'signup' && (
                  <SignupForm
                    language={language}
                    onModeChange={setCurrentMode}
                    onSignupSuccess={handleLoginSuccess}
                    showToast={showToast}
                  />
                )}

                {(currentMode === 'forgot' || currentMode === 'otp') && (
                  <ForgotPasswordForm
                    language={language}
                    onModeChange={setCurrentMode}
                    showToast={showToast}
                  />
                )}
              </div>

              {/* Footer Trust Disclaimer */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-500">
                <span>{t.termsNotice}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Wallpaper Switcher */}
      <div className="fixed bottom-14 sm:bottom-16 right-4 sm:right-6 z-30">
        <div className="relative">
          {showWallpaperMenu && (
            <div className="absolute bottom-full right-0 mb-2 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl w-60 sm:w-64 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-1 mb-1">
                {language === 'ur' ? 'بیک گراؤنڈ تصویر منتخب کریں' : 'Select Background Image'}
              </div>
              <div className="space-y-1.5">
                {wallpapers.map((wp) => {
                  const isSelected = activeBg === wp.url;
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      onClick={() => {
                        setActiveBg(wp.url);
                        setShowWallpaperMenu(false);
                        showToast(
                          'info',
                          language === 'ur'
                            ? `${wp.nameUr} پس منظر پر لاگو ہو گیا۔`
                            : `Background changed to ${wp.nameEn}`
                        );
                      }}
                      className={`w-full flex items-center gap-2.5 p-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <img
                        src={wp.url}
                        alt={wp.nameEn}
                        className="w-10 h-7 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                      <span className="flex-1 text-start truncate">
                        {language === 'ur' ? wp.nameUr : wp.nameEn}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowWallpaperMenu(!showWallpaperMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 dark:bg-white/90 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold backdrop-blur-md shadow-lg border border-white/20 dark:border-slate-700 transition-all hover:scale-105 cursor-pointer"
            title="Change Background Wallpaper / پس منظر تبدیل کریں"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'بیک گراؤنڈ تصویر' : 'Wallpaper'}</span>
          </button>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-4 px-4 sm:px-8 text-center text-xs text-slate-500 dark:text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              SafeAuth Security Platform
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">Security Compliance</span>
            <span>·</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">Help & Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
