import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-full p-4 ${color}`}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}