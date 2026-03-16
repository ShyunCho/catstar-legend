export type GrowthStage =
  | "Baby Cat"
  | "Trainee"
  | "Rookie Idol"
  | "Rising Star"
  | "Catstar Legend";

export type UnlockType =
  | "outfit"
  | "background"
  | "title"
  | "feature"
  | "effect";

export type LevelUnlock = {
  type: UnlockType;
  key: string;
  label: string;
};

export type LevelDefinition = {
  level: number;
  minXp: number;
  stage: GrowthStage;
  title: string;
  visualKey: string;
  unlocks: LevelUnlock[];
};

export type LevelInfo = {
  level: number;
  minXp: number;
  stage: GrowthStage;
  title: string;
  visualKey: string;
  unlocks: LevelUnlock[];
};

export type ProgressInfo = {
  totalXp: number;
  currentLevel: number;
  currentStage: GrowthStage;
  title: string;
  visualKey: string;
  currentLevelMinXp: number;
  nextLevel: number | null;
  nextLevelMinXp: number | null;
  xpIntoLevel: number;
  xpNeededForCurrentLevel: number;
  xpToNextLevel: number;
  progressPercent: number;
  unlocks: LevelUnlock[];
};

export type LevelUpResult = {
  gainedXp: number;
  previousXp: number;
  newXp: number;
  previousLevel: number;
  newLevel: number;
  previousStage: GrowthStage;
  newStage: GrowthStage;
  didLevelUp: boolean;
  unlockedByLevelUp: LevelUnlock[];
  progress: ProgressInfo;
};

export const LEVELS: LevelDefinition[] = [
  {
    level: 1,
    minXp: 0,
    stage: "Baby Cat",
    title: "Tiny Meow",
    visualKey: "baby-cat-1",
    unlocks: [
      { type: "background", key: "room_basic", label: "Cozy Room" },
      { type: "title", key: "tiny_meow", label: "Tiny Meow" },
    ],
  },
  {
    level: 2,
    minXp: 40,
    stage: "Baby Cat",
    title: "Curious Kitten",
    visualKey: "baby-cat-2",
    unlocks: [{ type: "effect", key: "sparkle_small", label: "Small Sparkle" }],
  },
  {
    level: 3,
    minXp: 90,
    stage: "Trainee",
    title: "First Step Trainee",
    visualKey: "trainee-1",
    unlocks: [
      { type: "outfit", key: "trainee_hoodie", label: "Trainee Hoodie" },
      { type: "title", key: "first_step_trainee", label: "First Step Trainee" },
    ],
  },
  {
    level: 4,
    minXp: 150,
    stage: "Trainee",
    title: "Practice Monster",
    visualKey: "trainee-2",
    unlocks: [{ type: "background", key: "practice_room", label: "Practice Room" }],
  },
  {
    level: 5,
    minXp: 220,
    stage: "Rookie Idol",
    title: "Rookie Debut",
    visualKey: "rookie-1",
    unlocks: [
      { type: "outfit", key: "rookie_stage", label: "Rookie Stage Outfit" },
      { type: "feature", key: "fan_counter", label: "Fan Counter" },
    ],
  },
  {
    level: 6,
    minXp: 300,
    stage: "Rookie Idol",
    title: "Spotlight Rookie",
    visualKey: "rookie-2",
    unlocks: [{ type: "effect", key: "confetti", label: "Confetti Effect" }],
  },
  {
    level: 7,
    minXp: 390,
    stage: "Rising Star",
    title: "Rising Star",
    visualKey: "rising-star-1",
    unlocks: [
      { type: "background", key: "music_show_stage", label: "Music Show Stage" },
      { type: "title", key: "rising_star", label: "Rising Star" },
    ],
  },
  {
    level: 8,
    minXp: 490,
    stage: "Rising Star",
    title: "Crowd Favorite",
    visualKey: "rising-star-2",
    unlocks: [{ type: "outfit", key: "star_jacket", label: "Star Jacket" }],
  },
  {
    level: 9,
    minXp: 600,
    stage: "Rising Star",
    title: "Main Character Energy",
    visualKey: "rising-star-3",
    unlocks: [{ type: "effect", key: "spotlight", label: "Spotlight Effect" }],
  },
  {
    level: 10,
    minXp: 720,
    stage: "Catstar Legend",
    title: "Catstar Legend",
    visualKey: "legend-1",
    unlocks: [
      { type: "background", key: "legend_hall", label: "Legend Hall" },
      { type: "title", key: "catstar_legend", label: "Catstar Legend" },
      { type: "outfit", key: "legend_crown", label: "Legend Crown Outfit" },
    ],
  },
];

