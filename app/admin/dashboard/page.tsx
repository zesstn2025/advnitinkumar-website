import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const supabase = await createClient();

  const [{ count: totalArticles }, { count: publishedCount }, { count: draftCount }, { count: leadsCount }, { data: recentLeads }, { data: recentArticles }] =
    await Promise.all([
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("articles").select("title, slug, status, views, published_at").order("created_at", { ascending: false }).limit(5),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1008] mb-1">Dashboard Overview</h1>
      <p className="text-sm text-[#1A1008]/55 mb-8">Welcome back! Here&apos;s what&apos;s happening with your website.</p>

      <div className="grid grid-cols-4 gap-5 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-[#A07840]/10 shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#A07840]">{totalArticles ?? 0}</div>
          <div className="text-xs text-[#1A1008]/55 mt-1">Total Articles</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#A07840]/10 shadow-sm">
          <div className="text-3xl font-serif font-bold text-green-600">{publishedCount ?? 0}</div>
          <div className="text-xs text-[#1A1008]/55 mt-1">Published</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#A07840]/10 shadow-sm">
          <div className="text-3xl font-serif font-bold text-amber-600">{draftCount ?? 0}</div>
          <div className="text-xs text-[#1A1008]/55 mt-1">Drafts</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#A07840]/10 shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#A07840]">{leadsCount ?? 0}</div>
          <div className="text-xs text-[#1A1008]/55 mt-1">Total Leads</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#A07840]/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#A07840]/10 flex items-center justify-between">
            <h2 className="font-semibold text-[#1A1008]">Recent Articles</h2>
            <Link href="/admin/dashboard/articles" className="text-xs text-[#A07840]">View all →</Link>
          </div>
          <div className="divide-y divide-[#A07840]/8">
            {(recentArticles || []).length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-[#1A1008]/45">
                No articles yet.{" "}
                <Link href="/admin/dashboard/articles/new" className="text-[#A07840] font-medium">
                  Write your first one →
                </Link>
              </div>
            )}
            {(recentArticles || []).map((a) => (
              <div key={a.slug} className="px-6 py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#1A1008]">{a.title}</div>
                  <div className="text-xs text-[#1A1008]/45 mt-0.5">{a.views || 0} views</div>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                    a.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#A07840]/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#A07840]/10 flex items-center justify-between">
            <h2 className="font-semibold text-[#1A1008]">Recent Leads</h2>
            <Link href="/admin/dashboard/leads" className="text-xs text-[#A07840]">View all →</Link>
          </div>
          <div className="divide-y divide-[#A07840]/8">
            {(recentLeads || []).length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-[#1A1008]/45">No enquiries yet.</div>
            )}
            {(recentLeads || []).map((l: any) => (
              <div key={l.id} className="px-6 py-3.5">
                <div className="text-sm font-medium text-[#1A1008]">{l.name}</div>
                <div className="text-xs text-[#1A1008]/45 mt-0.5">{l.service} · {l.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
