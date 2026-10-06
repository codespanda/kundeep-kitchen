import Image from "next/image";
import { ArrowRight, CircleCheck } from "lucide-react";
import { aboutPoints } from "@/data/site";
import { Button, SectionLabel } from "./ui";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_auto] lg:px-10"
    >
      <Image
        src="/images/about-interior.jpg"
        alt="Kundeep Kitchen dining room"
        width={1100}
        height={860}
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
        className="h-[300px] w-full rounded-2xl object-cover sm:h-[430px]"
      />

      <div className="flex flex-col gap-4.5">
        <SectionLabel align="start">About Us</SectionLabel>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,2.4rem)] leading-[1.2] text-forest">
          Where Tradition
          <br />
          Meets Taste
        </h2>
        <p className="text-sm leading-[1.85] text-[#3a3a3a]">
          Kundeep Kitchen is a pure vegetarian restaurant committed to serving authentic North
          Indian cuisine with exceptional taste and warm hospitality.
        </p>
        <ul className="flex flex-col gap-3.5 text-sm">
          {aboutPoints.map((point) => (
            <li key={point} className="flex items-center gap-3">
              <CircleCheck size={20} className="shrink-0 fill-forest text-white" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <Button href="#about" variant="outline" className="mt-2 self-start px-5 py-3">
          Know More About Us
          <ArrowRight size={15} aria-hidden="true" />
        </Button>
      </div>

      <aside className="flex w-[190px] flex-col items-center gap-4.5 justify-self-center rounded-xl bg-sand px-5 py-10 text-center md:col-span-2 lg:col-span-1">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="25" cy="25" r="22" className="stroke-gold" />
          <path
            d="M13 30h24M15 30a10 10 0 0 1 20 0M25 20v-3M18 14c2 2 3 0 5 2M27 13c2 2 3 0 5 2"
            className="stroke-forest"
          />
        </svg>
        <p className="font-serif text-[22px] leading-[1.4] text-forest">
          Good Food
          <br />
          Good Mood
          <br />
          Great Times!
        </p>
        <svg width="50" height="10" viewBox="0 0 50 10" fill="none" className="stroke-gold" strokeWidth="1.2" aria-hidden="true">
          <path d="M0 5h18M32 5h18M25 1l4 4-4 4-4-4z" />
        </svg>
      </aside>
    </section>
  );
}
