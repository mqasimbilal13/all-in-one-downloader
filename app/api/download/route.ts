import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");
  const filename = searchParams.get("filename") || "download";

  if (!fileUrl) return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  if (!/^https?:\/\//i.test(fileUrl)) return NextResponse.json({ error: "Invalid url" }, { status: 400 });

  const upstream = await fetch(fileUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
      "Accept": "*/*",
    },
    redirect: "follow",
  }).catch(() => null as any);

  if (!upstream || !upstream.ok || !upstream.body) {
    const status = upstream?.status ?? 502;
    return NextResponse.json({ error: "Failed to fetch upstream", status }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";
  const ext = guessExtFromContentType(contentType);
  const finalName = sanitizeFilename(filename) + (filename.includes(".") ? "" : (ext ? `.${ext}` : ""));

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${finalName}"`,
      "Cache-Control": "no-store",
    },
  });
}

function sanitizeFilename(name: string) {
  return name.replace(/[\/\\?%*:|"<>]/g, "-");
}
function guessExtFromContentType(ct: string) {
  const c = ct.toLowerCase();
  if (c.includes("video/mp4")) return "mp4";
  if (c.includes("video/webm")) return "webm";
  if (c.includes("audio/mpeg")) return "mp3";
  if (c.includes("audio/mp4")) return "m4a";
  if (c.includes("audio/webm")) return "opus";
  return "";
}
