"use client";

import type { LevelUpResult } from "@/lib/level-system";

type LevelUpModalProps = {
  open: boolean;
  data: LevelUpResult | null;
  onClose: () => void;
};

export default function LevelUpModal({
  open,
  data,
  onClose,
}: LevelUpModalProps) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-rose-500">
          Level Up
        </p>

        <h2 className="mt-3 text-center text-3xl font-black text-zinc-900">
          Lv.{data.previousLevel} → Lv.{data.newLevel}
        </h2>

        <p className="mt-2 text-center text-sm text-zinc-500">
          {data.previousStage} → {data.newStage}
        </p>

        <div className="mt-6 rounded-2xl bg-rose-50 p-4 text-center">
          <p className="text-sm text-zinc-500">New Title</p>
          <p className="mt-1 text-lg font-bold text-zinc-900">
            {data.progress.title}
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-bold text-zinc-800">
            Unlocked Rewards
          </p>

          {data.unlockedByLevelUp.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.unlockedByLevelUp.map((unlock) => (
                <span
                  key={`${unlock.type}-${unlock.key}`}
                  className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white"
                >
                  {unlock.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No new reward</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}