"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string | null;
  description?: string | null; 
};

export function Portfolio({ projects }: { projects: Project[] }) {
  const t = useTranslations('Portfolio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
         >
           <div>
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
               {t('title')}
             </h2>
             <p className="text-white/60 max-w-xl text-lg">
               {t('description')}
             </p>
           </div>
           
         </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video overflow-hidden rounded-2xl bg-muted cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-primary text-sm font-medium mb-2 block uppercase tracking-wider">
                  {project.category}
                </span>
                <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                        <Maximize2 size={20} />
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 
        <div className="mt-12 text-center">
             <Link 
                href="/portfolio" 
                className="text-primary hover:text-white transition-colors inline-flex items-center gap-2 font-medium"
              >
                {t('viewAll')} <ArrowUpRight size={20} />
              </Link>
        </div> 
        */}
      </div>

      {/* Project Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
            <div className="flex flex-col">
                <div className="relative h-64 w-full md:h-96">
                     <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f0524] to-transparent" />
                </div>
                <div className="p-8">
                    <span className="text-primary text-sm font-medium uppercase tracking-wider mb-2 block">{selectedProject.category}</span>
                    <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                    <p className="text-white/70 leading-relaxed mb-8">
                        {/* Placeholder description as DB might not have it yet */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    
                    <div className="flex gap-4">
                        {selectedProject.link && (
                             <Button onClick={() => window.open(selectedProject.link!, '_blank')}>
                                Ver Proyecto en Vivo
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                             </Button>
                        )}
                        <Button variant="secondary" onClick={() => setSelectedProject(null)}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        )}
      </Modal>
    </section>
  );
}
