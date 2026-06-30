"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slugInput = (formData.get("slug") as string)?.trim();
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;

  const slug = slugInput ? slugify(slugInput) : slugify(title);

  const payload = {
    title,
    slug,
    excerpt: (formData.get("excerpt") as string) || null,
    content,
    featured_image: (formData.get("featured_image") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
    keywords: (formData.get("keywords") as string) || null,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    read_time: estimateReadTime(content),
  };

  const { error } = await supabase.from("articles").insert(payload);

  if (error) {
    redirect(`/admin/dashboard/articles/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/dashboard/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slugInput = (formData.get("slug") as string)?.trim();
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;

  // Check current status to know if we're newly publishing
  const { data: existing } = await supabase.from("articles").select("status, published_at").eq("id", id).single();

  const slug = slugInput ? slugify(slugInput) : slugify(title);

  const payload: any = {
    title,
    slug,
    excerpt: (formData.get("excerpt") as string) || null,
    content,
    featured_image: (formData.get("featured_image") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
    keywords: (formData.get("keywords") as string) || null,
    status,
    read_time: estimateReadTime(content),
  };

  if (status === "published" && existing?.status !== "published") {
    payload.published_at = new Date().toISOString();
  }

  const { error } = await supabase.from("articles").update(payload).eq("id", id);

  if (error) {
    redirect(`/admin/dashboard/articles/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/dashboard/articles");
}

export async function deleteArticle(id: string) {
  "use server";
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/blog");
}

export async function toggleStatus(id: string, currentStatus: string) {
  "use server";
  const supabase = await createClient();
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const updates: any = { status: newStatus };
  if (newStatus === "published") {
    const { data } = await supabase.from("articles").select("published_at").eq("id", id).single();
    if (!data?.published_at) updates.published_at = new Date().toISOString();
  }
  await supabase.from("articles").update(updates).eq("id", id);
  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/blog");
  revalidatePath("/");
}
