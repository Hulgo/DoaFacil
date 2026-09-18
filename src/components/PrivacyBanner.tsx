import React from 'react';
import { ShieldCheck, MapPin, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const PrivacyBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden mb-8 border border-emerald-800/40">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -top-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {t.privacyBannerSubtitle}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                {t.privacyBannerTitle}
              </h2>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-xs text-emerald-300 font-medium">
            <Lock className="w-3.5 h-3.5" />
            {t.dataProtectionBadge}
          </div>
        </div>

        {/* 4 Steps timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-stone-300">
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center border border-emerald-400/30">1</span>
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{t.step1Title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{t.step1Desc}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center border border-emerald-400/30">2</span>
                <EyeOff className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{t.step2Title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{t.step2Desc}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center border border-emerald-400/30">3</span>
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{t.step3Title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{t.step3Desc}</p>
            </div>
          </div>

          <div className="bg-emerald-500/15 backdrop-blur-xs border border-emerald-400/30 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">4</span>
                <Lock className="w-4 h-4 text-emerald-300" />
              </div>
              <h3 className="text-sm font-semibold text-emerald-200 mb-1">{t.step4Title}</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">{t.step4Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
