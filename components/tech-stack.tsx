"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Agrega aquí los logos de las empresas
// Los archivos SVG deben estar en /public/assets/logos/
const clients = [
  { name: "Impes", logo: "/assets/logos/impes.svg", width: 140, height: 50 },
  { name: "Cycargo SAS", logo: "/assets/logos/cycargo.png", width: 120, height: 50 },
  { name: "Corrupack", logo: "/assets/logos/corrupack.svg", width: 140, height: 50 },
  { name: "Internatural SAS", logo: "/assets/logos/internatural.svg", width: 150, height: 50 },
  { name: "Micotox SAS", logo: "/assets/logos/micotox.png", width: 150, height: 50 },
  { name: "Procegrasas SAS", logo: "/assets/logos/procegrasas.svg", width: 170, height: 50 },
];

export function TechStack() {
  // Duplicamos el array para crear el loop infinito
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="flex relative">
        <motion.div
          className="flex items-center gap-16 md:gap-24"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-all duration-300 cursor-default group"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="object-contain transition-all duration-300 brightness-0 invert opacity-20 group-hover:opacity-100 group-hover:[filter:invert(68%)_sepia(39%)_saturate(913%)_hue-rotate(295deg)_brightness(101%)_contrast(97%)]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
