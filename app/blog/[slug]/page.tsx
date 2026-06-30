import { createStaticClient } from "@/lib/supabase/static";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";

export const revalidate = 1800;

type Props = { params: { slug: string } };

async function getArticle(slug: string) {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("articles")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

async function getRelated(categoryId: string | null, excludeSlug: string) {
  const supabase = createStaticClient();
  let query = supabase
    .from("articles")
    .select("title, slug, excerpt, featured_image")
    .eq("status", "published")
    .neq("slug", excludeSlug)
    .limit(3);
  if (categoryId) query = query.eq("category_id", categoryId);
  const { data } = await query;
  return data || [];
}

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase.from("articles").select("slug").eq("status", "published");
  return (data || []).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };

  const title = article.meta_title || article.title;
  const description = article.meta_description || article.excerpt || "";
  const image = article.og_image || article.featured_image;

  return {
    title,
    description,
    keywords: article.keywords ? article.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: { canonical: article.canonical_url || `/blog/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author || "Adv. Nitin Kumar"],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = params;
  const article = await getArticle(slug);
  if (!article) notFound();

  // Fire-and-forget view counter increment (via safe RPC, RLS-compliant)
  const supabase = createStaticClient();
  supabase.rpc("increment_article_views", { article_slug: slug }).then(() => {});

  const related = await getRelated(article.category_id, article.slug);
  const contentHtml = await marked.parse(article.content || "");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adnitinkumar.in";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || article.excerpt,
    image: article.featured_image ? [article.featured_image] : undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: article.author || "Adv. Nitin Kumar" },
    publisher: {
      "@type": "Organization",
      name: "Adv. Nitin Kumar — Legal Chambers",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${article.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />

      <section className="s-dark" style={{ paddingTop: 60, paddingBottom: 40 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 18 }}>
            <Link href="/blog" style={{ fontSize: 12, color: "var(--w1)", letterSpacing: ".1em", textTransform: "uppercase" }}>
              ← Back to Articles
            </Link>
          </div>
          {article.categories?.name && (
            <span className="sec-ew" style={{ marginBottom: 14 }}>
              {article.categories.name}
            </span>
          )}
          <h1 className="sec-t" style={{ marginBottom: 16 }}>
            {article.title}
          </h1>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--dim-l)", flexWrap: "wrap" }}>
            <span>✍️ {article.author || "Adv. Nitin Kumar"}</span>
            <span>
              📅{" "}
              {article.published_at &&
                new Date(article.published_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </span>
            <span>⏱ {article.read_time || 5} min read</span>
          </div>
        </div>
      </section>

      <section className="s-lt" style={{ paddingTop: 40 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {article.featured_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.featured_image}
              alt={article.title}
              style={{ width: "100%", borderRadius: 16, marginBottom: 36, maxHeight: 440, objectFit: "cover" }}
            />
          )}
          <div
            className="article-prose"
            style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(26,16,8,.78)" }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div
            style={{
              marginTop: 48,
              padding: 28,
              background: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(160,120,40,.15)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 15, marginBottom: 14, color: "var(--dark)" }}>
              Need legal assistance with this matter?
            </p>
            <Link href="/#contact" className="btn-pill" style={{ background: "var(--dark)", color: "var(--cream)" }}>
              ⚖ Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="s-dk2">
          <div className="sh c">
            <span className="sec-ew">Related</span>
            <h2 className="sec-t">
              More <em>Articles</em>
            </h2>
          </div>
          <div className="svc-g">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="sc" style={{ display: "block", textDecoration: "none" }}>
                {r.featured_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.featured_image} alt={r.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                )}
                <div className="sc-hd">
                  <div className="sc-tt">{r.title}</div>
                </div>
                <div className="sc-bd">
                  <p style={{ fontSize: 13, color: "var(--dim-l)" }}>{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
