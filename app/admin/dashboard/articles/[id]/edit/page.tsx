import { createClient } from "@/lib/supabase/server";
import ArticleForm from "@/components/ArticleForm";
import { updateArticle } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const { id } = params;
  const supabase = await createClient();

  const [{ data: article }, { data: categories }] = await Promise.all([
    supabase.from("articles").select("*").eq("id", id).single(),
    supabase.from("categories").select("id, name").order("name"),
  ]);

  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1008] mb-1">Edit Article</h1>
      <p className="text-sm text-[#1A1008]/55 mb-8">{article.title}</p>

      <ArticleForm
        action={updateWithId}
        categories={categories || []}
        initial={article}
        errorMsg={searchParams?.error}
      />
    </div>
  );
}
