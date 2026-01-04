"use client";

import { useState } from "react";
import { FaGem, FaHeart, FaStar, FaArrowRight, FaCheckCircle, FaShoppingBag, FaTimes, FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ... packages and boxTypes constants remain the same ...
const packages = [
  {
    id: "premium-heart",
    name: "The 100k Heart Money Box",
    price: "100,000",
    color: "from-red-400 to-pink-600",
    icon: <FaHeart />,
    items: [
      "Heart Box", "Mini Straightener", "Mini Fan", "Mini Jewellery Box", 
      "Branded Purse", "Luxury Bracelet", "Journal", "₦30,000 Cash", 
      "Glasses", "10 Scented Roses", "Valentines Box"
    ]
  },
  {
    id: "deluxe-tech",
    name: "The 100k Deluxe Box",
    price: "100,000",
    color: "from-pink-500 to-purple-600",
    icon: <FaGem />,
    items: [
      "1 Influencer LED Light", "1 Stanley Cup", "Branded Purse", 
      "Note Pad", "3-in-1 Perfume Set", "2-in-1 Towel", 
      "Cluster Lashes", "Eye Stone Gift Box"
    ]
  },
  {
    id: "essential-love",
    name: "The 60k Heart Box",
    price: "60,000",
    color: "from-pink-400 to-rose-500",
    icon: <FaStar />,
    items: [
      "₦10,000 Cash", "Journal with Hand-written Letter", 
      "Branded Purse", "Mini Fan", "Influencer LED Light", 
      "Heart Box", "Cluster Lashes"
    ]
  }
];

const boxTypes = [
  { name: "Heart Box", icon: <FaHeart />, desc: "Romantic heart-shaped packaging" },
  { name: "Medium Box", icon: <FaBoxOpen />, desc: "Perfect for 4-6 luxury items" },
  { name: "Large Box", icon: <FaGem />, desc: "Spacious enough for all-in-one sets" },
];

export default function ShopPage() {
  const router = useRouter();
  const [showBoxModal, setShowBoxModal] = useState(false);

  const handleSelectPackage = (pkg: typeof packages[number]) => {
    if (!pkg) return; // Ensure pkg is valid

    // Use crypto.randomUUID() for better uniqueness
    const packageAsSingleItem = [{
      id: crypto.randomUUID(),
      name: pkg.name,
      image: "/items/package-item.jpg", 
      isPackage: true 
    }];

    localStorage.setItem("selectedBoxSize", pkg.items.includes("Heart Box") ? "Heart Box" : "Luxury Box");
    localStorage.setItem("selectedItems", JSON.stringify(packageAsSingleItem));
    localStorage.setItem("loveLetter", `Ordered ${pkg.name} directly from Shop.`);
    
    router.push("/Checkout");
  };

  function startCustomBuild(name: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <main className="min-h-screen bg-[#fdf2f3] pb-20 relative">
      {/* HERO SECTION */}
      <section className="bg-white pt-24 pb-16 px-6 text-center border-b border-pink-100">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Ready-to-Ship <br/><span className="text-pink-500 italic font-light capitalize tracking-normal text-4xl md:text-6xl">Luxuries</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-black uppercase text-[10px] tracking-[0.3em] leading-relaxed">
          Curated by our designers. Choose a package to proceed to checkout instantly.
        </p>
      </section>

      {/* PACKAGE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white transition-all hover:-translate-y-2 flex flex-col group">
            <div className={`bg-gradient-to-br ${pkg.color} p-10 text-white relative`}>
              <div className="absolute top-6 right-6 text-white/10 text-7xl group-hover:scale-110 transition-transform">{pkg.icon}</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Exclusive Set</p>
              <h2 className="text-2xl font-black mb-4 relative z-10 leading-tight uppercase tracking-tighter">{pkg.name}</h2>
              <div className="text-4xl font-black flex items-baseline gap-1 relative z-10">
                <span className="text-sm font-bold italic opacity-70">₦</span>{pkg.price}
              </div>
            </div>

            <div className="p-10 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 mb-6 border-b border-pink-50 pb-2">Manifest Contents</p>
              <ul className="space-y-4">
                {pkg.items.slice(0, 7).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-[11px] uppercase tracking-tight">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    {item}
                  </li>
                ))}
                {pkg.items.length > 7 && (
                  <li className="text-[10px] text-gray-400 font-black italic">...and {pkg.items.length - 7} more items</li>
                )}
              </ul>
            </div>

            <div className="p-10 pt-0 mt-auto">
              <button onClick={() => handleSelectPackage(pkg)} className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 transition-all shadow-xl active:scale-95">
                INSTANT PURCHASE <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div className="max-w-4xl mx-auto mt-24 px-6 text-center">
        <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-pink-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300" />
          <FaShoppingBag className="text-pink-500 text-5xl mx-auto mb-6" />
          <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Bespoke Curation?</h3>
          <p className="text-gray-400 font-bold mb-8 uppercase text-xs tracking-widest">Hand-pick every single item for a truly personal gift.</p>
          <button 
            onClick={() => setShowBoxModal(true)}
            className="inline-block bg-pink-500 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-pink-200 shadow-2xl hover:bg-gray-900 transition-all"
          >
            Enter The Atelier
          </button>
        </div>
      </div>

      {/* BOX SELECTION MODAL */}
      {showBoxModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl" onClick={() => setShowBoxModal(false)} />
          
          <div className="bg-white w-full max-w-lg rounded-[4rem] p-10 relative z-10 shadow-2xl border border-white">
            <button onClick={() => setShowBoxModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-pink-500 transition-colors">
              <FaTimes size={24} />
            </button>

            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center uppercase tracking-tighter">Choose Your Vessel</h2>
            <p className="text-gray-400 text-center font-bold text-xs uppercase tracking-widest mb-10">Select your foundation</p>

            <div className="space-y-4">
              {boxTypes.map((box) => (
                <button
                  key={box.name}
                  onClick={() => startCustomBuild(box.name)}
                  className="w-full group flex items-center gap-6 p-6 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-pink-200 hover:bg-white transition-all text-left shadow-sm hover:shadow-xl"
                >
                  <div className="bg-white p-5 rounded-2xl text-pink-500 shadow-inner group-hover:scale-110 transition-transform">
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