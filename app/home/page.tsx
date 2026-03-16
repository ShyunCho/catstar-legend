"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const quests = [
  "Study 30 min",
  "Solve 1 SQL problem",
  "Workout",
  "Dance practice",
  "Eat healthy",
  "Stretch",
  "Plan tomorrow",
  "Read 10 pages",
  "Practice coding",
  "Drink enough water",
];

type GameData = {
  name: string;
  catType: "white" | "black" | "orange";
  level: number;
  xp: number;
  stage: string;
  completedQuests: string[];
};

const catEmojiMap: Record<GameData["catType"], string> = {
  white: "🤍",
  black: "🖤",
  orange: "🧡",
};

const getLevelFromXp = (xp: number) => {
  return Math.floor(xp / 100) + 1;
};

const getStageFromLevel = (level: number) => {
  if (level >= 50) return "Legendary Idol Cat";
  if (level >= 30) return "Superstar Cat";
  if (level >= 20) return "Rising Star Cat";
  if (level >= 15) return "Rookie Idol Cat";
  if (level >= 10) return "Pre-Debut Cat";
  if (level >= 5) return "Idol Trainee";
  return "Kitten Trainee";
};

export default function HomePage() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [xpToast, setXpToast] = useState<{
    value: string;
    type: "gain" | "loss";
  } | null>(null);
  const [levelToast, setLevelToast] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("catstar-legend-save");

    if (!savedData) return;

    try {
      const parsedData = JSON.parse(savedData);

      setGameData({
        ...parsedData,
        completedQuests: parsedData.completedQuests ?? [],
      });
    } catch (error) {
      console.error("Failed to parse saved game data:", error);
    }
  }, []);

  const showXpToast = (value: string, type: "gain" | "loss") => {
    setXpToast({ value, type });

    setTimeout(() => {
      setXpToast(null);
    }, 900);
  };

  const showLevelToast = (level: number) => {
    setLevelToast(`Level Up! Lv.${level}`);

    setTimeout(() => {
      setLevelToast(null);
    }, 1400);
  };

  const handleQuestToggle = (quest: string) => {
    if (!gameData) return;

    const isCompleted = gameData.completedQuests.includes(quest);

    let updatedCompletedQuests: string[];
    let updatedXp: number;

    if (isCompleted) {
      updatedCompletedQuests = gameData.completedQuests.filter(
        (completedQuest) => completedQuest !== quest
      );
      updatedXp = Math.max(gameData.xp - 10, 0);
      showXpToast("-10 XP", "loss");
    } else {
      updatedCompletedQuests = [...gameData.completedQuests, quest];
      updatedXp = gameData.xp + 10;
      showXpToast("+10 XP", "gain");
    }

    const previousLevel = gameData.level;
    const updatedLevel = getLevelFromXp(updatedXp);
    const updatedStage = getStageFromLevel(updatedLevel);

    if (updatedLevel > previousLevel) {
      showLevelToast(updatedLevel);
    }

    const updatedGameData: GameData = {
      ...gameData,
      xp: updatedXp,
      level: updatedLevel,
      stage: updatedStage,
      completedQuests: updatedCompletedQuests,
    };

    setGameData(updatedGameData);
    localStorage.setItem(
      "catstar-legend-save",
      JSON.stringify(updatedGameData)
    );
  };

  const catEmoji = gameData ? catEmojiMap[gameData.catType] : "🐱";
  const catName = gameData?.name ?? "Luna";
  const level = gameData?.level ?? 1;
  const xp = gameData?.xp ?? 0;
  const stage = gameData?.stage ?? "Kitten Trainee";
  const completedQuests = gameData?.completedQuests ?? [];
  const currentXp = xp % 100;

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

        <section className="relative rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur">
          {levelToast && (
            <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700 shadow animate-bounce">
              {levelToast}
            </div>
          )}

          {xpToast && (
            <div
              className={`pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 animate-bounce text-lg font-black ${
                xpToast.type === "gain" ? "text-rose-500" : "text-sky-500"
              }`}
            >
              {xpToast.value}
            </div>
          )}

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
                <span>{currentXp} / 100</span>
              </div>

              <div className="h-4 rounded-full bg-zinc-200">
                <div
                  className="h-4 rounded-full bg-rose-400 transition-all duration-300"
                  style={{ width: `${currentXp}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
          <h2 className="text-xl font-black text-zinc-900">Today’s Training</h2>

          <div className="mt-5 space-y-3">
            {quests.map((quest) => {
              const isCompleted = completedQuests.includes(quest);

              return (
                <label
                  key={quest}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                    isCompleted
                      ? "border-rose-200 bg-rose-50"
                      : "border-zinc-200 bg-zinc-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={isCompleted}
                    onChange={() => handleQuestToggle(quest)}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-zinc-500 line-through"
                        : "text-zinc-800"
                    }`}
                  >
                    {quest}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}