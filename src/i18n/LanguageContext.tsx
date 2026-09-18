import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from './translations';
import { ItemCategory, ItemCondition, DonationStatus } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  getCategoryLabel: (cat: ItemCategory | string) => string;
  getConditionLabel: (cond: ItemCondition | string) => string;
  getStatusLabel: (status: DonationStatus | string, requestsCount?: number) => string;
}

const STORAGE_LANG_KEY = 'doafacil_lang_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY) as Language;
      if (saved && (saved === 'pt' || saved === 'es' || saved === 'en')) {
        return saved;
      }
      // Check browser navigator language
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('en')) return 'en';
    } catch {
      // ignore
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language];

  const getCategoryLabel = (cat: ItemCategory | string): string => {
    switch (cat) {
      case 'eletrodomesticos':
        return t.catAppliances;
      case 'moveis':
        return t.catFurniture;
      case 'roupas':
        return t.catClothes;
      case 'saude':
      case 'saude_acessibilidade':
        return t.catHealth;
      case 'livros':
        return t.catBooks;
      case 'brinquedos':
        return t.catToys;
      case 'alimentos':
        return t.catFood;
      case 'outros':
        return t.catOther;
      case 'todos':
        return t.catAll;
      default:
        return cat;
    }
  };

  const getConditionLabel = (cond: ItemCondition | string): string => {
    switch (cond) {
      case 'novo':
        return t.condNew;
      case 'excelente':
        return t.condExcellent;
      case 'bom':
        return t.condGood;
      case 'com_marcas':
      case 'marcas_de_uso':
        return t.condSignsOfUse;
      default:
        return cond;
    }
  };

  const getStatusLabel = (status: DonationStatus | string, requestsCount = 0): string => {
    switch (status) {
      case 'disponivel':
        return t.statusAvailable;
      case 'em_analise':
        if (requestsCount > 0) {
          return `${requestsCount} ${requestsCount === 1 ? t.statusReviewSingular : t.statusReviewPlural}`;
        }
        return t.statusInReview;
      case 'autorizado':
        return t.statusAuthorized;
      case 'concluido':
        return t.statusCompleted;
      default:
        return status;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getCategoryLabel,
        getConditionLabel,
        getStatusLabel,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
