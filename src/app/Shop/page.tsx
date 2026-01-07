"use client";

import { useState } from "react";
import { FaGem, FaHeart, FaStar, FaArrowRight, FaShoppingBag, FaTimes, FaBoxOpen, FaCheckCircle, FaTools, FaCrown } from "react-icons/fa";
import { useRouter } from "next/navigation";

// --- UPDATED PACKAGES FROM IMAGE DATA ---
const packages = [
  {
    id: "valentine-60k",
    name: "Heart & Drawer Box (60k)",
    price: "60,000",
    color: "from-rose-400 to-pink-500",
    icon: <FaHeart />,
    items: [
      "Branded Purse", 
      "Cluster Lash Book", 
      "Mini Fan", 
      "Journal", 
      "Influencer Light", 
      "Rhode Lip Tint", 
      "₦5,000 Cash (100 Naira Notes)"
    ]
  },
  {
    id: "valentine-100k",
    name: "Heart & Drawer Box (100k)",
    price: "100,000",
    color: "from-pink-500 to-rose-600",
    icon: <FaCrown />,
    items: [
      "Mini Fan", 
      "Mini Straightner", 
      "Mini Jewelry Box", 
      "Branded Purse", 
      "Van Cleaf Bracelet", 
      "Journal", 
      "Glasses", 
      "Heart Money Box", 
      "₦10,000 Cash (200 Naira Notes)", 
      "Flower Bouquet (10 Scented Roses)"
    ]
  },
  {
    id: "valentine-150k",
    name: "Heart & Drawer Box (150k)",
    price: "150,000",
    color: "from-rose-600 to-red-700",
    icon: <FaGem />,
    items: [
      "Bloomer Short", 
      "Mini Jewelry Box", 
      "Van Cleaf Bracelet", 
      "Journal", 
      "Wine", 
      "Influencer Light", 
      "Face Mask", 
      "Floral Claw Clip", 
      "Heart Money Box", 
      "₦25,000 Cash (500 Naira Notes)", 
      "Flower Bouquet (20 Scented Roses)"
    ]
  }
];

const boxTypes = [
  { name: "Heart Box", icon: <FaHeart />, desc: "The Signature Valentine Vessel" },
  { name: "Drawer Box", icon: <FaBoxOpen />, desc: "Elegant sliding compartment foundation" },
  { name: "Heart & Drawer Combo", icon: <FaGem />, desc: "The Full Valentine Special Experience" },
];

export default function ShopPage() {
  const router = useRouter();
  const [showBoxModal, setShowBoxModal] = useState(false);
  const [decisionModal, setDecisionModal] = useState<{ isOpen: boolean, pkgName: string | null }>({
    isOpen: false,
    pkgName: null
  });

  const handleSelectPackage = (pkg: typeof packages[number]) => {
    const packageAsSingleItem = [{
      id: pkg.id,
      name: pkg.name,
      image: "/valentine-box-preview.jpg", 
      price: pkg.price,
      isPackage: true 
    }];

    localStorage.setItem("selectedBoxSize", "Heart and Drawer Box");
    localStorage.setItem("orderItems", JSON.stringify(packageAsSingleItem));
    localStorage.setItem("orderComment", `Ordered ${pkg.name} Valentine Special.`);
    
    setDecisionModal({ isOpen: true, pkgName: pkg.name });
  };

  const startCustomBuild = (name: string) => {
    localStorage.setItem("selectedBoxSize", name);
    router.push("/Build");
  };

  return (
    <main className="min-h-screen bg-[#fff5f5] pb-20 relative">
      {/* HERO SECTION */}
      <section className="bg-white pt-28 pb-20 px-6 text-center border-b border-rose-100 relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
            <FaHeart size={300} className="text-rose-500" />
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-4 tracking-tighter uppercase relative z-10">
          Valentine <br/><span className="text-rose-500 italic font-light capitalize tracking-normal text-4xl md:text-7xl">Specials</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto font-black uppercase text-[10px] tracking-[0.4em] leading-relaxed relative z-10">
          Exclusive Heart and Drawer Box Collection
        </p>
      </section>

      {/* PACKAGE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-rose-50 transition-all hover:-translate-y-2 flex flex-col group">
            <div className={`bg-gradient-to-br ${pkg.color} p-10 text-white relative`}>
              <div className="absolute top-6 right-6 text-white/20 text-6xl group-hover:scale-110 transition-transform">{pkg.icon}</div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-90 mb-2">Deluxe Global Exclusive</p>
              <h2 className="text-2xl font-black mb-4 relative z-10 leading-tight tracking-tighter uppercase">{pkg.name}</h2>
              <div className="text-4xl font-black flex items-baseline gap-1 relative z-10">
                <span className="text-sm font-bold opacity-80">₦</span>{pkg.price}
              </div>
            </div>

            <div className="p-10 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-6 border-b border-rose-50 pb-2">Manifest Contents</p>
              <ul className="space-y-4">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-bold text-[11px] uppercase tracking-tight leading-tight">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 pt-0 mt-auto">
              <button onClick={() => handleSelectPackage(pkg)} className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-rose-600 transition-all shadow-lg active:scale-95">
                SELECT BOX <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DECISION MODAL */}
      {decisionModal.isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" onClick={() => setDecisionModal({ isOpen: false, pkgName: null })} />
          
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 relative z-10 shadow-2xl border border-white text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <FaCheckCircle />
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Box Reserved!</h2>
            <p className="text-gray-500 text-sm font-bold mb-8">
                Your <span className="text-rose-500">{decisionModal.pkgName}</span> has been added.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => router.push("/Checkout")}
                className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-rose-600 transition-all flex items-center justify-center gap-3"
              >
                Go to Checkout <FaArrowRight />
              </button>
              
              <button 
                onClick={() => setShowBoxModal(true)}
                className="w-full bg-rose-50 text-rose-600 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-rose-100 transition-all flex items-center justify-center gap-3"
              >
                Custom Order <FaTools />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOX SELECTION MODAL (Atelier) */}
      {showBoxModal && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-xl" onClick={() => setShowBoxModal(false)} />
          
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-10 relative z-10 shadow-2xl border border-white">
            <button onClick={() => setShowBoxModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-rose-500 transition-colors">
              <FaTimes size={24} />
            </button>

            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center uppercase tracking-tighter">Bespoke Foundation</h2>
            <p className="text-gray-400 text-center font-bold text-[10px] uppercase tracking-[0.2em] mb-10">Start your custom Valentine build</p>

            <div className="space-y-4">
              {boxTypes.map((box) => (
                <button
                  key={box.name}
                  onClick={() => startCustomBuild(box.name)}
                  className="w-full group flex items-center gap-6 p-6 bg-rose-50/30 rounded-[2rem] border-2 border-transparent hover:border-rose-200 hover:bg-white transition-all text-left shadow-sm hover:shadow-xl"
                >
                  <div className="bg-white p-5 rounded-2xl text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                    {box.icon}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg uppercase tracking-tighter">{box.name}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{box.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}