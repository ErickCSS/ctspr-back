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
  metadataBase: new URL("https://ctspr.com"),
  alternates: {
    canonical: "/",
    languages: {
      es: "/es",
      en: "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: "Caribbean Temporary Services LLC",
  description:
    "CTS es una empresa local establecida en 1983 con la misión de proveer amplias oportunidades de empleo en Puerto Rico.",
  openGraph: {
    title: "Caribbean Temporary Services LLC",
    description:
      "CTS es una empresa local establecida en 1983 con la misión de proveer amplias oportunidades de empleo en Puerto Rico.",
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
  twitter: {
    card: "summary_large_image",
    title: "Caribbean Temporary Services LLC",
    description:
      "CTS es una empresa local establecida en 1983 con la misión de proveer amplias oportunidades de empleo en Puerto Rico.",
    images: [
      "https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/cts-brand.webp",
    ],
    creator: "ctspr",
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
          <link
            rel="preload"
            as="image"
            href="/images/fallback-video.webp"
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
