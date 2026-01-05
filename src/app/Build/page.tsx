"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FaCheckCircle, 
  FaShoppingBasket, 
  FaArrowLeft, 
  FaArrowRight, 
  FaEdit, 
  FaPenFancy, 
  FaTimes 
} from "react-icons/fa";
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

  const [isBasketOpen, setIsBasketOpen] = useState(false);
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
    if (item.id === 4) { setTempFlowerItem(item); setFlowerModalOpen(true); return; }
    if (item.id === 13) { setJournalModalOpen(true); return; }
    processAnimation(e);
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleJournalSubmit = () => {
    const journalItem = items.find(i => i.id === 13);
    if (journalItem) {
      setSelectedItems(prev => [...prev, { ...journalItem, letter: letterText }]);
    }
    setJournalModalOpen(false);
    setLetterText("");
  };

  const handleEditLetter = (id: number) => {
    const itemToEdit = selectedItems.find(i => i.id === id);
    if (itemToEdit) {
      setLetterText(itemToEdit.letter || "");
      setSelectedItems(prev => prev.filter(i => i.id !== id));
      setJournalModalOpen(true);
    }
  };

  const handleFlowerChoice = (roses: number) => {
    if (!tempFlowerItem) return;
    const newItem = { ...tempFlowerItem, id: Date.now(), name: `${tempFlowerItem.name} (${roses} Roses)` };
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
      position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)", zIndex: "1000", borderRadius: "50%", pointerEvents: "none",
    });
    document.body.appendChild(clone);
    requestAnimationFrame(() => {
      Object.assign(clone.style, { left: `${basketRect.left + 20}px`, top: `${basketRect.top + 20}px`, width: "20px", height: "20px", opacity: "0" });
    });
    clone.addEventListener("transitionend", () => clone.remove());
  };

  return (
    <main className="min-h-screen bg-[#fafafa] p-4 lg:p-12 relative overflow-x-hidden">
      
      {/* MINIMAL STICKY HEADER */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-pink-100 p-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-pink-500 tracking-widest">
                The Atelier Box
            </span>
            <button 
                onClick={() => router.push("/Checkout")}
                disabled={selectedItems.length === 0}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-pink-600 transition-colors disabled:opacity-20"
            >
                Checkout <FaArrowRight size={10} />
            </button>
        </div>
      </div>

      {/* HEADER CONTENT */}
      <div className="max-w-7xl mx-auto mb-8 mt-16 lg:mt-20">
        <Link href="/" className="text-pink-500 font-black uppercase text-[9px] tracking-[0.2em] flex items-center gap-2 mb-2">
          <FaArrowLeft /> Change Box
        </Link>
        <h1 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-tight">
          Fill Your <br/>
          <span className="text-pink-500 italic font-light capitalize tracking-normal">{selectedBox}</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* ITEM GRID - 2 columns on mobile, Portrait style */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {items.map((item) => {
            const isSelected = selectedItems.some((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                onClick={(e) => toggleItem(item, e)}
                className={`group relative cursor-pointer rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-300 bg-white border ${
                  isSelected ? "border-pink-500 ring-2 ring-pink-500/20" : "border-gray-100 hover:border-pink-200"
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   {isSelected && (
                      <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center backdrop-blur-[1px]">
                         <div className="bg-white text-pink-500 p-2 rounded-full shadow-lg scale-110">
                            <FaCheckCircle size={16} />
                         </div>
                      </div>
                   )}
                </div>
                <div className="p-3 bg-white">
                  <p className="font-bold text-gray-800 text-[10px] md:text-xs uppercase tracking-tight text-center truncate px-1">
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block w-96 sticky top-28 self-start">
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-pink-100">
             <BasketUI 
                selectedItems={selectedItems} 
                toggleItem={toggleItem} 
                handleEditLetter={handleEditLetter}
                comment={comment}
                setComment={setComment}
                onCheckout={() => router.push("/Checkout")}
             />
          </div>
        </div>
      </div>

      {/* MOBILE BASKET DRAWER */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-[500] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsBasketOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Your Bag</h2>
              <button onClick={() => setIsBasketOpen(false)} className="text-gray-400 p-2"><FaTimes size={20}/></button>
            </div>
            <BasketUI 
                selectedItems={selectedItems} 
                toggleItem={toggleItem} 
                handleEditLetter={handleEditLetter}
                comment={comment}
                setComment={setComment}
                onCheckout={() => router.push("/Checkout")}
             />
          </div>
        </div>
      )}

      {/* FLOATING MOBILE BASKET */}
      <button
        ref={basketRef}
        onClick={() => setIsBasketOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-gray-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-90 transition-all border-4 border-white"
      >
        <FaShoppingBasket size={20} />
        {selectedItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px]">
            {selectedItems.length}
          </span>
        )}
      </button>

      {/* JOURNAL MODAL */}
      {journalModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[600] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 text-2xl">
                    <FaPenFancy />
                </div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Write Letter</h2>
            </div>
            <textarea 
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                placeholder="Include a message in your journal..."
                className="w-full h-48 bg-amber-50/20 border-2 border-amber-100/50 rounded-2xl p-6 text-gray-800 font-medium italic outline-none focus:border-pink-200 transition-all resize-none shadow-inner"
            />
            <div className="grid grid-cols-2 gap-3 mt-6">
                <button onClick={() => { setJournalModalOpen(false); setLetterText(""); }} className="py-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Discard</button>
                <button onClick={handleJournalSubmit} className="bg-pink-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-pink-100">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* FLOWER MODAL */}
      {flowerModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[600] flex items-center justify-center p-4">
           <div className="bg-white rounded-[2.5rem] p-10 max-w-xs w-full shadow-2xl animate-in zoom-in text-center">
            <span className="text-5xl block mb-4">🌹</span>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6">Bouquet Size</h2>
            <div className="space-y-3">
              <button onClick={() => handleFlowerChoice(15)} className="w-full bg-pink-50 hover:bg-pink-100 border border-pink-200 p-5 rounded-2xl transition-all">
                <span className="block text-xl font-black text-pink-600">15 ROSES</span>
              </button>
              <button onClick={() => handleFlowerChoice(20)} className="w-full bg-gray-900 hover:bg-black p-5 rounded-2xl transition-all">
                <span className="block text-xl font-black text-white">20 ROSES</span>
              </button>
            </div>
            <button onClick={() => setFlowerModalOpen(false)} className="mt-6 text-gray-400 font-black uppercase tracking-widest text-[10px]">Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}

function BasketUI({ selectedItems, toggleItem, handleEditLetter, comment, setComment, onCheckout }: any) {
    return (
        <>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 mb-6 custom-scrollbar">
              {selectedItems.length === 0 ? (
                <p className="text-gray-300 text-center py-12 italic uppercase text-[10px] tracking-widest">Bag is empty</p>
              ) : (
                selectedItems.map((item: any) => (
                  <div key={item.id} className="flex flex-col bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center">
                        <span className="font-black text-gray-700 text-[10px] uppercase tracking-tight">{item.name}</span>
                        <button onClick={() => toggleItem(item)} className="text-red-300 hover:text-red-500 p-1">✕</button>
                    </div>
                    {item.letter && (
                        <button onClick={() => handleEditLetter(item.id)} className="mt-2 text-[9px] flex items-center gap-1 text-pink-500 font-black uppercase tracking-widest hover:underline">
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
              placeholder="Notes for the atelier..."
              className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-100 rounded-2xl p-4 text-[11px] font-bold text-gray-900 outline-none h-24 mb-6 transition-all"
            />
            <button
              onClick={onCheckout}
              disabled={selectedItems.length === 0}
              className="w-full bg-gray-900 text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl disabled:opacity-20 flex items-center justify-center gap-2"
            >
              Checkout <FaArrowRight size={12}/>
            </button>
        </>
    );
}