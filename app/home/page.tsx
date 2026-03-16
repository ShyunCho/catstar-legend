"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LevelCard from "@/components/LevelCard";
import LevelUpModal from "@/components/LevelUpModal";
import {
  applyXpReward,
  getLevelInfoFromXp,
  getProgressFromXp,
  type GrowthStage,
  type LevelUpResult,
} from "@/lib/level-system";

const quests = [
  { label: "Study 30 min", xp: 20 },
  { label: "Solve 1 SQL problem", xp: 20 },
  { label: "Workout", xp: 20 },
  { label: "Dance practice", xp: 25 },
  { label: "Eat healthy", xp: 15 },
];

type SaveData = {
  name: string;
  catType: "white" | "black" | "orange";
  xp: number;
  completedQuests: string[];
};

const getCatImageByStage = (
  stage: GrowthStage,
  completedCount: number
): string => {
  if (stage === "Catstar Legend") return "/cats/cat_sing.png";
  if (stage === "Rising Star") return "/cats/cat_dance.png";
  if (stage === "Rookie Idol") return "/cats/cat_happy.png";
  if (stage === "Trainee" && completedCount >= 1) return "/cats/cat_blink.png";
  return "/cats/cat_idle.png";
};

export default function HomePage() {
  const [gameData, setGameData] = useState<SaveData | null>(null);
  const [levelUpData, setLevelUpData] = useState<LevelUpResult | null>(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("catstar-legend-save");

    if (!savedData) return;

    try {
      const parsedData = JSON.parse(savedData);

      setGameData({
        name: parsedData.name ?? "Luna",
        catType: parsedData.catType ?? "white",
        xp: parsedData.xp ?? 0,
        completedQuests: parsedData.completedQuests ?? [],
      });
    } catch (error) {
      console.error("Failed to parse saved game data:", error);
    }
  }, []);

  const handleQuestToggle = (questLabel: string, xpReward: number) => {
    if (!gameData) return;

    const isCompleted = gameData.completedQuests.includes(questLabel);

    if (isCompleted) {
      const updatedCompletedQuests = gameData.completedQuests.filter(
        (completedQuest) => completedQuest !== questLabel
      );

      const updatedGameData: SaveData = {
        ...gameData,
        xp: Math.max(gameData.xp - xpReward, 0),
        completedQuests: updatedCompletedQuests,
      };

      setGameData(updatedGameData);
      localStorage.setItem(
        "catstar-legend-save",
        JSON.stringify(updatedGameData)
      );
      return;
    }

    const result = applyXpReward(gameData.xp, xpReward);

    const updatedGameData: SaveData = {
      ...gameData,
      xp: result.newXp,
      completedQuests: [...gameData.completedQuests, questLabel],
    };

    setGameData(updatedGameData);
    localStorage.setItem(
      "catstar-legend-save",
      JSON.stringify(updatedGameData)
    );

    if (result.didLevelUp) {
      setLevelUpData(result);
      setShowLevelUpModal(true);
    }
  };

  if (!gameData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 px-6 py-8">
        <div className="mx-auto max-w-xl">
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </main>
    );
  }

  const catName = gameData.name;
  const completedQuests = gameData.completedQuests;
  const levelInfo = getLevelInfoFromXp(gameData.xp);
  const progress = getProgressFromXp(gameData.xp);
  const catImage = getCatImageByStage(
    levelInfo.stage,
    completedQuests.length
  );

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
            <div className="flex justify-center">
              <Image
                src={catImage}
                alt={`${catName} pixel cat`}
                width={220}
                height={220}
                priority
                className="h-auto w-auto pixelated"
              />
            </div>

            <h1 className="mt-4 text-2xl font-black text-zinc-900">
              {catName}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              {levelInfo.stage} · Lv.{levelInfo.level}
            </p>

            <p className="mt-2 text-sm font-medium text-rose-500">
              {levelInfo.title}
            </p>
          </div>
        </section>

        <LevelCard totalXp={gameData.xp} />

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-zinc-900">
              Today’s Training
            </h2>
            <p className="text-sm text-zinc-500">
              {progress.nextLevel
                ? `${progress.xpToNextLevel} XP to next level`
                : "Max level reached"}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {quests.map((quest) => {
              const isCompleted = completedQuests.includes(quest.label);

              return (
                <label
                  key={quest.label}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 transition ${
                    isCompleted
                      ? "border-rose-200 bg-rose-50"
                      : "border-zinc-200 bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={isCompleted}
                      onChange={() =>
                        handleQuestToggle(quest.label, quest.xp)
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-zinc-500 line-through"
                          : "text-zinc-800"
                      }`}
                    >
                      {quest.label}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-rose-500">
                    +{quest.xp} XP
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      </div>

      <LevelUpModal
        open={showLevelUpModal}
        data={levelUpData}
        onClose={() => setShowLevelUpModal(false)}
      />
    </main>
  );
}