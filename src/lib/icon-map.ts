import {
  Compass,
  Droplets,
  Flame,
  HeartHandshake,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Droplets,
  Flame,
  Sprout,
  HeartHandshake,
  Sparkles,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Compass;
}
