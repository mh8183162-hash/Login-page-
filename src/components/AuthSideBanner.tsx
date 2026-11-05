import React from 'react';
import { ShieldCheck, KeyRound, Lock, Fingerprint, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AuthSideBannerProps {
  language: Language;
  bgImage?: string;
}

export const AuthSideBanner: React.FC<AuthSideBannerProps> = ({ 
  language,
  bgImage = '/src/assets/images/auth_night_city_skyline_1793891934751.jpg'
}) => {
  const t = translations[language];

  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white select-none">
      {/* High-fidelity photography backdrop */}
      <img
        src={bgImage}
        alt="SafeAuth Architecture"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity filter blur-[0.2px] pointer-events-none transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-indigo-950/40" />

      {/* Background radial glow & subtle security grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      {/* Top Header inside banner */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-indigo-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base tracking-tight leading-none">
              {t.brandName} Cloud Security
            </h2>
            <p className="text-xs text-indigo-200/70 mt-1">v4.2 Architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Systems Operational
        </div>
      </div>

      {/* Middle Content: Hero security value proposition */}
      <div className="relative z-10 my-auto py-12 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-6">
          <KeyRound className="w-3.5 h-3.5 text-indigo-300" />
          Zero-Trust Access Control
        </div>

        <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4 text-balance">
          {t.bannerHeading}
        </h1>

        <p className="text-slate-300 text-sm xl:text-base leading-relaxed mb-8">
          {t.bannerText}
        </p>

        {/* Feature Check List */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            'FIDO2 Biometric WebAuthn',
            'Hardware Security Keys (YubiKey)',
            'Adaptive Geolocation Defense',
            'Instant Session Invalidation'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-indigo-100 font-medium">
              <div className="w-4 h-4 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Key Metrics / Tabular stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums tracking-tight">
              {t.stat1Value}
            </div>
            <div className="text-xs text-indigo-200/80 mt-1 font-medium">{t.stat1Label}</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums tracking-tight">
              {t.stat2Value}
            </div>
            <div className="text-xs text-indigo-200/80 mt-1 font-medium">{t.stat2Label}</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums tracking-tight">
              {t.stat3Value}
            </div>
            <div className="text-xs text-indigo-200/80 mt-1 font-medium">{t.stat3Label}</div>
          </div>
        </div>
      </div>

      {/* Bottom Testimonial / Trust Card */}
      <div className="relative z-10 p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-inner">
            HT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-slate-200 italic leading-snug mb-2">
              &ldquo;{t.testimonialQuote}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-300">
              <span className="font-semibold text-white">{t.testimonialAuthor}</span>
              <span>·</span>
              <span>{t.testimonialRole}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
