"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const cats = [
  { id: "white", name: "White Cat", image: "/cats/cat_idle.png" },
  { id: "black", name: "Black Cat", image: "/cats/cat_idle.png" },
  { id: "orange", name: "Orange Cat", image: "/cats/cat_idle.png" },
];

export default function CreatePage() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [catName, setCatName] = useState("");
  const [error, setError] = useState("");

  const handleStartJourney = () => {
    const trimmedName = catName.trim();

    if (!selectedCat || !trimmedName) {
      setError("Please choose a cat and enter a name.");
      return;
    }

    const gameData = {
      name: trimmedName,
      catType: selectedCat,
      level: 1,
      xp: 0,
      stage: "Kitten Trainee",
      completedQuests: [],
    };

    localStorage.setItem("catstar-legend-save", JSON.stringify(gameData));
    router.push("/home");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-pink-100 px-6 py-10">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
        >
          ← Back
        </Link>

        <p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
          Create Your Idol Cat
        </p>

        <h1 className="mt-3 text-3xl font-black text-zinc-900">
          Choose your trainee
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Pick your cat and give them a name. This will become your little
          self-growth avatar.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cats.map((cat) => {
            const isSelected = selectedCat === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCat(cat.id);
                  setError("");
                }}
                className={`rounded-3xl border p-5 text-center transition hover:-translate-y-1 hover:shadow-md ${
                  isSelected
                    ? "border-rose-400 bg-rose-50 ring-2 ring-rose-200"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <div className="flex justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 pixelated"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-zinc-800">
                  {cat.name}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Cat Name
          </label>
          <input
            type="text"
            value={catName}
            onChange={(e) => {
              setCatName(e.target.value);
              setError("");
            }}
            placeholder="Enter a name"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none placeholder:text-zinc-400 focus:border-rose-300"
          />
        </div>

        {error ? (
          <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
        ) : null}

        <button
          type="button"
          onClick={handleStartJourney}
          className="mt-8 block w-full rounded-2xl bg-zinc-900 px-5 py-3 text-center text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Start Journey
        </button>
      </div>
    </main>
  );
}