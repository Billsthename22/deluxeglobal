"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Great_Vibes, Montserrat, Playfair_Display } from 'next/font/google';
import { FaHeart, FaBoxOpen, FaGem, FaTimes, FaArrowRight, FaMagic, FaTruck, FaLock } from "react-icons/fa";

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'] });

export default function ValentinesLanding() {
  const router = useRouter(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const boxes = [
    { name: "Heart Box", img: "/heart-box.png", desc: "Our Signature Valentine's Base" },
    { name: "Medium Box", img: "/medium-box.png", desc: "Classic & Timeless" },
    { name: "Large Box", img: "/large-box.png", desc: "For the Ultimate Surprise" },
  ];

  return (
    <main className={`min-h-screen bg-[#0f0101] text-white ${montserrat.className} overflow-x-hidden`}>
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Valentine Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-900/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-red-900/20 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block py-2 px-4 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-black tracking-widest uppercase">
              🌹 Valentine's Edition 2026
            </div>
            
            <h1 className={`${playfair.className} text-6xl md:text-8xl leading-none`}>
              Love, <br />
              <span className="italic text-rose-500">Unboxed.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 font-medium">
              This Valentine's, don't just give a gift. Give a memory. Create a custom gift set as unique as your love story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <button 
                onClick={() => setModalOpen(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(225,29,72,0.4)] flex items-center justify-center gap-3"
              >
                Build Her Basket <FaArrowRight />
              </button>
              <button 
                onClick={() => router.push('/shop')}
                className="border border-white/20 hover:bg-white hover:text-black px-10 py-5 rounded-full text-lg font-bold transition-all backdrop-blur-md"
              >
                Shop Ready-Made
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative z-20 animate-float">
              <Image 
                src="/heroimg.png" 
                alt="Luxury Valentine Box" 
                width={700} 
                height={700}
                className="drop-shadow-[0_0_50px_rgba(225,29,72,0.3)]"
              />
            </div>
            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 flex flex-col items-center justify-center animate-bounce duration-[3s]">
              <FaHeart className="text-rose-500 text-3xl mb-1" />
              <span className="text-[10px] font-black uppercase tracking-tighter">100% Custom</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`${playfair.className} text-4xl md:text-5xl mb-4`}>Three Steps to Perfect</h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <FaBoxOpen />, title: "Select a Box", desc: "Choose from our signature Heart-shaped or Luxury square bases." },
              { icon: <FaMagic />, title: "Curate Items", desc: "Select from jewelry, perfumes, roses, and electronics to fill your box." },
              { icon: <FaTruck />, title: "Gift & Surprise", desc: "We package it with care and deliver it straight to their doorstep." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl text-rose-500 mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-rose-500 group-hover:text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRUST SECTION --- */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-black text-xl italic"><FaLock size={16}/> SECURE PAY</div>
            <div className="flex items-center gap-2 font-black text-xl italic text-rose-400 uppercase tracking-widest leading-none">Deluxe <br/> Quality</div>
            <div className="flex items-center gap-2 font-black text-xl italic uppercase tracking-widest leading-none">Nationwide <br/> Delivery</div>
        </div>
      </section>

      {/* --- BOX SELECTION MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setModalOpen(false)} />
          
          <div className="relative bg-[#1a1a1a] border border-white/10 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setModalOpen(false)} className="absolute top-8 right-8 text-white/40 hover:text-rose-500 transition-colors">
              <FaTimes size={24} />
            </button>

            <div className="p-10 md:p-14 text-center">
              <h3 className={`${playfair.className} text-3xl text-white mb-2`}>The Foundation</h3>
              <p className="text-white/40 font-medium mb-10">Select the vessel for your Valentine's surprise</p>

              <div className="space-y-4">
                {boxes.map((box) => (
                  <button
                    key={box.name}
                    onClick={() => setSelectedBox(box.name)}
                    className={`w-full flex items-center gap-6 p-5 rounded-3xl transition-all border-2 ${
                      selectedBox === box.name 
                      ? "bg-rose-600 border-rose-500 shadow-xl" 
                      : "bg-white/5 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                      selectedBox === box.name ? "bg-white text-rose-600" : "bg-[#222] text-rose-400"
                    }`}>
                      {box.name === "Heart Box" ? <FaHeart /> : <FaBoxOpen />}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">{box.name}</p>
                      <p className="text-xs text-white/40">{box.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedBox && (
                <button
                  onClick={() => {
                    localStorage.setItem("selectedGiftBox", selectedBox);
                    router.push("/build");
                  }}
                  className="w-full mt-10 bg-white text-black py-5 rounded-full font-black text-lg hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                >
                  Start Customizing
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}