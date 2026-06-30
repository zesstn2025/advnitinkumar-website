"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Password kam se kam 8 characters ka hona chahiye." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Dono password match nahi kar rahe." });
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      setMessage({ type: "error", text: "Error: " + error.message });
    } else {
      setMessage({ type: "success", text: "✅ Password successfully change ho gaya!" });
      setNewPassword("");
      setConfirmPassword("");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm max-w-md">
      <h2 className="font-semibold text-[#1A1008] mb-4">🔑 Change Password</h2>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
        Naya Password
      </label>
      <input
        type="password"
        required
        minLength={8}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Kam se kam 8 characters"
        className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] mb-4"
      />

      <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
        Password Confirm Karo
      </label>
      <input
        type="password"
        required
        minLength={8}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Dobara same password likho"
        className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] mb-5"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#1A1008] text-[#FAF3E2] font-semibold rounded-lg text-sm hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "💾 Password Update Karo"}
      </button>
    </form>
  );
}
