import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import ThemedLink from "@/components/ThemedLink";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

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
      <body className="min-h-dvh flex flex-col">
        <header className="mx-auto w-full max-w-7xl p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <ThemedLink
              href="/"
              className="text-2xl font-bold"
            >{`Zach's Blog`}</ThemedLink>
            <Popover className="lg:hidden">
              <PopoverButton className="block text-sm/6 p-1 font-semibold rounded-xl text-foreground/50 focus:outline-none data-active:text-foreground data-focus:outline data-focus:outline-white data-hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </PopoverButton>
              <PopoverPanel
                transition
                anchor="bottom"
                className="text-foreground w-30 rounded-xl shadow-lg bg-background text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(2)] data-closed:-translate-y-1 data-closed:opacity-0"
              >
                <div className="flex flex-col gap-2 p-2 text-lg text-center">
                  <ThemedLink href={"/"} className="">
                    Home
                  </ThemedLink>
                  <ThemedLink href={"/about"} className="">
                    About
                  </ThemedLink>
                  <ThemedLink href={"/posts"} className="">
                    Posts
                  </ThemedLink>
                  <ThemedLink href={"/portfolio"} className="">
                    Portfolio
                  </ThemedLink>
                </div>
              </PopoverPanel>
            </Popover>
            <nav className="hidden lg:flex gap-6 text-lg">
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
