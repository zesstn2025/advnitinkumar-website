import { createClient } from "@/lib/supabase/server";
import ArticleForm from "@/components/ArticleForm";
import { createArticle } from "../actions";

export default async function NewArticlePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1008] mb-1">New Article</h1>
      <p className="text-sm text-[#1A1008]/55 mb-8">Write and publish a new blog article</p>

      <ArticleForm action={createArticle} categories={categories || []} errorMsg={searchParams?.error} />
    </div>
  );
}
