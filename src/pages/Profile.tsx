import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Product } from '../types';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Heart, LogOut, Package, User as UserIcon } from 'lucide-react';
import { logout, signInWithEmail, signUpWithEmail } from '../services/firebase';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!profile?.favorites || profile.favorites.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'products'), where('__name__', 'in', profile.favorites));
        const snap = await getDocs(q);
        const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setFavoriteProducts(docs);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [profile]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        toast.success('Welcome back');
      } else {
        await signUpWithEmail(email, password, name);
        toast.success('Account created successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 bg-brand-beige">
        <div className="w-full max-w-md bg-white p-12 border border-brand-border shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif italic mb-4">
              {isLogin ? t('auth.welcomeBack') : t('auth.joinGallery')}
            </h2>
            <p className="opacity-60 text-sm font-serif italic">
              {isLogin 
                ? t('auth.accessCollection') 
                : t('auth.startJourney')}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                  {t('auth.collectorName')}
                </Label>
                <Input 
                  required 
                  className="rounded-none bg-brand-beige/30 border-brand-border focus:border-brand-jade h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                {t('auth.email')}
              </Label>
              <Input 
                type="email" 
                required 
                className="rounded-none bg-brand-beige/30 border-brand-border focus:border-brand-jade h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                {t('auth.password')}
              </Label>
              <Input 
                type="password" 
                required 
                className="rounded-none bg-brand-beige/30 border-brand-border focus:border-brand-jade h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              disabled={authLoading}
              className="w-full rounded-none bg-brand-dark text-brand-beige uppercase tracking-[0.2em] h-14 font-bold hover:bg-brand-jade transition-colors mt-8"
            >
              {authLoading ? t('auth.verifying') : (isLogin ? t('auth.login') : t('auth.createAccount'))}
            </Button>
          </form>

          <div className="mt-12 text-center border-t border-brand-border pt-8">
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">
              {isLogin ? t('auth.newCollector') : t('auth.alreadyCollector')}
            </p>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-jade hover:underline"
            >
              {isLogin ? t('auth.register') : t('auth.signInArchive')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-beige min-h-screen py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* User Section */}
          <aside className="w-full md:w-80 space-y-12 shrink-0">
             <div className="bg-brand-greige p-10 text-center border border-brand-border">
               <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-6 border border-brand-jade/20 p-1">
                 {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                 ) : (
                    <div className="w-full h-full bg-brand-beige flex items-center justify-center">
                      <UserIcon className="h-10 w-10 opacity-20" />
                    </div>
                 )}
               </div>
               <h3 className="font-serif text-2xl italic mb-1">{user.displayName || 'Collector'}</h3>
               <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{user.email}</p>
               <Button 
                onClick={logout} 
                variant="outline" 
                className="w-full rounded-none border-brand-border uppercase text-[9px] tracking-[0.2em] font-bold mt-8 hover:bg-brand-dark hover:text-white transition-all py-6 h-auto"
               >
                 <LogOut className="h-4 w-4 mr-2" />
                 {t('nav.logout')}
               </Button>
             </div>

             <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-30 border-b border-brand-border pb-4">Collector Status</h4>
                <div className="space-y-4">
                  <div className="p-8 bg-brand-dark text-white">
                    <div className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 mb-2">Member Since</div>
                    <div className="font-serif text-xl italic">{new Date(user.metadata.creationTime || '').getFullYear()}</div>
                  </div>
                </div>
             </div>
          </aside>

          {/* Favorites Grid */}
          <div className="flex-grow">
            <div className="mb-12 border-b border-brand-border pb-8 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-jade mb-4 block">Personal Archive</span>
                <h2 className="text-6xl font-serif italic tracking-tighter">
                  {t('profile.myFavorites')}
                </h2>
              </div>
              <span className="text-[10px] font-bold opacity-30 italic">[{favoriteProducts.length}]</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-brand-greige animate-pulse" />)}
              </div>
            ) : favoriteProducts.length === 0 ? (
              <div className="py-32 text-center bg-brand-greige border border-brand-border">
                <p className="font-serif text-2xl opacity-20 italic">Your private gallery is currently empty.</p>
                <Link to="/gallery" className="text-[10px] uppercase tracking-widest font-bold text-brand-jade mt-8 inline-block border-b border-brand-jade pb-1">
                  Explore The Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-20">
                {favoriteProducts.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group">
                    <div className="aspect-[4/5] overflow-hidden bg-brand-greige mb-6 border border-brand-border relative transition-transform group-hover:-translate-y-2 duration-700">
                      <img 
                        src={p.images?.[0]} 
                        alt="" 
                        className="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 transition-all duration-1000" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="border-l border-brand-border pl-6 relative">
                       <div className="absolute -left-px top-0 w-px h-0 group-hover:h-full bg-brand-jade transition-all duration-700" />
                       <h4 className="font-serif text-2xl italic tracking-tight mb-2 group-hover:text-brand-jade transition-colors">
                        {i18n.language === 'zh' ? p.name_zh : p.name_en}
                       </h4>
                       <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold opacity-30">
                          <span>{i18n.language === 'zh' ? p.material_zh : p.material_en}</span>
                          <span>Value: $ {p.price.toLocaleString()}</span>
                       </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
