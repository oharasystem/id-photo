import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "証明写真マスター | 完全無料・登録不要・スマホで履歴書作成",
  description: "完全無料・登録不要の証明写真作成ツール。スマホで撮った写真を、履歴書・免許証・パスポートなどのサイズに合わせて自動調整し、コンビニ（L判）で印刷できるデータを作成します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] flex flex-col`}
      >
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F07FCZKBXJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F07FCZKBXJ');
          `}
        </Script>
      </body>
    </html>
  );
}

