"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tiempo toma desarrollar una aplicación?",
    answer: "Depende de la complejidad. Un MVP puede estar listo en 4-6 semanas, mientras que plataformas complejas pueden tomar 3-6 meses. Usamos metodologías ágiles para entregar valor rápidamente."
  },
  {
    question: "¿Ofrecen soporte después del lanzamiento?",
    answer: "¡Absolutamente! Ofrecemos planes de mantenimiento y soporte continuo para asegurar que tu software siga funcionando perfectamente y evolucione con tu negocio."
  },
  {
    question: "¿Trabajan con empresas internacionales?",
    answer: "Sí, trabajamos con clientes de todo el mundo. Nuestro equipo es bilingüe y estamos acostumbrados a coordinar a través de diferentes zonas horarias."
  },
  {
    question: "¿Qué tecnologías utilizan?",
    answer: "Nos especializamos en el stack moderno de JavaScript/TypeScript (Next.js, React, Node.js) y Python para IA/Data. Elegimos la mejor herramienta para cada problema específico."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Preguntas Frecuentes</h2>
        
        <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
                <div 
                    key={index} 
                    className="border border-white/10 rounded-2xl bg-zinc-900/30 overflow-hidden"
                >
                    <button
                        onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                        className="flex items-center justify-between w-full p-6 text-left"
                    >
                        <span className="text-lg font-medium text-white">{faq.question}</span>
                        <span className="text-primary">
                            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                        </span>
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-6 text-white/60"
                            >
                                {faq.answer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
