"use client";

import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaShoppingBasket, FaArrowLeft, FaArrowRight, FaEdit, FaPenFancy } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Item = { id: number; name: string; image: string; letter?: string };

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
  { id: 14, name: "Perfume 3-in-1", image: "/items/perfume.jpg" },
  { id: 15, name: "Influencer LED", image: "/items/led.jpg" },
  { id: 16, name: "Cluster Lashes", image: "/items/cluster.jpg" },
  { id: 17, name: "Customized Charms", image: "/items/charms.jpg" },
  { id: 18, name: "Selfie Stick stand", image: "/items/Selfiestick.jpg" },
  { id: 19, name: "Wall LED light", image: "/items/wall-led.jpg" },
  { id: 20, name: "Face Mask", image: "/items/facemask.jpg" },
  { id: 21, name: "Bloomer Shorts", image: "/items/shorts.jpg" },
  { id: 22, name: "Money Box", image: "/items/moneybox.jpg" },
];

export default function BuildPage() {
  const router = useRouter();
  const basketRef = useRef<HTMLButtonElement | null>(null);

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedBox, setSelectedBox] = useState<string>("Standard Box");
  const [comment, setComment] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal States
  const [flowerModalOpen, setFlowerModalOpen] = useState(false);
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const [tempFlowerItem, setTempFlowerItem] = useState<Item | null>(null);
  const [letterText, setLetterText] = useState("");

  useEffect(() => {
    const savedItems = localStorage.getItem("orderItems");
    const savedBox = localStorage.getItem("selectedBoxSize");
    const savedComment = localStorage.getItem("orderComment");

    if (savedItems) setSelectedItems(JSON.parse(savedItems));
    if (savedBox) setSelectedBox(savedBox);
    if (savedComment) setComment(savedComment);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("orderItems", JSON.stringify(selectedItems));
      localStorage.setItem("orderComment", comment);
    }
  }, [selectedItems, comment, isLoaded]);

  const toggleItem = (item: Item, e?: React.MouseEvent) => {
    const exists = selectedItems.find((i) => i.id === item.id);

    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
      return;
    }

    if (item.id === 4) {
      setTempFlowerItem(item);
      setFlowerModalOpen(true);
      return;
    }

    // Journal Case
    if (item.id === 13) {
      setJournalModalOpen(true);
      return;
    }

    processAnimation(e);
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleJournalSubmit = () => {
    const journalItem = items.find(i => i.id === 13);
    if (journalItem) {
      const newItem = { ...journalItem, letter: letterText };
      setSelectedItems(prev => [...prev, newItem]);
    }
    setJournalModalOpen(false);
    setLetterText("");
  };

  const handleEditLetter = (id: number) => {
    const itemToEdit = selectedItems.find(i => i.id === id);
    if (itemToEdit) {
      setLetterText(itemToEdit.letter || "");
      // Remove temporarily so it can be "re-added" with new text
      setSelectedItems(prev => prev.filter(i => i.id !== id));
      setJournalModalOpen(true);
    }
  };

  const handleFlowerChoice = (roses: number) => {
    if (!tempFlowerItem) return;
    const newItem = { 
        ...tempFlowerItem, 
        id: Date.now(), 
        name: `${tempFlowerItem.name} (${roses} Scented Roses)` 
    };
    setSelectedItems((prev) => [...prev, newItem]);
    setFlowerModalOpen(false);
  };

  const processAnimation = (e?: React.MouseEvent) => {
    if (!e || !basketRef.current) return;
    const img = (e.currentTarget as HTMLElement).querySelector("img");
    if (!img) return;

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
      pointerEvents: "none",
    });

    document.body.appendChild(clone);
    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        left: `${basketRect.left + 20}px`,
        top: `${basketRect.top + 20}px`,
        width: "20px",
        height: "20px",
        opacity: "0",
      });
    });
    clone.addEventListener("transitionend", () => clone.remove());
  };

  return (
    <main className="min-h-screen bg-pink-50 p-4 lg:p-12 relative overflow-x-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <Link href="/" className="text-pink-500 font-bold flex items-center gap-2 hover:underline mb-4">
          <FaArrowLeft /> Change Box Type
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Fill Your <span className="text-pink-500 uppercase">{selectedBox}</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* ITEM GRID */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const isSelected = selectedItems.some((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                onClick={(e) => toggleItem(item, e)}
                className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-300 bg-white border-4 ${
                  isSelected ? "border-pink-500 scale-105" : "border-white hover:border-pink-200"
                }`}
              >
                <div className="relative h-48 w-full">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center">
                  <p className="font-black text-gray-800 text-sm leading-tight">{item.name}</p>
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

        {/* SIDEBAR BASKET */}
        <div className="hidden lg:block w-96 sticky top-10 self-start">
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-pink-100">
            <div className="flex items-center gap-3 mb-6">
              <FaShoppingBasket className="text-pink-500 text-2xl" />
              <h2 className="text-2xl font-black text-gray-900">Your Basket</h2>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6 custom-scrollbar">
              {selectedItems.length === 0 ? (
                <p className="text-gray-400 text-center py-10 italic">Empty basket...</p>
              ) : (
                selectedItems.map((item) => (
                  <div key={item.id} className="bg-pink-50/50 p-4 rounded-2xl border border-pink-50">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                        <button onClick={() => toggleItem(item)} className="text-red-300 hover:text-red-500">✕</button>
                    </div>
                    {item.id === 13 && (
                        <button 
                            onClick={() => handleEditLetter(item.id)}
                            className="mt-2 text-[10px] flex items-center gap-1 text-pink-500 font-black hover:underline uppercase"
                        >
                            <FaEdit /> Edit Letter
                        </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Special instructions..."
              className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-200 rounded-2xl p-4 text-sm font-bold text-black outline-none h-24 mb-6"
            />

            <button
              onClick={() => router.push("/Checkout")}
              disabled={selectedItems.length === 0}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-pink-200"
            >
              Checkout <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* JOURNAL MODAL */}
      {journalModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-xl w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 text-3xl">
                    <FaPenFancy />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">Hand-written Letter</h2>
                    <p className="text-gray-500 font-bold text-sm">Included with your Journal selection.</p>
                </div>
            </div>
            
            <div className="relative">
                <textarea 
                    value={letterText}
                    onChange={(e) => setLetterText(e.target.value)}
                    placeholder="Dearest... I wanted to let you know that..."
                    className="w-full h-64 bg-amber-50/30 border-2 border-amber-100 rounded-[2rem] p-8 text-gray-800 font-medium leading-relaxed italic placeholder:text-gray-300 outline-none focus:border-pink-200 transition-all resize-none shadow-inner"
                />
                <div className="absolute bottom-6 right-8 text-[10px] font-black text-amber-200 uppercase tracking-widest">Atelier Stationery</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <button 
                    onClick={() => { setJournalModalOpen(false); setLetterText(""); }}
                    className="py-5 rounded-2xl font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                >
                    Discard
                </button>
                <button 
                    onClick={handleJournalSubmit}
                    className="bg-pink-500 hover:bg-pink-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-pink-100 transition-all active:scale-95"
                >
                    Save to Journal
                </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOWER MODAL */}
      {flowerModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-6">
           <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300 text-center">
            <div className="text-5xl mb-4">🌹</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Flower Size</h2>
            <div className="space-y-4 mt-6">
              <button onClick={() => handleFlowerChoice(15)} className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 p-6 rounded-3xl transition-all">
                <span className="block text-2xl font-black text-pink-600">15 Roses</span>
              </button>
              <button onClick={() => handleFlowerChoice(20)} className="w-full bg-gray-900 hover:bg-black p-6 rounded-3xl transition-all">
                <span className="block text-2xl font-black text-white">20 Roses</span>
              </button>
            </div>
            <button onClick={() => setFlowerModalOpen(false)} className="mt-8 text-gray-400 font-black hover:text-red-500">CANCEL</button>
          </div>
        </div>
      )}

      {/* MOBILE BASKET TRIGGER */}
      <button
        ref={basketRef}
        className="lg:hidden fixed bottom-8 right-8 bg-pink-500 text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all"
      >
        <FaShoppingBasket size={30} />
      </button>
    </main>
  );
}