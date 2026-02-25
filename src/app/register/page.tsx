"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  FileText,
  Users,
  User,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "success" | "error";

const countries = [
  "Узбекистан",
  "Казахстан",
  "Кыргызстан",
  "Таджикистан",
  "Туркменистан",
  "Россия",
  "США",
  "Германия",
  "Великобритания",
  "ОАЭ",
  "Другое",
];

const ticketTypes = [
  {
    id: "delegate",
    title: "Делегат",
    price: "850 USD",
    features: [
      "Полный доступ ко всем сессиям",
      "Деловой нетворкинг",
      "Питание и кофе-брейки",
      "Материалы форума",
      "Сертификат участника",
    ],
  },
  {
    id: "vip",
    title: "VIP",
    price: "1 500 USD",
    features: [
      "Всё включено из пакета Делегат",
      "VIP-ужин с организаторами",
      "Приоритетное место в зале",
      "Персональный ассистент",
      "Фото-сессия со спикерами",
    ],
    highlight: true,
  },
  {
    id: "online",
    title: "Онлайн",
    price: "150 USD",
    features: [
      "Онлайн-трансляции всех сессий",
      "Запись после завершения",
      "Виртуальный нетворкинг",
      "Электронные материалы",
    ],
  },
];

type Participant = { name: string; email: string; org: string };

