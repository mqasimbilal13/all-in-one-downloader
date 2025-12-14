export type Platform = "tiktok" | "youtube" | "instagram" | "facebook" | "twitter" | "unknown";
export type MediaKind = "video" | "audio";

export type MediaItem = {
  kind: MediaKind;
  url: string;
  label: string;
  ext?: string;
  width?: number | null;
  height?: number | null;
  bitrate?: number | null;
  quality?: string | null;
  tiktokQuality?: string | null;
  isMuxed?: boolean;
};

export type Extracted = {
  platform: Platform;
  title?: string;
  author?: string;
  thumbnail?: string;
  duration?: number;
  originalUrl?: string;
  videos: MediaItem[];
  audios: MediaItem[];
  picks: {
    tiktokNoWatermark?: MediaItem;
    tiktokWatermark?: MediaItem;
    bestVideo?: MediaItem;
    bestAudio?: MediaItem;
  };
};

export type ApiEnvelope = any;
