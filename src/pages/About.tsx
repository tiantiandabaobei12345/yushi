import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#F5F2ED] min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-6">Established 1998</p>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter mb-8 leading-tight">Our Heritage</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[3/4] bg-white overflow-hidden grayscale">
                <img 
                    src="https://images.unsplash.com/photo-1541813064842-53096ca1bb74?q=80&w=1000&auto=format&fit=crop" 
                    alt="Legacy" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="space-y-8">
                <h2 className="text-4xl font-serif leading-tight">Preserving Ancient Elegance for the Modern Collector</h2>
                <div className="space-y-6 text-lg font-light opacity-80 font-serif">
                    <p>
                        Yu Yun Ge (玉韵阁) began as a small boutique gallery dedicated to the appreciation of Hetian jade. Over the decades, we have grown into a premier destination for serious collectors of high-end jadeite and rare stones.
                    </p>
                    <p>
                        Our philosophy is deeply rooted in the concept of "Yun" (韵)—the resonance or spirit that flows through a masterfully carved piece of jade. We curate each piece not just for its material value, but for its artistic contribution to the millennia-long history of jade culture.
                    </p>
                </div>
            </div>
        </section>

        <section className="bg-white p-12 md:p-24 text-center space-y-12">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-serif italic mb-8">"Gold has a price, but jade is priceless."</h3>
                <p className="text-sm uppercase tracking-widest leading-loose opacity-60">
                    We invite you to experience the profound tranquility that only jade can offer. Whether you are a seasoned connoisseur or a new admirer, our experts are here to guide you through this timeless heritage.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                   <h4 className="text-4xl font-serif mb-2">25+</h4>
                   <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Years of Heritage</p>
                </div>
                <div>
                   <h4 className="text-4xl font-serif mb-2">500+</h4>
                   <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Rare Masterpieces</p>
                </div>
                <div>
                   <h4 className="text-4xl font-serif mb-2">12</h4>
                   <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Master Artists</p>
                </div>
                <div>
                   <h4 className="text-4xl font-serif mb-2">0</h4>
                   <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Counterfeit Record</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default About;
