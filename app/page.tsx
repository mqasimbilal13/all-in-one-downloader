"use client";

import { useMemo, useState } from "react";
import { extractMedia } from "./lib/extractMedia";
import type { Extracted, MediaItem } from "./lib/types";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";
import DownloadButton from "../components/DownloadButton/page";
import Image from "next/image";

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
  const [pasteLoading, setPasteLoading] = useState(false);

  const meta = useMemo(() => (raw ? extractMedia(raw) : null), [raw]);

  async function handlePaste() {
    setPasteLoading(true);
    try {
      const text = await navigator.clipboard.readText();
      if (text.startsWith("http")) setUrl(text);
      else setError("Clipboard doesn't contain a valid URL");
    } catch {
      setError("Unable to access clipboard");
    } finally {
      setPasteLoading(false);
    }
  }

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
    const dl = `/api/download?url=${encodeURIComponent(
      item.url
    )}&filename=${encodeURIComponent(filename)}`;
    window.open(dl, "_blank");
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-950 text-white">
        {/* HERO */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            All-in-One Video Downloader
          </h1>
          <p className="mt-4 text-slate-400">
            Download videos from TikTok, YouTube, Instagram & more
          </p>
        </section>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* INPUT CARD */}
          <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-1">Paste Video URL</h2>
            <p className="text-sm text-slate-400 mb-6">
              Supports TikTok, YouTube, Instagram & more
            </p>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste video URL here..."
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && onFetch()}
                className="flex-1 rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handlePaste}
                disabled={pasteLoading}
                className="rounded-lg bg-slate-700 px-4 py-3 hover:bg-slate-600 transition"
              >
                {pasteLoading ? "Pasting..." : "Paste"}
              </button>

              <button
                onClick={onFetch}
                disabled={loading || !url}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 transition"
              >
                {loading ? "Fetching..." : "Fetch"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-900/40 px-4 py-3 text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* RESULTS */}
          {meta && (
            <div className="mt-10 bg-slate-900 rounded-xl p-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {meta.thumbnail && (
                  <Image
                    src={meta.thumbnail}
                    alt="thumbnail"
                    className="w-full md:w-64 rounded-lg"
                  />
                )}

                <div>
                  <h3 className="text-xl font-semibold">
                    {meta.title || "Untitled"}
                  </h3>
                  <p className="text-slate-400 mt-1">
                    {meta.platform} {meta.author && `• ${meta.author}`}
                  </p>
                </div>
              </div>

              {/* QUICK DOWNLOAD */}
              <div className="flex flex-wrap gap-3">
                {meta.picks.bestVideo && (
                  <DownloadButton
                    variant="success"
                    onClick={() => download(meta.picks.bestVideo!)}
                  >
                    Download Best Video
                  </DownloadButton>
                )}

                {meta.picks.bestAudio && (
                  <DownloadButton
                    variant="primary"
                    onClick={() => download(meta.picks.bestAudio!)}
                  >
                    Download Audio
                  </DownloadButton>
                )}
              </div>
            </div>
          )}

          {/* FEATURES */}
          <section id="features" className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                ["📋", "Easy Paste"],
                ["⚡", "Fast Downloads"],
                ["🎯", "Multiple Qualities"],
                ["🔒", "Secure"],
              ].map(([icon, title]) => (
                <div
                  key={title}
                  className="bg-slate-900 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-semibold">{title}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
