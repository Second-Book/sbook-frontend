import type { Metadata, Viewport } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import UserStoreProvider from "@/providers/UserStoreProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
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
  title: "EduMarket",
  description: "Your place for used books",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <UserStoreProvider>
          <main className="w-full min-h-[100vh] flex flex-col">
            <NavbarDesktop />
            <NavbarMobile />
            <section className="grow">{children}</section>
            <Footer />
          </main>
        </UserStoreProvider>
      </body>
    </html>
  );
}
