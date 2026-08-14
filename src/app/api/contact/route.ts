import { NextResponse } from "next/server";
import { profile } from "@/content/profile";

/**
 * Contact endpoint for the command palette's `contact` action.
 *
 * Sends through Resend's REST API directly — no SDK, so no dependency added
 * for what is one fetch call.
 *
 * Without RESEND_API_KEY set it returns 503 with `configured: false` rather
 * than pretending to succeed. The UI reads that and tells the visitor to email
 * directly, which is a far better failure than a form that swallows messages.
 */

type Body = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  company?: string;
};

/** Best-effort per-IP limiting. Serverless instances are not shared, so this
 *  thins out casual abuse rather than stopping a determined attacker. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: `Email isn't wired up yet — reach me at ${profile.email}.`,
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read that request." },
      { status: 400 },
    );
  }

  // Bot filled the hidden field. Answer 200 so it learns nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Add your name so I know who I'm replying to." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Tell me a little more — 10 characters minimum." },
      { status: 400 },
    );
  }
  if (message.length > 4000) {
    return NextResponse.json(
      { ok: false, error: "That's over 4,000 characters. Trim it a little." },
      { status: 400 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "That's a few messages in a row — try again later." },
      { status: 429 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? profile.email],
        reply_to: email,
        subject: `sahildayal.vercel.app — ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html:
          `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>` +
          `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the message:", res.status, detail);
      return NextResponse.json(
        {
          ok: false,
          error: `Sending failed. Email me directly at ${profile.email}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route threw:", err);
    return NextResponse.json(
      {
        ok: false,
        error: `Sending failed. Email me directly at ${profile.email}.`,
      },
      { status: 502 },
    );
  }
}
