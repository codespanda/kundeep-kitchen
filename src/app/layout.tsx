import type { Metadata } from "next";
import { DM_Serif_Display, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationProvider from "@/components/reservation/ReservationProvider";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kundeep Kitchen | Pure Veg, Pure Love",
  description:
    "Kundeep Kitchen serves delicious pure vegetarian North Indian dishes crafted with love, tradition and the finest ingredients.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReservationProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ReservationProvider>
      </body>
    </html>
  );
}
