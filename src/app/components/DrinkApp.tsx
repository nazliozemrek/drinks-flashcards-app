// File: components/DrinkApp.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import drinksData from "../data/merged_drink_recipes_v8.json";

export default function DrinkApp() {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState(drinksData);
  const drink = filteredDrinks[index] || drinksData[0];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % filteredDrinks.length);
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + filteredDrinks.length) % filteredDrinks.length);
    setIsFlipped(false);
  };

  useEffect(() => {
    const result = drinksData.filter((d) =>
      d.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDrinks(result);
    setIndex(0);
  }, [search]);

  // Swipe Detection
  const startX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX.current;
    if (delta > 50) handlePrev();
    else if (delta < -50) handleNext();
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Drink Flashcard Viewer</h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search drink name..."
          className="mb-6 px-4 py-2 rounded bg-gray-800 border border-gray-600 w-full"
        />

        <div
          className="relative w-full perspective h-72"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`transition-transform duration-500 transform-style preserve-3d relative w-full h-full ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front Side */}
            <div className="absolute w-full h-full backface-hidden bg-gray-800 p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{drink.name}</h2>
              <p className="mb-4">Glass: {drink.glass}</p>
              <button
                onClick={() => setIsFlipped(true)}
                className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Show Recipe
              </button>
            </div>

            {/* Back Side */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-700 p-6 rounded shadow-lg overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">{drink.name}</h2>
              <p><strong>Method:</strong> {drink.method}</p>
              <p className="mt-2"><strong>Ingredients:</strong></p>
              <ul className="list-disc list-inside">
                {drink.ingredients?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-2"><strong>Garnish:</strong> {drink.garnish}</p>
              <button
                onClick={() => setIsFlipped(false)}
                className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handlePrev} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">
            Previous
          </button>
          <button onClick={handleNext} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

// Tailwind CSS additions (add to global styles if not already defined)
// .perspective { perspective: 1000px; }
// .transform-style { transform-style: preserve-3d; }
// .backface-hidden { backface-visibility: hidden; }
// .rotate-y-180 { transform: rotateY(180deg); }
