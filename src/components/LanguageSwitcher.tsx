import { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { translations, type Language, languageNames } from '@/lib/i18n';

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
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-medium rounded-sm border transition-colors ${
          isDark
            ? 'text-white/80 hover:text-white border-white/25 hover:border-white/50'
            : 'text-foreground/70 hover:text-primary border-[#DDE4E2] hover:border-[#C4D3CF]'
        }`}
        aria-label="Change language"
      >
        <Globe size={13} />
        {/* No flag emoji: Windows renders them as bare letter pairs, which is
            how "GB" ended up looking like a stray word before the language. */}
        <span className="hidden sm:inline whitespace-nowrap">{languageNames[lang]}</span>
        <span className="sm:hidden font-semibold tracking-wide">{lang.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-sm shadow-lg border border-[#E2E8E6] py-1 z-50">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-[13.5px] hover:bg-[#F5F9F8] transition-colors ${
                lang === l ? 'bg-[#EDF4F2] text-primary font-semibold' : 'text-foreground/80'
              }`}
            >
              <span>{languageNames[l]}</span>
              {lang === l && <span className="text-primary">&#10003;</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
