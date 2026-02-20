"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import { PixelBackground } from "@/components/ui/pixel-background";
import { ChatWidget } from "@/components/chat-widget";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 pt-20 pb-10">
      {/* Pixel Background */}
      <div className="absolute inset-0 -z-10 bg-[#090117]">
          <PixelBackground />
      </div>

      <div className="container relative z-10 mx-auto grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        
        {/* Left Column: Text & Instruction */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-left"
        >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-md mb-6 border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                IA Ready for Business
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.1]">
              {t('titlePrefix')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-white animate-text-shimmer bg-[length:200%_auto]">
                {t('titleHighlight')}
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-white/70 max-w-xl leading-relaxed">
              {t('description')}
            </p>

            <div className="flex flex-col gap-4">
                <p className="text-sm uppercase tracking-widest text-white/50 font-semibold">
                    👇 Comienza aquí ahora mismo
                </p>
                <div className="h-1 w-20 bg-primary/50 rounded-full" />
            </div>
        </motion.div>

        {/* Right Column: Embedded Chat */}
        <motion.div
           initial={{ opacity: 0, x: 50, scale: 0.9 }}
           animate={{ opacity: 1, x: 0, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto relative"
        >
            {/* Decorative elements behind chat */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 animate-pulse" />
            
            <div className="relative">
                <ChatWidget embedded={true} />
            </div>
        </motion.div>

      </div>
    </section>
  );
}
