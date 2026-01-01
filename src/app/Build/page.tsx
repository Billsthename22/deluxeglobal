"use client";

import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaShoppingBasket, FaTimes, FaBoxOpen, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Item = { id: number; name: string; image: string };

const items: Item[] = [
  { id: 1, name: "Branded Purse", image: "/items/purse.jpg" },
  { id: 2, name: "Glasses", image: "/items/glasses.jpg" },
  { id: 3, name: "Stanley Cup", image: "/items/stanleycup.jpg" },
  { id: 4, name: "Flower Bouquet", image: "/items/flowers.jpg" },
  { id: 5, name: "Teddy Bear", image: "/items/teddy.jpg" },
  { id: 6, name: "Van Cleef Bracelets", image: "/items/bracelets.jpg" },
  { id: 7, name: "Rhode Lip Gloss", image: "/items/lipgloss.jpg" },
  { id: 8, name: "Mini Straightener", image: "/items/ministraightener.jpg" },
  { id: 9, name: "Nova SX 800Q Straightener", image: "/items/straightener.jpg" },
  { id: 10, name: "2-in-1 Towel", image: "/items/towel.jpg" },
  { id: 11, name: "Mini Fan", image: "/items/minifan.jpg" },
  { id: 12, name: "Mini Jewellery Box", image: "/items/jewellerybox.jpg" },
  { id: 13, name: "Journal", image: "/items/journal.jpg" },
  { id: 14, name: "Love Letter", image: "/items/loveletter.jpg" },
  { id: 15, name: "Perfume 3-in-1", image: "/items/perfume.jpg" },
  { id: 16, name: "Influencer LED", image: "/items/led.jpg" },
  { id: 17, name: "Cluster Lashes", image: "/items/lashes.jpg" },
  { id: 18, name: "Customized Charms", image: "/items/charms.jpg" },
  { id: 19, name: "Tripod Stand", image: "/items/tripodstand.jpg" },
  { id: 20, name: "Selfie Stick stand", image: "/items/Selfiestick.jpg" },
];

