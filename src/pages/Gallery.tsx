import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../services/firebase';
import { toast } from 'sonner';

const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { products, loading } = useProducts();
  const { profile, user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('newest');

  const categories = ['all', '和田玉', '翡翠', '独山玉', '更多'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name_zh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (selectedSort === 'price-asc') return a.price - b.price;
    if (selectedSort === 'price-desc') return b.price - a.price;
    return 0; // Default to newest (already sorted in hook)
  });

  const toggleFavorite = async (productId: string, isFavorited: boolean) => {
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        favorites: isFavorited ? arrayRemove(productId) : arrayUnion(productId)
      });
      toast.success(isFavorited ? 'Removed from collections' : 'Added to collections');
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="bg-brand-beige min-h-screen pb-24">
      {/* Header */}
      <header className="pt-24 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-jade mb-4 block">Exhibition Catalog</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mb-6 tracking-tighter leading-none">{t('nav.gallery')}</h1>
          <p className="text-sm font-serif italic opacity-60 max-w-lg">
            A curated selection of the world's most sought-after jade pieces, each meticulously chosen for its exceptional quality and cultural significance.
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-brand-beige/90 backdrop-blur-md border-y border-brand-border py-4 mb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 opacity-30" />
            <Input 
              placeholder={t('filter.search')} 
              className="pl-8 rounded-none border-none bg-transparent focus:ring-0 transition-all h-10 uppercase tracking-widest text-[9px] font-bold placeholder:opacity-40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute bottom-1 left-8 right-0 h-px bg-brand-dark/10" />
          </div>

          <div className="flex flex-wrap gap-8 w-full lg:w-auto justify-center items-center">
            <div className="flex items-center gap-6">
               <div className="flex gap-6">
                 {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[9px] uppercase tracking-[0.2em] font-bold transition-all ${
                        selectedCategory === cat 
                          ? 'text-brand-jade border-b border-brand-jade pb-1' 
                          : 'text-brand-dark/30 hover:text-brand-dark pb-1 border-b border-transparent'
                      }`}
                    >
                      {cat === 'all' ? t('filter.all') : cat}
                    </button>
                 ))}
               </div>
            </div>

            <div className="h-4 w-px bg-brand-border hidden sm:block"></div>

            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-[160px] rounded-none border-none bg-transparent text-[9px] uppercase tracking-[0.2em] font-bold h-10 ring-0 focus:ring-0">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-brand-beige border-brand-border">
                <SelectItem value="newest" className="text-[9px] uppercase tracking-widest font-bold">Newest</SelectItem>
                <SelectItem value="price-asc" className="text-[9px] uppercase tracking-widest font-bold">Price Low</SelectItem>
                <SelectItem value="price-desc" className="text-[9px] uppercase tracking-widest font-bold">Price High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="animate-pulse space-y-6">
                <div className="aspect-[3/4] bg-brand-greige" />
                <div className="h-4 bg-brand-greige w-3/4" />
                <div className="h-3 bg-brand-greige w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20"
            >
              {filteredProducts.map((product) => {
                const isFavorited = profile?.favorites?.includes(product.id) || false;
                const name = i18n.language === 'zh' ? product.name_zh : product.name_en;
                const material = i18n.language === 'zh' ? product.material_zh : product.material_en;

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-brand-greige mb-8 group-hover:shadow-2xl transition-all duration-700">
                      <Link to={`/product/${product.id}`} className="block h-full">
                        <img 
                          src={product.images?.[0] || 'https://picsum.photos/seed/jade/600/800'} 
                          alt={name}
                          className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                      </Link>
                      
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => toggleFavorite(product.id, isFavorited)}
                          className={`p-3 rounded-full backdrop-blur-md transition-all ${
                            isFavorited 
                              ? 'bg-brand-jade text-white' 
                              : 'bg-white/50 hover:bg-white text-brand-dark/60 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="space-y-4 border-l border-brand-border pl-6 relative">
                      <div className="absolute -left-px top-0 w-px h-0 group-hover:h-full bg-brand-jade transition-all duration-700" />
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                           <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-jade">
                             {material || product.category}
                           </span>
                           <span className="text-[10px] font-bold opacity-40 italic">0{filteredProducts.indexOf(product) + 1}</span>
                        </div>
                        <h3 className="font-serif text-2xl tracking-tighter leading-tight mb-2 italic">
                          <Link to={`/product/${product.id}`} className="hover:text-brand-jade transition-colors">
                            {name}
                          </Link>
                        </h3>
                        <div className="flex justify-between items-baseline pt-2 border-t border-brand-border mt-4">
                           <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Value</span>
                           <span className="text-sm font-semibold tracking-tight">
                            {t('product.price', { price: product.price.toLocaleString() })}
                           </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl opacity-40 italic">No jade pieces found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
