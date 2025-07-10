import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Footer } from "@components/general/Footer";
import { Header } from "@components/general/header";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Caribbean Temporary Services LLC",
  description:
    "Caribbean Temporary Services, LLC. (CTS), es una empresa local establecida en 1983 con la misión de proveer amplias oportunidades de empleo, mientras proporciona un servicio que maneja las necesidades y contribuye al crecimiento de sus clientes en Puerto Rico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={` ${lato.variable} antialiased`}>
        <Header /> {children} <Footer />
      </body>
    </html>
  );
}
