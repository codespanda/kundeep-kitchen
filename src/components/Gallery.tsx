import Image from "next/image";
import { Images } from "lucide-react";
import { galleryImages } from "@/data/site";
import { Button, SectionLabel } from "./ui";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 pt-6 pb-10 sm:px-8 lg:px-10"
    >
      <SectionLabel>Warm Ambiance, Great Experience</SectionLabel>
      <ul className="grid w-full grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {galleryImages.map((img) => (
          <li key={img.src} className="overflow-hidden rounded-lg">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={600}
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
              className="h-[180px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[230px]"
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
