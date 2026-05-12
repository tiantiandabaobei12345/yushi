import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Product } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, Share2, Info, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          toast.error('Product not found');
          navigate('/gallery');
        }
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const isFavorited = profile?.favorites?.includes(id || '') || false;

  const toggleFavorite = async () => {
    if (!user || !id) {
      toast.error('Please login to save favorites');
      return;
    }
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        favorites: isFavorited ? arrayRemove(id) : arrayUnion(id)
      });
      toast.success(isFavorited ? 'Removed from collection' : 'Added to collection');
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square bg-white" />
          <div className="space-y-8">
            <div className="h-12 bg-white w-3/4" />
            <div className="h-6 bg-white w-1/4" />
            <div className="h-32 bg-white w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const name = i18n.language === 'zh' ? product.name_zh : product.name_en;
  const description = i18n.language === 'zh' ? product.description_zh : product.description_en;
  const material = i18n.language === 'zh' ? product.material_zh : product.material_en;
  const origin = i18n.language === 'zh' ? product.origin_zh : product.origin_en;

  return (
    <div className="bg-brand-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-jade mb-12 hover:-translate-x-1 transition-transform group"
        >
          <ArrowLeft className="h-3 w-3 group-hover:text-brand-jade" />
          {t('product.backToGallery')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/5] bg-brand-greige overflow-hidden border border-brand-border group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={product.images?.[activeImage] || 'https://picsum.photos/seed/jade/1000/1000'}
                  alt={name}
                  className="w-full h-full object-cover brightness-105"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 border-[24px] border-white/10 pointer-events-none" />
              
              <div className="absolute top-8 right-8">
                <div className="bg-brand-dark text-white p-6 shadow-2xl">
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1">Authenticated</div>
                  <div className="text-[8px] opacity-40 uppercase">Certified Grade A</div>
                </div>
              </div>

              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-8 left-8 flex gap-4">
                  <button 
                    onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}
                    className="p-4 bg-brand-dark/10 hover:bg-white text-brand-dark backdrop-blur-md transition-all border border-brand-border shadow-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}
                    className="p-4 bg-brand-dark/10 hover:bg-white text-brand-dark backdrop-blur-md transition-all border border-brand-border shadow-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-500 ${activeImage === idx ? 'border-brand-jade' : 'border-transparent grayscale'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-12">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-jade mb-6 block border-b border-brand-border pb-4">
                {product.category} — {material}
              </span>
              <h1 className="text-6xl md:text-7xl font-serif italic mb-8 tracking-tighter leading-tight">{name}</h1>
              <div className="flex items-baseline justify-between mb-12">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Appraised Value</span>
                <span className="text-4xl font-serif">$ {product.price.toLocaleString()}</span>
              </div>
              <p className="text-lg font-serif italic opacity-70 leading-relaxed mb-12 border-l-2 border-brand-border pl-8">
                {description || 'A rare find of exceptional quality.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-12">
              <div className="border-t border-brand-border pt-4">
                <div className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mb-2">{t('product.material')}</div>
                <div className="font-serif text-lg">{material || '-'}</div>
              </div>
              <div className="border-t border-brand-border pt-4">
                <div className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mb-2">{t('product.origin')}</div>
                <div className="font-serif text-lg">{origin || '-'}</div>
              </div>
              <div className="border-t border-brand-border pt-4">
                <div className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mb-2">{t('product.dimensions')}</div>
                <div className="font-serif text-lg">{product.dimensions || '-'}</div>
              </div>
              <div className="border-t border-brand-border pt-4">
                <div className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mb-2">Heritage</div>
                <div className="font-serif text-lg">Burmese Grade A</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button className="w-full h-16 rounded-none bg-brand-dark text-white hover:bg-brand-jade uppercase tracking-[0.3em] font-bold text-xs transition-all">
                Enquire for Bespoke Order
              </Button>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={toggleFavorite}
                  className={`flex-1 py-10 rounded-none border-brand-border text-[10px] uppercase tracking-widest font-bold transition-all h-auto ${
                    isFavorited ? 'bg-brand-jade text-white border-brand-jade' : 'hover:bg-brand-dark hover:text-white'
                  }`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'In Collection' : 'Add to Collection'}
                </Button>
                <Button variant="outline" className="px-8 rounded-none border-brand-border hover:bg-brand-dark hover:text-white transition-all">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-12 p-8 bg-brand-greige border border-brand-border">
              <div className="flex items-center gap-4 mb-4">
                <Info className="h-4 w-4 text-brand-jade" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Curator's Note</span>
              </div>
              <p className="text-xs leading-relaxed opacity-60 font-medium">
                This piece represents the pinnacle of craftsmanship. Due to its historical significance and rarity, it comes with a detailed dossier of its journey from the mine to our gallery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
