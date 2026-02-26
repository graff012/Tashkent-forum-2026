"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Mic2, Globe2, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  shadow: string;
  iconRing: string;
}[] = [
  {
    value: 3000,
    suffix: "+",
    label: "Участников",
    icon: Users,
    gradient: "from-blue-500 to-blue-700",
    shadow: "shadow-blue-300/40",
    iconRing: "bg-blue-400/25",
  },
  {
    value: 50,
    suffix: "+",
    label: "Спикеров",
    icon: Mic2,
    gradient: "from-violet-500 to-purple-700",
    shadow: "shadow-violet-300/40",
    iconRing: "bg-violet-400/25",
  },
  {
    value: 30,
    suffix: "+",
    label: "Стран",
    icon: Globe2,
    gradient: "from-emerald-500 to-teal-700",
    shadow: "shadow-emerald-300/40",
    iconRing: "bg-emerald-400/25",
  },
  {
    value: 6,
    suffix: "",
    label: "Треков",
    icon: Layers,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-300/40",
    iconRing: "bg-amber-400/25",
  },
];

function formatCount(n: number, target: number): string {
  if (target >= 1000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    if (thousands > 0) {
      return `${thousands} ${String(remainder).padStart(3, "0")}`;
    }
  }
  return n.toString();
}

function CountUp({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const duration = 1600;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // Quartic ease-out — fast start, smooth stop
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [active, target]);

  return (
    <>
      {formatCount(count, target)}
      {suffix}
    </>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-b border-zinc-200 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`
                bg-gradient-to-br ${stat.gradient}
                rounded-2xl text-white
                flex flex-col items-center justify-center py-10 px-6 text-center
                shadow-xl ${stat.shadow}
                transition-all duration-700 ease-out
                hover:-translate-y-1 hover:shadow-2xl
                ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon bubble */}
              <div
                className={`h-12 w-12 rounded-full ${stat.iconRing} flex items-center justify-center mb-4 ring-1 ring-white/20`}
              >
                <stat.icon className="h-6 w-6 text-white drop-shadow" />
              </div>

              {/* Animated number */}
              <p className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-2 drop-shadow-sm">
                <CountUp target={stat.value} suffix={stat.suffix} active={visible} />
              </p>

              {/* Label */}
              <p className="text-sm font-medium text-white/80 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