export default function RegisterPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "invoice">("card");
  const [selectedTicket, setSelectedTicket] = useState("delegate");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [consent, setConsent] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { name: "", email: "", org: "" },
  ]);

  // Individual form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    country: "Узбекистан",
    // Invoice fields
    companyName: "",
    taxId: "",
    legalAddress: "",
    contactPerson: "",
    comment: "",
  });

  const handleField = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      return;
    }
    // Simulate async submit
    setTimeout(() => setStatus("success"), 600);
  };

  const addParticipant = () =>
    setParticipants((p) => [...p, { name: "", email: "", org: "" }]);

  const removeParticipant = (i: number) =>
    setParticipants((p) => p.filter((_, idx) => idx !== i));

  const updateParticipant = (i: number, k: keyof Participant, v: string) =>
    setParticipants((p) =>
      p.map((pt, idx) => (idx === i ? { ...pt, [k]: v } : pt))
    );

  if (status === "success") {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-zinc-200 shadow-md text-center py-12">
          <CardContent>
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              Заявка принята!
            </h2>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
              На указанный e-mail отправлено подтверждение с деталями
              регистрации. Данные для входа в личный кабинет будут высланы
              отдельным письмом.
            </p>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-600 text-left space-y-1.5 mb-6">
              <p><span className="font-medium">Мероприятие:</span> TFIF 2025</p>
              <p><span className="font-medium">Даты:</span> 12–14 мая 2025</p>
              <p><span className="font-medium">Место:</span> Congress Centre, Ташкент</p>
              <p>
                <span className="font-medium">Тип участия:</span>{" "}
                {ticketTypes.find((t) => t.id === selectedTicket)?.title}
              </p>
            </div>
            <Button
              className="w-full bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground"
              onClick={() => (window.location.href = "/cabinet")}
            >
              Перейти в личный кабинет
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Badge variant="outline" className="mb-3 text-zinc-500 border-zinc-300">
            TFIF 2025
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-2">
            Регистрация участника
          </h1>
          <p className="text-zinc-500">
            12–14 мая 2025 &nbsp;·&nbsp; Congress Centre, Ташкент
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Error alert */}
        {status === "error" && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Ошибка регистрации</AlertTitle>
            <AlertDescription className="text-red-700">
              Пожалуйста, проверьте заполненность всех обязательных полей и
              примите условия обработки данных.
            </AlertDescription>
          </Alert>
        )}

        {/* Ticket types */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">
            Выберите тип участия
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ticketTypes.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={cn(
                  "relative text-left p-5 rounded-xl border-2 transition-all",
                  selectedTicket === ticket.id
                    ? "border-pomegranate ring-2 ring-pomegranate/15 bg-white shadow-sm"
                    : "border-zinc-200 bg-white hover:border-zinc-300"
                )}
              >
                {ticket.highlight && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-pomegranate text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Популярно
                  </span>
                )}
                <p className="font-bold text-zinc-900 text-base mb-1">
                  {ticket.title}
                </p>
                <p className="text-2xl font-bold text-pomegranate mb-3">
                  {ticket.price}
                </p>
                <ul className="space-y-1.5">
                  {ticket.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-zinc-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Registration tabs */}
        <Tabs defaultValue="individual">
          <TabsList className="mb-6 bg-zinc-100">
            <TabsTrigger value="individual" className="gap-2">
              <User className="h-4 w-4" />
              Индивидуальная
            </TabsTrigger>
            <TabsTrigger value="group" className="gap-2">
              <Users className="h-4 w-4" />
              Групповая
            </TabsTrigger>
          </TabsList>

          {/* ── Individual tab ── */}
          <TabsContent value="individual">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal info */}
                  <Card className="border-zinc-200 shadow-sm">
                    <CardHeader className="border-b border-zinc-100 pb-4">
                      <CardTitle className="text-base text-zinc-900">Личные данные</CardTitle>
                      <CardDescription>Информация об участнике</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            Имя <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Имя"
                            value={form.firstName}
                            onChange={(e) => handleField("firstName", e.target.value)}
                            required
                            className="border-zinc-200"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Фамилия <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Фамилия"
                            value={form.lastName}
                            onChange={(e) => handleField("lastName", e.target.value)}
                            required
                            className="border-zinc-200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="вы@компания.uz"
                            value={form.email}
                            onChange={(e) => handleField("email", e.target.value)}
                            required
                            className="border-zinc-200"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Телефон <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+998 00 000 00 00"
                            value={form.phone}
                            onChange={(e) => handleField("phone", e.target.value)}
                            required
                            className="border-zinc-200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="organization" className="text-sm font-medium">
                            Организация <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="organization"
                            placeholder="Название компании"
                            value={form.organization}
                            onChange={(e) => handleField("organization", e.target.value)}
                            required
                            className="border-zinc-200"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="position" className="text-sm font-medium">
                            Должность
                          </Label>
                          <Input
                            id="position"
                            placeholder="Ваша должность"
                            value={form.position}
                            onChange={(e) => handleField("position", e.target.value)}
                            className="border-zinc-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="country" className="text-sm font-medium">
                          Страна <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="country"
                          value={form.country}
                          onChange={(e) => handleField("country", e.target.value)}
                          className="w-full h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                        >
                          {countries.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment method */}
                  <Card className="border-zinc-200 shadow-sm">
                    <CardHeader className="border-b border-zinc-100 pb-4">
                      <CardTitle className="text-base text-zinc-900">
                        Способ оплаты
                      </CardTitle>
                      <CardDescription>Выберите удобный способ</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            id: "card" as const,
                            icon: CreditCard,
                            title: "Банковская карта",
                            desc: "Visa, Mastercard, Uzcard",
                          },
                          {
                            id: "invoice" as const,
                            icon: FileText,
                            title: "Счёт на оплату",
                            desc: "Для юридических лиц",
                          },
                        ].map(({ id, icon: Icon, title, desc }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setPaymentMethod(id)}
                            className={cn(
                              "flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left",
                              paymentMethod === id
                                ? "border-pomegranate ring-2 ring-pomegranate/15 bg-white"
                                : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5 mb-2",
                                paymentMethod === id
                                  ? "text-pomegranate"
                                  : "text-zinc-400"
                              )}
                            />
                            <p className="text-sm font-semibold text-zinc-900">{title}</p>
                            <p className="text-xs text-zinc-500">{desc}</p>
                          </button>
                        ))}
                      </div>

                      {/* Invoice fields */}
                      {paymentMethod === "invoice" && (
                        <div className="pt-2 space-y-3 border-t border-zinc-100">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                            Реквизиты для счёта
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label className="text-sm font-medium">
                                Название компании <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                placeholder="ООО Пример"
                                value={form.companyName}
                                onChange={(e) => handleField("companyName", e.target.value)}
                                className="border-zinc-200"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-sm font-medium">ИНН / Tax ID</Label>
                              <Input
                                placeholder="123456789"
                                value={form.taxId}
                                onChange={(e) => handleField("taxId", e.target.value)}
                                className="border-zinc-200"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm font-medium">
                              Юридический адрес <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              placeholder="Адрес компании"
                              value={form.legalAddress}
                              onChange={(e) => handleField("legalAddress", e.target.value)}
                              className="border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm font-medium">Комментарий</Label>
                            <Textarea
                              placeholder="Дополнительная информация для счёта..."
                              value={form.comment}
                              onChange={(e) => handleField("comment", e.target.value)}
                              className="border-zinc-200 resize-none"
                              rows={2}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Consent */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 bg-white">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(v) => setConsent(!!v)}
                      className="mt-0.5"
                    />
                    <label htmlFor="consent" className="text-sm text-zinc-600 leading-relaxed cursor-pointer">
                      Я ознакомлен(а) и согласен(а) с{" "}
                      <a href="#" className="text-pomegranate underline">
                        Политикой обработки персональных данных
                      </a>{" "}
                      и{" "}
                      <a href="#" className="text-pomegranate underline">
                        Пользовательским соглашением
                      </a>
                      .
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground font-semibold"
                  >
                    {paymentMethod === "card"
                      ? "Перейти к оплате"
                      : "Получить счёт на оплату"}
                  </Button>
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                  <Card className="border-zinc-200 shadow-sm sticky top-20">
                    <CardHeader className="border-b border-zinc-100 pb-4">
                      <CardTitle className="text-base text-zinc-900">Сводка заказа</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-600">Тип участия</span>
                          <span className="font-medium text-zinc-900">
                            {ticketTypes.find((t) => t.id === selectedTicket)?.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-600">Количество</span>
                          <span className="font-medium text-zinc-900">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-600">Способ оплаты</span>
                          <span className="font-medium text-zinc-900">
                            {paymentMethod === "card" ? "Карта" : "Счёт"}
                          </span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-base font-bold">
                        <span className="text-zinc-900">Итого</span>
                        <span className="text-pomegranate">
                          {ticketTypes.find((t) => t.id === selectedTicket)?.price}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        НДС включён. После оплаты или формирования счёта на
                        указанный e-mail придёт подтверждение.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </TabsContent>

          {/* ── Group tab ── */}
          <TabsContent value="group">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Group admin info */}
                <Card className="border-zinc-200 shadow-sm">
                  <CardHeader className="border-b border-zinc-100 pb-4">
                    <CardTitle className="text-base text-zinc-900 flex items-center gap-2">
                      <Building className="h-4 w-4 text-zinc-400" />
                      Администратор группы
                    </CardTitle>
                    <CardDescription>
                      Данные ответственного лица от организации
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">
                          Имя <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="Имя" className="border-zinc-200" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">
                          Фамилия <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="Фамилия" className="border-zinc-200" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input type="email" placeholder="admin@компания.uz" className="border-zinc-200" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Телефон</Label>
                        <Input type="tel" placeholder="+998 00 000 00 00" className="border-zinc-200" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Организация <span className="text-red-500">*</span>
                      </Label>
                      <Input placeholder="Название организации" className="border-zinc-200" />
                    </div>
                  </CardContent>
                </Card>

                {/* Participants list */}
                <Card className="border-zinc-200 shadow-sm">
                  <CardHeader className="border-b border-zinc-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-zinc-900 flex items-center gap-2">
                          <Users className="h-4 w-4 text-zinc-400" />
                          Участники
                          <Badge variant="secondary" className="text-xs ml-1">
                            {participants.length}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Группы от 5 человек — скидка 15%
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addParticipant}
                        className="gap-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Добавить
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-3">
                    {participants.map((p, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end p-3 rounded-lg bg-zinc-50 border border-zinc-200"
                      >
                        <div className="space-y-1">
                          <Label className="text-xs text-zinc-500">ФИО</Label>
                          <Input
                            placeholder="Имя Фамилия"
                            value={p.name}
                            onChange={(e) => updateParticipant(i, "name", e.target.value)}
                            className="h-8 text-sm border-zinc-200 bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-zinc-500">Email</Label>
                          <Input
                            placeholder="email@co.com"
                            type="email"
                            value={p.email}
                            onChange={(e) => updateParticipant(i, "email", e.target.value)}
                            className="h-8 text-sm border-zinc-200 bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-zinc-500">Организация</Label>
                          <Input
                            placeholder="Компания"
                            value={p.org}
                            onChange={(e) => updateParticipant(i, "org", e.target.value)}
                            className="h-8 text-sm border-zinc-200 bg-white"
                          />
                        </div>
                        <button
                          onClick={() => removeParticipant(i)}
                          disabled={participants.length === 1}
                          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-30"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-zinc-500" />
                        </button>
                      </div>
                    ))}

                    {participants.length >= 5 && (
                      <Alert className="border-emerald-200 bg-emerald-50">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <AlertTitle className="text-emerald-800 text-sm">
                          Скидка 15% применена
                        </AlertTitle>
                        <AlertDescription className="text-emerald-700 text-xs">
                          Для делегаций от 5 участников действует скидка 15%.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Payment for group */}
                <Card className="border-zinc-200 shadow-sm">
                  <CardHeader className="border-b border-zinc-100 pb-4">
                    <CardTitle className="text-base text-zinc-900">Оплата</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "card" as const, icon: CreditCard, title: "Банковская карта", desc: "Единый платёж" },
                        { id: "invoice" as const, icon: FileText, title: "Единый счёт", desc: "Для юридических лиц" },
                      ].map(({ id, icon: Icon, title, desc }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPaymentMethod(id)}
                          className={cn(
                            "flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left",
                            paymentMethod === id
                              ? "border-pomegranate ring-2 ring-pomegranate/15 bg-white"
                              : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 mb-2", paymentMethod === id ? "text-pomegranate" : "text-zinc-400")} />
                          <p className="text-sm font-semibold text-zinc-900">{title}</p>
                          <p className="text-xs text-zinc-500">{desc}</p>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 bg-white">
                      <Checkbox id="consent-group" className="mt-0.5" />
                      <label htmlFor="consent-group" className="text-sm text-zinc-600 leading-relaxed cursor-pointer">
                        Согласен с{" "}
                        <a href="#" className="text-pomegranate underline">
                          условиями обработки персональных данных
                        </a>{" "}
                        всех участников группы.
                      </label>
                    </div>
                    <Button
                      size="lg"
                      className="w-full h-11 bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground font-semibold"
                    >
                      {paymentMethod === "card"
                        ? "Перейти к оплате"
                        : "Получить сводный счёт"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Group order summary */}
              <div className="lg:col-span-1">
                <Card className="border-zinc-200 shadow-sm sticky top-20">
                  <CardHeader className="border-b border-zinc-100 pb-4">
                    <CardTitle className="text-base text-zinc-900">Сводка заказа</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Участников</span>
                        <span className="font-medium">{participants.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Тип</span>
                        <span className="font-medium">
                          {ticketTypes.find((t) => t.id === selectedTicket)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Цена за участника</span>
                        <span className="font-medium">
                          {ticketTypes.find((t) => t.id === selectedTicket)?.price}
                        </span>
                      </div>
                      {participants.length >= 5 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Скидка группы</span>
                          <span className="font-medium">−15%</span>
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-zinc-900">Итого</span>
                      <span className="text-pomegranate">По запросу</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Точная сумма будет указана в счёте после подтверждения
                      списка участников.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
