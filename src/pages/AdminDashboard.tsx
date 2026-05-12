import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription as DialogDesc
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Product>>({
    name_zh: '',
    name_en: '',
    description_zh: '',
    description_en: '',
    category: '和田玉',
    price: 0,
    material_zh: '',
    material_en: '',
    origin_zh: '',
    origin_en: '',
    dimensions: '',
    images: [],
  });

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center px-4">
        <div>
          <h2 className="text-3xl font-serif mb-4">Access Restricted</h2>
          <p className="opacity-60">You do not have administrative privileges to access this panel.</p>
        </div>
      </div>
    );
  }

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name_zh: '',
        name_en: '',
        description_zh: '',
        description_en: '',
        category: '和田玉',
        price: 0,
        material_zh: '',
        material_en: '',
        origin_zh: '',
        origin_en: '',
        dimensions: '',
        images: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Product updated successfully');
      } else {
        await addProduct(formData as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Product added successfully');
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Operation failed: ' + (error as any).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name_zh.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-brand-beige min-h-screen py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-brand-border pb-12">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-jade mb-4 block">Archive Management</span>
            <h1 className="text-6xl font-serif italic tracking-tighter leading-tight">{t('admin.dashboard')}</h1>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-72">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 opacity-30" />
              <Input 
                placeholder={t('filter.search')} 
                className="pl-8 rounded-none border-none bg-transparent focus:ring-0 transition-all h-10 uppercase tracking-widest text-[9px] font-bold placeholder:opacity-40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute bottom-1 left-8 right-0 h-px bg-brand-dark/10" />
            </div>
            <Button 
              onClick={() => handleOpenDialog()}
              className="rounded-none bg-brand-dark text-white hover:bg-brand-jade px-10 py-6 uppercase tracking-widest text-[10px] font-bold transition-all h-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.addProduct')}
            </Button>
          </div>
        </header>

        <Card className="rounded-none border-brand-border bg-brand-beige shadow-none">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-border uppercase text-[10px] tracking-[0.2em] font-bold text-brand-dark/40 bg-brand-greige/30">
                    <th className="py-6 px-8 select-none">Exhibit No.</th>
                    <th className="py-6 px-8">Image</th>
                    <th className="py-6 px-8">{t('admin.table.name')}</th>
                    <th className="py-6 px-8">{t('admin.table.category')}</th>
                    <th className="py-6 px-8">{t('admin.table.price')}</th>
                    <th className="py-6 px-8 text-right">{t('admin.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {loading ? (
                     [1,2,3,4].map(i => (
                       <tr key={i} className="animate-pulse">
                         <td className="py-6 px-8"><div className="w-8 h-4 bg-brand-greige" /></td>
                         <td className="py-6 px-8"><div className="w-16 h-16 bg-brand-greige" /></td>
                         <td className="py-6 px-8"><div className="w-48 h-4 bg-brand-greige" /></td>
                         <td className="py-6 px-8"><div className="w-24 h-4 bg-brand-greige" /></td>
                         <td className="py-6 px-8"><div className="w-20 h-4 bg-brand-greige" /></td>
                         <td className="py-6 px-8" />
                       </tr>
                     ))
                  ) : (
                    filteredProducts.map((product, idx) => (
                      <tr key={product.id} className="hover:bg-white transition-colors group">
                        <td className="py-6 px-8 text-[10px] font-bold opacity-30 italic">
                          0{idx + 1}
                        </td>
                        <td className="py-6 px-8">
                          <div className="w-16 h-16 bg-brand-greige border border-brand-border flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="h-4 w-4 opacity-20" />
                            )}
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex flex-col group-hover:text-brand-jade transition-colors">
                            <span className="font-serif text-xl italic tracking-tight">{product.name_en}</span>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold font-serif">{product.name_zh}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-jade/60">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-6 px-8 font-serif text-lg">
                          $ {product.price.toLocaleString()}
                        </td>
                        <td className="py-6 px-8 text-right">
                          <div className="flex justify-end gap-3 translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-10 w-10 hover:bg-white border border-transparent hover:border-brand-border transition-all"
                              onClick={() => handleOpenDialog(product)}
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-10 w-10 text-red-800 hover:bg-red-50 border border-transparent hover:border-brand-border transition-all"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-beige border-none rounded-none p-0 shadow-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-[500px]">
              <div className="p-8 md:p-16 flex-grow">
                <DialogHeader className="mb-12">
                  <DialogTitle className="text-5xl font-serif italic tracking-tight leading-none mb-4">
                    {editingProduct ? t('admin.editProduct') : t('admin.addProduct')}
                  </DialogTitle>
                  <DialogDesc className="uppercase tracking-[0.2em] text-[10px] font-bold opacity-40 border-b border-brand-border pb-6">
                    Masterpiece Registration & Archive Record
                  </DialogDesc>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">{t('admin.form.nameEn')}</Label>
                      <Input 
                        required 
                        className="rounded-none border-none border-b border-brand-border bg-transparent focus:ring-0 focus:border-brand-jade px-0 h-12 font-serif text-2xl italic tracking-tight placeholder:opacity-20" 
                        value={formData.name_en}
                        onChange={e => setFormData({...formData, name_en: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">{t('admin.form.nameZh')}</Label>
                      <Input 
                        className="rounded-none border-none border-b border-brand-border bg-transparent focus:ring-0 focus:border-brand-jade px-0 h-10 font-serif text-xl tracking-tight" 
                        value={formData.name_zh}
                        onChange={e => setFormData({...formData, name_zh: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">{t('admin.form.category')}</Label>
                        <Select 
                          value={formData.category}
                          onValueChange={v => setFormData({...formData, category: v})}
                        >
                          <SelectTrigger className="rounded-none bg-transparent border-brand-border uppercase tracking-widest text-[10px] h-12 font-bold focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-brand-beige border-brand-border">
                            <SelectItem value="和田玉" className="text-[10px] font-bold uppercase tracking-widest">和田玉 (Hetian)</SelectItem>
                            <SelectItem value="翡翠" className="text-[10px] font-bold uppercase tracking-widest">翡翠 (Jadeite)</SelectItem>
                            <SelectItem value="独山玉" className="text-[10px] font-bold uppercase tracking-widest">独山玉 (Dushan)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">Appraisal Value ($)</Label>
                        <Input 
                          type="number" 
                          required 
                          className="rounded-none bg-transparent border-brand-border h-12 text-lg font-serif" 
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">English Narrative</Label>
                      <textarea 
                        className="w-full h-32 p-4 rounded-none border border-brand-border bg-transparent font-serif italic text-lg leading-relaxed focus:ring-1 focus:ring-brand-jade outline-none resize-none placeholder:opacity-20"
                        placeholder="Detailed provenance..."
                        value={formData.description_en}
                        onChange={e => setFormData({...formData, description_en: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">Image Assets</Label>
                      <div className="flex gap-4">
                        <Input 
                          placeholder="Public Asset URL..." 
                          className="rounded-none bg-transparent border-brand-border text-[10px] tracking-widest h-12"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const url = (e.target as HTMLInputElement).value;
                              if (url) {
                                setFormData({...formData, images: [...(formData.images || []), url]});
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-4 pt-2">
                        {formData.images?.map((img, idx) => (
                          <div key={idx} className="relative w-16 h-16 flex-shrink-0 bg-brand-greige border border-brand-border p-1 group">
                            <img src={img} alt="" className="w-full h-full object-cover grayscale brightness-110" />
                            <button 
                              type="button"
                              className="absolute -top-2 -right-2 bg-brand-dark text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setFormData({...formData, images: formData.images?.filter((_, i) => i !== idx)})}
                            >
                              <Plus className="h-3 w-3 rotate-45" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-greige/50 p-8 flex justify-end gap-6 border-t border-brand-border">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsDialogOpen(false)}
                  className="rounded-none uppercase tracking-widest text-[10px] font-bold px-12 h-14"
                >
                  {t('admin.form.cancel')}
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-none bg-brand-dark text-white hover:bg-brand-jade uppercase tracking-widest text-[10px] font-bold px-16 h-14 transition-all"
                >
                  Confirm Entry
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
