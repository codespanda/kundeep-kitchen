import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contact, navLinks } from "@/data/site";
import { menu } from "@/data/menu";
import { Logo } from "./ui";
import NewsletterForm from "./NewsletterForm";

// lucide-react v1 no longer ships brand icons, so these are drawn inline.
const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" fill="currentColor" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
      </g>
    ),
  },
  {
    label: "Google",
    href: "#",
    icon: <path d="M20 12h-8M19.5 8A8 8 0 1 0 20 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/916280347210",
    icon: (
      <g>
        <path d="M3 21l1.7-4.6A9 9 0 1 1 8 19.6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" fill="currentColor" />
      </g>
    ),
  },
];

// The footer lists the same seven categories as the design.
const footerMenuIds = ["starters", "main-course", "thali", "biryani", "breads", "desserts", "beverages"];
const footerMenu = menu.filter((c) => footerMenuIds.includes(c.id));

const headingClass = "mb-3.5 text-[15px] font-medium text-white";
const linkClass = "inline-flex min-h-9 items-center text-sm text-[#e9e4d6] transition-colors hover:text-gold-light";

export default function Footer() {
  return (
    <footer id="contact" className="bg-forest-deep text-[#e9e4d6]">
      <div className="mx-auto grid w-full max-w-7xl gap-9 px-4 pt-11 pb-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-14 xl:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <Logo variant="dark" />
          <p className="text-[13px] leading-[1.8] text-[#dcd6c6]">
            Delicious pure vegetarian food made with love and the finest ingredients.
          </p>
          <ul className="flex gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full transition-colors hover:text-gold-light"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h2 className={headingClass}>Quick Links</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our menu">
          <h2 className={headingClass}>Our Menu</h2>
          <ul>
            {footerMenu.map((cat) => (
              <li key={cat.id}>
                <Link href={`/menu#${cat.id}`} className={linkClass}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-2 text-[13px] leading-[1.7] not-italic">
          <h2 className="text-[15px] font-medium text-white">Contact Us</h2>
          <p className="flex gap-3">
            <MapPin size={16} className="mt-1 shrink-0 text-gold-light" aria-hidden="true" />
            <span>
              {contact.addressLines[0]}
              <br />
              {contact.addressLines[1]}
            </span>
          </p>
          <a href={contact.phoneHref} className="flex min-h-10 items-center gap-3 hover:text-gold-light">
            <Phone size={16} className="text-gold-light" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className="flex min-h-10 items-center gap-3 break-all hover:text-gold-light">
            <Mail size={16} className="text-gold-light" aria-hidden="true" />
            {contact.email}
          </a>
          <p className="flex items-center gap-3">
            <Clock size={16} className="text-gold-light" aria-hidden="true" />
            {contact.hours}
          </p>
        </address>

        <div className="flex flex-col gap-3.5">
          <h2 className="text-[15px] font-medium text-white">Follow Us</h2>
          <p className="text-[13px] leading-[1.7] text-[#dcd6c6]">
            Stay updated with our latest offers and specials.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        <div className="flex flex-wrap justify-between gap-4 border-t border-[#3a4e2e] py-2 text-xs text-[#dcd6c6] items-center">
          <p>© {new Date().getFullYear()} Kundeep Kitchen. All Rights Reserved.</p>
          <p className="flex items-center gap-4.5">
            <Link href="#" className="inline-flex min-h-10 items-center hover:text-gold-light">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="#" className="inline-flex min-h-10 items-center hover:text-gold-light">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
