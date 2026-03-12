export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md shadow-xl p-6">
        <div className="text-center space-y-4">
          <p className="text-sm font-medium text-rose-500 tracking-[0.2em] uppercase">
            Pixel Self-Growth Game
          </p>

          <h1 className="text-4xl font-black text-gray-900">
            Catstar Legend
          </h1>

          <p className="text-sm leading-6 text-gray-600">
            Check your real-life quests, gain XP, and raise your idol cat into
            a legendary star.
          </p>

          <div className="rounded-2xl bg-rose-100/70 p-6 text-6xl shadow-inner">
            🐱
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-lg font-bold text-gray-800">Luna · Lv.1</p>
            <p className="text-sm text-gray-500">Kitten Trainee</p>
          </div>

          <button className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-white font-semibold hover:scale-[1.01] transition">
            Start Training
          </button>
        </div>
      </div>
    </main>
  );
}