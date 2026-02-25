"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  User,
  FileText,
  Bookmark,
  ShieldCheck,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Pencil,
  LogOut,
  Eye,
  EyeOff,
  CreditCard,
  BookmarkX,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SecurityStatus = "not_required" | "pending" | "approved" | "rejected";

const securityMeta: Record<SecurityStatus, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  not_required: { label: "Проверка не требуется", cls: "text-zinc-500 bg-zinc-50 border-zinc-200", Icon: ShieldCheck },
  pending: { label: "На проверке СБ", cls: "text-amber-700 bg-amber-50 border-amber-200", Icon: Clock },
  approved: { label: "Проверка СБ пройдена", cls: "text-emerald-700 bg-emerald-50 border-emerald-200", Icon: CheckCircle2 },
  rejected: { label: "Не допущен", cls: "text-red-700 bg-red-50 border-red-200", Icon: XCircle },
};

const orders = [
  { id: "ORD-2025-0042", date: "20 апр 2025", description: "Делегат · TFIF 2025", amount: "850 USD", status: "paid" },
  { id: "ORD-2025-0041", date: "20 апр 2025", description: "Счёт на оплату · TFIF 2025", amount: "850 USD", status: "pending" },
];

const orderStatusCls: Record<string, string> = {
  paid: "text-emerald-700 bg-emerald-50 border-emerald-200",
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  cancelled: "text-red-700 bg-red-50 border-red-200",
};
const orderStatusLabel: Record<string, string> = {
  paid: "Оплачен",
  pending: "Ожидает оплаты",
  cancelled: "Отменён",
};

const documents = [
  { name: "Счёт № ORD-2025-0042.pdf", type: "Счёт", date: "20 апр 2025", size: "120 KB" },
  { name: "Договор-оферта.pdf", type: "Договор", date: "20 апр 2025", size: "85 KB" },
  { name: "Памятка участника TFIF 2025.pdf", type: "Памятка", date: "1 мая 2025", size: "2.4 MB" },
  { name: "Схема площадки Congress Centre.pdf", type: "Карта", date: "1 мая 2025", size: "1.1 MB" },
];

const myProgramSessions = [
  {
    id: "2",
    title: "Цифровые банки Центральной Азии: стратегии роста",
    time: "12 мая · 10:30–12:00",
    hall: "Зал A",
    track: "Digital Banking",
    trackCls: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "4",
    title: "Платёжные системы: интеграция и стандарты ISO 20022",
    time: "12 мая · 13:00–14:30",
    hall: "Зал A",
    track: "Payments",
    trackCls: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    id: "7",
    title: "Женщины в финтехе",
    time: "13 мая · 15:00–16:30",
    hall: "Зал B",
    track: "Специальная",
    trackCls: "bg-pink-50 text-pink-700 border-pink-200",
  },
];