export default function BuildPageAnimated() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedBox, setSelectedBox] = useState<string>("Standard Box");
  const [comment, setComment] = useState("");
  const [isBasketOpen, setBasketOpen] = useState(false);

  const basketRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const savedBox = localStorage.getItem("selectedGiftBox");
    if (savedBox) {
      setSelectedBox(savedBox);
    }
  }, []);

  const toggleItem = (item: Item, e?: React.MouseEvent<HTMLDivElement>) => {
    if (e && basketRef.current) {
      const img = e.currentTarget.querySelector("img") as HTMLImageElement;
      if (img) {
        const clone = img.cloneNode(true) as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        const basketRect = basketRef.current.getBoundingClientRect();
        
        Object.assign(clone.style, {
          position: "fixed",
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: "1000",
          borderRadius: "50%",
          pointerEvents: "none"
        });

        document.body.appendChild(clone);

        requestAnimationFrame(() => {
          Object.assign(clone.style, {
            left: `${basketRect.left + 10}px`,
            top: `${basketRect.top + 10}px`,
            width: "20px",
            height: "20px",
            opacity: "0"
          });
        });

        clone.addEventListener("transitionend", () => clone.remove());
      }
    }

    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) return;
    localStorage.setItem("orderItems", JSON.stringify(selectedItems));
    localStorage.setItem("orderComment", comment);
    router.push("/Checkout");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-4 lg:p-8">
      
      {/* HEADER & NAVIGATION */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center text-pink-500 hover:text-pink-600 transition-colors gap-2 text-sm font-bold mb-3 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Box Selection
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Curate Your <span className="text-pink-500 italic">Perfect Set</span>
          </h1>
          <p className="text-gray-600 font-medium mt-1">
            Pick your items to fill your <span className="text-pink-600 font-bold underline decoration-pink-200 underline-offset-4">{selectedBox}</span>.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* ITEM GRID */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item) => {
            const isSelected = selectedItems.find((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                onClick={(e) => toggleItem(item, e)}
                className={`group relative cursor-pointer rounded-[2rem] overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white ${
                  isSelected ? "ring-4 ring-pink-500 scale-105" : "hover:ring-2 hover:ring-pink-200"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 sm:h-52 object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-center font-bold text-sm">
                  {item.name}
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 animate-in zoom-in duration-300">
                    <FaCheckCircle className="text-pink-500 text-3xl drop-shadow-lg" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP BASKET PANEL */}
        <div className="hidden lg:flex lg:w-96 sticky top-8 self-start">
          <BasketPanel
            selectedBox={selectedBox}
            selectedItems={selectedItems}
            comment={comment}
            setComment={setComment}
            toggleItem={toggleItem}
            checkout={handleProceedToCheckout}
          />
        </div>
      </div>

      {/* MOBILE BASKET TRIGGER */}
      <button
        ref={basketRef}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-pink-500 text-white p-5 rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-600 active:scale-90 transition-all"
        onClick={() => setBasketOpen(true)}
      >
        <FaShoppingBasket size={24} />
        {selectedItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-pink-600 w-6 h-6 text-xs font-black rounded-full flex items-center justify-center border-2 border-pink-500 shadow-sm">
            {selectedItems.length}
          </span>
        )}
      </button>

      {/* MOBILE OVERLAY BASKET */}
      {isBasketOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-end">
          <div className="w-[85%] max-w-sm bg-white rounded-l-[2.5rem] shadow-2xl p-6 flex flex-col gap-5 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-pink-600 flex items-center gap-2">
                <FaShoppingBasket /> Your Basket
              </h2>
              <button onClick={() => setBasketOpen(false)} className="text-gray-400 p-2 hover:text-pink-500 transition-colors">
                <FaTimes size={24} />
              </button>
            </div>

            <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl text-pink-500 shadow-sm">
                <FaBoxOpen size={24} />
              </div>
              <div>
                <p className="text-[10px] text-pink-400 uppercase font-black tracking-widest mb-1">Packaging</p>
                <p className="font-bold text-gray-800">{selectedBox}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {selectedItems.length === 0 ? (
                <p className="text-gray-400 text-center py-10 italic">Your basket is empty...</p>
              ) : (
                <ul className="space-y-3">
                  {selectedItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-sm font-bold text-gray-700">{item.name}</span>
                      <button onClick={() => toggleItem(item)} className="text-red-400 p-1 font-bold">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Special instructions or color preferences..."
              className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-pink-300 focus:outline-none resize-none h-28 text-sm text-black transition-all"
            />

            <button
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all"
            >
              Proceed to Checkout <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function BasketPanel({ selectedBox, selectedItems, comment, setComment, toggleItem, checkout }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 flex flex-col gap-6 w-full border border-white">
      <div className="flex items-center gap-3 border-b border-pink-50 pb-5">
        <FaShoppingBasket className="text-pink-600 text-3xl" />
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Basket Summary</h2>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-3xl border border-pink-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm text-pink-500">
            <FaBoxOpen size={24} />
          </div>
          <div>
            <p className="text-[10px] text-pink-400 uppercase font-black tracking-widest leading-none mb-1">Selected Container</p>
            <p className="font-extrabold text-gray-800 text-lg">{selectedBox}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
        {selectedItems.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-pink-200 mb-2 flex justify-center"><FaShoppingBasket size={40} /></div>
            <p className="text-gray-400 text-sm font-medium">Your basket is empty.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {selectedItems.map((item: Item) => (
              <li key={item.id} className="flex justify-between items-center group animate-in fade-in slide-in-from-right-4 duration-300">
                <span className="text-gray-700 font-bold group-hover:text-pink-600 transition-colors">{item.name}</span>
                <button
                  onClick={() => toggleItem(item)}
                  className="bg-gray-50 text-gray-300 w-8 h-8 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-pink-50">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Any special notes for your order?"
          className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl p-4 focus:bg-white focus:border-pink-200 focus:outline-none transition-all resize-none h-24 text-sm text-black"
        />
        <button
          onClick={checkout}
          disabled={selectedItems.length === 0}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-5 rounded-[1.5rem] font-black tracking-wide text-lg shadow-xl shadow-pink-100 hover:shadow-pink-200 flex items-center justify-center gap-3 disabled:opacity-30 disabled:shadow-none hover:-translate-y-1 transition-all active:translate-y-0"
        >
          Proceed to Checkout <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}