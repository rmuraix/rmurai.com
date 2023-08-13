import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Header from "./components/header";

const notojp = Noto_Sans_JP({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "rmuraix",
    template: "%s | rmuraix",
  },
  description: "Student and developer",
  metadataBase: new URL("https://rmurai.com"),
  openGraph: {
    title: "rmuraix",
    description: "Student and developer",
    url: "https://rmurai.com",
    siteName: "rmuraix",
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "rmuraix",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notojp.className}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
