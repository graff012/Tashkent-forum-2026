"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Search, Clock, MapPin, Tag, Users, BookmarkPlus, BookmarkCheck, Columns2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Session = {
  id: string;
  title: string;
  time: string;
  hall: string;
  track: string;
  format: string;
  description: string;
  speakers: string[];
  day: string;
};

const sessions: Session[] = [
  {
    id: "1",
    title: "Открытие форума",
    time: "09:00 – 10:00",
    hall: "Пленарный зал",
    track: "Пленарная",
    format: "Пленарная сессия",
    description:
      "Официальное открытие Tashkent Fintech International Forum 2025. Приветственное слово организаторов, почётных гостей и ключевых партнёров форума.",
    speakers: ["Давроn Юсупов", "Акбар Ишматов"],
    day: "12 мая",
  },
  {
    id: "2",
    title: "Цифровые банки Центральной Азии: стратегии роста",
    time: "10:30 – 12:00",
    hall: "Зал A",
    track: "Digital Banking",
    format: "Панельная дискуссия",
    description:
      "Ведущие представители цифровых банков обсудят стратегии масштабирования, клиентский опыт и конкуренцию с традиционными банками в регионе.",
    speakers: ["Сара Чен", "Джон Томпсон", "Нилуфар Рашидова"],
    day: "12 мая",
  },
  {
    id: "3",
    title: "Регуляторные песочницы: глобальный опыт",
    time: "10:30 – 12:00",
    hall: "Зал B",
    track: "RegTech",
    format: "Доклад",
    description:
      "Обзор лучших практик регуляторных инноваций и внедрения регуляторных песочниц в странах ОЭСР и Центральной Азии.",
    speakers: ["Мария Ковач"],
    day: "12 мая",
  },
  {
    id: "4",
    title: "Платёжные системы: интеграция и стандарты ISO 20022",
    time: "13:00 – 14:30",
    hall: "Зал A",
    track: "Payments",
    format: "Мастер-класс",
    description:
      "Практическое руководство по переходу на ISO 20022 и интеграции с глобальными платёжными сетями. Кейсы из SWIFT gpi и системы быстрых платежей.",
    speakers: ["Джон Томпсон", "Ахмед Аль-Рашид"],
    day: "12 мая",
  },
  {
    id: "5",
    title: "Исламские финансы и цифровые активы",
    time: "13:00 – 14:30",
    hall: "Зал C",
    track: "Islamic Finance",
    format: "Панельная дискуссия",
    description:
      "Соответствие шариату в контексте токенизированных активов, стейблкоинов и децентрализованных финансов. Реальные кейсы из ОАЭ и Малайзии.",
    speakers: ["Ахмед Аль-Рашид", "Давроn Юсупов"],
    day: "12 мая",
  },
  {
    id: "6",
    title: "Блокчейн в торговом финансировании",
    time: "15:00 – 16:30",
    hall: "Зал A",
    track: "Blockchain",
    format: "Кейс-стади",
    description:
      "Реальные внедрения блокчейн-решений для документарного аккредитива, факторинга и финансирования цепочек поставок в ЦА.",
    speakers: ["Сара Чен"],
    day: "13 мая",
  },
  {
    id: "7",
    title: "Женщины в финтехе",
    time: "15:00 – 16:30",
    hall: "Зал B",
    track: "Специальная",
    format: "Панельная дискуссия",
    description:
      "Лидеры финтех-индустрии обсудят инклюзивность, diversity & inclusion и возможности для женщин-предпринимателей в финансовых технологиях.",
    speakers: ["Нилуфар Рашидова", "Сара Чен", "Мария Ковач"],
    day: "13 мая",
  },
  {
    id: "8",
    title: "Open Banking & API экономика",
    time: "10:30 – 12:00",
    hall: "Зал A",
    track: "Digital Banking",
    format: "Воркшоп",
    description:
      "Практический воркшоп по стандартам Open Banking, построению API-платформ и сценариям монетизации данных.",
    speakers: ["Джон Томпсон"],
    day: "13 мая",
  },
  {
    id: "9",
    title: "CBDC: центральные банки цифровой эпохи",
    time: "13:00 – 14:30",
    hall: "Зал B",
    track: "Payments",
    format: "Доклад",
    description:
      "Анализ CBDC-программ мировых центральных банков. Технические архитектуры, регуляторные вопросы и влияние на коммерческие банки.",
    speakers: ["Акбар Ишматов", "Мария Ковач"],
    day: "13 мая",
  },
  {
    id: "10",
    title: "Закрытие форума",
    time: "17:00 – 18:00",
    hall: "Пленарный зал",
    track: "Пленарная",
    format: "Пленарная сессия",
    description:
      "Подведение итогов TFIF 2025. Принятие резолюции форума и анонс следующего года.",
    speakers: ["Давроn Юсупов", "Акбар Ишматов"],
    day: "14 мая",
  },
];

