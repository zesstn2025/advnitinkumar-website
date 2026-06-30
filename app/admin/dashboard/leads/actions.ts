"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("contact_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin/dashboard/leads");
  revalidatePath("/admin/dashboard");
}
