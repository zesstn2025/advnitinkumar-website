import { createClient } from "@/lib/supabase/server";
import { updateSettings } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1008] mb-1">SEO &amp; Marketing Settings</h1>
      <p className="text-sm text-[#1A1008]/55 mb-8">
        Configure default SEO metadata, Google Analytics, and tracking for your website
      </p>

      {searchParams?.saved && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          ✅ Settings saved successfully!
        </div>
      )}

      <form action={updateSettings} className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A1008] mb-4">🌐 Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">Site Title</label>
              <input
                name="site_title"
                defaultValue={settings?.site_title}
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">Default Meta Description</label>
              <textarea
                name="default_meta_description"
                defaultValue={settings?.default_meta_description}
                rows={3}
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A1008] mb-4">📊 Analytics &amp; Tracking</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
                Google Analytics Measurement ID
              </label>
              <input
                name="ga_tracking_id"
                defaultValue={settings?.ga_tracking_id}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] font-mono"
              />
              <p className="text-xs text-[#1A1008]/45 mt-1.5">
                Get this from analytics.google.com → Admin → Data Streams. Tracks visitor traffic.
              </p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
                Google Search Console Verification
              </label>
              <input
                name="gsc_verification_code"
                defaultValue={settings?.gsc_verification_code}
                placeholder="google-site-verification code"
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] font-mono"
              />
              <p className="text-xs text-[#1A1008]/45 mt-1.5">
                Required to submit your sitemap to Google and track ranking. Get from search.google.com/search-console
              </p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">
                Facebook Pixel ID (optional)
              </label>
              <input
                name="fb_pixel_id"
                defaultValue={settings?.fb_pixel_id}
                placeholder="For Facebook/Instagram ad retargeting"
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A1008] mb-4">📞 Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">Phone</label>
              <input
                name="contact_phone"
                defaultValue={settings?.contact_phone}
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A07840] mb-2 font-medium">Email</label>
              <input
                name="contact_email"
                defaultValue={settings?.contact_email}
                className="w-full px-4 py-2.5 border border-[#A07840]/20 rounded-lg text-[#1A1008] text-sm outline-none focus:border-[#A07840]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#1A1008] text-[#FAF3E2] font-semibold rounded-lg text-sm hover:opacity-90 transition"
        >
          💾 Save Settings
        </button>
      </form>

      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-semibold text-amber-900 mb-2">🚀 SEO Checklist (Google First Rank ke liye)</h3>
        <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
          <li>Google Search Console mein property add karo aur sitemap.xml submit karo (<code>/sitemap.xml</code>)</li>
          <li>Google Analytics ID upar daalo — visitor tracking ke liye</li>
          <li>Google Business Profile banao &amp; verify karo (local SEO ke liye sabse important)</li>
          <li>Regularly articles publish karo — Google fresh content ko prefer karta hai</li>
          <li>Har article mein meta description aur keywords zaroor bharo</li>
        </ul>
      </div>
    </div>
  );
}
