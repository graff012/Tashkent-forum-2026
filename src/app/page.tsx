import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Building2,
  CreditCard,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Layers,
  Coins,
  Network,
  CalendarDays,
  MapPin,
  Users,
  Mic2,
} from "lucide-react";

const stats = [
  { value: "3 000+", label: "Участников", icon: Users },
  { value: "50+", label: "Спикеров", icon: Mic2 },
  { value: "30+", label: "Стран", icon: Globe2 },
  { value: "6", label: "Треков", icon: Layers },
];

const tracks = [
  {
    icon: Building2,
    title: "Digital Banking",
    description:
      "Цифровая трансформация банков, необанки, клиентский опыт и open banking.",
    count: "12 сессий",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: CreditCard,
    title: "Payments & Fintech",
    description:
      "Платёжная инфраструктура, ISO 20022, CBDC, стейблкоины и кросс-бордерные расчёты.",
    count: "10 сессий",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: ShieldCheck,
    title: "RegTech & Compliance",
    description:
      "Регуляторные песочницы, AML/KYC автоматизация, надзорные технологии.",
    count: "8 сессий",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: TrendingUp,
    title: "Capital Markets",
    description:
      "Рынки капитала, алготрейдинг, инвестиционные платформы и ESG-финансирование.",
    count: "7 сессий",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Coins,
    title: "Islamic Finance",
    description:
      "Исламские финансовые инструменты, шариат-комплайенс и халяль финтех.",
    count: "6 сессий",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Network,
    title: "Blockchain & Web3",
    description:
      "DeFi, токенизация активов, блокчейн в торговом финансировании и смарт-контракты.",
    count: "9 сессий",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const speakers = [
  {
    name: "Давроn Юсупов",
    title: "Зам. министра финансов",
    org: "МФ Узбекистана",
    initials: "ДЮ",
    gradient: "linear-gradient(135deg, #1e3a6e 0%, #0c1e3c 100%)",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Сара Чен",
    title: "Региональный директор",
    org: "World Bank",
    initials: "СЧ",
    gradient: "linear-gradient(135deg, #0d6e63 0%, #053530 100%)",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ахмед Аль-Рашид",
    title: "CEO",
    org: "Gulf Fintech Group",
    initials: "АА",
    gradient: "linear-gradient(135deg, #92400e 0%, #451a03 100%)",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Мария Ковач",
    title: "Руководитель RegTech",
    org: "European Banking Authority",
    initials: "МК",
    gradient: "linear-gradient(135deg, #14532d 0%, #052e16 100%)",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Джон Томпсон",
    title: "CTO, MENA & CIS",
    org: "Mastercard",
    initials: "ДТ",
    gradient: "linear-gradient(135deg, #2d2a8c 0%, #1a1850 100%)",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Нилуфар Рашидова",
    title: "Основатель и CEO",
    org: "UzPay",
    initials: "НР",
    gradient: "linear-gradient(135deg, #9b1c2c 0%, #4c0519 100%)",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
  },
];

type Partner = { name: string; logo: string; url: string };
type PartnerTier = { tier: string; logoHeight: string; partners: Partner[] };

const partnerTiers: PartnerTier[] = [
  {
    tier: "Стратегические партнёры",
    logoHeight: "h-16",
    partners: [
      { name: "UzNational Bank", logo: "/logos/uznational-bank.svg", url: "https://cbu.uz" },
      { name: "Ministry of Finance UZ", logo: "/logos/ministry-finance-uz.svg", url: "https://mf.uz" },
      { name: "IFC / World Bank", logo: "/logos/ifc-world-bank.svg", url: "https://www.ifc.org" },
    ],
  },
  {
    tier: "Золотые партнёры",
    logoHeight: "h-14",
    partners: [
      { name: "Mastercard", logo: "/logos/mastercard.svg", url: "https://www.mastercard.com" },
      { name: "Visa", logo: "/logos/visa.svg", url: "https://www.visa.com" },
      { name: "Swift", logo: "/logos/swift.svg", url: "https://www.swift.com" },
      { name: "Ant Financial", logo: "/logos/ant-financial.svg", url: "https://www.antgroup.com" },
    ],
  },
  {
    tier: "Серебряные партнёры",
    logoHeight: "h-14",
    partners: [
      { name: "UzPay", logo: "/logos/uzpay.svg", url: "https://uzpay.uz" },
      { name: "Payme", logo: "/logos/payme.svg", url: "https://payme.uz" },
      { name: "Click", logo: "/logos/click.svg", url: "https://click.uz" },
      { name: "Uzum Bank", logo: "/logos/uzum-bank.svg", url: "https://uzumbank.uz" },
    ],
  },
  {
    tier: "Медиа-партнёры",
    logoHeight: "h-12",
    partners: [
      { name: "Finextra", logo: "/logos/finextra.svg", url: "https://www.finextra.com" },
      { name: "The Paypers", logo: "/logos/the-paypers.svg", url: "https://thepaypers.com" },
      { name: "Kun.uz", logo: "/logos/kunuz.svg", url: "https://kun.uz" },
      { name: "UzReport", logo: "/logos/uzreport.svg", url: "https://uzreport.news" },
    ],
  },
];

const news = [
  {
    date: "18 апреля 2025",
    tag: "Анонс",
    title: "Программа форума опубликована: 52 сессии и 50+ спикеров",
    excerpt:
      "Оргкомитет TFIF 2025 представил полную деловую программу. В этом году форум объединит спикеров из 30 стран на шести тематических треках.",
  },
  {
    date: "10 апреля 2025",
    tag: "Партнёры",
    title: "Mastercard и IFC подтвердили статус стратегических партнёров",
    excerpt:
      "Ключевые участники глобального платёжного рынка присоединяются к форуму в качестве стратегических партнёров второй год подряд.",
  },
  {
    date: "2 апреля 2025",
    tag: "Регистрация",
    title: "Открыта групповая регистрация: скидка 15% для делегаций от 5 человек",
    excerpt:
      "Участники, регистрирующие делегации от пяти и более человек, получают автоматическую скидку 15% на все категории участия.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[88vh] flex items-center justify-center text-white overflow-hidden bg-zinc-950"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 90% 60% at 50% -10%, oklch(0.52 0.22 24 / 0.22) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 35% at 85% 90%, oklch(0.52 0.22 24 / 0.10) 0%, transparent 55%)",
          ].join(", "),
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm mb-10">
            <span className="h-1.5 w-1.5 rounded-full bg-pomegranate animate-pulse" />
            12–14 мая 2025 &nbsp;·&nbsp; Ташкент, Узбекистан
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl mx-auto text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tighter leading-[1.04] mb-6">
            Tashkent Fintech{" "}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              International
            </span>{" "}
            Forum
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 leading-relaxed mb-12">
            Ключевая площадка финансовых технологий Центральной Азии. Три дня
            стратегических сессий, деловых встреч и инноваций.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground h-12 px-8 text-base font-semibold rounded-xl"
            >
              <Link href="/register">
                Зарегистрироваться
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-medium rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/30"
            >
              <Link href="/program">Программа форума</Link>
            </Button>
          </div>

          {/* Event meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-zinc-600" />
              12–14 мая 2025
            </div>
            <Separator orientation="vertical" className="h-4 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-zinc-600" />
              Congress Centre, Ташкент
            </div>
            <Separator orientation="vertical" className="h-4 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-zinc-600" />
              30+ стран-участников
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-zinc-200">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 px-6 text-center"
              >
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-zinc-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 tracking-tight">{value}</p>
                <p className="text-sm text-zinc-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracks ── */}
      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-3 text-zinc-500 border-zinc-300">
                Деловая программа
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                Тематические треки
              </h2>
              <p className="text-zinc-500 mt-2 max-w-lg">
                52 сессии, объединённые в шесть ключевых направлений финансовых
                технологий.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex shrink-0">
              <Link href="/program">
                Вся программа <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
              {[...tracks, ...tracks].map((track, i) => (
                <Card
                  key={`${track.title}-${i}`}
                  className="border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all rounded-xl py-0 overflow-hidden w-80 shrink-0"
                >
                  <CardHeader className="pt-6">
                    <div
                      className={`h-11 w-11 rounded-xl ${track.bg} flex items-center justify-center mb-4`}
                    >
                      <track.icon className={`h-5 w-5 ${track.color}`} />
                    </div>
                    <CardTitle className="text-zinc-900 text-lg">{track.title}</CardTitle>
                    <CardDescription className="text-zinc-500 leading-relaxed">
                      {track.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <Badge variant="secondary" className="text-xs text-zinc-500">
                      {track.count}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Speakers ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-3 text-zinc-500 border-zinc-300">
                Спикеры
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                Избранные спикеры
              </h2>
              <p className="text-zinc-500 mt-2">
                Лидеры отрасли, регуляторы и новаторы из 30+ стран.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex shrink-0">
              <Link href="/speakers">
                Все спикеры <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {speakers.map((speaker) => (
              <Link key={speaker.name} href="/speakers" className="group">
                <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-zinc-300">
                  {/* Gradient banner */}
                  <div
                    className="h-[72px] relative overflow-hidden"
                    style={{ background: speaker.gradient }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/20" />
                    <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white/5" />
                    <div className="absolute top-2 -left-3 h-10 w-10 rounded-full bg-white/5" />
                  </div>

                  {/* Avatar — straddles the gradient/white boundary */}
                  <div className="flex justify-center -mt-7 relative z-10">
                    <div className="rounded-full ring-[3px] ring-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110">
                      <Avatar className="h-14 w-14">
                        <AvatarImage
                          src={speaker.photo}
                          alt={speaker.name}
                        />
                        <AvatarFallback
                          style={{ background: speaker.gradient }}
                          className="text-white text-sm font-bold"
                        >
                          {speaker.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-3 pb-4 pt-2 text-center">
                    <p className="text-xs font-bold text-zinc-900 leading-snug transition-colors duration-200 group-hover:text-pomegranate line-clamp-2">
                      {speaker.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1 leading-snug">
                      {speaker.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{speaker.org}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Tiers ── */}
      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-3 text-zinc-500 border-zinc-300">
              Партнёры
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
              Партнёры форума
            </h2>
          </div>

          <div className="space-y-10">
            {partnerTiers.map((tier) => (
              <div key={tier.tier}>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest text-center mb-5">
                  {tier.tier}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {tier.partners.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/logo px-6 rounded-xl border border-zinc-200 bg-white flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={`${tier.logoHeight} w-auto object-contain grayscale opacity-60 transition-all duration-300 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Announcements ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-3 text-zinc-500 border-zinc-300">
                Новости
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                Анонсы и новости
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card
                key={item.title}
                className="border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all rounded-xl py-0 overflow-hidden group cursor-pointer"
              >
                <div className="h-2 bg-gradient-to-r from-pomegranate/80 to-pomegranate/30" />
                <CardHeader className="pt-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.tag}
                    </Badge>
                    <span className="text-xs text-zinc-400">{item.date}</span>
                  </div>
                  <CardTitle className="text-zinc-900 text-base leading-snug group-hover:text-pomegranate transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-500 text-sm leading-relaxed">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-5">
                  <span className="text-xs font-medium text-pomegranate flex items-center gap-1">
                    Читать далее <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Станьте частью форума
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Регистрация открыта. Присоединяйтесь к 3 000+ участникам из 30
            стран и станьте частью финтех-революции Центральной Азии.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground h-12 px-8 text-base font-semibold rounded-xl"
            >
              <Link href="/register">
                Зарегистрироваться сейчас
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 px-8 text-base text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <Link href="/speakers">Посмотреть спикеров</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
