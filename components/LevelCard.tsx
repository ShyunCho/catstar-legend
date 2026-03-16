"use client";

import { getProgressFromXp, getStageBadgeColor } from "@/lib/level-system";

type LevelCardProps = {
  totalXp: number;
};

export default function LevelCard({ totalXp }: LevelCardProps) {
  const progress = getProgressFromXp(totalXp);

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
            Current Growth
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-900">
            Lv.{progress.currentLevel} · {progress.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Total XP {progress.totalXp}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${getStageBadgeColor(
            progress.currentStage
          )}`}
        >
          {progress.currentStage}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm font-medium text-zinc-600">
          <span>XP Progress</span>
          <span>
            {progress.nextLevel
              ? `${progress.xpIntoLevel} / ${progress.xpNeededForCurrentLevel}`
              : "MAX"}
          </span>
        </div>

        <div className="h-4 rounded-full bg-zinc-200">
          <div
            className="h-4 rounded-full bg-rose-400 transition-all duration-500"
            style={{ width: `${progress.progressPercent}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-sm text-zinc-500">
          <span>
            {progress.nextLevel
              ? `Next Lv.${progress.nextLevel}`
              : "Legend Complete"}
          </span>
          <span>
            {progress.nextLevel
              ? `${progress.xpToNextLevel} XP left`
              : "All unlocked"}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-bold text-zinc-800">Current Unlocks</p>
        <div className="flex flex-wrap gap-2">
          {progress.unlocks.map((unlock) => (
            <span
              key={`${unlock.type}-${unlock.key}`}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
            >
              {unlock.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}