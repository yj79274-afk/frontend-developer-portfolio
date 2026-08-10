import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-white">
          🎮 GameHub
        </Link>

        <div className="flex gap-6">
          <Link href="/dashboard" className="text-slate-300 hover:text-white">
            Dashboard
          </Link>

          <Link href="/games" className="text-slate-300 hover:text-white">
            Games
          </Link>

          <Link href="/favorites" className="text-slate-300 hover:text-white">
            Favorites
          </Link>

          <Link href="/statistics" className="text-slate-300 hover:text-white">
            Statistics
          </Link>

          <Link href="/settings" className="text-slate-300 hover:text-white">
            Settings
          </Link>

          <Link href="/health" className="text-slate-300 hover:text-white">
            Health
          </Link>
        </div>
      </div>
    </nav>
  );
}
