"use client";

import { useState } from "react";
import { FaGem, FaHeart, FaStar, FaArrowRight, FaCheckCircle, FaShoppingBag, FaTimes, FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const packages = [
  {
    id: "premium-heart",
    name: "The 100k Heart Collection",
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
    name: "The 60k Romance Set",
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

// Updated Box Options
const boxTypes = [
  { name: "Heart Box", icon: <FaHeart />, desc: "Romantic heart-shaped packaging" },
  { name: "Medium Box", icon: <FaBoxOpen />, desc: "Perfect for 4-6 luxury items" },
  { name: "Large Box", icon: <FaGem />, desc: "Spacious enough for all-in-one sets" },
];

export default function ShopPage() {
  const router = useRouter();
  const [showBoxModal, setShowBoxModal] = useState(false);

  const handleSelectPackage = (pkg: typeof packages[0]) => {
    const formattedItems = pkg.items.map((name, index) => ({
      id: Date.now() + index,
      name: name,
      image: "/items/package-item.jpg" 
    }));

    localStorage.setItem("selectedGiftBox", pkg.name);
    localStorage.setItem("orderItems", JSON.stringify(formattedItems));
    localStorage.setItem("orderComment", `Ordered ${pkg.name} directly from Shop.`);
    router.push("/Checkout");
  };

  const startCustomBuild = (boxName: string) => {
    localStorage.setItem("selectedGiftBox", boxName);
    localStorage.removeItem("orderItems"); 
    router.push("/Build");
  };

  return (
    <main className="min-h-screen bg-pink-50 pb-20 relative">
      
      {/* HERO SECTION */}
      <section className="bg-white pt-16 pb-12 px-6 text-center border-b border-pink-100">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Ready-to-Ship <span className="text-pink-500 italic">Luxuries</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">
          Expertly curated sets designed to impress. Choose a package below to proceed to checkout instantly.
        </p>
      </section>

      {/* PACKAGE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-[1.02] flex flex-col">
            <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white relative`}>
              <div className="absolute top-6 right-6 text-white/20 text-6xl">{pkg.icon}</div>
              <h2 className="text-2xl font-black mb-1 relative z-10">{pkg.name}</h2>
              <div className="text-3xl font-black flex items-baseline gap-1 relative z-10">
                <span className="text-sm font-bold italic">₦</span>{pkg.price}
              </div>
            </div>

            <div className="p-8 flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-4">What's Inside</p>
              <ul className="space-y-3">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-bold text-sm">
                    <FaCheckCircle className="text-pink-500 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <button onClick={() => handleSelectPackage(pkg)} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors shadow-lg active:scale-95">
                Buy This Package <FaArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div className="max-w-3xl mx-auto mt-20 px-6 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-pink-100">
          <FaShoppingBag className="text-pink-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-black text-gray-900 mb-2">Want something unique?</h3>
          <p className="text-gray-500 font-bold mb-6">Start from scratch and build your own custom gift box!</p>
          <button 
            onClick={() => setShowBoxModal(true)}
            className="inline-block bg-pink-500 text-white px-10 py-4 rounded-2xl font-black shadow-pink-200 shadow-xl hover:-translate-y-1 transition-all"
          >
            Build Custom Box
          </button>
        </div>
      </div>

      {/* UPDATED MODAL WITH HEART, MEDIUM, LARGE OPTIONS */}
      {showBoxModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowBoxModal(false)} />
          
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-8 relative z-10 shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowBoxModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">Choose Your Box</h2>
            <p className="text-gray-500 text-center font-bold mb-8">Select the foundation for your gift set</p>

            <div className="space-y-4">
              {boxTypes.map((box) => (
                <button
                  key={box.name}
                  onClick={() => startCustomBuild(box.name)}
                  className="w-full group flex items-center gap-5 p-5 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-pink-300 hover:bg-pink-50 transition-all text-left"
                >
                  <div className="bg-white p-4 rounded-2xl text-pink-500 shadow-sm group-hover:scale-110 transition-transform">
                    {box.icon}
                  </div>
                  <div>
                    <p className="font-black text-gray-800 text-lg">{box.name}</p>
                    <p className="text-sm text-gray-500 font-medium">{box.desc}</p>
                  </div>
                  <FaArrowRight className="ml-auto text-pink-200 group-hover:text-pink-500 transition-colors" />
                </button>
              ))}
            </div>
            
            <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest mt-8">
              Deluxe Global Luxury Packaging
            </p>
          </div>
        </div>
      )}
    </main>
  );
}