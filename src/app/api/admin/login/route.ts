import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminConfigured,
  passwordMatches,
  usernameMatches,
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
  let username = "";
  try {
    const body = (await request.json()) as {
      password?: string;
      username?: string;
    };
    password = body.password ?? "";
    username = body.username ?? "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Atraso fixo dificulta tentativas em massa de adivinhar a senha.
  await new Promise((r) => setTimeout(r, 700));

  const userOk = usernameMatches(username);
  const passOk = passwordMatches(password);
  if (!userOk || !passOk) {
    return NextResponse.json(
      { ok: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
  return res;
}
