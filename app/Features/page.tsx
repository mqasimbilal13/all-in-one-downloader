"use client";

import Header from "../../components/Header/page";
import Footer from "../../components/Footer/page";

export default function Features() {
  const features = [
    {
      icon: "🎵",
      title: "TikTok Video Downloader",
      description:
        "Download TikTok videos without watermark in HD quality. Save videos from TikTok with audio intact.",
      keywords: [
        "tiktok downloader",
        "tiktok video download",
        "save tiktok videos",
        "download tiktok without watermark",
      ],
    },
    {
      icon: "▶️",
      title: "YouTube Video Downloader",
      description:
        "Download YouTube videos in MP4 format up to 4K quality. Extract audio as MP3 from any YouTube video.",
      keywords: [
        "youtube downloader",
        "youtube to mp4",
        "youtube video download",
        "youtube mp3 converter",
      ],
    },
    {
      icon: "📷",
      title: "Instagram Video Downloader",
      description:
        "Download Instagram Reels, Stories, and posts. Save Instagram videos in highest available quality.",
      keywords: [
        "instagram downloader",
        "download instagram videos",
        "instagram reels download",
        "save instagram stories",
      ],
    },
    {
      icon: "📘",
      title: "Facebook Video Downloader",
      description:
        "Download Facebook videos from posts, reels, and stories. Save Facebook videos for offline viewing.",
      keywords: [
        "facebook video downloader",
        "download facebook videos",
        "facebook video saver",
        "save facebook reels",
      ],
    },
    {
      icon: "🐦",
      title: "Twitter / X Video Downloader",
      description:
        "Download videos from Twitter/X posts. Save Twitter videos in MP4 format with original quality.",
      keywords: [
        "twitter video downloader",
        "download twitter videos",
        "x video download",
        "save twitter videos",
      ],
    },
    {
      icon: "🔴",
      title: "Reddit Video Downloader",
      description:
        "Download Reddit videos from posts and comments. Save Reddit videos with sound easily.",
      keywords: [
        "reddit video downloader",
        "download reddit videos",
        "reddit video saver",
        "save reddit clips",
      ],
    },
    {
      icon: "⚡",
      title: "Fast & Free Downloads",
      description:
        "No speed limits, no registration required. Download videos instantly without any fees.",
      keywords: [
        "free video downloader",
        "fast video download",
        "unlimited downloads",
        "no registration required",
      ],
    },
    {
      icon: "🎯",
      title: "Multiple Quality Options",
      description:
        "Choose from 144p to 4K quality. Download MP3 audio only or video with audio.",
      keywords: [
        "hd video download",
        "multiple quality options",
        "mp3 download",
        "4k video download",
      ],
    },
    {
      icon: "📱",
      title: "Works on All Devices",
      description:
        "Mobile-friendly video downloader. Works on iPhone, Android, PC, and Mac without apps.",
      keywords: [
        "mobile video downloader",
        "iphone video download",
        "android video download",
        "no app needed",
      ],
    },
    {
      icon: "🔒",
      title: "Safe & Secure",
      description:
        "No malware, no viruses. Your privacy is protected — we don’t store your data.",
      keywords: [
        "safe video downloader",
        "secure download",
        "virus-free",
        "privacy protected",
      ],
    },
    {
      icon: "🔄",
      title: "No Watermark Downloads",
      description:
        "Download TikTok and Instagram videos without annoying watermarks.",
      keywords: [
        "no watermark download",
        "tiktok without watermark",
        "instagram without watermark",
        "clean videos",
      ],
    },
    {
      icon: "🌐",
      title: "1000+ Sites Supported",
      description:
        "Download from TikTok, YouTube, Instagram, Facebook, Twitter, Reddit, and many more.",
      keywords: [
        "all in one downloader",
        "multi-platform downloader",
        "social media downloader",
        "video downloader for all sites",
      ],
    },
  ];

  return (
    <>
      <Header />
    <section id="features" className="py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            All-in-One Video Downloader Features
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            Download videos from TikTok, YouTube, Instagram, Facebook, Twitter,
            Reddit, and 1000+ more websites
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                {feature.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {feature.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-slate-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-6">
            Why Choose Our Video Downloader?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "#1 TikTok Video Downloader",
                text:
                  "Download TikTok videos without watermark in HD quality with original sound. Perfect for saving clips, dances, and memes.",
              },
              {
                title: "Best YouTube Video Downloader",
                text:
                  "Download YouTube videos in MP4 up to 4K or extract MP3 audio. Works with music, tutorials, vlogs, and more.",
              },
              {
                title: "Instagram Video Downloader",
                text:
                  "Save Instagram Reels, Stories, IGTV, and posts with sound and best available quality.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <h4 className="font-semibold mb-3">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Support */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-6">
            Supported Video Platforms
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              ["TikTok", "Most Popular"],
              ["YouTube", "HD Support"],
              ["Instagram", "Reels & Stories"],
              ["Facebook", "Posts & Reels"],
              ["Twitter / X", "Video Posts"],
              ["Reddit", "Clips & GIFs"],
              ["Vimeo", "High Quality"],
              ["Dailymotion", "HD Videos"],
              ["Snapchat", "Stories"],
              ["Twitch", "Clips"],
              ["Likee", "Short Videos"],
              ["1000+ More", "All Sites"],
            ].map(([name, badge], i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-3"
              >
                <span className="font-medium">{name}</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full">
                  {badge}
                </span>
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
