"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ads = [
  {
    id: 1,
    title: "Data is Cheap Here!",
    description: "Get 1GB for as low as ₦550. Valid for 30 days.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    title: "Pay Bills Instantly",
    description: "Zero transaction fee on your first electricity bill payment.",
    color: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    title: "Convert Airtime to Cash",
    description: "Fastest conversion rate in the market. 99% payout.",
    color: "from-green-600 to-emerald-500",
  },
];

export const AdsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-6 relative w-full overflow-hidden rounded-2xl shadow-md">
      <div className="relative h-40 w-full bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full bg-gradient-to-r ${ads[currentIndex].color} p-6 flex flex-col justify-center text-white`}
          >
            <h3 className="text-xl font-bold mb-1">{ads[currentIndex].title}</h3>
            <p className="text-sm font-medium opacity-90 max-w-[80%]">
              {ads[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-4 left-6 flex space-x-2 z-10">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
