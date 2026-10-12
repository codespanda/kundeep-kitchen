"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Flame, Search, Sparkles, Star, X } from "lucide-react";
import { menu, tagLabels, type MenuItem, type MenuTag } from "@/data/menu";
import VegMark from "./VegMark";

const tagStyles: Record<MenuTag, string> = {
  bestseller: "bg-[#fdf1dc] text-[#8a5a00]",
  chef: "bg-forest/10 text-forest",
  spicy: "bg-[#fde7df] text-[#a63a12]",
  new: "bg-[#e5eefc] text-[#1f4f9c]",
};

const tagIcons: Record<MenuTag, typeof Star> = {
  bestseller: Star,
  chef: Sparkles,
  spicy: Flame,
  new: Sparkles,
};

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex gap-3 border-b border-dashed border-[#e3dacb] py-5 sm:gap-4 last:border-b-0">
      {item.image && (
        <Image
          src={item.image}
          alt=""
          width={600}
          height={660}
          sizes="(min-width: 640px) 88px, 64px"
          className="size-16 shrink-0 rounded-lg object-cover sm:size-[88px]"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <VegMark className="relative top-0.5" />
          <h3 className="text-[15px] font-medium text-ink">{item.name}</h3>
          <span
            aria-hidden="true"
            className="min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-[#cfc3ae]"
          />
          <span className="font-serif text-lg text-forest">{rupee(item.price)}</span>
        </div>
        <p className="mt-1.5 pl-[26px] text-[13px] leading-relaxed text-muted">{item.description}</p>
        {(item.tags?.length || item.priceNote) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-[26px]">
            {item.tags?.map((tag) => {
              const Icon = tagIcons[tag];
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tagStyles[tag]}`}
                >
                  <Icon size={11} aria-hidden="true" className={tag === "bestseller" ? "fill-current" : ""} />
                  {tagLabels[tag]}
                </span>
              );
            })}
            {item.priceNote && <span className="text-[11px] text-muted">{item.priceNote}</span>}
          </div>
        )}
      </div>
    </li>
  );
}

export default function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [bestsellersOnly, setBestsellersOnly] = useState(false);
  const [active, setActive] = useState(menu[0].id);
  const navRef = useRef<HTMLElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            (!bestsellersOnly || item.tags?.includes("bestseller")) &&
            (!q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, bestsellersOnly]);

  const resultCount = filtered.reduce((n, c) => n + c.items.length, 0);

  // Highlight the category currently in view: the last section whose top has passed
  // under the sticky header + category bar (~150px), or the last one at the page bottom.
  useEffect(() => {
    const sections = filtered
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      // A section counts as current once its top passes just below the sticky bars.
      const barBottom = navRef.current?.parentElement?.getBoundingClientRect().bottom ?? 150;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= barBottom + 24) current = s.id;
      }
      setActive(atBottom ? sections[sections.length - 1].id : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [filtered]);

  // Show each arrow only when there are more categories hidden in that direction.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => {
      const max = nav.scrollWidth - nav.clientWidth;
      setCanScroll({ left: nav.scrollLeft > 4, right: nav.scrollLeft < max - 4 });
    };
    update();
    nav.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(nav);
    return () => {
      nav.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, [filtered]);

  const scrollCategories = (direction: -1 | 1) => {
    const nav = navRef.current;
    nav?.scrollBy({ left: direction * nav.clientWidth * 0.7, behavior: "smooth" });
  };

  // Centre the active pill in the category bar. Scrolls the bar only — scrollIntoView
  // would also scroll the page vertically.
  useEffect(() => {
    const nav = navRef.current;
    const pill = nav?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!nav || !pill) return;
    const offset = pill.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    nav.scrollTo({
      left: nav.scrollLeft + offset - (nav.clientWidth - pill.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-8">
      {/* Category bar sits just under the sticky site header */}
      <div className="sticky top-[var(--header-h,82px)] z-30 -mx-4 border-b border-line bg-cream/95 px-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="relative">
          {canScroll.left && (
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-20 items-center bg-gradient-to-r from-cream from-45% to-transparent">
              <button
                type="button"
                onClick={() => scrollCategories(-1)}
                aria-label="Scroll categories left"
                className="pointer-events-auto flex size-11 items-center justify-center"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-colors hover:border-forest hover:bg-forest hover:text-white">
                  <ChevronLeft size={18} aria-hidden="true" />
                </span>
              </button>
            </div>
          )}
          <nav
            ref={navRef}
            aria-label="Menu categories"
            className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                data-cat={cat.id}
                aria-current={active === cat.id ? "true" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  active === cat.id
                    ? "border-forest bg-forest text-white"
                    : "border-line bg-white text-ink hover:border-forest hover:text-forest"
                }`}
              >
                {cat.name}
              </a>
            ))}
          </nav>
          {canScroll.right && (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-20 items-center justify-end bg-gradient-to-l from-cream from-45% to-transparent">
              <button
                type="button"
                onClick={() => scrollCategories(1)}
                aria-label="Scroll categories right"
                className="pointer-events-auto flex size-11 items-center justify-center"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-colors hover:border-forest hover:bg-forest hover:text-white">
                  <ChevronRight size={18} aria-hidden="true" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="relative min-w-[240px] flex-1">
          <label htmlFor="menu-search" className="sr-only">
            Search the menu
          </label>
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, e.g. paneer, naan, lassi…"
            className="w-full rounded-full border border-[#d9cfbf] bg-white py-3 pr-11 pl-11 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-sand"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="button"
          aria-pressed={bestsellersOnly}
          onClick={() => setBestsellersOnly((v) => !v)}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors ${
            bestsellersOnly
              ? "border-[#8a5a00] bg-[#fdf1dc] text-[#8a5a00]"
              : "border-[#d9cfbf] bg-white text-ink hover:border-forest"
          }`}
        >
          <Star size={15} className={bestsellersOnly ? "fill-current" : ""} aria-hidden="true" />
          Bestsellers only
        </button>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted" aria-live="polite">
        <VegMark /> 100% pure vegetarian · {resultCount} {resultCount === 1 ? "dish" : "dishes"}
        {query && ` matching “${query.trim()}”`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="font-serif text-2xl text-forest">No dishes found</p>
          <p className="text-sm text-muted">Try another search, or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setBestsellersOnly(false);
            }}
            className="mt-2 rounded-md border-[1.5px] border-forest px-5 py-2.5 text-sm font-medium text-forest hover:bg-forest hover:text-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-12">
          {filtered.map((cat) => (
            <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`} className="scroll-mt-[calc(var(--header-h,82px)+5rem)]">
              <header className="mb-2 flex flex-wrap items-end justify-between gap-2 border-b-2 border-forest/80 pb-3">
                <div>
                  <h2 id={`${cat.id}-title`} className="font-serif text-[30px] leading-tight text-forest">
                    {cat.name}
                  </h2>
                  <p className="mt-1 text-[13px] text-muted">{cat.description}</p>
                </div>
                <span className="text-xs text-muted">
                  {cat.items.length} {cat.items.length === 1 ? "item" : "items"}
                </span>
              </header>
              <ul className="grid gap-x-12 md:grid-cols-2">
                {cat.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
