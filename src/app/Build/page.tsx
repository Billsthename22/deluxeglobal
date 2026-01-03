"use client";

import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaShoppingBasket, FaTimes, FaBoxOpen, FaArrowLeft, FaArrowRight, FaPenNib } from "react-icons/fa";
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
  const [selectedBox, setSelectedBox] = useState<string>("Standard Box");
  const [comment, setComment] = useState("");
  const [loveLetter, setLoveLetter] = useState("");
  const [isBasketOpen, setBasketOpen] = useState(false);

  const [flowerModalOpen, setFlowerModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [tempItem, setTempItem] = useState<Item | null>(null);

  const basketRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const savedBox = localStorage.getItem("selectedGiftBox");
    if (savedBox) setSelectedBox(savedBox);
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
      const newItem = { ...tempItem, name: `${tempItem.name} (${roses} Roses)` };
      setSelectedItems([...selectedItems, newItem]);
      setFlowerModalOpen(false);
      setTempItem(null);
    }
  };

  const saveLoveLetter = () => {
    if (tempItem && loveLetter.trim()) {
      // Ensure we don't add duplicate ID if editing
      const filtered = selectedItems.filter(i => i.id !== tempItem.id);
      setSelectedItems([...filtered, tempItem]);
      setLetterModalOpen(false);
      setTempItem(null);
    }
  };

  const processAnimation = (e?: React.MouseEvent) => {
    if (e && (basketRef.current || window.innerWidth > 1024)) {
      const target = e.currentTarget as HTMLElement;
      const img = target.querySelector("img");
      if (img) {
        const clone = img.cloneNode(true) as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        const basketElem = basketRef.current || document.getElementById('basket-header');
        const basketRect = basketElem?.getBoundingClientRect();

        if (basketRect) {
          Object.assign(clone.style, {
            position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`,
            width: `${rect.width}px`, height: `${rect.height}px`,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)", zIndex: "1000",
            borderRadius: "50%", pointerEvents: "none", opacity: "0.8"
          });
          document.body.appendChild(clone);
          requestAnimationFrame(() => {
            Object.assign(clone.style, {
              left: `${basketRect.left + 20}px`, top: `${basketRect.top + 20}px`,
              width: "20px", height: "20px", opacity: "0", transform: "rotate(360deg)"
            });
          });
          clone.addEventListener("transitionend", () => clone.remove());
        }
      }
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) return;
    localStorage.setItem("orderItems", JSON.stringify(selectedItems));
    localStorage.setItem("orderComment", comment);
    localStorage.setItem("loveLetter", loveLetter);
    router.push("/Checkout");
  };

  return (
    <main className="min-h-screen bg-pink-50 p-4 lg:p-12 relative">
      <div className="max-w-7xl mx-auto mb-10">
        <Link href="/" className="text-pink-500 font-bold flex items-center gap-2 hover:underline mb-4">
          <FaArrowLeft /> Change Box Type
        </Link>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Fill Your <span className="text-pink-500 uppercase">{selectedBox}</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const isSelected = selectedItems.find((i) => i.id === item.id);
            return (
              <div
                key={`grid-${item.id}`}
                onClick={(e) => toggleItem(item, e)}
                className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden shadow-lg transition-all bg-white border-4 ${
                  isSelected ? "border-pink-500 scale-105" : "border-white hover:border-pink-100"
                }`}
              >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <p className="font-black text-gray-800 text-sm">{item.name}</p>
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

        <div className="hidden lg:block w-96 sticky top-10 self-start">
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-pink-100">
            <div id="basket-header" className="flex items-center gap-3 mb-6">
              <FaShoppingBasket className="text-pink-500 text-2xl" />
              <h2 className="text-2xl font-black text-gray-900">Your Basket</h2>
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 mb-6">
              {selectedItems.map((item, index) => (
                <div key={`basket-${item.id}-${index}`} className="bg-pink-50/50 p-4 rounded-2xl border border-pink-50">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                    <button onClick={() => toggleItem(item)} className="text-red-400 font-black">✕</button>
                  </div>
                  {(item.id === 13 || item.id === 14) && loveLetter && (
                    <button 
                      onClick={() => { setTempItem(item); setLetterModalOpen(true); }}
                      className="mt-2 text-[10px] text-pink-500 font-bold uppercase flex items-center gap-1 hover:underline"
                    >
                      <FaPenNib /> Edit Letter
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className="w-full bg-pink-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl"
            >
              Checkout <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>

      {letterModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[210] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-8 md:p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-100 p-3 rounded-2xl text-pink-500 text-2xl"><FaPenNib /></div>
              <h2 className="text-2xl font-black text-gray-900 uppercase">Write Your Letter</h2>
            </div>
            <textarea
              value={loveLetter}
              onChange={(e) => setLoveLetter(e.target.value)}
              placeholder="Start writing your love letter here..."
              className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-[2rem] p-6 text-gray-800 font-medium outline-none h-64 resize-none transition-all"
            />
            <div className="flex gap-4 mt-8">
              <button onClick={() => setLetterModalOpen(false)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black text-gray-400">CANCEL</button>
              <button onClick={saveLoveLetter} disabled={!loveLetter.trim()} className="flex-2 bg-pink-500 text-white px-8 py-4 rounded-2xl font-black">SAVE LETTER</button>
            </div>
          </div>
        </div>
      )}

      {flowerModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300 text-center">
            <div className="text-5xl mb-4">🌹</div>
            <h2 className="text-3xl font-black text-gray-900 mb-8">Flower Size</h2>
            <div className="space-y-4">
              <button onClick={() => handleFlowerChoice(15)} className="w-full bg-pink-50 border-2 border-pink-200 p-6 rounded-3xl font-black text-pink-600">15 Roses</button>
              <button onClick={() => handleFlowerChoice(20)} className="w-full bg-gray-900 p-6 rounded-3xl font-black text-white">20 Roses</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}