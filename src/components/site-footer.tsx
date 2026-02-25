import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";

const footerNav = [
  { href: "/", label: "Главная" },
  { href: "/program", label: "Программа" },
  { href: "/speakers", label: "Спикеры" },
  { href: "/register", label: "Регистрация" },
  { href: "/cabinet", label: "Личный кабинет" },
];

const legalLinks = [
  { href: "#", label: "Политика конфиденциальности" },
  { href: "#", label: "Пользовательское соглашение" },
  { href: "#", label: "Политика cookies" },
];

const docs = [
  { href: "#", label: "Справка о Форуме (PDF)" },
  { href: "#", label: "Справочник экспонента (PDF)" },
  { href: "#", label: "Памятка участника (PDF)" },
  { href: "#", label: "Архитектура деловой программы (PDF)" },
];

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-lg bg-pomegranate flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">TF</span>
              </div>
              <div className="leading-none">
                <p className="text-white font-bold text-sm">Tashkent Fintech</p>
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase mt-0.5">
                  International Forum
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs mb-6">
              Главная площадка финансовых технологий Центральной Азии.
              Три дня стратегических сессий, деловых встреч и инноваций.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-500">
                <MapPin className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                <span>Congress Centre, Ташкент, Узбекистан</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Mail className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                <a href="mailto:info@tfif.uz" className="hover:text-white transition-colors">
                  info@tfif.uz
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Phone className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                <span>+998 71 200 00 00</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-semibold mb-4 uppercase tracking-widest">
              Форум
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-semibold mb-4 uppercase tracking-widest">
              Документы
            </h4>
            <ul className="space-y-2.5 text-sm">
              {docs.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.href}
                    className="hover:text-white transition-colors"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-semibold mb-4 uppercase tracking-widest">
              Правовая информация
            </h4>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-500">
              <p className="font-medium text-zinc-400 mb-1">Дата проведения</p>
              <p>12–14 мая 2025</p>
              <p className="mt-1">Congress Centre, Ташкент</p>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-zinc-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© 2025 Tashkent Fintech International Forum. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <span>RU</span>
            <span>EN</span>
            <span>UZ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
