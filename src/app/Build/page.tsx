"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FaCheckCircle, 
  FaShoppingBasket, 
  FaTimes, 
  FaBoxOpen, 
  FaArrowLeft, 
  FaArrowRight, 
  FaPenNib 
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Item = { id: number; name: string; image: string };

const items: Item[] = [
  { id: 1, name: "Branded Purse", image: "/items/purse.jpg" },
  { id: 2, name: "Glasses", image: "/items/glasses.jpg" },
  { id: 3, name: "Stanley Cup", image: "/items/stanleycup.jpg" },
  { id: 4, name: "Flower Bouquet", image: "/items/flowers.jpg" },
  { id: 5, name: "Teddy Bear", image: "/items/teddy.jpg" },
  { id: 6, name: "Van Cleef Bracelets", image: "/items/Vancleef.jpg" },
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
  { id: 17, name: "Cluster Lashes", image: "/items/cluster.jpg" },
  { id: 18, name: "Customized Charms", image: "/items/charms.jpg" },
  { id: 19, name: "Selfie Stick stand", image: "/items/Selfiestick.jpg" },
  { id: 20, name: "Wall LED light", image: "/items/Selfiestick.jpg" },
  { id: 21, name: "Face Mask", image: "/items/Selfiestick.jpg" },
  { id: 22, name: "Bloomer Shorts", image: "/items/Selfiestick.jpg" },
  { id: 23, name: "Money Box", image: "/items/moneybox.jpg" },
];

