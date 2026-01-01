"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
});

export default function HomePage() {
  const router = useRouter(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const boxes = [
    { name: "Heart Box", img: "/heart-box.png" },
    { name: "Medium Box", img: "/medium-box.png" },
    { name: "Large Box", img: "/large-box.png" },
  ];

  const handleContinue = () => {
    if (selectedBox) {
      // 1. Save selection to localStorage so the Build page can read it
      localStorage.setItem("selectedGiftBox", selectedBox);
      
      // 2. Navigate to the build page
      router.push("/Build");
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

            <h2 className="text-3xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
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
                className="bg-pink-600 hover:bg-pink-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
              >
                Build Your Own Basket
              </button>

              <a
                href="/shop"
                className="border-2 border-pink-600 text-white md:text-pink-600 bg-pink-600/20 md:bg-transparent hover:bg-pink-50 transition px-8 py-4 rounded-xl text-lg font-semibold"
              >
                Shop Ready-Made Gifts
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-10 text-xs md:text-sm text-white drop-shadow">
              <div className="whitespace-nowrap">🎀 Hand-picked items</div>
              <div className="whitespace-nowrap">🚚 Fast delivery</div>
              <div className="whitespace-nowrap">💌 Perfect for any occasion</div>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end order-1 md:order-2 mt-12 md:mt-0">
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-48 h-48 md:w-72 md:h-72 bg-pink-200 rounded-full blur-3xl opacity-40" />
            <Image
              src="/heroimg.png"
              alt="Gift Basket"
              width={500}
              height={500}
              className="relative rounded-3xl shadow-2xl w-4/5 md:w-full h-auto"
              priority
            />
          </div>
        </section>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 font-bold text-2xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">
              Select Your Box
            </h2>

            <div className="flex flex-col gap-3">
              {boxes.map((box) => (
                <button
                  key={box.name}
                  onClick={() => setSelectedBox(box.name)}
                  className={`flex items-center gap-4 p-3 md:p-4 border rounded-xl hover:bg-pink-50 transition ${
                    selectedBox === box.name ? "border-pink-600 bg-pink-50 ring-2 ring-pink-100" : "border-gray-200"
                  }`}
                >
                  <div className="relative w-12 h-12">
                    <Image src={box.img} alt={box.name} fill className="object-contain" />
                  </div>
                  <span className="font-semibold text-gray-700">{box.name}</span>
                </button>
              ))}
            </div>

            {selectedBox && (
              <div className="mt-6 text-center">
                <button
                  className="w-full bg-pink-600 hover:bg-pink-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md animate-in fade-in slide-in-from-bottom-2"
                  onClick={handleContinue}
                >
                  Continue with {selectedBox}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}