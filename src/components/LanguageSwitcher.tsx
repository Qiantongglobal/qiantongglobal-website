import { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { translations, type Language, languageNames, languageFlags } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('qiantong_lang') as Language) || 'en';
    }
    return 'en';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('qiantong_lang', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: Language[] = ['en', 'zh', 'de', 'fr', 'es', 'it', 'el', 'pt'];

  const isDark = variant === 'dark';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
          isDark
            ? 'text-white/80 hover:text-white bg-white/10 backdrop-blur-sm border-white/20'
            : 'text-foreground/70 hover:text-primary bg-secondary border-gray-200'
        }`}
      >
        <Globe size={14} />
        <span>{languageFlags[lang]} {languageNames[lang]}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                lang === l ? 'bg-teal-50 text-primary font-medium' : 'text-gray-700'
              }`}
            >
              <span>{languageFlags[l]}</span>
              <span>{languageNames[l]}</span>
              {lang === l && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
