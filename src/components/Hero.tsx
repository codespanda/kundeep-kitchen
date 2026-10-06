import Image from "next/image";
import { BookOpen, CalendarCheck, ChefHat, ConciergeBell, Heart, Leaf } from "lucide-react";
import { Button, buttonClassName, Ornament } from "./ui";
import ReserveButton from "./reservation/ReserveButton";

const features = [
  { icon: Leaf, label: ["100% Pure", "Vegetarian"] },
  { icon: ConciergeBell, label: ["Hygienic &", "High Quality"] },
  { icon: ChefHat, label: ["Expert", "Chefs"] },
  { icon: Heart, label: ["Made with", "Love"] },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-8 lg:grid-cols-2 lg:px-12"
    >
      <div className="flex flex-col gap-7 pt-6 pb-12 lg:pt-10">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,3.65rem)] leading-[1.12] text-forest">
          Authentic Flavors.
          <br />
          <span className="text-clay">Memorable Moments.</span>
        </h1>
        <Ornament className="text-gold" />
        <p className="max-w-[500px] text-base leading-[1.8] text-[#3a3a3a]">
          At Kundeep Kitchen, we serve delicious pure vegetarian dishes crafted with love,
          tradition and the finest ingredients.
        </p>
        <div className="flex flex-wrap gap-5">
          <ReserveButton className={buttonClassName("solid", "text-[15px]")}>
            <CalendarCheck size={17} aria-hidden="true" />
            Reserve a Table
          </ReserveButton>
          <Button href="/menu" variant="outline" className="text-[15px]">
            <BookOpen size={17} className="text-clay" aria-hidden="true" />
            Explore Menu
          </Button>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap">
          {features.map(({ icon: Icon, label }, i) => (
            <li
              key={label.join(" ")}
              className={`flex flex-col items-center gap-2.5 px-6 text-center text-[13px] leading-normal font-medium first:pl-0 ${
                i < features.length - 1 ? "sm:border-r sm:border-[#e3dacb]" : ""
              }`}
            >
              <Icon size={38} strokeWidth={1.2} className="text-forest" aria-hidden="true" />
              <span>
                {label[0]}
                <br />
                {label[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex items-center justify-center self-center pb-10 lg:pb-0">
        {/* Soft ground shadow so the cut-out sits on the page instead of floating */}
        <div
          aria-hidden="true"
          className="absolute bottom-[4%] left-1/2 h-[12%] w-[78%] -translate-x-1/2 rounded-[50%] bg-forest/25 blur-2xl lg:bottom-[6%]"
        />
        <Image
          src="/images/hero-dish.webp"
          alt="Creamy curry garnished with almonds and herbs in a handi with brass handles"
          width={1240}
          height={877}
          preload
          sizes="(min-width: 1024px) 600px, 100vw"
          className="relative w-full max-w-[620px] drop-shadow-[0_24px_30px_rgba(60,35,10,0.28)]"
        />
      </div>
    </section>
  );
}
