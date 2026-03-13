const quests = [
  "Study 30 min",
  "Solve 1 SQL problem",
  "Workout",
  "Dance practice",
  "Eat healthy",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 px-6 py-8">
      <div className="mx-auto max-w-xl space-y-6">
        <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="text-center">
            <div className="text-7xl">🐱</div>
            <h1 className="mt-4 text-2xl font-black text-zinc-900">
              Luna
            </h1>
            <p className="mt-1 text-sm text-zinc-500">Kitten Trainee · Lv.1</p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm font-medium text-zinc-600">
                <span>XP</span>
                <span>0 / 100</span>
              </div>
              <div className="h-4 rounded-full bg-zinc-200">
                <div className="h-4 w-[20%] rounded-full bg-rose-400" />
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
                <span className="text-sm font-medium text-zinc-800">{quest}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}