const getMaxLevelDefinition = () => LEVELS[LEVELS.length - 1];

export const getLevelInfoByLevel = (level: number): LevelInfo => {
  const found = LEVELS.find((item) => item.level === level);
  return found ?? getMaxLevelDefinition();
};

export const getLevelInfoFromXp = (xp: number): LevelInfo => {
  const safeXp = Math.max(0, xp);

  let current = LEVELS[0];

  for (const levelDef of LEVELS) {
    if (safeXp >= levelDef.minXp) {
      current = levelDef;
    } else {
      break;
    }
  }

  return current;
};

export const getNextLevelInfoFromXp = (xp: number): LevelInfo | null => {
  const current = getLevelInfoFromXp(xp);
  const next = LEVELS.find((item) => item.level === current.level + 1);
  return next ?? null;
};

export const getProgressFromXp = (xp: number): ProgressInfo => {
  const safeXp = Math.max(0, xp);
  const current = getLevelInfoFromXp(safeXp);
  const next = getNextLevelInfoFromXp(safeXp);

  const currentLevelMinXp = current.minXp;
  const nextLevelMinXp = next?.minXp ?? null;
  const xpIntoLevel = safeXp - currentLevelMinXp;

  const xpNeededForCurrentLevel = next
    ? next.minXp - current.minXp
    : 0;

  const xpToNextLevel = next
    ? Math.max(0, next.minXp - safeXp)
    : 0;

  const progressPercent = next
    ? Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForCurrentLevel) * 100))
    : 100;

  return {
    totalXp: safeXp,
    currentLevel: current.level,
    currentStage: current.stage,
    title: current.title,
    visualKey: current.visualKey,
    currentLevelMinXp,
    nextLevel: next?.level ?? null,
    nextLevelMinXp,
    xpIntoLevel,
    xpNeededForCurrentLevel,
    xpToNextLevel,
    progressPercent,
    unlocks: current.unlocks,
  };
};

export const getUnlockedRewardsBetweenLevels = (
  previousLevel: number,
  newLevel: number
): LevelUnlock[] => {
  if (newLevel <= previousLevel) return [];

  return LEVELS.filter(
    (item) => item.level > previousLevel && item.level <= newLevel
  ).flatMap((item) => item.unlocks);
};

export const applyXpReward = (
  currentXp: number,
  gainedXp: number
): LevelUpResult => {
  const safeCurrentXp = Math.max(0, currentXp);
  const safeGainedXp = Math.max(0, gainedXp);

  const previousInfo = getLevelInfoFromXp(safeCurrentXp);
  const newXp = safeCurrentXp + safeGainedXp;
  const newInfo = getLevelInfoFromXp(newXp);

  const didLevelUp = newInfo.level > previousInfo.level;
  const unlockedByLevelUp = getUnlockedRewardsBetweenLevels(
    previousInfo.level,
    newInfo.level
  );

  return {
    gainedXp: safeGainedXp,
    previousXp: safeCurrentXp,
    newXp,
    previousLevel: previousInfo.level,
    newLevel: newInfo.level,
    previousStage: previousInfo.stage,
    newStage: newInfo.stage,
    didLevelUp,
    unlockedByLevelUp,
    progress: getProgressFromXp(newXp),
  };
};

export const getStageBadgeColor = (stage: GrowthStage) => {
  switch (stage) {
    case "Baby Cat":
      return "bg-pink-100 text-pink-700";
    case "Trainee":
      return "bg-purple-100 text-purple-700";
    case "Rookie Idol":
      return "bg-blue-100 text-blue-700";
    case "Rising Star":
      return "bg-yellow-100 text-yellow-800";
    case "Catstar Legend":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};