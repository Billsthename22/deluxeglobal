"use client";

import { useState, useEffect } from "react";
import { FaBoxOpen, FaArrowLeft, FaShoppingBag, FaUser, FaTruck, FaPhone, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

type Item = { id: number; name: string; image: string };

export default function CheckoutPage() {
  const [selectedBox, setSelectedBox] = useState<string>("");
  const [orderItems, setOrderItems] = useState<Item[]>([]);
  const [loveLetter, setLoveLetter] = useState<string>("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // FIXED KEYS: Matches the landing/build page storage names
    const savedBox = localStorage.getItem("selectedBoxSize"); 
    const savedItems = localStorage.getItem("selectedItems"); // Check your build page storage key
    const savedLetter = localStorage.getItem("loveLetter");

    if (savedBox) {
        // Capitalize the first letter (e.g., "heart" -> "Heart Box")
        const formatted = savedBox.charAt(0).toUpperCase() + savedBox.slice(1);
        setSelectedBox(formatted.includes("Box") ? formatted : `${formatted} Box`);
    }
    
    if (savedItems) setOrderItems(JSON.parse(savedItems));
    if (savedLetter) setLoveLetter(savedLetter);
  }, []);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*NEW CUSTOM ORDER* 🎁%0A%0A` +
      `👤 *Customer:* ${name}%0A` +
      `📞 *Contact:* ${phone}%0A` +
      `📍 *Address:* ${address}%0A%0A` +
      `📦 *Box Type:* ${selectedBox}%0A` +
      `✨ *Items:* ${orderItems.map((i) => i.name).join(", ")}%0A%0A` +
      `📝 *Love Letter:* ${loveLetter || "None"}`;

    const telegramNumber = "2349061511114"; 
    const url = `https://t.me/+${telegramNumber}?text=${message}`;
    
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fdf2f3] p-4 lg:p-12 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: ORDER SUMMARY */}
        <div className="space-y-6">
          <Link href="/Build" className="text-pink-500 font-black uppercase text-[10px] flex items-center gap-2 hover:underline tracking-[0.2em]">
            <FaArrowLeft /> Re-edit Selection
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Review <br/><span className="text-pink-500 font-light italic capitalize tracking-normal">Your Drop</span>
          </h1>

          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-pink-100">
            <h2 className="text-xl font-black flex items-center gap-2 text-gray-900 mb-6 uppercase tracking-tighter">
              <FaShoppingBag className="text-pink-500" /> Selected Package
            </h2>
            
            {/* Box Display */}
            <div className="flex items-center gap-4 bg-pink-50 p-6 rounded-[2rem] mb-6 border border-pink-100 shadow-inner">
              <FaBoxOpen className="text-pink-500 text-3xl" />
              <div>
                <p className="text-[10px] text-pink-400 font-black uppercase tracking-[0.2em]">Vessel Size</p>
                {/* Now properly displays from selectedBoxSize */}
                <p className="font-black text-gray-900 text-xl uppercase tracking-tighter">{selectedBox || "Atelier Box"}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3 mb-8">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Atelier Filling</p>
              <div className="grid grid-cols-1 gap-2">
                {orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl shadow-sm grayscale" />
                        <span className="font-black text-gray-800 text-[10px] uppercase tracking-tight">{item.name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic text-xs p-4">No items selected yet...</p>
                )}
              </div>
            </div>

            {loveLetter && (
              <div className="pt-6 border-t border-gray-100">
                <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest mb-3">Love Letter Content</p>
                <div className="bg-pink-50/20 p-6 rounded-3xl border border-dashed border-pink-200 italic text-gray-700 text-sm leading-relaxed shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">💌</div>
                  "{loveLetter}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT DETAILS */}
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white self-start lg:mt-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-50 rounded-full blur-3xl opacity-50" />

          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter relative z-10">
            Shipping <span className="text-pink-500">&</span> Contact
          </h2>
          
          <form onSubmit={handleFinalSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Client Name</label>
              <div className="relative">
                <FaUser className="absolute left-5 top-5 text-pink-300" />
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-pink-200 focus:bg-white rounded-[1.5rem] outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Telegram Handle or Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-5 top-5 text-pink-300" />
                <input 
                  required
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. @username or 080..."
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-pink-200 focus:bg-white rounded-[1.5rem] outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Delivery Address</label>
              <div className="relative">
                <FaTruck className="absolute left-5 top-5 text-pink-300" />
                <textarea 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, Apartment, City..."
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-pink-200 focus:bg-white rounded-[1.5rem] outline-none transition-all text-gray-900 font-bold h-32 resize-none placeholder:text-gray-300 shadow-inner"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-6 rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-pink-600 transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              SEND ORDER <FaTelegramPlane size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <p className="text-center text-[9px] text-gray-400 font-black uppercase tracking-widest leading-relaxed">
              Order will be finalized on Telegram
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}