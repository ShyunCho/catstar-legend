"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const quests = [
  "Study 30 min",
  "Solve 1 SQL problem",
  "Workout",
  "Dance practice",
  "Eat healthy",
];

type GameData = {
  name: string;
  catType: "white" | "black" | "orange";
  level: number;
  xp: number;
  stage: string;
};

const catEmojiMap: Record<GameData["catType"], string> = {
  white: "🤍",
  black: "🖤",
  orange: "🧡",
};

export default function HomePage() {
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("catstar-legend-save");

    if (!savedData) return;

    try {
      const parsedData: GameData = JSON.parse(savedData);
      setGameData(parsedData);
    } catch (error) {
      console.error("Failed to parse saved game data:", error);
    }
  }, []);

  const catEmoji = gameData ? catEmojiMap[gameData.catType] : "🐱";
  const catName = gameData?.name ?? "Luna";
  const level = gameData?.level ?? 1;
  const xp = gameData?.xp ?? 0;
  const stage = gameData?.stage ?? "Kitten Trainee";

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 px-6 py-8">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <Link
            href="/create"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
          >
            ← Back to Create
          </Link>
        </div>

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="text-center">
            <div className="text-7xl">{catEmoji}</div>

            <h1 className="mt-4 text-2xl font-black text-zinc-900">
              {catName}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              {stage} · Lv.{level}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm font-medium text-zinc-600">
                <span>XP</span>
                <span>{xp} / 100</span>
              </div>

              <div className="h-4 rounded-full bg-zinc-200">
                <div
                  className="h-4 rounded-full bg-rose-400 transition-all"
                  style={{ width: `${Math.min(xp, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-black text-zinc-900">Today’s Training</h2>

          <div className="mt-5 space-y-3">
            {quests.map((quest) => (
              <label
                key={quest}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4"
              >
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-sm font-medium text-zinc-800">
                  {quest}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}