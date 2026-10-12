"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { reviews } from "@/data/site";
import { SectionLabel } from "./ui";

export default function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // On phones/tablets the reviews are a swipeable row: track which card is in view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = [...track.children] as HTMLElement[];
      const left = track.scrollLeft;
      const atEnd = left + track.clientWidth >= track.scrollWidth - 4;
      let nearest = 0;
      cards.forEach((card, i) => {
        if (Math.abs(card.offsetLeft - track.offsetLeft - left) < Math.abs(cards[nearest].offsetLeft - track.offsetLeft - left)) nearest = i;
      });
      setActive(atEnd ? cards.length - 1 : nearest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      id="reviews"
      className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-6 pt-10 pb-6 sm:px-8 lg:px-10"
    >
      <SectionLabel>What Our Guests Say</SectionLabel>

      <ul
        ref={trackRef}
        aria-label="Guest reviews"
        className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:scroll-px-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-9 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li key={review.name} className="shrink-0 basis-[86%] snap-start sm:basis-[calc(50%-10px)] lg:basis-auto">
            <figure className="flex h-full flex-col gap-5.5 rounded-xl border border-line bg-white px-6 py-7 sm:px-8 sm:py-7.5">
              <div className="flex gap-4">
                <span aria-hidden="true" className="font-serif text-5xl leading-[0.8] text-forest">
                  “
                </span>
                <blockquote className="text-[13px] leading-[1.8] text-[#3a3a3a]">{review.quote}</blockquote>
              </div>
              <figcaption className="mt-auto flex items-center gap-3.5 pl-10">
                <Image
                  src={review.photo}
                  alt=""
                  width={100}
                  height={100}
                  className="size-[50px] shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-[13px] font-medium whitespace-nowrap">{review.name}</p>
                  <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} className="fill-[#e2a82b] text-[#e2a82b]" aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Dots only matter while the reviews scroll sideways */}
      <div className="flex gap-1 lg:hidden">
        {reviews.map((review, i) => (
          <button
            key={review.name}
            type="button"
            aria-label={`Show review from ${review.name}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => goTo(i)}
            className="flex size-10 items-center justify-center"
          >
            <span
              className={`h-[9px] rounded-full transition-all ${active === i ? "w-6 bg-forest" : "w-[9px] bg-[#d8d2c6]"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
