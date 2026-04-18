import { type LucideIcon, Box, Zap, Compass, Cpu, Radio, FlaskConical, Satellite, Rocket } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Box,
  Zap,
  Compass,
  Cpu,
  Radio,
  FlaskConical,
  Satellite,
  Rocket,
};

export function SubsystemIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Satellite;
  return <Icon className={className} />;
}
