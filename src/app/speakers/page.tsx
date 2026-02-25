"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Search, Globe2, Building2, CalendarDays } from "lucide-react";

type Speaker = {
  id: string;
  name: string;
  title: string;
  org: string;
  country: string;
  initials: string;
  bio: string;
  sessions: string[];
  track: string;
  gradient: string;
  photo: string;
};

const speakers: Speaker[] = [
  {
    id: "1",
    name: "Давроn Юсупов",
    title: "Заместитель министра финансов",
    org: "Министерство финансов РУз",
    country: "Узбекистан",
    initials: "ДЮ",
    gradient: "linear-gradient(135deg, #1e3a6e 0%, #0c1e3c 100%)",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Опытный государственный деятель с 15-летним стажем в сфере финансового регулирования. Под его руководством реализован ряд ключевых реформ финансовой системы Узбекистана, включая переход к цифровым государственным платежам и внедрение электронного казначейства.",
    sessions: ["Открытие форума", "Исламские финансы и цифровые активы", "Закрытие форума"],
    track: "Регулирование",
  },
  {
    id: "2",
    name: "Сара Чен",
    title: "Региональный директор, ЦА",
    org: "Всемирный банк",
    country: "Международная",
    initials: "СЧ",
    gradient: "linear-gradient(135deg, #0d6e63 0%, #053530 100%)",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Специалист в области финансовой инклюзии и цифровых технологий. Руководит программами цифровой трансформации финансовых систем в 12 странах Центральной Азии. Автор исследований о влиянии мобильных платежей на финансовую инклюзию населения.",
    sessions: [
      "Цифровые банки Центральной Азии",
      "Блокчейн в торговом финансировании",
      "Женщины в финтехе",
    ],
    track: "Digital Banking",
  },
  {
    id: "3",
    name: "Ахмед Аль-Рашид",
    title: "CEO",
    org: "Gulf Fintech Group",
    country: "ОАЭ",
    initials: "АА",
    gradient: "linear-gradient(135deg, #92400e 0%, #451a03 100%)",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Серийный предприниматель, основатель Gulf Fintech Group. Под его руководством компания вошла в топ-10 финтех-платформ Ближнего Востока по объёму транзакций. Обладает экспертизой в исламских финансах и платёжных системах.",
    sessions: ["Платёжные системы", "Исламские финансы и цифровые активы"],
    track: "Islamic Finance",
  },
  {
    id: "4",
    name: "Мария Ковач",
    title: "Руководитель отдела RegTech",
    org: "European Banking Authority",
    country: "Европейский союз",
    initials: "МК",
    gradient: "linear-gradient(135deg, #14532d 0%, #052e16 100%)",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Эксперт в области регуляторных технологий и надзора в сфере финансовых услуг. Автор нескольких руководящих документов EBA по цифровым активам и DORA. Регулярно выступает на G20 по вопросам финтех-регулирования.",
    sessions: ["Регуляторные песочницы", "Женщины в финтехе", "CBDC: центральные банки"],
    track: "RegTech",
  },
  {
    id: "5",
    name: "Джон Томпсон",
    title: "CTO, регион MENA и Центральная Азия",
    org: "Mastercard",
    country: "США",
    initials: "ДТ",
    gradient: "linear-gradient(135deg, #2d2a8c 0%, #1a1850 100%)",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Технический лидер с 20+ годами опыта в платёжной индустрии. Руководит внедрением инновационных платёжных решений в регионе MENA и Центральной Азии. Участвует в разработке стандартов ISO 20022.",
    sessions: ["Цифровые банки Центральной Азии", "Платёжные системы", "Open Banking"],
    track: "Payments",
  },
  {
    id: "6",
    name: "Нилуфар Рашидова",
    title: "Основатель и CEO",
    org: "UzPay",
    country: "Узбекистан",
    initials: "НР",
    gradient: "linear-gradient(135deg, #9b1c2c 0%, #4c0519 100%)",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "Основатель и генеральный директор UzPay — ведущего узбекского финтех-стартапа с аудиторией 5 млн пользователей. Forbes включил её в список 30 Under 30 в категории Finance. Пионер QR-платежей в Центральной Азии.",
    sessions: ["Цифровые банки Центральной Азии", "Женщины в финтехе"],
    track: "Payments",
  },
  {
    id: "7",
    name: "Акбар Ишматов",
    title: "Председатель",
    org: "Центральный банк РУз",
    country: "Узбекистан",
    initials: "АИ",
    gradient: "linear-gradient(135deg, #374151 0%, #111827 100%)",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
    bio: "Глава Центрального банка Узбекистана. Под его руководством ЦБ активно развивает регуляторную базу для цифровых финансовых услуг, включая CBDC-программу и регуляторную песочницу для финтех-стартапов.",
    sessions: ["Открытие форума", "CBDC: центральные банки", "Закрытие форума"],
    track: "Регулирование",
  },
  {
    id: "8",
    name: "Лю Вэй",
    title: "Вице-президент по партнёрствам, АТР",
    org: "Ant Financial",
    country: "Китай",
    initials: "ЛВ",
    gradient: "linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)",
    photo: "https://randomuser.me/api/portraits/men/15.jpg",
    bio: "Вице-президент Ant Financial по региону Азиатско-Тихоокеанского партнёрства. Курирует стратегическое развитие в странах ЦА и ЮВА. Входит в совет директоров нескольких региональных финтех-ассоциаций.",
    sessions: ["Цифровые банки Центральной Азии", "Open Banking & API экономика"],
    track: "Digital Banking",
  },
  {
    id: "9",
    name: "Зебо Мирзоева",
    title: "Управляющий директор",
    org: "EBRD Fintech Hub",
    country: "Таджикистан",
    initials: "ЗМ",
    gradient: "linear-gradient(135deg, #075985 0%, #0c4a6e 100%)",
    photo: "https://randomuser.me/api/portraits/women/56.jpg",
    bio: "Управляющий директор финтех-хаба EBRD в ЦА. Запустила более 40 финтех-стартапов через программы акселерации. Эксперт ООН по финансовой инклюзии в развивающихся экономиках.",
    sessions: ["Регуляторные песочницы", "Женщины в финтехе"],
    track: "RegTech",
  },
  {
    id: "10",
    name: "Карлос Мендес",
    title: "Руководитель направления развивающихся рынков",
    org: "Visa Inc.",
    country: "США",
    initials: "КМ",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    bio: "Руководитель направления развивающихся рынков в Visa. Отвечает за стратегию расширения сети приёма Visa в Центральной Азии и внедрение tap-to-pay решений.",
    sessions: ["Платёжные системы", "CBDC: центральные банки"],
    track: "Payments",
  },
  {
    id: "11",
    name: "Анна Петрова",
    title: "Директор по комплаенсу",
    org: "Tinkoff Bank",
    country: "Россия",
    initials: "АП",
    gradient: "linear-gradient(135deg, #6b21a8 0%, #3b0764 100%)",
    photo: "https://randomuser.me/api/portraits/women/31.jpg",
    bio: "Директор по комплаенсу одного из крупнейших необанков России. Специализируется на AML/CFT автоматизации и построении регуляторно-технологических систем для цифровых банков.",
    sessions: ["Регуляторные песочницы", "Open Banking & API экономика"],
    track: "RegTech",
  },
  {
    id: "12",
    name: "Дамир Аббасов",
    title: "CTO",
    org: "Kapital Bank Azerbaijan",
    country: "Азербайджан",
    initials: "ДА",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #0f1f40 100%)",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Технический директор Kapital Bank. Руководил полной цифровой трансформацией банка: от legacy-систем к cloud-native архитектуре. Эксперт по банковскому API и microservices.",
    sessions: ["Цифровые банки Центральной Азии", "Блокчейн в торговом финансировании"],
    track: "Digital Banking",
  },
];

