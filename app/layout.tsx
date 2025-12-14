import "./globals.css";

export const metadata = {
  title: "Social Video Downloader",
  description: "RapidAPI social-download-all-in-one downloader",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
