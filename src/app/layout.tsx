import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shaban-aly-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shaban Aly | Frontend Developer Portfolio",
    template: "%s | Shaban Aly",
  },
  description:
    "Frontend developer portfolio for Shaban Aly, showcasing responsive web projects, practical interfaces, and modern web experiences.",
  keywords: [
    "Shaban Aly",
    "Frontend Developer",
    "Web Developer",
    "Portfolio",
    "JavaScript",
    "React",
    "Next.js",
    "Supabase",
    "Responsive Web Design",
  ],
  authors: [{ name: "Shaban Aly" }],
  creator: "Shaban Aly",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Shaban Aly | Frontend Developer Portfolio",
    description:
      "Explore Shaban Aly's frontend portfolio, selected projects, technical skills, and clean responsive web experiences.",
    siteName: "Shaban Aly Portfolio",
    images: [
      {
        url: "/assets/favicon.png",
        width: 512,
        height: 512,
        alt: "Shaban Aly Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaban Aly | Frontend Developer Portfolio",
    description:
      "Explore Shaban Aly's frontend portfolio, selected projects, technical skills, and clean responsive web experiences.",
    images: ["/assets/favicon.png"],
  },
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shaban Aly",
    jobTitle: "Frontend Developer",
    image: `${siteUrl}/assets/images/me/me.png`,
    url: siteUrl,
    knowsAbout: [
      "Frontend Development",
      "JavaScript",
      "TypeScript",
      "Responsive Web Design",
      "React",
      "Next.js",
      "Supabase",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
