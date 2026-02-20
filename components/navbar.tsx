"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/src/i18n/routing"; // Use i18n Link
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu Toggle (Left) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav (Left) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            {t('services')}
          </Link>
          <Link href="/#portfolio" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            {t('portfolio')}
          </Link>
        </nav>

        {/* Logo (Centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
        </div>

        {/* Actions (Right) */}
        <div className="flex items-center gap-4">
            <button 
                onClick={toggleLanguage}
                className="text-white/70 hover:text-white transition-colors flex items-center gap-1"
                title="Switch Language"
            >
                <Languages size={18} />
                <span className="uppercase text-sm font-medium">{locale}</span>
            </button>
            <Button variant="primary" size="sm" className="hidden md:inline-flex">
                {t('contact')}
            </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background"
          >
            <div className="flex flex-col gap-4 p-4">
              <Link
                href="#services"
                className="text-white/70 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="#portfolio"
                className="text-white/70 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Portafolio
              </Link>
              <Button className="w-full">Hablemos</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
