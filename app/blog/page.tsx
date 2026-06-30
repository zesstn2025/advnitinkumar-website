import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 1800; // 30 min

export const metadata: Metadata = {
  title: "Legal Articles & Insights",
  description:
    "Read the latest articles on Income Tax, GST Law, Banking & Loan disputes, Civil & Criminal matters, and Business Law by Adv. Nitin Kumar — Kaushambi, Uttar Pradesh.",
  alternates: { canonical: "/blog" },
};

async function getArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("title, slug, excerpt, featured_image, published_at, read_time, category_id, categories(name, slug)")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return data || [];
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <SiteNav />
      <section style={{ paddingTop: 60 }} className="s-dark">
        <div className="sh c reveal v">
          <span className="sec-ew">Legal Insights &amp; Updates</span>
          <h1 className="sec-t">
            Articles &amp; <em>Resources</em>
          </h1>
          <p className="sec-sub">
            In-depth guidance on Income Tax, GST, Banking Law, Civil &amp;
            Criminal matters and more — written by Adv. Nitin Kumar to help
            you understand your legal rights and obligations.
          </p>
        </div>
      </section>

      <section className="s-lt" style={{ paddingTop: 40 }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(26,16,8,.55)" }}>
            <p style={{ fontSize: 18 }}>📝 Articles coming soon. Please check back shortly.</p>
          </div>
        ) : (
          <div className="svc-g">
            {articles.map((a: any) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="sc"
                style={{ display: "block", textDecoration: "none" }}
              >
                {a.featured_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.featured_image}
                    alt={a.title}
                    style={{ width: "100%", height: "190px", objectFit: "cover" }}
                  />
                )}
                <div className="sc-hd">
                  <div>
                    {a.categories?.name && (
                      <div className="sc-sb" style={{ marginBottom: 4 }}>
                        {a.categories.name}
                      </div>
                    )}
                    <div className="sc-tt">{a.title}</div>
                  </div>
                </div>
                <div className="sc-bd">
                  <p style={{ fontSize: 13, color: "rgba(26,16,8,.65)", lineHeight: 1.6, marginBottom: 10 }}>
                    {a.excerpt}
                  </p>
                  <div style={{ fontSize: 11, color: "var(--w3)", letterSpacing: ".05em" }}>
                    {a.published_at &&
                      new Date(a.published_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                    · {a.read_time || 5} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </>
  );
}
