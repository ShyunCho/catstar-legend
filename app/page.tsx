import Image from "next/image";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center px-6 py-10">
      <section className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose-500">
            Pixel Self-Growth RPG
          </p>

          <h1 className="text-4xl font-black tracking-tight text-zinc-900">
            Catstar Legend
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-600">
            Turn your real-life progress into XP and raise your idol cat into a
            legendary star.
          </p>

          <div className="mt-8 rounded-[28px] bg-gradient-to-b from-rose-100 to-amber-100 p-8 shadow-inner">
            <div className="flex justify-center">
              <Image
                src="/cats/cat_idle.png"
                alt="Catstar Legend pixel cat"
                width={180}
                height={180}
                priority
                className="h-auto w-auto pixelated"
              />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg font-bold text-zinc-800">Luna · Lv.1</p>
            <p className="mt-1 text-sm text-zinc-500">Kitten Trainee</p>
          </div>

          <Link
            href="/create"
            className="mt-8 block w-full rounded-2xl bg-zinc-900 px-5 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start Training
          </Link>
        </div>
      </section>
    </main>
  );
}