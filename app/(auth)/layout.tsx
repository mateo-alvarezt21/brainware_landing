import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PixelBackground } from "@/components/ui/pixel-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin | Brainware",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PixelBackground />
          <header className="fixed top-0 left-0 right-0 z-50 p-4">
            <Link href="/" className="block">
              <div className="relative h-12 w-48">
                <Image
                  src="/brainware-logo.png"
                  alt="Brainware Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
