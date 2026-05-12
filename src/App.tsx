/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import './lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/sonner';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <footer className="bg-[#1A1A1A] text-[#F5F2ED] py-12 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
              <div>
                <h2 className="font-serif text-2xl mb-4 tracking-tighter italic">Yu Yun Ge</h2>
                <p className="max-w-xs opacity-60 text-sm">
                  Dedicated to curating and exhibiting the finest jade pieces for global collectors.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 font-medium text-xs uppercase tracking-widest opacity-80 mt-auto">
                <div className="flex flex-col gap-3">
                  <a href="/" className="hover:opacity-100 transition-opacity">Home</a>
                  <a href="/gallery" className="hover:opacity-100 transition-opacity">Exhibition</a>
                  <a href="/about" className="hover:opacity-100 transition-opacity">Heritage</a>
                </div>
                <div className="flex flex-col gap-3">
                  <span>Privacy</span>
                  <span>Terms</span>
                  <span>Contact</span>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-[10px] uppercase tracking-widest opacity-40 text-center md:text-left">
              © {new Date().getFullYear()} Yu Yun Ge. All rights reserved.
            </div>
          </footer>
          <Toaster position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}
