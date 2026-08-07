import { NextResponse } from "next/server";
import { FALLBACK_MESSAGE, deliver } from "@/lib/notify";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  community?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  consent?: unknown;
  /** Honeypot — must stay empty. */
  company?: unknown;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 }
    );
  }

  // Bots fill every field they find; humans never see this one. Answer as if
  // it succeeded so the bot has nothing to tune against.
  if (str(payload.company)) {
    return NextResponse.json({ ok: true, message: "Thank you." });
  }

  const name = str(payload.name);
  const email = str(payload.email);
  const message = str(payload.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 20)
    errors.message =
      "A sentence or two about the property helps us reply usefully.";
  if (payload.consent !== true)
    errors.consent = "Please confirm we may reply to you.";

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors },
      { status: 400 }
    );
  }

  const result = await deliver({
    subject: `Website enquiry — ${name}`,
    replyTo: email,
    fields: {
      Name: name,
      Email: email,
      Phone: str(payload.phone),
      Community: str(payload.community),
      Service: str(payload.service),
      Budget: str(payload.budget),
      Message: message,
    },
  });

  if (!result.delivered) {
    // 503 rather than a false success: an enquiry we cannot deliver must not
    // look like one we received.
    return NextResponse.json(
      { ok: false, message: FALLBACK_MESSAGE },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you — we've got it. You'll hear from a member of the studio within one working day.",
  });
}