export default function CabinetPage() {
  const [securityStatus] = useState<SecurityStatus>("approved");
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const [pwdSaved, setPwdSaved] = useState(false);

  const activeSessions = myProgramSessions.filter((s) => !removed.has(s.id));
  const { label: sbLabel, cls: sbCls, Icon: SbIcon } = securityMeta[securityStatus];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ── Header bar ── */}
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 shrink-0">
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="Давроn Юсупов" />
              <AvatarFallback
                className="text-white text-lg font-bold"
                style={{ background: "linear-gradient(135deg, #1e3a6e 0%, #0c1e3c 100%)" }}
              >
                ДЮ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-zinc-900">Давроn Юсупов</h1>
              <p className="text-sm text-zinc-500 truncate">dayusuov@mf.uz · Министерство финансов РУз</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">Делегат</Badge>
              <span className={cn("hidden sm:inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2 py-0.5", sbCls)}>
                <SbIcon className="h-3 w-3" />
                {sbLabel}
              </span>
              <Button variant="outline" size="sm" className="gap-1.5 text-zinc-500 ml-2">
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile">
          <TabsList className="mb-8 bg-white border border-zinc-200 rounded-lg p-1 h-auto flex-wrap gap-0.5">
            <TabsTrigger value="profile" className="gap-1.5 text-sm px-3 py-2 rounded-md">
              <User className="h-4 w-4" /> Профиль
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-1.5 text-sm px-3 py-2 rounded-md">
              <CreditCard className="h-4 w-4" /> Заказы
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-1.5 text-sm px-3 py-2 rounded-md">
              <FileText className="h-4 w-4" /> Документы
            </TabsTrigger>
            <TabsTrigger value="program" className="gap-1.5 text-sm px-3 py-2 rounded-md">
              <Bookmark className="h-4 w-4" /> Программа
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5 text-sm px-3 py-2 rounded-md">
              <ShieldCheck className="h-4 w-4" /> Проверка СБ
            </TabsTrigger>
          </TabsList>

          {/* ── Profile ── */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Personal info */}
                <Card className="border-zinc-200 shadow-sm">
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-base">Личные данные</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setEditMode(!editMode)}>
                      <Pencil className="h-3.5 w-3.5" />
                      {editMode ? "Отмена" : "Редактировать"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Имя", value: "Давроn" },
                        { label: "Фамилия", value: "Юсупов" },
                        { label: "Email", value: "dayusuov@mf.uz", type: "email" },
                        { label: "Телефон", value: "+998 71 200 00 00", type: "tel" },
                        { label: "Организация", value: "Министерство финансов РУз" },
                        { label: "Должность", value: "Заместитель министра" },
                      ].map((field) => (
                        <div key={field.label} className="space-y-1.5">
                          <Label className="text-sm text-zinc-600">{field.label}</Label>
                          <Input
                            defaultValue={field.value}
                            type={field.type ?? "text"}
                            disabled={!editMode}
                            className="disabled:bg-zinc-50 disabled:text-zinc-600"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm text-zinc-600">Страна</Label>
                      <Input defaultValue="Узбекистан" disabled={!editMode} className="disabled:bg-zinc-50 disabled:text-zinc-600" />
                    </div>
                    {editMode && (
                      <div className="flex gap-3 pt-2">
                        <Button className="bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground" onClick={() => setEditMode(false)}>
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>Отмена</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Change password */}
                <Card className="border-zinc-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Изменить пароль</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pwdSaved && (
                      <Alert className="border-emerald-200 bg-emerald-50">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <AlertTitle className="text-emerald-800 text-sm">Пароль изменён</AlertTitle>
                      </Alert>
                    )}
                    <div className="space-y-1.5">
                      <Label className="text-sm text-zinc-600">Текущий пароль</Label>
                      <div className="relative">
                        <Input type={showOldPwd ? "text" : "password"} placeholder="Введите текущий пароль" className="pr-10" />
                        <button type="button" onClick={() => setShowOldPwd(!showOldPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                          {showOldPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm text-zinc-600">Новый пароль</Label>
                      <div className="relative">
                        <Input type={showNewPwd ? "text" : "password"} placeholder="Не менее 8 символов" className="pr-10" />
                        <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                          {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm text-zinc-600">Повторите пароль</Label>
                      <Input type="password" placeholder="Повторите новый пароль" />
                    </div>
                    <Button className="bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground" onClick={() => setPwdSaved(true)}>
                      Сохранить пароль
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Badge preview */}
                <Card className="border-zinc-200 shadow-sm overflow-hidden">
                  <div className="h-16 bg-gradient-to-r from-pomegranate to-pomegranate/60" />
                  <div className="flex justify-center -mt-7">
                    <div className="rounded-full ring-[3px] ring-white shadow-md">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="ДЮ" />
                        <AvatarFallback className="text-white font-bold" style={{ background: "linear-gradient(135deg, #1e3a6e, #0c1e3c)" }}>ДЮ</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="text-center px-4 pt-2 pb-5">
                    <p className="font-bold text-zinc-900 text-sm">Давроn Юсупов</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Министерство финансов</p>
                    <Badge className="mt-3 bg-pomegranate text-white text-[10px] px-3">ДЕЛЕГАТ</Badge>
                    <p className="text-[11px] text-zinc-400 mt-3">
                      Бейдж выдаётся при регистрации на входе
                    </p>
                  </div>
                </Card>

                {/* Event info */}
                <Card className="border-zinc-200 shadow-sm">
                  <CardContent className="pt-5 space-y-3 text-sm">
                    {[
                      { label: "Тип участия", value: "Делегат" },
                      { label: "Дата", value: "12–14 мая 2025" },
                      { label: "Площадка", value: "Congress Centre" },
                      { label: "Город", value: "Ташкент, Узбекистан" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-zinc-500">{label}</span>
                        <span className="font-medium text-zinc-900">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── Orders ── */}
          <TabsContent value="orders">
            {orders.some((o) => o.status === "pending") && (
              <Alert className="mb-4 border-amber-200 bg-amber-50">
                <Clock className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Ожидается оплата</AlertTitle>
                <AlertDescription className="text-amber-700 text-sm">
                  Счёт выслан на вашу почту. Статус обновится автоматически.
                </AlertDescription>
              </Alert>
            )}
            <Card className="border-zinc-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Мои заказы</CardTitle>
                <CardDescription>История заказов и статусы оплаты</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                      <TableHead className="text-zinc-500 font-semibold">Номер</TableHead>
                      <TableHead className="text-zinc-500 font-semibold hidden sm:table-cell">Дата</TableHead>
                      <TableHead className="text-zinc-500 font-semibold">Описание</TableHead>
                      <TableHead className="text-zinc-500 font-semibold text-right">Сумма</TableHead>
                      <TableHead className="text-zinc-500 font-semibold">Статус</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="border-zinc-100">
                        <TableCell className="font-mono text-sm text-zinc-600">{order.id}</TableCell>
                        <TableCell className="text-sm text-zinc-600 hidden sm:table-cell">{order.date}</TableCell>
                        <TableCell className="text-sm text-zinc-900 font-medium">{order.description}</TableCell>
                        <TableCell className="text-sm font-bold text-zinc-900 text-right">{order.amount}</TableCell>
                        <TableCell>
                          <span className={cn("inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-0.5", orderStatusCls[order.status])}>
                            {order.status === "paid" && <CheckCircle2 className="h-3 w-3" />}
                            {order.status === "pending" && <Clock className="h-3 w-3" />}
                            {orderStatusLabel[order.status]}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon-sm" className="text-zinc-400 hover:text-zinc-700" title="Скачать">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Documents ── */}
          <TabsContent value="documents">
            <Card className="border-zinc-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Документы</CardTitle>
                <CardDescription>Счета, договоры и материалы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.name} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 transition-colors">
                      <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-zinc-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 truncate">{doc.name}</p>
                        <p className="text-xs text-zinc-400">{doc.type} · {doc.date} · {doc.size}</p>
                      </div>
                      <Button variant="ghost" size="icon-sm" className="text-zinc-400 hover:text-pomegranate shrink-0" title="Скачать">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── My Program ── */}
          <TabsContent value="program">
            <Card className="border-zinc-200 shadow-sm">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">
                    Моя программа
                    {activeSessions.length > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">{activeSessions.length}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Сохранённые сессии</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild className="gap-1.5">
                  <Link href="/program">Все сессии <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </CardHeader>
              <CardContent>
                {activeSessions.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400">
                    <Bookmark className="h-8 w-8 mx-auto mb-2 text-zinc-300" />
                    <p className="font-medium text-zinc-500">Пусто</p>
                    <p className="text-sm mt-1">
                      Добавляйте сессии из <Link href="/program" className="text-pomegranate hover:underline">программы</Link>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeSessions.map((session) => (
                      <div key={session.id} className="flex items-start justify-between gap-3 p-3 rounded-lg border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900">{session.title}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {session.time}
                            </span>
                            <span className="text-xs text-zinc-400 flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {session.hall}
                            </span>
                            <Badge variant="outline" className={cn("text-[10px]", session.trackCls)}>{session.track}</Badge>
                          </div>
                        </div>
                        <button
                          onClick={() => setRemoved((prev) => new Set([...prev, session.id]))}
                          className="p-1.5 rounded-md hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                          title="Удалить"
                        >
                          <BookmarkX className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Security ── */}
          <TabsContent value="security">
            <div className="max-w-2xl space-y-6">
              <Card className="border-zinc-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Проверка службой безопасности</CardTitle>
                  <CardDescription>Статус проверки участника</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className={cn("flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border-2", sbCls)}>
                    <SbIcon className="h-12 w-12 opacity-70" />
                    <p className="text-lg font-bold">{sbLabel}</p>
                    <p className="text-sm opacity-70">Обновлено: 22 апреля 2025</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Возможные статусы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(Object.entries(securityMeta) as [SecurityStatus, typeof securityMeta[SecurityStatus]][]).map(
                    ([key, { label, cls, Icon }]) => (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg border",
                          securityStatus === key ? cls : "border-zinc-100 bg-zinc-50"
                        )}
                      >
                        <Icon className={cn("h-5 w-5 shrink-0", securityStatus !== key && "text-zinc-300")} />
                        <p className={cn("text-sm font-medium flex-1", securityStatus !== key && "text-zinc-400")}>{label}</p>
                        {securityStatus === key && <Badge className="text-[10px] bg-white/50 text-inherit">Текущий</Badge>}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              {securityStatus === "rejected" && (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Участие не подтверждено</AlertTitle>
                  <AlertDescription className="text-red-700 text-sm">
                    Обратитесь на <a href="mailto:info@tfif.uz" className="underline">info@tfif.uz</a>.
                  </AlertDescription>
                </Alert>
              )}

              <p className="text-xs text-zinc-400 leading-relaxed">
                Проверка СБ является обязательной для всех участников. Результаты сообщаются
                без указания причин отказа. Уведомления приходят на e-mail.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
