"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { Logo } from "./ui";
import ReserveButton from "./reservation/ReserveButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-cream/95 shadow-[0_2px_16px_rgba(47,74,30,0.10)] backdrop-blur" : "bg-cream"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 transition-[padding] duration-300 sm:px-8 lg:px-12 ${
          scrolled ? "py-2.5" : "py-6"
        }`}
      >
        {/* Height shrinks with the scale so the bar itself gets shorter, not just the logo */}
        <div
          className={`flex origin-left items-center transition-[height,transform] duration-300 ${
            scrolled ? "h-[62px] scale-[0.78]" : "h-20 scale-100"
          }`}
        >
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === pathname ? "page" : undefined}
              className={`py-1.5 text-sm transition-colors hover:text-clay ${
                link.href === pathname ? "border-b-2 border-forest font-medium text-forest" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ReserveButton
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-forest px-4 py-3 text-[13px] font-medium text-white transition-colors hover:bg-forest-dark"
          >
            <CalendarCheck size={15} aria-hidden="true" />
            Reserve a Table
          </ReserveButton>
        </nav>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md border border-line text-forest lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="absolute inset-x-4 top-full flex flex-col rounded-xl border border-line bg-white p-4 shadow-lg lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-ink hover:bg-cream"
              >
                {link.label}
              </Link>
            ))}
            <ReserveButton
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-forest px-4 py-3 text-sm font-medium text-white"
            >
              <CalendarCheck size={16} aria-hidden="true" />
              Reserve a Table
            </ReserveButton>
          </nav>
        )}
      </div>
    </header>
  );
}
