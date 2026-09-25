import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import { I18nProvider, ThemeProvider } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileBookBar } from "@/components/MobileBookBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SplashScreen } from "@/components/SplashScreen";
import { SmoothScroll } from "@/components/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://makaremhotels.com/en/hotels/makarem-ajyad-makkah"),
  title: {
    default: "فندق مكارم أجياد مكة | Makarem Ajyad Makkah Hotel — 5 Stars",
    template: "%s | فندق مكارم أجياد مكة",
  },
  description:
    "فندق مكارم أجياد مكة — ٤١١ غرفة وجناحاً ملكياً على بُعد ٣٠٠ متر من برج الساعة وبوابة الملك عبدالعزيز، بخطوات يسيرة من المسجد الحرام. Makarem Ajyad Makkah Hotel near Haram.",
  keywords: [
    "فندق مكارم أجياد",
    "فنادق مكارم",
    "مكارم أجياد مكة",
    "فنادق قريبة من الحرم",
    "Makarem Ajyad",
    "Makarem Ajyad Makkah Hotel",
    "Makkah hotels near Haram",
    "Saudi National Day hotel offer",
  ],
  openGraph: {
    title: "فندق مكارم أجياد مكة | Makarem Ajyad Makkah Hotel",
    description:
      "إقامة فاخرة بخطوات يسيرة من الحرم المكي الشريف — ٤١١ غرفة وجناحاً، مكتب إرشاد ديني، مكتبة إسلامية، مطاعم راقية، وخدمة على مدار الساعة.",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    images: [
      {
        url: "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbb055cf86d30485a9670d214cf17c073-xmc-hero-desktop%3Fv%3D3575d7f7&w=1920&q=75",
        width: 1920,
        height: 1080,
        alt: "Makarem Ajyad Makkah Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فندق مكارم أجياد مكة | Makarem Ajyad Makkah Hotel",
    description: "إقامة روحانية فاخرة على بُعد خطوات يسيرة من المسجد الحرام وبرج الساعة.",
    images: [
      "https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbb055cf86d30485a9670d214cf17c073-xmc-hero-desktop%3Fv%3D3575d7f7&w=1920&q=75",
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1613" },
  ],
};

/** Hotel structured data for rich search results */
const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Makarem Ajyad Makkah Hotel | فندق مكارم أجياد مكة",
  description:
    "5-star luxury hotel on Ajyad Street, 300 meters from the Makkah Clock Tower, steps from King Abdul Aziz Gate and the Holy Mosque.",
  starRating: { "@type": "Rating", ratingValue: "5" },
  telephone: "+966125720500",
  email: "reservation.ajyad@makarem.sa",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hamza Bin Abdulmuttaleb Street, Ajyad District",
    addressLocality: "Makkah",
    addressCountry: "SA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 21.4156, longitude: 39.8227 },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "High Speed WiFi" },
    { "@type": "LocationFeatureSpecification", name: "Spiritual Concierge Desk" },
    { "@type": "LocationFeatureSpecification", name: "Islamic Library" },
    { "@type": "LocationFeatureSpecification", name: "Ajyad Restaurant" },
    { "@type": "LocationFeatureSpecification", name: "Grab & Go Cafe" },
    { "@type": "LocationFeatureSpecification", name: "24/7 Room Service" },
    { "@type": "LocationFeatureSpecification", name: "Valet & Private Parking" },
    { "@type": "LocationFeatureSpecification", name: "Banquet & Meeting Rooms" },
  ],
  checkinTime: "16:00",
  checkoutTime: "12:00",
  petsAllowed: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`flex min-h-full flex-col ${jakarta.variable} ${tajawal.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hotelJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <I18nProvider>
          <ThemeProvider>
            <SmoothScroll>
              <SplashScreen />
              <ScrollProgress />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingWhatsApp />
              <MobileBookBar />
            </SmoothScroll>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
