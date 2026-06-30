import { login } from "./actions";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0A05] px-4">
      <div className="w-full max-w-md bg-[#1A1208] border border-[#C8A878]/20 rounded-2xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#C8A878] to-[#A07840] flex items-center justify-center text-2xl">
            ⚖
          </div>
          <h1 className="text-2xl font-serif text-[#FAF3E2] mb-1">Admin Dashboard</h1>
          <p className="text-xs text-[#C8A878] tracking-widest uppercase">
            Adv. Nitin Kumar &middot; Legal Chambers
          </p>
        </div>

        {searchParams?.error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            Invalid email or password. Please try again.
          </div>
        )}

        <form action={login} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C8A878] mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="advnitin2@gmail.com"
              className="w-full px-4 py-3 bg-[#241A0A] border border-[#C8A878]/25 rounded-lg text-[#EDE0C4] text-sm outline-none focus:border-[#C8A878]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C8A878] mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-[#241A0A] border border-[#C8A878]/25 rounded-lg text-[#EDE0C4] text-sm outline-none focus:border-[#C8A878]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#C8A878] to-[#A07840] text-[#0E0A05] font-bold rounded-lg text-sm tracking-wide hover:opacity-90 transition"
          >
            Sign In →
          </button>
        </form>
      </div>
    </div>
  );
}
