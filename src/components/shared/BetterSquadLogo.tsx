"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function BetterSquadLogo({ size = "md", showText = true }: LogoProps) {
  const dims = { sm: 24, md: 32, lg: 48 };
  const px = dims[size];
  const textSize = { sm: "text-sm", md: "text-lg", lg: "text-3xl" };

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
        <span className={`font-black tracking-tight text-white ${textSize[size]}`}>
          Better<span className="text-emerald-400">Squad</span>
        </span>
      )}
    </div>
  );
}
