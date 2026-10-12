import Image from "next/image";
import { NotebookText } from "lucide-react";
import { dishes } from "@/data/site";
import { Button, SectionLabel } from "./ui";

export default function Specialties() {
  return (
    <section
      id="specials"
      className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-4 pt-14 pb-10 sm:px-8 lg:px-10"
    >
      <SectionLabel tone="clay">Our Specialties</SectionLabel>
      <h2 className="mb-4 text-center font-serif text-[clamp(2rem,3.5vw,2.4rem)] text-forest">
        Signature Dishes You’ll Love
      </h2>

      <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {dishes.map((dish) => (
          <li
            key={dish.name}
            className="overflow-hidden rounded-xl border border-line bg-white text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              width={600}
              height={660}
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
              className="aspect-square w-full object-cover"
            />
            <div className="px-2.5 pt-3.5 pb-4 sm:px-3.5 sm:pt-4 sm:pb-5">
              <h3 className="mb-2 text-sm font-medium sm:mb-2.5 sm:text-[15px]">{dish.name}</h3>
              <p className="text-xs leading-[1.7] text-muted">{dish.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Button href="/menu" className="mt-4 py-3.5">
        <NotebookText size={16} aria-hidden="true" />
        View Full Menu
      </Button>
    </section>
  );
}