const allTracks = ["Все", "Пленарная", "Digital Banking", "Payments", "RegTech", "Islamic Finance", "Blockchain", "Специальная"];
const allDays = ["Все дни", "12 мая", "13 мая", "14 мая"];

const trackColors: Record<string, string> = {
  "Пленарная": "bg-zinc-100 text-zinc-700 border-zinc-200",
  "Digital Banking": "bg-blue-50 text-blue-700 border-blue-200",
  "Payments": "bg-violet-50 text-violet-700 border-violet-200",
  "RegTech": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Islamic Finance": "bg-teal-50 text-teal-700 border-teal-200",
  "Blockchain": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Специальная": "bg-pink-50 text-pink-700 border-pink-200",
};

const trackAccents: Record<string, string> = {
  "Пленарная": "border-l-zinc-400",
  "Digital Banking": "border-l-blue-500",
  "Payments": "border-l-violet-500",
  "RegTech": "border-l-emerald-500",
  "Islamic Finance": "border-l-teal-500",
  "Blockchain": "border-l-indigo-500",
  "Специальная": "border-l-pink-500",
};

export default function ProgramPage() {
  const [selectedTrack, setSelectedTrack] = useState("Все");
  const [selectedDay, setSelectedDay] = useState("Все дни");
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      const matchTrack = selectedTrack === "Все" || s.track === selectedTrack;
      const matchDay = selectedDay === "Все дни" || s.day === selectedDay;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.speakers.some((sp) => sp.toLowerCase().includes(q));
      return matchTrack && matchDay && matchSearch;
    });
  }, [selectedTrack, selectedDay, search]);

  /* Group filtered sessions by day → time slot */
  const grouped = useMemo(() => {
    const dayMap = new Map<string, Map<string, Session[]>>();
    for (const s of filtered) {
      if (!dayMap.has(s.day)) dayMap.set(s.day, new Map());
      const timeMap = dayMap.get(s.day)!;
      if (!timeMap.has(s.time)) timeMap.set(s.time, []);
      timeMap.get(s.time)!.push(s);
    }
    return dayMap;
  }, [filtered]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-zinc-950 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.52 0.22 24 / 0.25) 0%, transparent 65%)",
              "radial-gradient(ellipse 40% 50% at 10% 110%, oklch(0.52 0.22 24 / 0.10) 0%, transparent 55%)",
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
            TFIF 2025 · 12–14 мая
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Программа форума
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Три дня насыщенной деловой программы на шести тематических треках.
          </p>
          <div className="flex items-center gap-6 mt-8 flex-wrap">
            {[
              { value: "52", label: "сессии" },
              { value: "3", label: "дня" },
              { value: "6", label: "залов" },
              { value: "50+", label: "спикеров" },
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
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Поиск по сессиям и спикерам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-zinc-200"
            />
          </div>

          {/* Day filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {allDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "h-8 px-3 rounded-full text-sm font-medium border transition-all",
                  selectedDay === day
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Track filter chips */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {allTracks.map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={cn(
                "h-7 px-3 rounded-full text-xs font-medium border transition-all",
                selectedTrack === track
                  ? "bg-pomegranate text-white border-pomegranate"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              )}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Sessions timeline */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-200 py-16 text-center text-zinc-400 shadow-sm">
            Сессии не найдены. Измените параметры фильтра.
          </div>
        ) : (
          <div className="space-y-10">
            {Array.from(grouped.entries()).map(([day, timeMap]) => (
              <div key={day}>
                {/* Day header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-bold text-zinc-900 bg-zinc-100 rounded-full px-4 py-1.5 border border-zinc-200">
                    {day}
                  </span>
                  <Separator className="flex-1" />
                </div>

                <div className="space-y-4">
                  {Array.from(timeMap.entries()).map(([time, slotSessions]) => {
                    const isParallel = slotSessions.length > 1;
                    return (
                      <div key={time} className="flex gap-4">
                        {/* Time column */}
                        <div className="w-24 shrink-0 pt-4">
                          <p className="font-mono text-sm font-medium text-zinc-700">{time.split(" – ")[0]}</p>
                          <p className="font-mono text-xs text-zinc-400">{time.split(" – ")[1]}</p>
                        </div>

                        {/* Sessions */}
                        <div className="flex-1 min-w-0">
                          {isParallel && (
                            <div className="flex items-center gap-1.5 mb-2">
                              <Columns2 className="h-3.5 w-3.5 text-amber-500" />
                              <span className="text-xs font-semibold text-amber-600">
                                Параллельные сессии
                              </span>
                              <span className="text-xs text-zinc-400">
                                · {slotSessions.length} трека одновременно
                              </span>
                            </div>
                          )}
                          <div className={cn(
                            "grid gap-3",
                            isParallel ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                          )}>
                            {slotSessions.map((session) => (
                              <button
                                key={session.id}
                                type="button"
                                onClick={() => setSelectedSession(session)}
                                className={cn(
                                  "group/card relative text-left bg-white rounded-xl border border-zinc-200 p-4 transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 hover:border-zinc-300 cursor-pointer border-l-4",
                                  trackAccents[session.track] ?? "border-l-transparent",
                                  isParallel && "ring-1 ring-transparent hover:ring-amber-200/60"
                                )}
                              >
                                {/* Track + Format + Save */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <Badge
                                    variant="outline"
                                    className={cn("text-xs", trackColors[session.track])}
                                  >
                                    {session.track}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs text-zinc-500">
                                    {session.format}
                                  </Badge>
                                  <div
                                    className="ml-auto p-1 rounded-md hover:bg-zinc-100 transition-colors"
                                    role="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSave(session.id);
                                    }}
                                    title={savedIds.has(session.id) ? "Убрать из программы" : "В мою программу"}
                                  >
                                    {savedIds.has(session.id) ? (
                                      <BookmarkCheck className="h-4 w-4 text-pomegranate" />
                                    ) : (
                                      <BookmarkPlus className="h-4 w-4 text-zinc-400" />
                                    )}
                                  </div>
                                </div>

                                {/* Title */}
                                <p className="font-semibold text-zinc-900 leading-snug group-hover/card:text-pomegranate transition-colors">
                                  {session.title}
                                </p>

                                {/* Hall + Speakers */}
                                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-zinc-400" />
                                    {session.hall}
                                  </span>
                                  <span className="truncate">
                                    {session.speakers.join(", ")}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Result count */}
        <div className="mt-4 text-xs text-zinc-400">
          Показано {filtered.length} из {sessions.length} сессий
        </div>
      </div>

      {/* Session detail dialog */}
      <Dialog
        open={!!selectedSession}
        onOpenChange={(open) => !open && setSelectedSession(null)}
      >
        <DialogContent className="max-w-lg">
          {selectedSession && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", trackColors[selectedSession.track])}
                  >
                    {selectedSession.track}
                  </Badge>
                  <Badge variant="secondary" className="text-xs text-zinc-500">
                    {selectedSession.format}
                  </Badge>
                </div>
                <DialogTitle className="text-xl leading-snug">
                  {selectedSession.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Детали сессии
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Meta */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                    <div>
                      <p className="font-medium">{selectedSession.time}</p>
                      <p className="text-xs text-zinc-400">{selectedSession.day}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>{selectedSession.hall}</span>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {selectedSession.description}
                </p>

                {/* Speakers */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                    <Users className="h-3.5 w-3.5" />
                    Спикеры
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.speakers.map((speaker) => (
                      <span
                        key={speaker}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-zinc-100 text-sm text-zinc-700 font-medium"
                      >
                        <Tag className="h-3 w-3 text-zinc-400" />
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSession(null)}
                  className="flex-1"
                >
                  Закрыть
                </Button>
                <Button
                  className={cn(
                    "flex-1",
                    savedIds.has(selectedSession.id)
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground"
                  )}
                  onClick={() => toggleSave(selectedSession.id)}
                >
                  {savedIds.has(selectedSession.id) ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-1.5" />
                      Сохранено
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="h-4 w-4 mr-1.5" />
                      В мою программу
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
