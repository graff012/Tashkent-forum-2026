"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/program", label: "Программа" },
  { href: "/speakers", label: "Спикеры" },
  { href: "/register", label: "Участие" },
];

const languages = [
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
  { code: "UZ", label: "O'zbek" },
];

export function SiteHeader() {
  const [currentLang, setCurrentLang] = useState("RU");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-lg bg-pomegranate flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold tracking-tight">TF</span>
          </div>
          <div className="hidden sm:block leading-none">
            <p className="text-sm font-bold text-zinc-900">Tashkent Fintech</p>
            <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-0.5">
              International Forum
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(navigationMenuTriggerStyle(), "text-zinc-700")}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-zinc-600 hover:text-zinc-900"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={cn(
                    "cursor-pointer",
                    currentLang === lang.code && "font-semibold"
                  )}
                >
                  <span className="font-mono text-xs text-zinc-400 mr-2 w-6">
                    {lang.code}
                  </span>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Register CTA */}
          <Button
            asChild
            size="sm"
            className="hidden sm:flex bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground"
          >
            <Link href="/register">Регистрация</Link>
          </Button>

          {/* Login */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:flex ml-1 text-zinc-700"
          >
            <Link href="/login">Войти</Link>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <Button
              asChild
              size="sm"
              className="bg-pomegranate hover:bg-pomegranate/90 text-pomegranate-foreground"
            >
              <Link href="/register">Регистрация</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
