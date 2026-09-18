import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const LANGUAGES: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: 'pt', label: 'Português (BR)', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'es', label: 'Castellano (ES)', flag: '🇪🇸', nativeName: 'Castellano' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸', nativeName: 'English' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="language-selector-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
        aria-label="Selecionar idioma / Select language"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="uppercase text-[11px] font-bold text-stone-800 tracking-wider">
          {currentLang.code}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            <span>Idioma / Language</span>
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                id={`lang-opt-${item.code}`}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                  isSelected ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
