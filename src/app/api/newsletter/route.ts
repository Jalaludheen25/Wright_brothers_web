import { NextResponse } from "next/server";
import { FALLBACK_MESSAGE, deliver } from "@/lib/notify";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function POST(request: Request) {
  let email: unknown;
  let interest: unknown;

  try {
    ({ email, interest } = (await request.json()) as {
      email?: unknown;
      interest?: unknown;
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 }
    );
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // The capabilities showcase reuses this endpoint to register interest in a
  // department that has not launched yet.
  const topic = typeof interest === "string" ? interest.trim().slice(0, 120) : "";

  const result = await deliver({
    subject: topic
      ? `Capability interest — ${topic}`
      : "The Quarterly — new subscriber",
    fields: {
      Email: email.trim(),
      Source: topic ? "Capabilities showcase" : "Website footer",
      ...(topic ? { Interest: topic } : {}),
    },
  });

  if (!result.delivered) {
    return NextResponse.json(
      { ok: false, message: FALLBACK_MESSAGE },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: topic
      ? "Noted — we'll write to you once it's running."
      : "Thank you — you're on the list for the next issue.",
  });
}
