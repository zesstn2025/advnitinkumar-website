import { createClient } from "@/lib/supabase/server";
import { updateLeadStatus } from "./actions";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1008]">Leads / Enquiries</h1>
        <p className="text-sm text-[#1A1008]/55 mt-1">
          All contact form submissions from your website ({leads?.length || 0} total)
        </p>
      </div>

      <div className="space-y-4">
        {(leads || []).length === 0 && (
          <div className="bg-white rounded-2xl border border-[#A07840]/10 p-12 text-center text-[#1A1008]/45">
            No enquiries received yet. They&apos;ll appear here when someone fills the contact form on your website.
          </div>
        )}
        {(leads || []).map((l: any) => (
          <div key={l.id} className="bg-white rounded-2xl border border-[#A07840]/10 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-[#1A1008]">{l.name}</h3>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusColors[l.status] || statusColors.new}`}>
                    {l.status}
                  </span>
                </div>
                <div className="text-xs text-[#1A1008]/50 mt-1">
                  {new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </div>
              </div>
              <div className="flex gap-2">
                <form action={updateLeadStatus.bind(null, l.id, "contacted")}>
                  <button type="submit" className="text-xs px-3 py-1.5 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50">
                    Mark Contacted
                  </button>
                </form>
                <form action={updateLeadStatus.bind(null, l.id, "resolved")}>
                  <button type="submit" className="text-xs px-3 py-1.5 rounded-lg border border-green-300 text-green-700 hover:bg-green-50">
                    Mark Resolved
                  </button>
                </form>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <div className="text-[10px] uppercase text-[#A07840] tracking-wide">Phone</div>
                <a href={`tel:${l.phone}`} className="text-[#1A1008]">{l.phone}</a>
              </div>
              {l.email && (
                <div>
                  <div className="text-[10px] uppercase text-[#A07840] tracking-wide">Email</div>
                  <a href={`mailto:${l.email}`} className="text-[#1A1008]">{l.email}</a>
                </div>
              )}
              {l.city && (
                <div>
                  <div className="text-[10px] uppercase text-[#A07840] tracking-wide">City</div>
                  <div className="text-[#1A1008]">{l.city}</div>
                </div>
              )}
              <div>
                <div className="text-[10px] uppercase text-[#A07840] tracking-wide">Service</div>
                <div className="text-[#1A1008]">{l.service}</div>
              </div>
            </div>
            {l.organization && (
              <div className="text-sm mb-2">
                <span className="text-[10px] uppercase text-[#A07840] tracking-wide mr-2">Organization:</span>
                <span className="text-[#1A1008]">{l.organization}</span>
              </div>
            )}
            <div className="bg-[#F5F2EC] rounded-lg p-3 text-sm text-[#1A1008]/75 leading-relaxed">
              {l.message}
            </div>
            <a
              href={`https://wa.me/91${l.phone.replace(/\D/g, "").slice(-10)}`}
              target="_blank"
              rel="noopener"
              className="inline-block mt-3 text-xs px-4 py-2 rounded-lg bg-green-50 border border-green-300 text-green-700"
            >
              💬 Reply on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
