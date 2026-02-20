import { getServices, getProjects, createService, deleteService, createProject, deleteProject, getPricingConfigs, upsertPricingConfig, deletePricingConfig } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const services = await getServices();
  const projects = await getProjects();
  const pricingConfigs = await getPricingConfigs();

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8 text-white min-h-screen">
      <div className="flex justify-between items-center mb-8 pt-16">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-40">
            <Image
              src="/brainware-logo.png"
              alt="Brainware Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-light text-white/50">Admin</span>
        </div>
        <form
          action={async () => {
            'use server';
            await import('@/auth').then(m => m.signOut({ redirectTo: "/login" }));
          }}
        >
          <Button variant="outline" className="text-black bg-white hover:bg-gray-200 border-transparent">
             Sign Out
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Services Management */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary">Gestionar Servicios</h2>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="font-medium mb-4">Añadir Nuevo Servicio</h3>
            <form action={createService} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-zinc-400">Título</label>
                <input name="title" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-zinc-400">Icono (Lucide Name)</label>
                <input name="icon" placeholder="e.g. Code, Cloud, Smartphone" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-zinc-400">Descripción</label>
                <textarea name="description" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" rows={3} />
              </div>
              <Button type="submit">Añadir Servicio</Button>
            </form>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-white/5">
                <div>
                  <h4 className="font-bold">{service.title}</h4>
                  <p className="text-sm text-zinc-500">{service.icon}</p>
                </div>
                <form action={deleteService.bind(null, service.id)}>
                   <button className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18} /></button>
                </form>
              </div>
            ))}
            {services.length === 0 && <p className="text-zinc-500 italic">No hay servicios.</p>}
          </div>
        </div>

        {/* Portfolio Management */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary">Gestionar Portafolio</h2>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="font-medium mb-4">Añadir Proyecto</h3>
            <form action={createProject} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-zinc-400">Título</label>
                <input name="title" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-zinc-400">Categoría</label>
                <input name="category" placeholder="e.g. Web App" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-zinc-400">Imagen URL</label>
                <input name="image" placeholder="https://..." required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
              </div>
              <Button type="submit">Añadir Proyecto</Button>
            </form>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt="" className="w-12 h-12 rounded object-cover bg-zinc-800" />
                  <div>
                    <h4 className="font-bold">{project.title}</h4>
                    <p className="text-sm text-zinc-500">{project.category}</p>
                  </div>
                </div>
                <form action={deleteProject.bind(null, project.id)}>
                   <button className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18} /></button>
                </form>
              </div>
            ))}
            {projects.length === 0 && <p className="text-zinc-500 italic">No hay proyectos.</p>}
          </div>
        </div>
      </div>

      {/* Pricing / Quote Engine Management */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Motor de Cotización IA</h2>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="font-medium mb-4">Configurar Variable de Precio</h3>
            <form action={upsertPricingConfig} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-1">
                    <label className="block text-sm mb-1 text-zinc-400">Clave (ID interno)</label>
                    <input name="key" placeholder="ej. hourly_rate" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm mb-1 text-zinc-400">Etiqueta (Nombre)</label>
                    <input name="label" placeholder="ej. Costo por Hora" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm mb-1 text-zinc-400">Valor</label>
                    <input name="value" type="number" step="0.01" placeholder="0.00" required className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10" />
                </div>
                 <div className="md:col-span-1">
                    <label className="block text-sm mb-1 text-zinc-400">Moneda</label>
                    <select name="currency" className="w-full bg-zinc-800 rounded p-2 text-white border border-white/10">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="MXN">MXN</option>
                        <option value="COP">COP</option>
                    </select>
                </div>
                <div>
                   <Button type="submit" className="w-full">Guardar Variable</Button>
                </div>
            </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {pricingConfigs.map((config) => (
               <div key={config.id} className="bg-zinc-900 p-4 rounded-lg border border-white/5 flex justify-between items-center group hover:border-primary/30 transition-colors">
                   <div>
                       <div className="text-xs font-mono text-zinc-500 mb-1">{config.key}</div>
                       <h4 className="font-bold text-white">{config.label}</h4>
                       <div className="text-xl text-primary font-bold">
                           {config.currency === 'USD' ? '$' : config.currency} {config.value}
                       </div>
                   </div>
                   <form action={deletePricingConfig.bind(null, config.id)}>
                       <button className="text-zinc-600 hover:text-red-400 p-2 transition-colors"><Trash2 size={18} /></button>
                   </form>
               </div>
             ))}
             {pricingConfigs.length === 0 && <p className="text-zinc-500 italic col-span-full">No hay variables de precio configuradas.</p>}
        </div>
      </div>
    </div>
  );
}
