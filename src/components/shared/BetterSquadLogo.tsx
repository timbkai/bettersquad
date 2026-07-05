"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  tone?: "light" | "dark";
}

export default function BetterSquadLogo({
  size = "md",
  showText = true,
  tone = "light",
}: LogoProps) {
  const dims = { sm: 24, md: 32, lg: 48 };
  const px = dims[size];
  const textColor = tone === "dark" ? "text-slate-950" : "text-white";
  const accentColor = "text-emerald-400";

  return (
    <div className="flex items-center gap-2">
      {/* Diamond icon */}
      <div
        style={{ width: px, height: px }}
        className="relative flex items-center justify-center"
      >
        <div
          className="bg-emerald-500 rotate-45 rounded-sm"
          style={{ width: px * 0.7, height: px * 0.7 }}
        />
        <span
          className="absolute text-white font-black"
          style={{ fontSize: px * 0.38 }}
        >
          B
        </span>
      </div>
      {showText && (
        <span className={`font-black tracking-tight ${textColor} ${size === "sm" ? "text-sm" : "text-lg"}`}>
          Better<span className={accentColor}>Squad</span>
        </span>
      )}
    </div>
  );
}
