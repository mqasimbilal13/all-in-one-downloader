"use client";

import { useMemo, useState } from "react";
import { extractMedia } from "./lib/extractMedia";
import type { Extracted, MediaItem } from "./lib/types";

function fileNameFrom(meta: Extracted, item: MediaItem) {
  const base =
    (meta.title || meta.platform || "download")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "download";

  const suffix =
    item.kind === "audio"
      ? "audio"
      : item.width && item.height
        ? `${item.height}p`
        : item.ext || "video";

  const ext = item.ext || (item.kind === "audio" ? "mp3" : "mp4");
  return `${base}-${suffix}.${ext}`;
}

export default function Page() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const meta = useMemo(() => (raw ? extractMedia(raw) : null), [raw]);

  async function onFetch() {
    setLoading(true);
    setError(null);
    setRaw(null);
    try {
      const r = await fetch("/api/autolink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json?.error || "Failed to fetch");
      setRaw(json);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function download(item: MediaItem) {
    if (!meta) return;
    const filename = fileNameFrom(meta, item);
    const dl = `/api/download?url=${encodeURIComponent(item.url)}&filename=${encodeURIComponent(filename)}`;
    window.open(dl, "_blank");
  }

  return (
    <main style={{ maxWidth: 980, margin: "32px auto", padding: 16 }}>
      <div className="grid">
        <div className="card">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>Social Video Downloader</div>
              <div className="muted" style={{ marginTop: 6 }}>
                TikTok / YouTube / Instagram etc. (as long as API returns <code>medias[]</code>)
              </div>
            </div>
            <span className="pill">RapidAPI + download proxy</span>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok / YouTube / Instagram URL..."
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #23263a",
                background: "#0f1118",
                color: "#e6e6e6",
              }}
            />
            <button className="btn" onClick={onFetch} disabled={loading || !url}>
              {loading ? "Fetching..." : "Fetch"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid #5a2b2b", background: "#1a1010" }}>
              {error}
            </div>
          )}
        </div>

        {meta && (
          <div className="card">
            <div className="row" style={{ gap: 14 }}>
              {meta.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={meta.thumbnail}
                  alt="thumb"
                  style={{ width: 120, height: 120, borderRadius: 12, objectFit: "cover", border: "1px solid #23263a" }}
                />
              ) : null}
              <div className="stack" style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{meta.title || "Untitled"}</div>
                <div className="row" style={{ flexWrap: "wrap" }}>
                  <span className="pill">Platform: {meta.platform}</span>
                  {meta.author ? <span className="pill">Author: {meta.author}</span> : null}
                  {meta.duration != null ? <span className="pill">Duration: {meta.duration}s</span> : null}
                </div>
                {meta.originalUrl ? <div className="muted" style={{ wordBreak: "break-all" }}>{meta.originalUrl}</div> : null}
              </div>
            </div>

            <hr />

            <div className="row" style={{ flexWrap: "wrap" }}>
              {meta.platform === "tiktok" ? (
                <>
                  <button className="btn" onClick={() => meta.picks.tiktokNoWatermark && download(meta.picks.tiktokNoWatermark)} disabled={!meta.picks.tiktokNoWatermark}>
                    Download No Watermark
                  </button>
                  <button className="btn2" onClick={() => meta.picks.tiktokWatermark && download(meta.picks.tiktokWatermark)} disabled={!meta.picks.tiktokWatermark}>
                    Download Watermark
                  </button>
                  <button className="btn2" onClick={() => meta.picks.bestAudio && download(meta.picks.bestAudio)} disabled={!meta.picks.bestAudio}>
                    Download Audio
                  </button>
                </>
              ) : (
                <>
                  <button className="btn" onClick={() => meta.picks.bestVideo && download(meta.picks.bestVideo)} disabled={!meta.picks.bestVideo}>
                    Download Best Video
                  </button>
                  <button className="btn2" onClick={() => meta.picks.bestAudio && download(meta.picks.bestAudio)} disabled={!meta.picks.bestAudio}>
                    Download Best Audio
                  </button>
                </>
              )}
            </div>

            <hr />

            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="card" style={{ borderRadius: 12 }}>
                <div style={{ fontWeight: 800, marginBottom: 10 }}>Video options ({meta.videos.length})</div>
                <div className="stack">
                  {meta.videos.map((v) => (
                    <div key={v.url} className="card" style={{ padding: 12, borderRadius: 12 }}>
                      <div className="row" style={{ justifyContent: "space-between" }}>
                        <div className="stack" style={{ gap: 4 }}>
                          <div style={{ fontWeight: 700 }}>{v.label}</div>
                          <div className="muted" style={{ fontSize: 12 }}>
                            {v.ext?.toUpperCase() || "VIDEO"}
                            {v.width && v.height ? ` • ${v.width}x${v.height}` : ""}
                            {v.bitrate ? ` • ${Math.round(v.bitrate / 1000)} kbps` : ""}
                            {v.isMuxed ? " • muxed audio" : ""}
                            {v.tiktokQuality ? ` • ${v.tiktokQuality}` : ""}
                          </div>
                        </div>
                        <button className="btn2" onClick={() => download(v)}>Download</button>
                      </div>
                    </div>
                  ))}
                  {meta.videos.length === 0 ? <div className="muted">No video streams found.</div> : null}
                </div>
              </div>

              <div className="card" style={{ borderRadius: 12 }}>
                <div style={{ fontWeight: 800, marginBottom: 10 }}>Audio options ({meta.audios.length})</div>
                <div className="stack">
                  {meta.audios.map((a) => (
                    <div key={a.url} className="card" style={{ padding: 12, borderRadius: 12 }}>
                      <div className="row" style={{ justifyContent: "space-between" }}>
                        <div className="stack" style={{ gap: 4 }}>
                          <div style={{ fontWeight: 700 }}>{a.label}</div>
                          <div className="muted" style={{ fontSize: 12 }}>
                            {a.ext?.toUpperCase() || "AUDIO"}
                            {a.bitrate ? ` • ${Math.round(a.bitrate / 1000)} kbps` : ""}
                          </div>
                        </div>
                        <button className="btn2" onClick={() => download(a)}>Download</button>
                      </div>
                    </div>
                  ))}
                  {meta.audios.length === 0 ? <div className="muted">No audio streams found.</div> : null}
                </div>
              </div>
            </div>

            <details style={{ marginTop: 12 }}>
              <summary style={{ cursor: "pointer" }}>Debug JSON</summary>
              <pre>{JSON.stringify(raw, null, 2)}</pre>
            </details>
          </div>
        )}
      </div>
    </main>
  );
}
