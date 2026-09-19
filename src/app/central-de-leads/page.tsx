import type { Metadata } from "next";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import LeadsLogin from "@/components/admin/LeadsLogin";
import LeadsDashboard from "@/components/admin/LeadsDashboard";

export const metadata: Metadata = {
  title: "Central de Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CentralDeLeadsPage() {
  const configured = isAdminConfigured();
  const authenticated = configured && (await isAdminAuthenticated());

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-ink-50">
      {authenticated ? (
        <LeadsDashboard />
      ) : (
        <LeadsLogin configured={configured} />
      )}
    </div>
  );
}
