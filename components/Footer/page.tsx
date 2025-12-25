"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 border-t border-slate-600">
      <div className="max-w-7xl mx-auto px-5 py-12">

        {/* Top Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                <rect x="3" y="6" width="10" height="12" rx="2" />
              </svg>

              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-slate-100">
                  All-in-One
                </span>
                <span className="text-xs text-slate-400">
                  Video Downloader
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free video downloader for TikTok, YouTube, Instagram, and more.
              Download videos without watermarks in HD quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-slate-100 mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2">
              {["Home", "Features", "Platforms", "How to Use", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={item === "Home" ? "/" : `#${item.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base font-semibold text-slate-100 mb-4">
              Legal
            </h4>

            <ul className="space-y-2">
              {["Terms", "Privacy", "DMCA", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-600 pt-6 text-center">
          <p className="text-xs text-slate-400">
            © {currentYear} All-in-One Video Downloader. For personal use only.
          </p>
        </div>

      </div>
    </footer>
  );
}
