import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] overflow-hidden">
      <main className="flex-1 flex overflow-hidden">
        {/* Side Vertical Category Rail */}
        <aside className="w-24 border-r border-brand-border flex flex-col items-center py-12 shrink-0 bg-brand-beige">
          <div className="writing-vertical-rl text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 transform rotate-180 mb-20 whitespace-nowrap">
            Exhibition {new Date().getFullYear()}
          </div>
          <div className="space-y-12 flex flex-col items-center">
            <div className="text-[10px] font-bold tracking-widest text-brand-jade writing-vertical-lr uppercase">和田玉</div>
            <div className="text-[10px] font-bold tracking-widest opacity-40 writing-vertical-lr uppercase">翡翠</div>
            <div className="text-[10px] font-bold tracking-widest opacity-40 writing-vertical-lr uppercase">独山玉</div>
          </div>
        </aside>

        {/* Hero Content */}
        <section className="flex-1 flex flex-col relative bg-brand-beige">
          <div className="flex-1 grid grid-cols-12 overflow-hidden">
            {/* Product Description Pane */}
            <div className="col-span-full lg:col-span-5 p-8 lg:p-16 flex flex-col justify-center">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-jade mb-6"
              >
                Featured Masterpiece
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl lg:text-7xl font-serif italic leading-[1.1] mb-8 tracking-tighter"
              >
                Imperial <br/>Emerald <span className="not-italic font-normal">Bangle</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4 }}
                className="text-sm leading-relaxed text-brand-dark mb-12 max-w-sm font-serif italic"
              >
                A rare circular bangle carved from a single block of Grade A Burmese Jadeite. Its vivid green hue evokes the deep forest mist of the highland mines.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-end space-x-12"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-1 underline decoration-brand-jade underline-offset-4">Value</div>
                  <div className="text-2xl font-serif">$124,500 <span className="text-[10px] opacity-40 font-sans uppercase">USD</span></div>
                </div>
                <Button className="bg-brand-dark text-brand-beige rounded-none px-8 py-6 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-jade transition-colors">
                  {t('hero.cta')}
                </Button>
              </motion.div>
            </div>

            {/* Hero Image Pane */}
            <div className="hidden lg:flex col-span-7 bg-brand-greige relative items-center justify-center overflow-hidden">
              <div className="absolute inset-12 border border-white/40 z-0"></div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-96 h-96 relative z-10"
              >
                <div className="absolute inset-0 bg-brand-jade/10 rounded-full blur-3xl"></div>
                <div className="w-full h-full border-[20px] border-brand-jade rounded-full shadow-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1E4319] via-transparent to-brand-jade/20 opacity-60"></div>
                  <div className="w-3/4 h-3/4 border-4 border-white/10 rounded-full shadow-inner"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-xl border border-brand-border">
                  <div className="text-[10px] font-bold tracking-widest uppercase">Certified</div>
                  <div className="text-[8px] opacity-60 font-mono">GIA-92810-EX</div>
                </div>
              </motion.div>
              
              {/* Metadata Overlay */}
              <div className="absolute bottom-12 right-12 text-right">
                <div className="text-[80px] font-serif italic opacity-5 leading-none mb-2 select-none">01</div>
                <div className="text-[10px] font-bold tracking-widest uppercase mb-1">Provenance: Hpakant Mine</div>
                <div className="text-[10px] opacity-60 uppercase font-medium">Grade A Natural Jadeite</div>
              </div>
            </div>
          </div>

          {/* Bottom Showcase Strips */}
          <footer className="h-auto lg:h-40 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-brand-beige">
            <div className="border-r border-brand-border p-8 flex flex-col justify-between hover:bg-brand-greige transition-colors cursor-default">
              <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-4">Material</div>
              <div className="font-serif text-xl italic leading-none">Old-Pit Jadeite</div>
            </div>
            <div className="border-r border-brand-border p-8 flex flex-col justify-between hover:bg-brand-greige transition-colors cursor-default">
              <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-4">Texture</div>
              <div className="font-serif text-xl italic leading-none">Icy Flawless</div>
            </div>
            <div className="border-r border-brand-border p-8 flex flex-col justify-between hover:bg-brand-greige transition-colors cursor-default">
              <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-4">Dimensions</div>
              <div className="font-serif text-xl italic leading-none">58mm Diameter</div>
            </div>
            <Link to="/gallery" className="p-8 flex flex-col justify-between bg-brand-dark text-white group hover:bg-brand-jade transition-colors">
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mb-4 group-hover:opacity-100 transition-opacity">Explore Collection</div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-2xl italic tracking-tight">{t('hero.cta')}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Home;
