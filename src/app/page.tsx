"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Great_Vibes } from 'next/font/google';
import { FaHeart, FaBoxOpen, FaGem, FaTimes } from "react-icons/fa"; // Added icons for fallback

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
});

export default function HomePage() {
  const router = useRouter(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  // Updated to your specific box options
  const boxes = [
    { name: "Heart Box", img: "/heart-box.png", icon: <FaHeart /> },
    { name: "Medium Box", img: "/medium-box.png", icon: <FaBoxOpen /> },
    { name: "Large Box", img: "/large-box.png", icon: <FaGem /> },
  ];

  const handleContinue = () => {
    if (selectedBox) {
      localStorage.setItem("selectedGiftBox", selectedBox);
      router.push("/build"); // Ensure this matches your folder name (lowercase 'build' is standard)
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: "url('/background.PNG')" }}
    >
      {/* TOP-CENTER BRAND */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 text-center">
        <h1 className={`${greatVibes.className} text-3xl md:text-5xl text-pink-400 drop-shadow-lg inline-block`}>
          Deluxe Global
        </h1>
      </div>

      {/* Hero Content */}
      <div className="min-h-screen bg-black/20 flex items-center py-20 md:py-0">
        <section className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* TEXT SIDE */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-4">
              Personalized Gifts Made Easy
            </span>

            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
              Create the <span className="text-pink-300">Perfect Gift</span> for Someone Special 🎁
            </h2>

            <p className="text-white text-base md:text-lg max-w-xl mb-8 drop-shadow-md">
              Choose from beautifully curated gift sets or build your own custom
              gift basket. Perfect for birthdays, Valentine’s, anniversaries, and
              surprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-pink-600 hover:bg-pink-700 transition-all hover:scale-105 active:scale-95 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-pink-900/20"
              >
                Build Your Own Basket
              </button>

              <a
                href="/Shop"
                className="border-2 border-white/30 backdrop-blur-md text-white hover:bg-white hover:text-pink-600 transition-all px-8 py-4 rounded-2xl text-lg font-bold"
              >
                Shop Ready-Made Gifts
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-10 text-xs md:text-sm text-white/80">
              <div className="flex items-center gap-1">🎀 Hand-picked items</div>
              <div className="flex items-center gap-1">🚚 Fast delivery</div>
              <div className="flex items-center gap-1">💌 Perfect for any occasion</div>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end order-1 md:order-2 mt-12 md:mt-0">
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-48 h-48 md:w-72 md:h-72 bg-pink-400 rounded-full blur-[100px] opacity-30 animate-pulse" />
            <Image
              src="/heroimg.png"
              alt="Gift Basket"
              width={500}
              height={500}
              className="relative rounded-3xl drop-shadow-2xl w-4/5 md:w-full h-auto"
              priority
            />
          </div>
        </section>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[100] p-4">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full relative shadow-2xl animate-in zoom-in duration-300">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-2xl md:text-3xl font-black mb-2 text-center text-gray-900">
              Choose Your Box
            </h2>
            <p className="text-gray-500 text-center mb-8 font-medium">This will be the base of your gift</p>

            <div className="flex flex-col gap-4">
              {boxes.map((box) => (
                <button
                  key={box.name}
                  onClick={() => setSelectedBox(box.name)}
                  className={`flex items-center gap-5 p-4 border-2 rounded-2xl transition-all group ${
                    selectedBox === box.name 
                    ? "border-pink-500 bg-pink-50 shadow-md ring-4 ring-pink-50" 
                    : "border-gray-100 bg-gray-50 hover:border-pink-200"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm transition-colors ${
                    selectedBox === box.name ? "bg-white text-pink-500" : "bg-white text-gray-400 group-hover:text-pink-300"
                  }`}>
                    {/* If you have the images, use Image. Otherwise, the Icon shows as fallback */}
                    <div className="relative w-10 h-10">
                        {box.img ? (
                             <Image src={box.img} alt={box.name} fill className="object-contain" />
                        ) : box.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-gray-800">{box.name}</span>
                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Luxury Packaging</span>
                  </div>
                </button>
              ))}
            </div>

            <div className={`mt-8 transition-all duration-500 ${selectedBox ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
              <button
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-pink-100 flex items-center justify-center gap-2 animate-pulse"
                onClick={handleContinue}
              >
                Proceed with {selectedBox}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
