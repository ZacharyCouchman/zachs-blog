import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import ThemedLink from "@/components/ThemedLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zach Couchman's Blog",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <header className="mx-auto max-w-7xl p-6">
          <div className="flex items-center justify-between">
            <ThemedLink href="/" className="text-2xl font-bold">{`Zach's Blog`}</ThemedLink>
            <nav className="flex gap-6 text-lg">
              <ThemedLink href={"/"} className="hover:underline">
                Home
              </ThemedLink>
              <ThemedLink href={"/about"} className="hover:underline">
                About
              </ThemedLink>
              <ThemedLink href={"/posts"} className="hover:underline">
                Posts
              </ThemedLink>
              <ThemedLink href={"/portfolio"} className="hover:underline">
                Portfolio
              </ThemedLink>
            </nav>
          </div>
        </header>
        {children}
        <footer className="w-full p-6 text-muted-foreground flex justify-center bg-muted-background">
          <div className="max-w-7xl w-full flex justify-between">
            <div className="flex gap-4">
              <p>{new Date().getFullYear()}</p>
              <p>Zachary Couchman</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
