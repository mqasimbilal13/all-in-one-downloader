"use client";

import { ReactNode } from "react";

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function DownloadButton({
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  children,
  className = "",
}: DownloadButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-lg",
  };

  const width = fullWidth ? "w-full" : "";

  const buttonClass = `${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`.trim();

  const defaultIcon = () => {
    if (icon) return icon;

    if (variant === "primary") {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    }

    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    );
  };

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={typeof children === "string" ? children : "Download button"}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {defaultIcon()}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
