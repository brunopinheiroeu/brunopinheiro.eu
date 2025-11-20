import type { ComponentType } from "react";
import {
  SiFigma,
  SiAdobephotoshop,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVite,
  SiWebpack,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiRedis,
  SiAdobeillustrator,
  SiAdobexd,
  SiSketch,
  SiFramer,
  SiBlender,
  SiUnity,
  SiUnrealengine,
} from "react-icons/si";

export type ToolIcon = ComponentType<{ className?: string }>;

const toolMap: Record<string, ToolIcon> = {
  sifigma: SiFigma,
  figma: SiFigma,
  siadobephotoshop: SiAdobephotoshop,
  photoshop: SiAdobephotoshop,
  siadobeillustrator: SiAdobeillustrator,
  illustrator: SiAdobeillustrator,
  siadobexd: SiAdobexd,
  adobexd: SiAdobexd,
  xd: SiAdobexd,
  sisketch: SiSketch,
  sketch: SiSketch,
  siframer: SiFramer,
  framer: SiFramer,
  sihtml5: SiHtml5,
  html5: SiHtml5,
  html: SiHtml5,
  sicss3: SiCss3,
  css3: SiCss3,
  css: SiCss3,
  sijavascript: SiJavascript,
  javascript: SiJavascript,
  js: SiJavascript,
  sitypescript: SiTypescript,
  typescript: SiTypescript,
  ts: SiTypescript,
  sireact: SiReact,
  react: SiReact,
  sinextdotjs: SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  sinodedotjs: SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  sitailwindcss: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  sivite: SiVite,
  vite: SiVite,
  siwebpack: SiWebpack,
  webpack: SiWebpack,
  sigit: SiGit,
  git: SiGit,
  sigithub: SiGithub,
  github: SiGithub,
  sidocker: SiDocker,
  docker: SiDocker,
  simongodb: SiMongodb,
  mongodb: SiMongodb,
  sipostgresql: SiPostgresql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  sigraphql: SiGraphql,
  graphql: SiGraphql,
  siredis: SiRedis,
  redis: SiRedis,
  siblender: SiBlender,
  blender: SiBlender,
  siunity: SiUnity,
  unity: SiUnity,
  siunrealengine: SiUnrealengine,
  unrealengine: SiUnrealengine,
  unreal: SiUnrealengine,
};

export function mapTools(tools?: string[]) {
  const icons: ToolIcon[] = [];
  const labels: string[] = [];

  if (!tools?.length) {
    return { icons, labels };
  }

  tools.forEach((tool) => {
    const trimmed = tool.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    const Icon = toolMap[key];
    if (Icon) {
      icons.push(Icon);
    } else {
      labels.push(trimmed);
    }
  });

  return { icons, labels };
}

