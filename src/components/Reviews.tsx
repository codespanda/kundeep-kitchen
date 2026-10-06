"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { reviews } from "@/data/site";
import { SectionLabel } from "./ui";

const pages = 3;

export default function Reviews() {
  const [page, setPage] = useState(0);

  return (
    <section
      id="reviews"
      className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-6 px-4 pt-10 pb-6 sm:px-8 lg:px-10"
    >
      <SectionLabel>What Our Guests Say</SectionLabel>

      <ul className="grid w-full gap-9 md:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.name}>
            <figure className="flex h-full flex-col gap-5.5 rounded-xl border border-line bg-white px-8 py-7.5">
              <div className="flex gap-4">
                <span aria-hidden="true" className="font-serif text-5xl leading-[0.8] text-forest">
                  “
                </span>
                <blockquote className="text-[13px] leading-[1.8] text-[#3a3a3a]">
                  {review.quote}
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3.5 pl-10">
                <Image
                  src={review.photo}
                  alt=""
                  width={100}
                  height={100}
                  className="size-[50px] rounded-full object-cover"
                />
                <div>
                  <p className="text-[13px] font-medium">{review.name}</p>
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

      <div className="flex gap-1 pt-2">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show reviews page ${i + 1}`}
            aria-current={page === i}
            onClick={() => setPage(i)}
            className="flex size-6 items-center justify-center"
          >
            <span className={`size-[9px] rounded-full ${page === i ? "bg-forest" : "bg-[#d8d2c6]"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
