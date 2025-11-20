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
  SiOpenai,
  SiFastapi,
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
  siopenai: SiOpenai,
  openai: SiOpenai,
  sifastapi: SiFastapi,
  fastapi: SiFastapi,
};

export type ToolItem = {
  key: string;
  label: string;
  Icon?: ToolIcon;
};

function normalizeToolsInput(tools?: string[] | string): string[] {
  if (!tools) return [];
  if (Array.isArray(tools)) return tools;
  return tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);
}

export function getToolItems(tools?: string[] | string): ToolItem[] {
  const normalized = normalizeToolsInput(tools);
  if (!normalized.length) return [];

  return normalized
    .map((tool, index) => {
      const key = `${tool}-${index}`;
      const lookup = tool.toLowerCase();
      const Icon = toolMap[lookup];
      return {
        key,
        label: tool,
        Icon,
      };
    })
    .filter((item) => !!item.label);
}
