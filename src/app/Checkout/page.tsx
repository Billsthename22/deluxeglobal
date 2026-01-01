"use client";

import { useState, useEffect } from "react";
import { FaBoxOpen, FaArrowLeft, FaShoppingBag, FaUser, FaTruck, FaPhone } from "react-icons/fa";
import Link from "next/link";

type Item = { id: number; name: string; image: string };

export default function CheckoutPage() {
  const [selectedBox, setSelectedBox] = useState<string>("");
  const [orderItems, setOrderItems] = useState<Item[]>([]);
  const [orderComment, setOrderComment] = useState<string>("");

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage
    const savedBox = localStorage.getItem("selectedGiftBox");
    const savedItems = localStorage.getItem("orderItems");
    const savedComment = localStorage.getItem("orderComment");

    if (savedBox) setSelectedBox(savedBox);
    if (savedItems) setOrderItems(JSON.parse(savedItems));
    if (savedComment) setOrderComment(savedComment);
  }, []);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final Message Construction
    const message = `*NEW CUSTOM ORDER* 🎁%0A%0A` +
      `👤 *Customer:* ${name}%0A` +
      `📞 *Phone:* ${phone}%0A` +
      `📍 *Address:* ${address}%0A%0A` +
      `📦 *Box Type:* ${selectedBox}%0A` +
      `✨ *Items:* ${orderItems.map((i) => i.name).join(", ")}%0A%0A` +
      `📝 *Notes:* ${orderComment || "None"}`;

    const whatsappNumber = "2349155581053";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-pink-50 p-4 lg:p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: ORDER SUMMARY */}
        <div className="space-y-6">
          <Link href="/build" className="text-pink-500 font-bold flex items-center gap-2 hover:underline">
            <FaArrowLeft /> Edit Your Selection
          </Link>
          
          <h1 className="text-3xl font-black text-gray-900">Review Your Order</h1>

          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-pink-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-pink-600 mb-4">
              <FaShoppingBag /> Selected Items
            </h2>
            
            {/* Box Display */}
            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-2xl mb-4 border border-pink-100">
              <FaBoxOpen className="text-pink-500 text-2xl" />
              <div>
                <p className="text-xs text-pink-400 font-black uppercase">Gift Packaging</p>
                <p className="font-bold text-gray-800">{selectedBox}</p>
              </div>
            </div>

            {/* Items List */}
            <ul className="space-y-3 mb-6">
              {orderItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <span className="font-bold text-gray-700">{item.name}</span>
                </li>
              ))}
            </ul>

            {orderComment && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-black uppercase mb-1">Your Special Notes</p>
                <p className="text-black bg-gray-50 p-3 rounded-xl italic font-medium">"{orderComment}"</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT DETAILS */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white self-start">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
            Delivery Details
          </h2>
          
          <form onSubmit={handleFinalSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-black text-gray-500 uppercase mb-2 ml-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-pink-300" />
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white rounded-2xl outline-none transition-all text-black font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-500 uppercase mb-2 ml-1">WhatsApp Number</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-pink-300" />
                <input 
                  required
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 09061511114"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white rounded-2xl outline-none transition-all text-black font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-500 uppercase mb-2 ml-1">Delivery Address</label>
              <div className="relative">
                <FaTruck className="absolute left-4 top-4 text-pink-300" />
                <textarea 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, City, State"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white rounded-2xl outline-none transition-all text-black font-bold h-32"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-pink-100 hover:shadow-pink-200 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3"
            >
              Confirm Order <FaShoppingBag />
            </button>
            <p className="text-center text-xs text-gray-400 font-medium">
              Clicking "Confirm" will send your order details to us on WhatsApp to finalize payment.
            </p>
          </form>
        </div>

      </div>
    </main>
  );
}