export default function BuildPage() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedBox, setSelectedBox] = useState<string>("Box");
  const [loveLetter, setLoveLetter] = useState("");
  const [isBasketOpen, setBasketOpen] = useState(false); 
  
  const [flowerModalOpen, setFlowerModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [tempItem, setTempItem] = useState<Item | null>(null);

  useEffect(() => {
    const savedBox = localStorage.getItem("selectedBoxSize");
    if (savedBox) {
      const formatted = savedBox.charAt(0).toUpperCase() + savedBox.slice(1);
      setSelectedBox(formatted.toLowerCase().includes("box") ? formatted : `${formatted} Box`);
    }
  }, []);

  const toggleItem = (item: Item, e?: React.MouseEvent) => {
    const isAlreadySelected = selectedItems.find((i) => i.id === item.id);

    if (isAlreadySelected) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
      if (item.id === 13 || item.id === 14) setLoveLetter(""); 
      return;
    }

    if (item.id === 4) {
      setTempItem(item);
      setFlowerModalOpen(true);
      return;
    }

    if (item.id === 13 || item.id === 14) {
      setTempItem(item);
      setLetterModalOpen(true);
      return;
    }

    processAnimation(e);
    setSelectedItems([...selectedItems, item]);
  };

  const handleFlowerChoice = (roses: number) => {
    if (tempItem) {
      // If editing an existing bouquet, replace it
      const filtered = selectedItems.filter(i => i.id !== 4);
      const newItem = { ...tempItem, name: `Flower Bouquet (${roses} Roses)` };
      setSelectedItems([...filtered, newItem]);
      setFlowerModalOpen(false);
      setTempItem(null);
    }
  };

  const saveLoveLetter = () => {
    if (tempItem && loveLetter.trim()) {
      // If editing an existing letter/journal, update it
      const filtered = selectedItems.filter(i => i.id !== tempItem.id);
      setSelectedItems([...filtered, tempItem]);
      setLetterModalOpen(false);
      setTempItem(null);
    }
  };

  const processAnimation = (e?: React.MouseEvent) => {
    if (e) {
      const target = e.currentTarget as HTMLElement;
      const img = target.querySelector("img");
      const basketElem = document.getElementById('mobile-basket-btn') || document.getElementById('basket-header');
      
      if (img && basketElem) {
        const clone = img.cloneNode(true) as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        const basketRect = basketElem.getBoundingClientRect();

        Object.assign(clone.style, {
          position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`,
          width: `${rect.width}px`, height: `${rect.height}px`,
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)", zIndex: "1000",
          borderRadius: "50%", pointerEvents: "none", opacity: "0.8"
        });
        
        document.body.appendChild(clone);
        requestAnimationFrame(() => {
          Object.assign(clone.style, {
            left: `${basketRect.left + 10}px`, top: `${basketRect.top + 10}px`,
            width: "20px", height: "20px", opacity: "0", transform: "rotate(360deg)"
          });
        });
        clone.addEventListener("transitionend", () => clone.remove());
      }
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 p-4 lg:p-12 pb-24 lg:pb-12 relative">
      
      {/* MOBILE BASKET BUTTON */}
      <button 
        id="mobile-basket-btn"
        onClick={() => setBasketOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-[150] bg-pink-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
      >
        <div className="relative">
          <FaShoppingBasket size={24} />
          {selectedItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-pink-500 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {selectedItems.length}
            </span>
          )}
        </div>
      </button>

      <div className="max-w-7xl mx-auto mb-10">
        <Link href="/" className="text-pink-500 font-bold flex items-center gap-2 hover:underline mb-4 uppercase text-xs">
          <FaArrowLeft /> Change Box Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
          Fill Your <span className="text-pink-500">{selectedBox}</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* ITEM GRID */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const isSelected = selectedItems.find((i) => i.id === item.id);
            return (
              <div
                key={`grid-${item.id}`}
                onClick={(e) => toggleItem(item, e)}
                className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden shadow-lg transition-all bg-white border-4 ${
                  isSelected ? "border-pink-500 scale-105 shadow-pink-100" : "border-white hover:border-pink-100"
                }`}
              >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <p className="font-black text-gray-800 text-[10px] uppercase tracking-widest leading-tight">{item.name}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg">
                    <FaCheckCircle size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP SIDEBAR BASKET */}
        <div className="hidden lg:block w-96 sticky top-10 self-start">
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-pink-100">
            <div id="basket-header" className="flex items-center gap-3 mb-6">
              <FaShoppingBasket className="text-pink-500 text-2xl" />
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Atelier</h2>
            </div>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 mb-6">
              {selectedItems.length === 0 ? (
                <p className="text-gray-400 font-black text-xs uppercase tracking-widest text-center py-10 opacity-40">Your box is empty</p>
              ) : (
                selectedItems.map((item, index) => (
                  <div key={`basket-${item.id}-${index}`} className="bg-pink-50/50 p-4 rounded-2xl border border-pink-50">
                    <div className="flex justify-between items-start">
                      <span className="font-black text-gray-800 text-[10px] uppercase tracking-tighter leading-none">{item.name}</span>
                      <button onClick={() => toggleItem(item)} className="text-pink-400 hover:text-red-500 transition-colors">✕</button>
                    </div>
                    {/* RESTORED EDITING FEATURE */}
                    {(item.id === 4 || item.id === 13 || item.id === 14) && (
                      <button 
                        onClick={() => {
                          setTempItem(item);
                          if (item.id === 4) setFlowerModalOpen(true);
                          else setLetterModalOpen(true);
                        }}
                        className="mt-2 text-[9px] font-black text-pink-500 flex items-center gap-1 uppercase tracking-widest hover:underline"
                      >
                        <FaPenNib size={10} /> Edit {item.id === 4 ? "Roses" : "Letter"}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => router.push("/Checkout")}
              disabled={selectedItems.length === 0}
              className="w-full bg-pink-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-pink-600 transition-colors uppercase tracking-widest"
            >
              Checkout <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE BASKET DRAWER */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBasketOpen(false)} />
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-pink-50 pb-4">
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Your Box</h2>
               <button onClick={() => setBasketOpen(false)} className="text-gray-400"><FaTimes size={24}/></button>
            </div>
            <div className="space-y-3 max-h-[40vh] overflow-y-auto mb-6">
                {selectedItems.map((item) => (
                  <div key={item.id} className="p-4 bg-pink-50 rounded-2xl flex flex-col">
                    <div className="flex justify-between items-center">
                        <span className="font-black text-gray-800 text-[10px] uppercase">{item.name}</span>
                        <button onClick={() => toggleItem(item)} className="text-red-500 font-black text-xs">Remove</button>
                    </div>
                    {/* EDIT IN MOBILE DRAWER */}
                    {(item.id === 4 || item.id === 13 || item.id === 14) && (
                      <button 
                        onClick={() => {
                          setBasketOpen(false);
                          setTempItem(item);
                          if (item.id === 4) setFlowerModalOpen(true);
                          else setLetterModalOpen(true);
                        }}
                        className="mt-2 text-[9px] font-black text-pink-500 uppercase flex items-center gap-1"
                      >
                         <FaPenNib /> Edit Content
                      </button>
                    )}
                  </div>
                ))}
            </div>
            <button onClick={() => router.push("/Checkout")} className="w-full bg-pink-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest">
              Confirm Order
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      {flowerModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl text-center">
            <div className="text-5xl mb-4">🌹</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase">Roses</h2>
            <div className="space-y-4 mt-8">
              <button onClick={() => handleFlowerChoice(15)} className="w-full bg-pink-50 border-2 border-pink-100 p-6 rounded-3xl font-black text-pink-500 uppercase text-xs">15 Roses</button>
              <button onClick={() => handleFlowerChoice(25)} className="w-full bg-gray-900 p-6 rounded-3xl font-black text-white uppercase text-xs">25 Roses</button>
              <button onClick={() => { setFlowerModalOpen(false); setTempItem(null); }} className="text-gray-400 font-black uppercase text-[10px] tracking-widest mt-4">Close</button>
            </div>
          </div>
        </div>
      )}

      {letterModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-8 md:p-10 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-4 tracking-tighter">Handwritten Letter</h2>
            <textarea
              value={loveLetter}
              onChange={(e) => setLoveLetter(e.target.value)}
              placeholder="Start writing..."
              className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-[2rem] p-6 text-gray-800 outline-none h-64 resize-none font-medium"
            />
            <div className="flex gap-4 mt-8">
              <button onClick={() => { setLetterModalOpen(false); setTempItem(null); }} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black uppercase text-[10px]">Cancel</button>
              <button onClick={saveLoveLetter} disabled={!loveLetter.trim()} className="flex-[2] bg-pink-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] disabled:opacity-50">Save Selection</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}