"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = { id: string; name: string };
type Article = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  category_id?: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  status?: string;
};

export default function ArticleForm({
  action,
  categories,
  initial,
  errorMsg,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  initial?: Article;
  errorMsg?: string;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [image, setImage] = useState(initial?.featured_image || "");
  const [uploading, setUploading] = useState(false);

  function autoSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("article-images").upload(fileName, file);
    if (!error) {
      const { data } = supabase.storage.from("article-images").getPublicUrl(fileName);
      setImage(data.publicUrl);
    } else {
      alert("Upload failed: " + error.message);
    }
    setUploading(false);
  }

  return (
    <form action={action} className="space-y-6">
      {errorMsg && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          Error: {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* MAIN COLUMN */}
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
              Article Title *
            </label>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(autoSlug(e.target.value));
              }}
              placeholder="e.g. Complete Guide to GST Registration in 2026"
              className="w-full px-4 py-3 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-lg font-serif outline-none focus:border-[#A07840]"
            />

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-5 font-medium">
              URL Slug
            </label>
            <div className="flex items-center gap-1 text-sm text-[#1A1008]/50">
              <span>/blog/</span>
              <input
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugTouched(true);
                }}
                placeholder="auto-generated-from-title"
                className="flex-1 px-3 py-2 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840]"
              />
            </div>

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-5 font-medium">
              Excerpt (short summary for cards &amp; search results)
            </label>
            <textarea
              name="excerpt"
              defaultValue={initial?.excerpt}
              rows={2}
              placeholder="A brief 1-2 sentence summary of the article..."
              className="w-full px-4 py-3 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] resize-none"
            />

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-5 font-medium">
              Content * (Markdown supported: **bold**, ## Heading, - lists, [link](url))
            </label>
            <textarea
              name="content"
              required
              defaultValue={initial?.content}
              rows={20}
              placeholder={`## Introduction\n\nWrite your article here using Markdown formatting...\n\n## Key Points\n\n- Point one\n- Point two\n\n## Conclusion\n\nWrap up your article.`}
              className="w-full px-4 py-3 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
              Status
            </label>
            <select
              name="status"
              defaultValue={initial?.status || "draft"}
              className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840]"
            >
              <option value="draft">📝 Draft</option>
              <option value="published">✅ Published</option>
            </select>

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-5 font-medium">
              Category
            </label>
            <select
              name="category_id"
              defaultValue={initial?.category_id || ""}
              className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840]"
            >
              <option value="">-- None --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-5 font-medium">
              Featured Image
            </label>
            <input type="hidden" name="featured_image" value={image} />
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="Featured" className="w-full h-32 object-cover rounded-lg mb-2" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs text-[#1A1008]/60"
            />
            {uploading && <p className="text-xs text-[#A07840] mt-1">Uploading...</p>}
          </div>

          <div className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1A1008] mb-4">🔍 SEO Settings</h3>

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
              Meta Title (Google search title)
            </label>
            <input
              name="meta_title"
              defaultValue={initial?.meta_title}
              placeholder="Leave empty to use article title"
              className="w-full px-3 py-2 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-xs outline-none focus:border-[#A07840]"
            />

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-4 font-medium">
              Meta Description
            </label>
            <textarea
              name="meta_description"
              defaultValue={initial?.meta_description}
              rows={3}
              placeholder="Shown in Google search results (150-160 chars ideal)"
              className="w-full px-3 py-2 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-xs outline-none focus:border-[#A07840] resize-none"
            />

            <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 mt-4 font-medium">
              Keywords (comma separated)
            </label>
            <input
              name="keywords"
              defaultValue={initial?.keywords}
              placeholder="gst registration, gst guide, tax filing"
              className="w-full px-3 py-2 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-xs outline-none focus:border-[#A07840]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#1A1008] text-[#FAF3E2] font-semibold rounded-lg text-sm hover:opacity-90 transition"
          >
            💾 Save Article
          </button>
        </div>
      </div>
    </form>
  );
}
