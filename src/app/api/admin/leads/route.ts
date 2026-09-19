import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isStoreConfigured, listLeads } from "@/lib/leads-store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isStoreConfigured()) {
    return NextResponse.json({ ok: true, configured: false, leads: [] });
  }
  try {
    const leads = await listLeads();
    return NextResponse.json(
      { ok: true, configured: true, leads },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[Leads] Falha ao listar", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
