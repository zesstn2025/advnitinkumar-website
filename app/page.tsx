import { createClient } from "@/lib/supabase/server";
import homeMarkup1 from "@/lib/homeMarkup1";
import homeMarkup2 from "@/lib/homeMarkup2";
import homeScript from "@/lib/homeScript";
import Link from "next/link";

export const revalidate = 3600; // refresh latest articles every hour

async function getLatestArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("title, slug, excerpt, featured_image, published_at, read_time")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);
  return data || [];
}

export default async function HomePage() {
  const articles = await getLatestArticles();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return (
    <>
      {/* Inject Supabase config as globals for the vanilla JS contact form */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.SUPABASE_URL=${JSON.stringify(
            supabaseUrl
          )};window.SUPABASE_ANON_KEY=${JSON.stringify(supabaseAnon)};`,
        }}
      />

      {/* Original static design — part 1 (everything before footer) */}
      <div dangerouslySetInnerHTML={{ __html: homeMarkup1 }} />

      {/* Dynamic "Latest Articles" section — real React, SEO-friendly internal links */}
      {articles.length > 0 && (
        <section id="articles" className="s-lt">
          <div className="sh c reveal v">
            <span className="sec-ew">Legal Insights</span>
            <h2 className="sec-t">
              Latest <em>Articles</em>
            </h2>
            <p className="sec-sub">
              Stay informed with the latest legal updates, tax guidance, and
              compliance insights from Adv. Nitin Kumar.
            </p>
          </div>
          <div className="svc-g">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="sc reveal v"
                style={{ display: "block", textDecoration: "none" }}
              >
                {a.featured_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.featured_image}
                    alt={a.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="sc-hd">
                  <div>
                    <div className="sc-tt">{a.title}</div>
                    <div className="sc-sb">{a.read_time || 5} min read</div>
                  </div>
                </div>
                <div className="sc-bd">
                  <p style={{ fontSize: 13, color: "rgba(26,16,8,.65)", lineHeight: 1.6 }}>
                    {a.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/blog" className="btn-pill" style={{ background: "var(--dark)", color: "var(--cream)" }}>
              Read All Articles →
            </Link>
          </div>
        </section>
      )}

      {/* Original static design — part 2 (footer) */}
      <div dangerouslySetInnerHTML={{ __html: homeMarkup2 }} />

      {/* Original vanilla JS (cursor, nav, reveal, canvas, forms etc.) */}
      <script dangerouslySetInnerHTML={{ __html: homeScript }} />
    </>
  );
}
