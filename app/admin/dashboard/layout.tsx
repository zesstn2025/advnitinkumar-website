import Link from "next/link";
import { logout } from "../actions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F2EC] flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0E0A05] text-[#FAF3E2] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#C8A878]/15">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C8A878] to-[#A07840] flex items-center justify-center text-base">
              ⚖
            </div>
            <div>
              <div className="text-sm font-serif">Adv. Nitin Kumar</div>
              <div className="text-[10px] text-[#C8A878] tracking-wider uppercase">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#EDE0C4]/80 hover:bg-[#C8A878]/10 hover:text-[#C8A878] transition">
            📊 Overview
          </Link>
          <Link href="/admin/dashboard/articles" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#EDE0C4]/80 hover:bg-[#C8A878]/10 hover:text-[#C8A878] transition">
            📝 Articles
          </Link>
          <Link href="/admin/dashboard/articles/new" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#EDE0C4]/80 hover:bg-[#C8A878]/10 hover:text-[#C8A878] transition">
            ➕ New Article
          </Link>
          <Link href="/admin/dashboard/leads" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#EDE0C4]/80 hover:bg-[#C8A878]/10 hover:text-[#C8A878] transition">
            📩 Leads / Enquiries
          </Link>
          <Link href="/admin/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#EDE0C4]/80 hover:bg-[#C8A878]/10 hover:text-[#C8A878] transition">
            ⚙️ SEO Settings
          </Link>
          <Link href="/admin/dashboard/account" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#EDE0C4]/80 hover:bg-[#C8A878]/10 hover:text-[#C8A878] transition">
            🔑 Account / Password
          </Link>
        </nav>
        <div className="p-4 border-t border-[#C8A878]/15 space-y-2">
          <Link href="/" target="_blank" className="block text-center text-xs px-4 py-2.5 rounded-lg border border-[#C8A878]/25 text-[#C8A878] hover:bg-[#C8A878]/10 transition">
            🌐 View Live Site
          </Link>
          <form action={logout}>
            <button type="submit" className="w-full text-xs px-4 py-2.5 rounded-lg border border-red-500/25 text-red-300 hover:bg-red-500/10 transition">
              🚪 Logout
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
