import type { Metadata, Viewport } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import UserStoreProvider from "@/providers/UserStoreProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from 'react-hot-toast';
import NavbarDesktop from "@/components/Navbar/NavbarDesktop";
import Footer from "@/components/Footer";
import NavbarMobile from "@/components/Navbar/NavbarMobile";

config.autoAddCss = false;

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: {
    default: "SecondBook — kupovina i prodaja udžbenika u Beogradu",
    template: "%s | SecondBook",
  },
  description:
    "SecondBook — platforma za kupovinu i prodaju polovnih školskih udžbenika u Beogradu. Povoljne cene, ugrađen chat, pretraga po razredu, predmetu i autoru.",
  keywords: [
    "udžbenici",
    "polovna udžbenici",
    "školski udžbenici",
    "kupovina udžbenika",
    "prodaja udžbenika",
    "Beograd",
    "SecondBook",
    "textbooks",
    "used textbooks",
    "Belgrade",
  ],
  openGraph: {
    title: "SecondBook — kupovina i prodaja udžbenika u Beogradu",
    description:
      "Platforma za kupovinu i prodaju polovnih školskih udžbenika u Beogradu po povoljnim cenama.",
    siteName: "SecondBook",
    locale: "sr_Latn_RS",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SecondBook — kupovina i prodaja udžbenika u Beogradu",
    description:
      "Platforma za kupovinu i prodaju polovnih školskih udžbenika u Beogradu.",
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://sb.maria.rezvov.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn">
      <body
        className={`${roboto.variable} ${poppins.variable} min-h-[100vh] flex flex-col`}>
        <UserStoreProvider>
          <NavbarDesktop />
          <NavbarMobile />
          <main className="grow bg-[#FBFBFB]">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </UserStoreProvider>
      </body>
    </html>
  );
}
