"use client";

import Header from "../../components/Header/page";
import Footer from "../../components/Footer/page";

export default function Platforms() {
  const platforms = [
    {
      name: "TikTok",
      icon: "🎵",
      description:
        "Download TikTok videos without watermark in HD quality. Save TikTok videos with sound.",
      features: ["No Watermark", "HD Quality", "With Audio", "Fast Download"],
      keywords: [
        "tiktok video downloader",
        "download tiktok videos",
        "tiktok without watermark",
        "save tiktok videos",
        "tiktok video saver",
        "tiktok mp4 download",
      ],
      popularSearches: [
        "how to download tiktok videos",
        "tiktok downloader online",
        "tiktok video download 2024",
        "download tiktok hd",
      ],
    },
    {
      name: "YouTube",
      icon: "▶️",
      description:
        "Download YouTube videos in MP4 up to 4K. Convert YouTube to MP3 audio.",
      features: ["4K Support", "MP3 Audio", "Multiple Qualities", "Subtitles"],
      keywords: [
        "youtube video downloader",
        "youtube to mp4",
        "youtube mp3 converter",
        "download youtube videos",
      ],
      popularSearches: [
        "youtube downloader free",
        "download youtube mp4",
        "youtube to mp3 converter",
      ],
    },
  ];

  return (
    <>
    <Header />
    <section id="platforms" className="py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Supported Video Platforms
          </h1>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            Download videos from TikTok, YouTube, Instagram, Facebook, Twitter,
            Reddit, and 1000+ more websites.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{platform.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    {platform.name} Video Downloader
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {platform.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {platform.description}
              </p>

              {/* Keywords */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Popular Search Terms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {platform.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Searches */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Users Also Search For
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {platform.popularSearches.map((search, idx) => (
                    <li key={idx}>{search}</li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="#download"
                className="mt-auto inline-flex items-center justify-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 transition"
              >
                Download {platform.name} Videos →
              </a>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold mb-3">
              Best TikTok Video Downloader
            </h2>
            <p className="text-gray-600 text-sm">
              Download TikTok videos without watermark in HD quality. Works on
              all devices with no registration required.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              Free YouTube Downloader
            </h2>
            <p className="text-gray-600 text-sm">
              Download YouTube videos up to 4K or convert videos to MP3 audio
              quickly and easily.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              Instagram Reels & Stories
            </h2>
            <p className="text-gray-600 text-sm">
              Save Instagram Reels, Stories, and posts in high quality directly
              from your browser.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Is this video downloader free?",
                "Yes, it is 100% free with no hidden charges.",
              ],
              [
                "Does it remove TikTok watermark?",
                "Yes, TikTok videos are downloaded without watermark.",
              ],
              [
                "Do you store videos?",
                "No, all downloads are processed in real-time.",
              ],
              [
                "Is it legal?",
                "Only download content you own or have permission to use.",
              ],
              [
                "Does it work on mobile?",
                "Yes, works on Android, iPhone, tablets, and desktop.",
              ],
            ].map(([q, a], idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}
