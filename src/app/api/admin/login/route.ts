import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminConfigured,
  passwordMatches,
  sessionCookieOptions,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Acesso não configurado." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Atraso fixo dificulta tentativas em massa de adivinhar a senha.
  await new Promise((r) => setTimeout(r, 700));

  if (!passwordMatches(password)) {
    return NextResponse.json(
      { ok: false, message: "Senha incorreta." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
  return res;
}
