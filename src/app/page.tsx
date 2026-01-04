"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Great_Vibes, Montserrat, Playfair_Display } from 'next/font/google';
import { FaTimes, FaArrowRight, FaTruck, FaStar } from "react-icons/fa";

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'] });

export default function ValentinesLanding() {
  const router = useRouter(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const boxes = [
    { id: "heart", name: "Heart", desc: "Our Signature Valentine Vessel", price: "Premium" },
    { id: "medium", name: "Medium", desc: "The Versatile Classic Box", price: "Signature" },
    { id: "large", name: "Large", desc: "The Grand Gifting Statement", price: "Elite" },
  ];

  const handleProceedToBuild = () => {
    if (selectedBox) {
      localStorage.setItem("selectedBoxSize", selectedBox.toLowerCase());
      router.push("/Build");
    }
  };

  return (
    // Changed bg-[#050505] to bg-[#fdf2f3] (pink-50 shade) and text to dark gray
    <main className={`min-h-screen bg-[#fdf2f3] text-gray-900 ${montserrat.className} selection:bg-rose-500 selection:text-white overflow-x-hidden`}>
      
      {/* --- NAV --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-4 md:p-8 flex justify-between items-center bg-[#fdf2f3]/80 backdrop-blur-md border-b border-rose-100">
        <div className="flex flex-col cursor-pointer" onClick={() => router.push("/")}>
          <h1 className={`${playfair.className} text-xl md:text-2xl tracking-tighter font-black uppercase text-gray-900`}>
            Deluxe <span className="text-rose-500">Global</span>
          </h1>
          <span className={`${greatVibes.className} text-rose-400 text-base md:text-lg -mt-1 md:-mt-2`}>The Atelier</span>
        </div>
        <div className="flex gap-4 md:gap-8 items-center">
            <button onClick={() => router.push("/shop")} className="hidden sm:block text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 hover:text-rose-500 transition-colors">Archive</button>
            <button 
                onClick={() => setModalOpen(true)}
                className="bg-rose-500 text-white px-4 md:px-6 py-2 md:py-3 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-gray-900 transition-all shadow-xl shadow-rose-200"
            >
                Build
            </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Background Text - Lightened for pink background */}
        <div className={`${greatVibes.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[25vw] text-rose-500/[0.05] whitespace-nowrap pointer-events-none z-0`}>
          Deluxe
        </div>

        <div className="relative z-10 text-center w-full">
          <p className="text-rose-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.8em] mb-4 md:mb-6 animate-pulse">
            Currently Featuring: The 2026 Love Drop
          </p>
          <h2 className={`${playfair.className} text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-[0.85] uppercase tracking-tighter mb-8 text-gray-900`}>
            Unbox <br /> <span className="italic font-light opacity-80 text-rose-500">Desire.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-gray-900 text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-rose-600 transition-all shadow-2xl"
            >
              Start Building
            </button>
            <button 
              onClick={() => router.push("/Shop")}
              className="text-gray-600 hover:text-gray-900 text-[10px] font-black uppercase tracking-[0.4em] transition-all py-5 px-8 border border-rose-200"
            >
              Shop Ready-Made
            </button>
          </div>
        </div>
      </section>

      {/* --- IMAGE & WRITING SECTION --- */}
      <section className="py-20 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-center">
          <div className="lg:col-span-7 relative order-2 lg:order-1">
             <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 text-6xl md:text-[10rem] font-black text-rose-500/[0.08] pointer-events-none select-none uppercase">Selection</div>
             <div className="relative z-10 border border-rose-200 p-2 md:p-4 bg-white shadow-2xl rounded-[2rem] overflow-hidden">
                <Image 
                    src="/heroimg.png" 
                    alt="Luxury Gift Box Size Selection" 
                    width={800} 
                    height={1000} 
                    className="w-full transition-all duration-1000"
                />
             </div>
          </div>
          
          <div className="lg:col-span-5 space-y-8 md:space-y-10 order-1 lg:order-2">
            <h3 className={`${playfair.className} text-4xl md:text-5xl italic text-rose-500`}>The Valentine Selection</h3>
            <p className="text-gray-600 leading-relaxed tracking-wide text-sm">
                Our <span className="text-gray-900 font-bold italic underline decoration-rose-300">Heart, Medium, and Large</span> vessels are seasonal exclusives, handcrafted by the Deluxe Global team to house the world&apos;s finest jewelry, roses, and bespoke treasures.
            </p>
            
            <ul className="space-y-4 md:space-y-6">
                {[
                    { label: "Heart Vessel", desc: "Our signature romantic silhouette for jewelry & roses." },
                    { label: "Medium Atelier", desc: "The perfect balance for curated luxury pairings." },
                    { label: "Grand Estate (Large)", desc: "Our most expansive vessel for ultimate gifting." }
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                        <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 border border-rose-200 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all rounded-full bg-white shadow-sm">
                            <FaStar size={10} />
                        </div>
                        <div>
                            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-900">{item.label}</p>
                            <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
            
            <button 
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] group text-gray-900 pt-4"
            >
                Begin Customization <FaArrowRight className="group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform text-rose-500" />
            </button>
          </div>
        </div>
      </section>

      {/* --- DRAWER MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          
          <div className="relative w-full sm:max-w-xl md:max-w-2xl bg-white h-full shadow-2xl p-8 md:p-20 flex flex-col justify-center animate-in slide-in-from-right duration-500">
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-400 hover:text-rose-500 transition-colors">
              <FaTimes size={24} />
            </button>

            <div className="space-y-12">
              <div>
                <span className={`${greatVibes.className} text-3xl md:text-4xl text-rose-500`}>Bespoke Selection</span>
                <h3 className={`${playfair.className} text-4xl md:text-6xl uppercase tracking-tighter mt-2 text-gray-900`}>The Size</h3>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-4 italic font-bold">2026 Love Drop Series</p>
              </div>

              <div className="space-y-4">
                {boxes.map((box) => (
                  <button
                    key={box.id}
                    onClick={() => setSelectedBox(box.name)}
                    className={`w-full text-left p-6 md:p-8 transition-all border-2 rounded-3xl ${
                      selectedBox === box.name 
                      ? "bg-rose-500 border-rose-500 shadow-xl shadow-rose-200 scale-[1.02]" 
                      : "bg-pink-50 border-rose-100 hover:border-rose-300"
                    }`}
                  >
                    <div className="flex justify-between items-baseline gap-2">
                        <p className={`${playfair.className} text-lg md:text-3xl uppercase ${selectedBox === box.name ? 'text-white' : 'text-gray-900'}`}>{box.name}</p>
                        <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest shrink-0 ${selectedBox === box.name ? 'text-white/70' : 'text-rose-500'}`}>{box.price}</span>
                    </div>
                    <p className={`text-[8px] md:text-[10px] uppercase tracking-widest mt-2 font-bold ${selectedBox === box.name ? 'text-white/80' : 'text-gray-400'}`}>{box.desc}</p>
                  </button>
                ))}
              </div>

              {selectedBox && (
                <button
                  onClick={handleProceedToBuild}
                  className="w-full bg-gray-900 text-white py-6 md:py-8 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] hover:bg-rose-600 transition-all shadow-2xl flex items-center justify-center gap-4 rounded-full"
                >
                  Configure Interior <FaArrowRight size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-16 md:py-20 flex flex-col items-center border-t border-rose-100 bg-white">
         <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-rose-500 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-rose-100">
            <span className={`${greatVibes.className} text-rose-500 text-xl md:text-2xl`}>D</span>
         </div>
         <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[1.2em] text-gray-400 text-center px-4">Deluxe Global </p>
      </footer>
    </main>
  );
}