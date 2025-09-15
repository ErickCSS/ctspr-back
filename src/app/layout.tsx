import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Footer } from "@modules/shared/components/general/Footer";
import { Header } from "@modules/shared/components/general/header";
import { ViewTransitions } from "next-view-transitions";
import { BackToTop } from "@modules/shared/components/BackToTop";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { PopUp } from "@modules/shared/components/PopUp";
import Script from "next/script";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/cts-favicon.png",
  },

  title: "Caribbean Temporary Services LLC",
  description:
    "Caribbean Temporary Services, LLC. (CTS), es una empresa local establecida en 1983 con la misión de proveer amplias oportunidades de empleo, mientras proporciona un servicio que maneja las necesidades y contribuye al crecimiento de sus clientes en Puerto Rico.",
  openGraph: {
    title: "Caribbean Temporary Services LLC",
    description:
      "Caribbean Temporary Services, LLC. (CTS), es una empresa local establecida en 1983 con la misión de proveer amplias oportunidades de empleo, mientras proporciona un servicio que maneja las necesidades y contribuye al crecimiento de sus clientes en Puerto Rico.",
    type: "website",
    locale: "es",
    siteName: "Caribbean Temporary Services LLC",
    images: [
      {
        url: "https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/cts-brand.webp",
        width: 1200,
        height: 630,
        alt: "Caribbean Temporary Services LLC",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="es">
        <head>
          <GoogleTagManager gtmId="GTM-MGMDLRV" />
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="beforeInteractive"
          />
        </head>
        <body className={` ${lato.variable} antialiased`}>
          <Header /> {children} <Footer />
          <BackToTop />
          <PopUp />
        </body>
        <GoogleAnalytics gaId="G-H82WJSV5G2" />
      </html>
    </ViewTransitions>
  );
}
