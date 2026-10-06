import { CalendarDays, Phone } from "lucide-react";
import { contact } from "@/data/site";
import { Button, buttonClassName } from "./ui";
import ReserveButton from "./reservation/ReserveButton";

export default function CtaBanner() {
  return (
    <section id="reserve" className="mx-auto mt-6 w-full max-w-[1240px] px-4 sm:px-5">
      <div className="relative flex flex-wrap items-center gap-10 overflow-hidden rounded-t-xl bg-forest-dark px-6 py-8 sm:px-14">
        <svg
          width="90"
          height="80"
          viewBox="0 0 90 80"
          fill="none"
          className="shrink-0 stroke-gold"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M45 18c-3-5-12-4-12 3 0 6 12 12 12 12s12-6 12-12c0-7-9-8-12-3z" />
          <path d="M20 46h50M45 46v26M35 72h20M10 30v42M10 56h14v16M80 30v42M80 56H66v16" />
        </svg>

        <div className="flex-[1_1_280px]">
          <h2 className="mb-3 font-serif text-[28px] leading-[1.2] text-parchment">
            Good Food Brings
            <br />
            People Together
          </h2>
          <p className="text-[13px] leading-[1.7] text-[#dcd6c6]">
            Reserve your table now and enjoy a delightful dining experience with your loved ones.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-5">
          <ReserveButton className={buttonClassName("light")}>
            <CalendarDays size={16} className="text-clay" aria-hidden="true" />
            Reserve a Table
          </ReserveButton>
          <Button href={contact.phoneHref} variant="outline-light">
            <Phone size={16} className="fill-current" aria-hidden="true" />
            Call Us: {contact.phoneDisplay}
          </Button>
        </div>

        <svg
          className="absolute right-2.5 bottom-1.5 stroke-gold opacity-55"
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          aria-hidden="true"
        >
          <path d="M68 68C50 60 40 40 46 20M46 20c-8 4-12 12-10 20M46 20c8 2 14 8 14 18M30 50c-8-4-16-2-20 4M30 50c-2 8 2 14 8 16" />
        </svg>
      </div>
    </section>
  );
}
