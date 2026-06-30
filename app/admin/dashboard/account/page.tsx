import { createClient } from "@/lib/supabase/server";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1008] mb-1">Account Settings</h1>
      <p className="text-sm text-[#1A1008]/55 mb-8">
        Logged in as <strong>{user?.email}</strong>
      </p>

      <ChangePasswordForm />
    </div>
  );
}
