import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deleteArticle, toggleStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function ArticlesListPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, status, views, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1008]">Articles</h1>
          <p className="text-sm text-[#1A1008]/55 mt-1">Manage all your blog articles</p>
        </div>
        <Link
          href="/admin/dashboard/articles/new"
          className="px-5 py-2.5 bg-[#1A1008] text-[#FAF3E2] rounded-lg text-sm font-medium hover:opacity-90"
        >
          ➕ New Article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#A07840]/10 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F5F2EC] text-left text-xs uppercase tracking-wider text-[#1A1008]/50">
              <th className="px-6 py-3.5 font-medium">Title</th>
              <th className="px-6 py-3.5 font-medium">Status</th>
              <th className="px-6 py-3.5 font-medium">Views</th>
              <th className="px-6 py-3.5 font-medium">Published</th>
              <th className="px-6 py-3.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A07840]/8">
            {(articles || []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#1A1008]/45">
                  No articles yet.{" "}
                  <Link href="/admin/dashboard/articles/new" className="text-[#A07840] font-medium">
                    Write your first article →
                  </Link>
                </td>
              </tr>
            )}
            {(articles || []).map((a) => (
              <tr key={a.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-[#1A1008]">{a.title}</div>
                  <div className="text-xs text-[#1A1008]/40">/blog/{a.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                      a.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#1A1008]/70">{a.views || 0}</td>
                <td className="px-6 py-4 text-[#1A1008]/55 text-xs">
                  {a.published_at
                    ? new Date(a.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                    : "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/dashboard/articles/${a.id}/edit`}
                      className="text-xs px-3 py-1.5 rounded-lg border border-[#A07840]/25 text-[#A07840] hover:bg-[#A07840]/5"
                    >
                      Edit
                    </Link>
                    <form action={toggleStatus.bind(null, a.id, a.status)}>
                      <button
                        type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg border border-[#A07840]/25 text-[#A07840] hover:bg-[#A07840]/5"
                      >
                        {a.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={deleteArticle.bind(null, a.id)}>
                      <button
                        type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
