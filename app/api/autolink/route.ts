import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const url = body?.url;

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const key = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST || "social-download-all-in-one.p.rapidapi.com";

  if (!key) {
    return NextResponse.json({ error: "Missing RAPIDAPI_KEY in .env.local" }, { status: 500 });
  }

  const r = await fetch("https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink", {
    method: "POST",
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
