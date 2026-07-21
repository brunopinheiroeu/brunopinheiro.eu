import type { ComponentType } from "react";
import * as SimpleIcons from "react-icons/si";
import { FaPhotoVideo } from "react-icons/fa";
import { Code2 } from "lucide-react";

export type ToolIcon = ComponentType<{ className?: string }>;

const simpleIcons = SimpleIcons as Record<string, ToolIcon | undefined>;

const iconAliases: Record<string, ToolIcon> = {
  ai: simpleIcons.SiOpenai!,
  adobeillustrator: simpleIcons.SiAdobeillustrator!,
  adobephotoshop: simpleIcons.SiAdobephotoshop!,
  claudeai: simpleIcons.SiClaude!,
  claudecode: simpleIcons.SiClaude!,
  css: simpleIcons.SiCss3!,
  css3: simpleIcons.SiCss3!,
  fastapi: simpleIcons.SiFastapi!,
  html: simpleIcons.SiHtml5!,
  html5: simpleIcons.SiHtml5!,
  js: simpleIcons.SiJavascript!,
  mongodb: simpleIcons.SiMongodb!,
  n8n: simpleIcons.SiN8N!,
  neon: simpleIcons.SiPostgresql!,
  neonpostgres: simpleIcons.SiPostgresql!,
  next: simpleIcons.SiNextdotjs!,
  nextjs: simpleIcons.SiNextdotjs!,
  node: simpleIcons.SiNodedotjs!,
  nodejs: simpleIcons.SiNodedotjs!,
  postgres: simpleIcons.SiPostgresql!,
  postgresql: simpleIcons.SiPostgresql!,
  py: simpleIcons.SiPython!,
  reactquery: simpleIcons.SiReactquery!,
  tailwind: simpleIcons.SiTailwindcss!,
  tailwindcss: simpleIcons.SiTailwindcss!,
  tanstack: simpleIcons.SiReactquery!,
  tanstackstart: simpleIcons.SiReactquery ?? Code2,
  ts: simpleIcons.SiTypescript!,
  unreal: simpleIcons.SiUnrealengine!,
  unrealengine: simpleIcons.SiUnrealengine!,
  video: FaPhotoVideo,
  photovideo: FaPhotoVideo,
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

function normalizeToolKey(tool: string): string {
  return tool.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toPascalCase(key: string): string {
  return key
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("");
}

function getSimpleIcon(tool: string): ToolIcon | undefined {
  const normalizedKey = normalizeToolKey(tool);
  const alias = iconAliases[normalizedKey];

  if (alias) {
    return alias;
  }

  const exactExport = `Si${tool}`;
  const pascalExport = `Si${toPascalCase(tool)}`;
  const normalizedExport = `Si${toPascalCase(normalizedKey)}`;

  return (
    simpleIcons[exactExport] ??
    simpleIcons[pascalExport] ??
    simpleIcons[normalizedExport]
  );
}

export function getToolItems(tools?: string[] | string): ToolItem[] {
  const normalized = normalizeToolsInput(tools);
  if (!normalized.length) return [];

  return normalized
    .map((tool, index) => {
      const key = `${tool}-${index}`;
      const Icon = getSimpleIcon(tool);
      return {
        key,
        label: tool,
        Icon,
      };
    })
    .filter((item) => !!item.label);
}
