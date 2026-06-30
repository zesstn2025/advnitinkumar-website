"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const payload = {
    site_title: formData.get("site_title") as string,
    default_meta_description: formData.get("default_meta_description") as string,
    ga_tracking_id: (formData.get("ga_tracking_id") as string) || null,
    gsc_verification_code: (formData.get("gsc_verification_code") as string) || null,
    fb_pixel_id: (formData.get("fb_pixel_id") as string) || null,
    contact_phone: formData.get("contact_phone") as string,
    contact_email: formData.get("contact_email") as string,
  };

  await supabase.from("site_settings").update(payload).eq("id", 1);

  revalidatePath("/admin/dashboard/settings");
  revalidatePath("/");
  redirect("/admin/dashboard/settings?saved=1");
}
