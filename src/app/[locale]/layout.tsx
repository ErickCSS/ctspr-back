import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

import { ViewTransitions } from "next-view-transitions";
import { BackToTop } from "@modules/shared/components/BackToTop";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import Script from "next/script";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
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

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>,
) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  return (
    <ViewTransitions>
      <html lang="es">
        <head>
          <GoogleTagManager gtmId="GTM-MGMDLRV" />
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="beforeInteractive"
          />
          <link
            rel="preload"
            as="video"
            type="video/mp4"
            href="/videos/video-cts.mp4"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="video"
            type="video/webm"
            href="/videos/video-cts.webm"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="video"
            type="video/webm"
            href="/videos/cts-video-slider.webm"
            fetchPriority="high"
          />
        </head>

        <body className={` ${lato.variable} antialiased`}>
          <NextIntlClientProvider locale={locale}>
            {children}
          </NextIntlClientProvider>
          <BackToTop />
          <Toaster />
        </body>
        <GoogleAnalytics gaId="G-H82WJSV5G2" />
      </html>
    </ViewTransitions>
  );
}
