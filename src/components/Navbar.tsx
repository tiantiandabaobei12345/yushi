import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(nextLng);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-beige/80 backdrop-blur-md shrink-0 h-20">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-serif text-2xl tracking-widest text-brand-dark flex items-baseline">
            {t('hero.title')}
            <span className="text-[10px] tracking-tighter uppercase font-sans ml-1 opacity-60">Jade Rhyme</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold opacity-70">
            <Link to="/gallery" className="hover:text-brand-jade transition-colors">{t('nav.gallery')}</Link>
            <Link to="/about" className="hover:text-brand-jade transition-colors">{t('nav.about')}</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-[10px] tracking-widest font-bold">
            <button 
              onClick={() => i18n.changeLanguage('en')}
              className={`${i18n.language === 'en' ? 'border-b border-black pb-0.5' : 'opacity-40'}`}
            >
              EN
            </button>
            <button 
              onClick={() => i18n.changeLanguage('zh')}
              className={`${i18n.language === 'zh' ? 'border-b border-black pb-0.5' : 'opacity-40'}`}
            >
              CN
            </button>
          </div>

          <div className="md:hidden">
            <Menu className="h-5 w-5 opacity-60" />
          </div>
        </div>
      </div>
    </nav>
  );
};
