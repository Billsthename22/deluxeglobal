"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FaCheckCircle, 
  FaShoppingBasket, 
  FaArrowLeft, 
  FaArrowRight, 
  FaEdit, 
  FaPenFancy, 
  FaTimes,
  FaTools
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

  // Modal & Drawer States
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [flowerModalOpen, setFlowerModalOpen] = useState(false);
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const [tempFlowerItem, setTempFlowerItem] = useState<Item | null>(null);
  const [letterText, setLetterText] = useState("");

  // ✅ LOAD DATA
  useEffect(() => {
    const savedItems = localStorage.getItem("orderItems");
    const savedBox = localStorage.getItem("selectedBoxSize");
    const savedComment = localStorage.getItem("orderComment");

    if (savedItems) setSelectedItems(JSON.parse(savedItems));
    if (savedBox) setSelectedBox(savedBox);
    if (savedComment) setComment(savedComment);
    setIsLoaded(true);
  }, []);

  // ✅ SAVE DATA
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
      setSelectedItems(prev => prev.filter(i => i.id !== id));
      setJournalModalOpen(true);
    }
  };

  const handleFlowerChoice = (roses: number) => {
    if (!tempFlowerItem) return;
    const newItem = { 
        ...tempFlowerItem, 
        id: Date.now(), 
        name: `${tempFlowerItem.name} (${roses} Roses)` 
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
        <Link href="/" className="text-pink-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:underline mb-4">
          <FaArrowLeft /> Change Box Type
        </Link>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
          Build Your <br/>
          <span className="text-pink-500 italic font-light capitalize tracking-normal">{selectedBox}</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* ITEM GRID */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => {
            const isSelected = selectedItems.some((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                onClick={(e) => toggleItem(item, e)}
                className={`group relative cursor-pointer rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-lg transition-all duration-300 bg-white border-4 ${
                  isSelected ? "border-pink-500 scale-105 shadow-pink-100" : "border-white hover:border-pink-100"
                }`}
              >
                <div className="relative h-40 md:h-56 w-full overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-4 text-center">
                  <p className="font-black text-gray-800 text-[10px] uppercase tracking-tighter leading-tight">{item.name}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg animate-in zoom-in">
                    <FaCheckCircle size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block w-96 sticky top-10 self-start">
          <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-pink-100">
             <BasketUI 
                selectedItems={selectedItems} 
                toggleItem={toggleItem} 
                handleEditLetter={handleEditLetter}
                comment={comment}
                setComment={setComment}
                router={router}
             />
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-[500] lg:hidden">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setIsBasketOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[4rem] p-10 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Your Bag</h2>
                <button onClick={() => setIsBasketOpen(false)} className="bg-gray-50 p-4 rounded-full text-gray-400"><FaTimes/></button>
            </div>
            <BasketUI 
                selectedItems={selectedItems} 
                toggleItem={toggleItem} 
                handleEditLetter={handleEditLetter}
                comment={comment}
                setComment={setComment}
                router={router}
             />
          </div>
        </div>
      )}

      {/* FLOATING MOBILE TRIGGER */}
      <button
        ref={basketRef}
        onClick={() => setIsBasketOpen(true)}
        className="lg:hidden fixed bottom-8 right-6 bg-gray-900 text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-all border-4 border-white"
      >
        <FaShoppingBasket size={24} />
        {selectedItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-4 border-white">
            {selectedItems.length}
          </span>
        )}
      </button>

      {/* JOURNAL MODAL */}
      {journalModalOpen && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl z-[600] flex items-center justify-center p-6">
          <div className="bg-white rounded-[4rem] p-10 md:p-14 max-w-xl w-full shadow-2xl animate-in zoom-in">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-pink-50 text-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                    <FaPenFancy />
                </div>
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">The Atelier <br/>Letter</h2>
            </div>
            <textarea 
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                placeholder="Write your heart out..."
                className="w-full h-64 bg-amber-50/20 border-2 border-amber-100/50 rounded-[2.5rem] p-8 text-gray-800 font-bold italic outline-none focus:border-pink-200 transition-all resize-none shadow-inner"
            />
            <div className="grid grid-cols-2 gap-4 mt-8">
                <button onClick={() => { setJournalModalOpen(false); setLetterText(""); }} className="py-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Cancel</button>
                <button onClick={handleJournalSubmit} className="bg-pink-500 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-pink-100">Save Letter</button>
            </div>
          </div>
        </div>
      )}

      {/* FLOWER MODAL */}
      {flowerModalOpen && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl z-[600] flex items-center justify-center p-6">
           <div className="bg-white rounded-[4rem] p-12 max-w-sm w-full shadow-2xl animate-in zoom-in text-center">
            <span className="text-6xl block mb-6">🌹</span>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8">Bouquet Size</h2>
            <div className="space-y-4">
              <button onClick={() => handleFlowerChoice(15)} className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-100 p-6 rounded-[2rem] transition-all group">
                <span className="block text-2xl font-black text-pink-600 uppercase tracking-tighter">15 Roses</span>
              </button>
              <button onClick={() => handleFlowerChoice(20)} className="w-full bg-gray-900 hover:bg-black p-6 rounded-[2rem] transition-all group">
                <span className="block text-2xl font-black text-white uppercase tracking-tighter">20 Roses</span>
              </button>
            </div>
            <button onClick={() => setFlowerModalOpen(false)} className="mt-8 text-gray-400 font-black uppercase tracking-widest text-[10px]">Back</button>
          </div>
        </div>
      )}
    </main>
  );
}

// ✅ EXTRACTED UI COMPONENT FOR DRY CODE
function BasketUI({ selectedItems, toggleItem, handleEditLetter, comment, setComment, router }: any) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <FaShoppingBasket className="text-pink-500 text-2xl" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Your Basket</h2>
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
              {selectedItems.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-[2rem]">
                   <p className="text-gray-300 font-black uppercase text-[10px] tracking-widest italic">Basket is empty</p>
                </div>
              ) : (
                selectedItems.map((item: any) => (
                  <div key={item.id} className="group flex flex-col bg-gray-50 p-5 rounded-[2rem] border border-gray-100 transition-all hover:bg-white hover:shadow-xl">
                    <div className="flex justify-between items-center">
                        <span className="font-black text-gray-800 text-[10px] uppercase tracking-tight">{item.name}</span>
                        <button onClick={() => toggleItem(item)} className="text-gray-300 hover:text-red-500 transition-colors">✕</button>
                    </div>
                    {item.letter && (
                        <button onClick={() => handleEditLetter(item.id)} className="mt-3 text-[9px] flex items-center gap-2 text-pink-500 font-black uppercase tracking-widest hover:underline">
                            <FaEdit /> Edit Journal Entry
                        </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Notes & Preferences</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="e.g. Color themes, delivery notes..."
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-100 rounded-[1.5rem] p-5 text-[11px] font-bold text-gray-900 outline-none h-28 mb-8 transition-all resize-none"
                />

                <button
                    onClick={() => router.push("/Checkout")}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-gray-900 hover:bg-pink-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-3"
                >
                    Checkout <FaArrowRight size={12}/>
                </button>
            </div>
        </div>
    );
}