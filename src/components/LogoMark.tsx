import { useId, useMemo } from "react";
import logoSvg from "@/assets/logo-mark.svg?raw";

type LogoMarkProps = {
  /**
   * dark      = 墨绿原色（浅底用）
   * light     = 白色描形 + 保金（深底用，导航/页脚）
   * watermark = 墨绿改成 6% 白 + 金色保持原样（首屏印章用）
   */
  tone?: "dark" | "light" | "watermark";
  className?: string;
};

/**
 * 品牌徽记。
 *
 * 原始 SVG 用 `.st0`…`.st7` 这套类名上色，并且把配色写在自带 <style> 里。
 * 一旦内联到页面，<style> 就是文档级生效的：同页出现第二个实例（页脚）时，
 * 后渲染的那份会把前一份的类名覆盖掉，导航里的 Q 就会被刷成白色而消失。
 *
 * 因此在挂载前做三件事，让每个实例互不干扰：
 *   1. 把 <style> 里的 class -> fill 抽出来，直接写成元素上的 fill 属性，再删掉 <style>；
 *   2. 给渐变 id 加实例前缀，避免同页重复 id；
 *   3. light 色调只反白墨绿实色，金色渐变一律不动。
 */
function buildMarkup(raw: string, uid: string, tone: "dark" | "light" | "watermark") {
  // 去掉 XML 声明与注释（内联到 HTML 里没有意义，还会被当成异常节点）
  let svg = raw
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

  // 1. 收集配色表：.st0{fill:url(#SVGID_1_);}
  const fills: Record<string, string> = {};
  for (const m of svg.matchAll(/\.(st\d+)\s*\{\s*fill:\s*([^;}]+)/g)) {
    fills[m[1]] = m[2].trim();
  }

  // 2. 删掉 <style>，把 class 换成行内 fill
  svg = svg.replace(/<style[^>]*>[\s\S]*?<\/style>/g, "");
  svg = svg.replace(/class="(st\d+)"/g, (_m, cls: string) => {
    const fill = fills[cls];
    if (!fill) return "";
    // watermark：墨绿主体只留 6% 白，金色羽毛保持原色 → 远处只见金
    if (tone === "watermark" && /^#004[36]3[Ee]$/i.test(fill)) {
      return 'fill="#FFFFFF" fill-opacity="0.06"';
    }
    return `fill="${fill}"`;
  });

  // 3. 渐变 / 组件 id 加实例前缀，顺带去掉 Illustrator 的中文图层 id
  svg = svg
    .replace(/\bid="图层_1"/g, `id="qg-${uid}"`)
    .replace(/SVGID_(\d+)_/g, (_m, n: string) => `qg${uid}-${n}`);

  // 4. 反白：只动墨绿实色，金色（含 stop-color）保持原样
  if (tone === "light") {
    svg = svg
      .replace(/fill="#00463E"/gi, 'fill="#FFFFFF"')
      .replace(/fill="#00433E"/gi, 'fill="#FFFFFF"');
  }

  return svg;
}

export function LogoMark({ tone = "dark", className = "" }: LogoMarkProps) {
  // useId 返回形如 ":r1:" 的字符串，去掉冒号才能安全用于 id
  const uid = useId().replace(/:/g, "");

  const markup = useMemo(() => buildMarkup(logoSvg, uid, tone), [uid, tone]);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:overflow-visible ${className}`}
      aria-label="Qiantong Global"
      role="img"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
