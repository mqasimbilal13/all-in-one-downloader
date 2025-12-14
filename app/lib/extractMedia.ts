import type { ApiEnvelope, Extracted, MediaItem, Platform } from "./types";

function normalizeEnvelope(payload: ApiEnvelope): any {
  if (payload && typeof payload === "object" && "data" in payload && (payload as any).data) return (payload as any).data;
  return payload;
}

function toPlatform(source: any): Platform {
  const s = String(source || "").toLowerCase();
  if (s.includes("tiktok")) return "tiktok";
  if (s.includes("youtube")) return "youtube";
  if (s.includes("instagram")) return "instagram";
  if (s.includes("facebook")) return "facebook";
  if (s.includes("twitter") || s === "x") return "twitter";
  return "unknown";
}

function safeNum(v: any): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function pickBestVideo(videos: MediaItem[]): MediaItem | undefined {
  const score = (m: MediaItem) => {
    const w = m.width ?? 0;
    const h = m.height ?? 0;
    const br = m.bitrate ?? 0;
    const mux = m.isMuxed ? 1 : 0;
    return mux * 1e12 + (w * h) * 1e6 + br;
  };
  return [...videos].sort((a,b) => score(b) - score(a))[0];
}

function pickBestAudio(audios: MediaItem[]): MediaItem | undefined {
  const score = (m: MediaItem) => (m.bitrate ?? 0) * 1e6 + (m.ext === "m4a" ? 10 : 0);
  return [...audios].sort((a,b) => score(b) - score(a))[0];
}

function pickTikTokNoWatermark(videos: MediaItem[]): MediaItem | undefined {
  for (const q of ["hd_no_watermark", "no_watermark"]) {
    const found = videos.find(v => v.tiktokQuality === q);
    if (found) return found;
  }
  return undefined;
}

function pickTikTokWatermark(videos: MediaItem[]): MediaItem | undefined {
  for (const q of ["hd_watermark", "watermark"]) {
    const found = videos.find(v => v.tiktokQuality === q);
    if (found) return found;
  }
  return undefined;
}

export function extractMedia(payload: ApiEnvelope): Extracted {
  const data = normalizeEnvelope(payload) || {};
  const platform = toPlatform((data as any).source);

  const title = (data as any).title ? String((data as any).title) : undefined;
  const author = (data as any).author ? String((data as any).author) : undefined;
  const thumbnail = (data as any).thumbnail ? String((data as any).thumbnail) : undefined;
  const duration = safeNum((data as any).duration) ?? undefined;
  const originalUrl = (data as any).url ? String((data as any).url) : undefined;

  const medias = Array.isArray((data as any).medias) ? (data as any).medias : [];
  const videos: MediaItem[] = [];
  const audios: MediaItem[] = [];

  for (const m of medias) {
    const url = m?.url;
    if (!url || typeof url !== "string") continue;

    const rawType = String(m?.type || "").toLowerCase();
    const rawExt = (m?.extension || m?.ext || "").toString?.() ?? "";
    const ext = typeof rawExt === "string" ? rawExt.replace(/[^a-z0-9]/gi, "").toLowerCase() : undefined;

    const width = m?.width != null ? safeNum(m.width) : null;
    const height = m?.height != null ? safeNum(m.height) : null;
    const bitrate = m?.bitrate != null ? safeNum(m.bitrate) : null;

    const label = (m?.label != null ? String(m.label) : null) || (m?.quality != null ? String(m.quality) : null) || (rawType === "audio" ? "Audio" : "Video");
    const quality = (m?.quality != null ? String(m.quality) : (m?.label != null ? String(m.label) : null));

    const mime = typeof m?.mimeType === "string" ? m.mimeType : "";
    const isMuxed = Boolean(m?.is_audio === true || (mime.includes("mp4a") && mime.startsWith("video/")));

    let kind: "video" | "audio" = rawType === "audio" ? "audio" : "video";
    if (!rawType) {
      if (mime.startsWith("audio/") || ["mp3","m4a","opus"].includes(ext || "")) kind = "audio";
      else kind = "video";
    }

    const item: MediaItem = {
      kind,
      url,
      label,
      ext: ext || undefined,
      width,
      height,
      bitrate,
      quality,
      isMuxed,
      tiktokQuality: m?.quality != null ? String(m.quality) : null,
    };

    (kind === "audio" ? audios : videos).push(item);
  }

  const sortedVideos = [...videos].sort((a,b) => ((b.width ?? 0)*(b.height ?? 0)) - ((a.width ?? 0)*(a.height ?? 0)) || (b.bitrate ?? 0) - (a.bitrate ?? 0));
  const sortedAudios = [...audios].sort((a,b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));

  const picks: Extracted["picks"] = {
    bestVideo: pickBestVideo(sortedVideos),
    bestAudio: pickBestAudio(sortedAudios),
  };

  if (platform === "tiktok") {
    picks.tiktokNoWatermark = pickTikTokNoWatermark(sortedVideos) || picks.bestVideo;
    picks.tiktokWatermark = pickTikTokWatermark(sortedVideos);
  }

  return { platform, title, author, thumbnail, duration, originalUrl, videos: sortedVideos, audios: sortedAudios, picks };
}
