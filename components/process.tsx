"use client";

import { motion } from "framer-motion";
import { Search, Code2, Rocket } from "lucide-react";

export function Process() {
  return (
    <section className="py-32 relative overflow-hidden" id="proceso">
      {/* Decorative line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-32 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Nuestro Proceso
          </h2>
          <p className="text-slate-400 text-lg">
            Un camino trazado hacia la excelencia tecnológica.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative space-y-24 md:space-y-0">
          {/* Step 1 - Descubrimiento */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
          >
            <div className="w-full md:w-1/2 md:text-right order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-4 text-white">01. Descubrimiento</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg md:ml-auto">
                Analizamos tu visión y requerimientos para definir la mejor estrategia tecnológica que garantice el éxito. Una inmersión profunda en tus objetivos.
              </p>
            </div>
            <div className="relative z-10 flex-shrink-0 order-1 md:order-2">
              <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border-2 border-primary/50 relative">
                <span className="text-5xl font-black text-primary">1</span>
                <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full -z-10 animate-pulse" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center gap-6 order-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Search className="text-primary" size={28} />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent hidden md:block" />
            </div>
          </motion.div>

          {/* Step 2 - Construcción */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-24 relative"
          >
            {/* Vertical line connector */}
            <div className="hidden md:block absolute left-1/2 top-[-150px] bottom-[-150px] w-0.5 bg-white/5 backdrop-blur-sm opacity-30 -translate-x-1/2 -z-10" />

            <div className="w-full md:w-1/2 flex items-center gap-6 justify-end order-3 md:order-1">
              <div className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent hidden md:block" />
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <Code2 className="text-violet-400" size={28} />
              </div>
            </div>
            <div className="relative z-10 flex-shrink-0 order-1 md:order-2">
              <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border-2 border-violet-500/50 relative">
                <span className="text-5xl font-black text-violet-400">2</span>
                <div className="absolute -inset-4 bg-violet-500/10 blur-xl rounded-full -z-10" />
              </div>
            </div>
            <div className="w-full md:w-1/2 order-2 md:order-3">
              <h3 className="text-3xl font-bold mb-4 text-white">02. Construcción</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                Desarrollamos soluciones escalables con código limpio y arquitectura moderna, siguiendo estándares ágiles y entregas incrementales.
              </p>
            </div>
          </motion.div>

          {/* Step 3 - Lanzamiento */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
          >
            <div className="w-full md:w-1/2 md:text-right order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-4 text-white">03. Lanzamiento</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg md:ml-auto">
                Despliegue automatizado y monitoreo continuo para asegurar que tu producto rinda al máximo desde el día uno. Soporte total post-go-live.
              </p>
            </div>
            <div className="relative z-10 flex-shrink-0 order-1 md:order-2">
              <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border-2 border-emerald-500/50 relative">
                <span className="text-5xl font-black text-emerald-400">3</span>
                <div className="absolute -inset-4 bg-emerald-500/10 blur-xl rounded-full -z-10 animate-pulse" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center gap-6 order-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Rocket className="text-emerald-400" size={28} />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent hidden md:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
