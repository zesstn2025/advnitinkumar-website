import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Cinzel, Space_Mono } from "next/font/google";
import Script from "next/script";
import { createStaticClient } from "@/lib/supabase/static";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adnitinkumar.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adv. Nitin Kumar | Advocate & Legal Consultant — Kaushambi, UP",
    template: "%s | Adv. Nitin Kumar",
  },
  description:
    "Adv. Nitin Kumar, MA LLB — 9+ years of trusted legal practice in Income Tax, GST Law, Banking & Loan Law, Civil & Criminal matters. Kaushambi, Uttar Pradesh.",
  keywords: [
    "Advocate Kaushambi",
    "GST Lawyer UP",
    "Income Tax Advocate",
    "Legal Consultant Manjhanpur",
    "Nitin Kumar Advocate",
    "ITAT Appeals",
    "Banking Loan Law",
  ],
  authors: [{ name: "Adv. Nitin Kumar" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Adv. Nitin Kumar | Advocate & Legal Consultant",
    description:
      "Justice · Integrity · Excellence in Legal Practice. 9+ years of trusted legal counsel in Kaushambi, Uttar Pradesh.",
    siteName: "Adv. Nitin Kumar — Legal Chambers",
    locale: "en_IN",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Adv. Nitin Kumar | Advocate & Legal Consultant",
    description: "Justice · Integrity · Excellence. 9+ years of trusted legal counsel in Kaushambi, UP.",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23C4A464'/%3E%3Ctext x='50' y='68' text-anchor='middle' font-size='52' fill='%23fff'%3E%E2%9A%96%3C/text%3E%3C/svg%3E",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let gaId: string | null = null;
  let gscCode: string | null = null;
  try {
    const supabase = createStaticClient();
    const { data } = await supabase
      .from("site_settings")
      .select("ga_tracking_id, gsc_verification_code")
      .eq("id", 1)
      .single();
    gaId = data?.ga_tracking_id || null;
    gscCode = data?.gsc_verification_code || null;
  } catch {
    // settings not available yet — skip silently
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable} ${spaceMono.variable}`}>
      <head>
        {gscCode && <meta name="google-site-verification" content={gscCode} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Attorney",
              name: "Adv. Nitin Kumar",
              description:
                "Advocate & Legal Consultant with 9+ years experience in Income Tax, GST Law, Banking & Loan Law, Civil & Criminal, ITAT Appeals.",
              telephone: "+91-9889374344",
              email: "advnitin2@gmail.com",
              url: siteUrl,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Infront of Axis Bank, Sirathu Road, Manjhanpur",
                addressLocality: "Kaushambi",
                addressRegion: "Uttar Pradesh",
                postalCode: "212207",
                addressCountry: "IN",
              },
              openingHours: "Mo-Sa 10:00-19:00",
            }),
          }}
        />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
