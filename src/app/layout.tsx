import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/functions/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Treasure ISLAND",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const payload = await auth();

  return (
    <html className={"dark"} lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* <Sidebar user={payload}>{children}</Sidebar>
        <SpeedInsights/> */}
      </body>
    </html>
  );
}