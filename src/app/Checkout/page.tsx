"use client";

import { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaArrowLeft,
  FaShoppingBag,
  FaUser,
  FaTruck,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import Link from "next/link";

type Item = { id: number; name: string; image: string };

// --- SHARED BOX CONFIGURATION (Must match Landing/Build page) ---
const BOX_TYPES = [
  { id: "heart", name: "Heart Box", limit: 6, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "medium", name: "Medium Box", limit: 12, color: "text-rose-600", bg: "bg-pink-50" },
  { id: "large", name: "Large Box", limit: 20, color: "text-gray-900", bg: "bg-gray-100" },
];

export default function CheckoutPage() {
  // Store the full box object from the array
  const [currentBox, setCurrentBox] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<Item[]>([]);
  const [loveLetter, setLoveLetter] = useState<string>("");

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedBoxName = localStorage.getItem("selectedBoxSize"); 
    const savedItems = localStorage.getItem("orderItems"); 
    const savedLetter = localStorage.getItem("orderComment"); 

    // Find the box data by mapping from the array
    if (savedBoxName) {
      const match = BOX_TYPES.find(b => b.name.toLowerCase() === savedBoxName.toLowerCase());
      setCurrentBox(match || { name: savedBoxName, color: "text-pink-500", bg: "bg-pink-50" });
    }
    
    if (savedItems) setOrderItems(JSON.parse(savedItems));
    if (savedLetter) setLoveLetter(savedLetter);
  }, []);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
🎁 NEW CUSTOM ORDER

👤 Customer: ${name}
📞 Contact: ${phone}
📍 Address: ${address}

📦 Vessel: ${currentBox?.name || "Custom"}
✨ Items: ${orderItems.map((i) => i.name).join(", ")}

📝 Love Letter/Notes:
${loveLetter || "None"}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const telegramUsername = "Deluxegloball";
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;

    window.open(telegramUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fdf2f3] p-4 lg:p-12 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: REVIEW */}
        <div className="space-y-6">
          <Link
            href="/Build"
            className="text-pink-500 font-black uppercase text-[10px] flex items-center gap-2 hover:underline tracking-[0.2em]"
          >
            <FaArrowLeft /> Re-edit Selection
          </Link>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Review <br />
            <span className="text-pink-500 font-light italic capitalize tracking-normal">
              Your Drop
            </span>
          </h1>

          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-pink-100">
            <h2 className="text-xl font-black flex items-center gap-2 text-gray-900 mb-6 uppercase tracking-tighter">
              <FaShoppingBag className="text-pink-500" /> Order Summary
            </h2>

            {/* BOX MAPPING SECTION */}
            <div className={`flex items-center gap-4 ${currentBox?.bg || 'bg-pink-50'} p-6 rounded-[2rem] mb-6 border border-pink-100 shadow-inner transition-colors`}>
              <FaBoxOpen className={`${currentBox?.color || 'text-pink-500'} text-3xl`} />
              <div>
                <p className="text-[10px] text-pink-400 font-black uppercase tracking-[0.2em]">
                  Selected Vessel
                </p>
                <p className={`font-black ${currentBox?.color || 'text-gray-900'} text-xl uppercase tracking-tighter`}>
                  {currentBox?.name || "Custom Box"}
                </p>
                {currentBox?.limit && (
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Capacity: {currentBox.limit} Items Max
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">
                Atelier Filling ({orderItems.length} items)
              </p>
              <div className="grid grid-cols-1 gap-2">
                {orderItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <span className="font-black text-gray-800 text-[10px] uppercase tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {loveLetter && (
              <div className="pt-6 border-t border-gray-100">
                <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest mb-3">
                  Letter / Instructions
                </p>
                <div className="bg-pink-50/20 p-6 rounded-3xl border border-dashed border-pink-200 italic text-gray-700 text-sm">
                  “{loveLetter}”
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white self-start lg:mt-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
            Shipping <span className="text-pink-500">&</span> Contact
          </h2>

          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Client Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-5 top-5 text-pink-300" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 font-bold outline-none focus:ring-2 ring-pink-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Telegram / Phone
              </label>
              <div className="relative">
                <FaPhone className="absolute left-5 top-5 text-pink-300" />
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="@username or number"
                  className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 font-bold outline-none focus:ring-2 ring-pink-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Delivery Address
              </label>
              <div className="relative">
                <FaTruck className="absolute left-5 top-5 text-pink-300" />
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State"
                  className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 font-bold h-32 outline-none focus:ring-2 ring-pink-100 transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-6 rounded-full font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-pink-600 transition-all shadow-xl active:scale-95"
            >
              SEND ORDER <FaTelegramPlane />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}