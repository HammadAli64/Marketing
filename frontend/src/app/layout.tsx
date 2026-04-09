import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { ClientShell } from "@/components/ClientShell";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getFooterSocialLinks } from "@/lib/footerSocial";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const themeBootScript = `(function(){try{var t=localStorage.getItem('helix-theme');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){document.documentElement.classList.add('dark');}})();`;

function metadataBaseUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      /* invalid env URL */
    }
  }
  return new URL("https://helixprimesolutions.com");
}

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const defaultTitle = `${COMPANY} | Dominate Your Market. Explode Your Revenue.`;
const defaultDescription =
  "Helix Prime Solutions builds conversion-obsessed websites, dominates SEO, ships profit-driving apps, and provides elite staff augmentation—engineered for US businesses that want measurable revenue growth.";

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: defaultTitle,
    template: `%s | ${COMPANY}`,
  },
  description: defaultDescription,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: COMPANY,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/logo.png",
        width: 687,
        height: 1024,
        alt: COMPANY,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks = getFooterSocialLinks();

  return (
    <html
      lang="en"
      className={`dark ${dm.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <ThemeProvider>
          <ClientShell>{children}</ClientShell>
          <Footer socialLinks={socialLinks} />
        </ThemeProvider>
      </body>
    </html>
  );
}
