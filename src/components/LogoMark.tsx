import { useMemo } from "react";
import logoSvg from "@/assets/logo-mark.svg?raw";

type LogoMarkProps = {
  /** dark = 墨绿原色（浅底用）；light = 白色描形 + 保金羽毛（深底用） */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * 品牌徽记。SVG 内联渲染，便于在深色底上把墨绿主体反白，
 * 同时保留金色羽毛的渐变层次。
 */
export function LogoMark({ tone = "dark", className = "" }: LogoMarkProps) {
  const markup = useMemo(() => {
    if (tone === "dark") return logoSvg;
    return logoSvg
      .replace(/#00463E/gi, "#FFFFFF")
      .replace(/#00433E/gi, "#FFFFFF")
      .replace(/viewBox="[^"]*"/, 'viewBox="0 0 595.3 666.9" preserveAspectRatio="xMidYMid meet"');
  }, [tone]);

  return (
    <span
      className={`inline-flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:overflow-visible ${className}`}
      aria-label="Qiantong Global"
      role="img"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
