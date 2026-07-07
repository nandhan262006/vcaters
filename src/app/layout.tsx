import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vcateringevents.com"),
  title: "V Catering & Events | Best Catering Service in Hyderabad",
  description:
    "4.9 ★ (2K+ Google reviews) V Catering & Events is Hyderabad's premier catering service — authentic flavours, professional service & 24/7 availability. Book your event today!",
  keywords: [
    "best catering in Hyderabad",
    "caterers in Hyderabad",
    "V Catering & Events",
    "Hyderabad catering service",
    "best food caterers Hyderabad",
    "event catering Hyderabad",
    "wedding caterers Hyderabad",
    "corporate catering Hyderabad",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "V Catering & Events | Best Catering Service in Hyderabad",
    description:
      "4.9 ★ (2K+ Google reviews) Hyderabad's premier catering service. Authentic flavours, professional service, 24/7.",
    url: "https://vcateringevents.com",
    siteName: "V Catering & Events",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/vcaters.png",
        width: 600,
        height: 240,
        alt: "V Catering & Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "V Catering & Events | Best Catering in Hyderabad",
    description:
      "4.9 ★ (2K+ Google reviews) Hyderabad's premier catering service.",
    images: ["/vcaters.png"],
  },
  icons: {
    icon: "/justv.png",
    apple: "/justv.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "V Catering & Events",
    image: "https://vcateringevents.com/vcaters.png",
    url: "https://vcateringevents.com",
    telephone: "+918686860658",
    openingHours: "Mo-Su 00:00-23:59",
    description:
      "4.9 ★ rated catering service in Hyderabad with 2000+ Google reviews. Authentic flavours for every celebration.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Beside LIne L.V Prasad Eye Hospital Road, Road No. 2, Banjara Hills",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500034",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4171,
      longitude: 78.4419,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "2493",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Google Users" },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.9",
          bestRating: "5",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/belgiano-serif"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://talasilacaterers.com" />
        <link
          rel="preload"
          as="video"
          href="https://talasilacaterers.com/wp-content/uploads/2024/09/2371908_Pastries_Desserts_1280x720.mp4"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="canonical" href="https://vcateringevents.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
