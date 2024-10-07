import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Next App",
  description: "Learning Next.js",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="winter">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