const trackFilters = [
  "Все",
  "Digital Banking",
  "Payments",
  "RegTech",
  "Islamic Finance",
  "Регулирование",
];

export default function SpeakersPage() {
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("Все");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const filtered = useMemo(() => {
    return speakers.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.org.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q);
      const matchTrack = selectedTrack === "Все" || s.track === selectedTrack;
      return matchSearch && matchTrack;
    });
  }, [search, selectedTrack]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-zinc-950 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.52 0.22 24 / 0.25) 0%, transparent 65%)",
              "radial-gradient(ellipse 40% 50% at 90% 110%, oklch(0.52 0.22 24 / 0.10) 0%, transparent 55%)",
            ].join(", "),
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-pomegranate" />
            TFIF 2025 · Ташкент
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Спикеры форума
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Лидеры отрасли, регуляторы и новаторы из 30+ стран.
          </p>
          <div className="flex items-center gap-6 mt-8 flex-wrap">
            {[
              { value: `${speakers.length}`, label: "спикеров" },
              { value: "30+", label: "стран" },
              { value: "6", label: "треков" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Поиск по имени или организации..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-zinc-200"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {trackFilters.map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`h-8 px-3 rounded-full text-xs font-medium border transition-all ${
                  selectedTrack === track
                    ? "bg-pomegranate text-white border-pomegranate"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Speakers grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            Спикеры не найдены. Попробуйте изменить параметры поиска.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((speaker) => (
              <button
                key={speaker.id}
                onClick={() => setSelectedSpeaker(speaker)}
                className="group text-left"
              >
                <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-zinc-300">
                  {/* Gradient banner */}
                  <div
                    className="h-28 relative overflow-hidden"
                    style={{ background: speaker.gradient }}
                  >
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
                    {/* Decorative orbs */}
                    <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/[0.06]" />
                    <div className="absolute top-4 -left-5 h-14 w-14 rounded-full bg-white/[0.06]" />
                    <div className="absolute bottom-2 right-8 h-8 w-8 rounded-full bg-white/[0.04]" />
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
                  </div>

                  {/* Avatar — straddles the gradient / white boundary */}
                  <div className="flex justify-center -mt-9 relative z-10">
                    <div
                      className="rounded-full ring-[3px] ring-white shadow-lg transition-transform duration-300 ease-out group-hover:scale-110"
                    >
                      <Avatar className="h-[72px] w-[72px]">
                        <AvatarImage
                          src={speaker.photo}
                          alt={speaker.name}
                        />
                        <AvatarFallback
                          style={{ background: speaker.gradient }}
                          className="text-white text-lg font-bold tracking-tight"
                        >
                          {speaker.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-4 pb-5 pt-3 text-center">
                    <p className="text-sm font-bold text-zinc-900 leading-snug transition-colors duration-200 group-hover:text-pomegranate line-clamp-2">
                      {speaker.name}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-snug">
                      {speaker.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">{speaker.org}</p>
                    <Badge
                      variant="outline"
                      className="mt-3 text-[10px] text-zinc-400 border-zinc-200"
                    >
                      {speaker.country}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-zinc-400 mt-6 text-center">
          Показано {filtered.length} из {speakers.length} спикеров
        </p>
      </div>

      {/* Speaker detail dialog */}
      <Dialog
        open={!!selectedSpeaker}
        onOpenChange={(open) => !open && setSelectedSpeaker(null)}
      >
        <DialogContent className="max-w-lg p-0 overflow-hidden gap-0 [&>[data-slot=dialog-close]]:text-white/80 [&>[data-slot=dialog-close]]:hover:text-white [&>[data-slot=dialog-close]]:hover:bg-white/10 [&>[data-slot=dialog-close]]:rounded-full">
          {selectedSpeaker && (
            <>
              {/* Gradient header banner */}
              <div
                className="h-32 relative overflow-hidden"
                style={{ background: selectedSpeaker.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/[0.06]" />
                <div className="absolute top-4 -left-6 h-20 w-20 rounded-full bg-white/[0.06]" />
                <div className="absolute bottom-3 right-16 h-10 w-10 rounded-full bg-white/[0.04]" />
                {/* Country pill in banner */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                  <Globe2 className="h-3 w-3 text-white/60" />
                  <span className="text-[11px] text-white/70 font-medium">{selectedSpeaker.country}</span>
                </div>
              </div>

              {/* Avatar — straddles banner / white */}
              <div className="flex justify-center -mt-10 relative z-10 px-6">
                <div className="rounded-full ring-[3px] ring-white shadow-xl">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={selectedSpeaker.photo}
                      alt={selectedSpeaker.name}
                    />
                    <AvatarFallback
                      style={{ background: selectedSpeaker.gradient }}
                      className="text-white text-2xl font-bold"
                    >
                      {selectedSpeaker.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Identity block */}
              <div className="text-center px-6 pt-3 pb-4">
                <DialogTitle className="text-xl font-bold text-zinc-900 leading-tight">
                  {selectedSpeaker.name}
                </DialogTitle>
                <p className="text-sm text-zinc-500 mt-1">{selectedSpeaker.title}</p>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                  <p className="text-sm font-medium text-zinc-700">{selectedSpeaker.org}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">{selectedSpeaker.country}</Badge>
                  <Badge variant="outline" className="text-xs text-zinc-500 border-zinc-200">{selectedSpeaker.track}</Badge>
                </div>
              </div>

              <Separator />

              {/* Scrollable body */}
              <div className="px-6 py-5 space-y-5 max-h-64 overflow-y-auto">
                <DialogDescription asChild>
                  <p className="text-sm text-zinc-600 leading-relaxed">{selectedSpeaker.bio}</p>
                </DialogDescription>

                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Сессии
                  </div>
                  <ul className="space-y-2">
                    {selectedSpeaker.sessions.map((session) => (
                      <li key={session} className="text-sm text-zinc-700 flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-pomegranate mt-[7px] shrink-0" />
                        {session}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer actions */}
              <div className="px-6 py-4 border-t border-zinc-100 flex gap-2">
                <Button
                  className="flex-1 bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground"
                  asChild
                >
                  <a href="/program">Смотреть сессии</a>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedSpeaker(null)}
                >
                  Закрыть
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
