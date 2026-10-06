import type { Metadata } from "next";
import { CalendarCheck, Phone } from "lucide-react";
import { contact } from "@/data/site";
import MenuBrowser from "@/components/menu/MenuBrowser";
import ReserveButton from "@/components/reservation/ReserveButton";
import { Button, buttonClassName, Ornament, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Menu | Kundeep Kitchen",
  description:
    "Explore the full pure vegetarian menu at Kundeep Kitchen — starters, chaat, curries, dal, thalis, biryani, breads, desserts and beverages.",
};

export default function MenuPage() {
  return (
    <main>
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 pt-8 pb-6 text-center sm:pt-12">
        <SectionLabel tone="clay">Pure Veg, Pure Love</SectionLabel>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,3.6rem)] leading-tight text-forest">Our Menu</h1>
        <Ornament className="text-gold" />
        <p className="max-w-xl text-[15px] leading-[1.8] text-[#3a3a3a]">
          Authentic North Indian vegetarian dishes, cooked fresh every day with traditional recipes
          and the finest ingredients.
        </p>
      </section>

      <MenuBrowser />

      <section className="mx-auto mb-16 w-full max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-forest-dark px-6 py-10 text-center sm:px-12">
          <h2 className="font-serif text-[28px] leading-tight text-parchment">Hungry already?</h2>
          <p className="max-w-md text-[13px] leading-[1.7] text-[#dcd6c6]">
            Reserve your table and enjoy these dishes fresh from our kitchen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ReserveButton className={buttonClassName("light")}>
              <CalendarCheck size={16} className="text-clay" aria-hidden="true" />
              Reserve a Table
            </ReserveButton>
            <Button href={contact.phoneHref} variant="outline-light">
              <Phone size={16} className="fill-current" aria-hidden="true" />
              Call Us: {contact.phoneDisplay}
            </Button>
          </div>
          <p className="text-xs text-[#bfc8b4]">Prices in ₹. Taxes as applicable.</p>
        </div>
      </section>
    </main>
  );
}
