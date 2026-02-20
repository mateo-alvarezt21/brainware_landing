"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export function Services({ services }: { services: Service[] }) {
  const t = useTranslations('Services');

  // Helper to dynamically get icon
  const getIcon = (iconName: string): LucideIcon => {
    // @ts-ignore
    return LucideIcons[iconName] || LucideIcons.Code;
  };

  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-white/60 text-lg">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors hover:border-primary/50"
              >
                <Icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
