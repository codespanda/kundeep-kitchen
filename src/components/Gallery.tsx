import Image from "next/image";
import { Images } from "lucide-react";
import { galleryImages } from "@/data/site";
import { Button, SectionLabel } from "./ui";

// Mosaic so 5 photos never leave an empty cell:
// phones 1 wide + 2×2 · tablets 2 + 3 (on a 6-column grid) · desktop 5 in a row.
const tileClasses = [
  "col-span-2 aspect-[2/1] sm:col-span-3 sm:aspect-[3/2] lg:col-span-1 lg:aspect-square",
  "aspect-square sm:col-span-3 sm:aspect-[3/2] lg:col-span-1 lg:aspect-square",
  "aspect-square sm:col-span-2 lg:col-span-1",
  "aspect-square sm:col-span-2 lg:col-span-1",
  "aspect-square sm:col-span-2 lg:col-span-1",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 pt-6 pb-10 sm:px-8 lg:px-10"
    >
      <SectionLabel>Warm Ambiance, Great Experience</SectionLabel>
      <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-3.5 lg:grid-cols-5">
        {galleryImages.map((img, i) => (
          <li key={img.src} className={`overflow-hidden rounded-lg ${tileClasses[i] ?? "aspect-square"}`}>
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={600}
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
              className="size-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </li>
        ))}
      </ul>
      <Button href="#gallery" className="py-3">
        <Images size={16} aria-hidden="true" />
        View Gallery
      </Button>
    </section>
  );
}
