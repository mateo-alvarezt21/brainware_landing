import { getTranslations } from "next-intl/server";

export default async function LegalPage() {
  const t = await getTranslations('Legal');
  const lastUpdated = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-primary/20">
      {/* Header / Title Section */}
      <div className="bg-zinc-900 border-b border-white/5 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Centro Legal & Privacidad</h1>
          <p className="text-xl text-zinc-400">Transparencia, seguridad y confianza en cada línea de código.</p>
          <div className="mt-8 text-sm text-zinc-500 font-mono">
            Última actualización: <span className="text-zinc-300">{lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12 grid md:grid-cols-[250px_1fr] gap-12">
        
        {/* Sidebar Navigation (Sticky) */}
        <aside className="hidden md:block">
            <div className="sticky top-24 space-y-1 border-l border-white/10 pl-4">
                <a href="#terms" className="block text-sm text-white font-medium hover:text-primary transition-colors">Términos de Servicio</a>
                <a href="#privacy" className="block text-sm text-zinc-500 hover:text-white transition-colors">Política de Privacidad</a>
                <a href="#data" className="block text-sm text-zinc-500 hover:text-white transition-colors">Manejo de Datos</a>
                <a href="#ip" className="block text-sm text-zinc-500 hover:text-white transition-colors">Propiedad Intelectual</a>
                <a href="#contact" className="block text-sm text-zinc-500 hover:text-white transition-colors">Contacto Legal</a>
            </div>
        </aside>

        {/* Content */}
        <div className="space-y-16">
            
            {/* Terms of Service */}
            <section id="terms" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-primary/50 text-sm font-mono">01.</span> Términos de Servicio
                </h2>
                <div className="prose prose-invert prose-zinc max-w-none">
                    <p className="leading-relaxed mb-4">
                        Bienvenido a <strong>Brainware</strong>. Estos Términos de Servicio ("Términos") rigen el uso de nuestro sitio web, servicios de desarrollo de software, consultoría y productos digitales. Al contratar nuestros servicios o utilizar nuestra plataforma, usted acepta estar legalmente vinculado por estos Términos.
                    </p>
                    <h3 className="text-lg font-semibold text-white mt-8 mb-3">1.1 Definición del Servicio</h3>
                    <p className="mb-4">
                        Brainware provee soluciones tecnológicas que incluyen, pero no se limitan a: desarrollo de aplicaciones web y móviles, integración de Inteligencia Artificial, consultoría de transformación digital y mantenimiento de software. El alcance específico de cada proyecto se define en una Propuesta de Servicio ("SOW") individual.
                    </p>
                    <h3 className="text-lg font-semibold text-white mt-8 mb-3">1.2 Obligaciones del Cliente</h3>
                    <p className="mb-4">
                        El cliente se compromete a proveer toda la información, accesos y recursos necesarios para la ejecución del proyecto en los tiempos acordados. Retrasos en la entrega de estos activos pueden impactar el cronograma final del proyecto.
                    </p>
                </div>
            </section>

             <hr className="border-white/5" />

            {/* Privacy Policy */}
            <section id="privacy" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-primary/50 text-sm font-mono">02.</span> Política de Privacidad
                </h2>
                <div className="prose prose-invert prose-zinc max-w-none">
                    <p className="leading-relaxed mb-4">
                        Su privacidad es fundamental para nosotros. Esta política describe cómo Brainware recopila, utiliza y protege su información personal y corporativa.
                    </p>
                    
                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 my-6">
                        <h4 className="font-semibold text-white mb-2">Resumen de Datos Recopilados</h4>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                            <li>Información de contacto (Nombre, Email, Teléfono).</li>
                            <li>Detalles técnicos del proyecto y requerimientos de negocio.</li>
                            <li>Credenciales de acceso a entornos de desarrollo (cuando aplica).</li>
                            <li>Datos de navegación anónimos para analítica web.</li>
                        </ul>
                    </div>
                </div>
            </section>

             <hr className="border-white/5" />

            {/* Data Management */}
            <section id="data" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-primary/50 text-sm font-mono">03.</span> Manejo y Seguridad de Datos
                </h2>
                <div className="prose prose-invert prose-zinc max-w-none">
                     <p className="leading-relaxed mb-4">
                        Brainware implementa estándares de industria para la protección de datos, incluyendo encriptación en tránsito (SSL/TLS) y en reposo para información sensible.
                    </p>
                    <h3 className="text-lg font-semibold text-white mt-8 mb-3">3.1 Retención de Datos</h3>
                    <p className="mb-4">
                        Conservamos la información del proyecto durante la vigencia del contrato y por un periodo de garantía posterior de 12 meses, tras el cual, los datos sensibles son eliminados de nuestros servidores activos, salvo que se acuerde un contrato de mantenimiento extendido.
                    </p>
                    <h3 className="text-lg font-semibold text-white mt-8 mb-3">3.2 Confidencialidad (NDA)</h3>
                    <p className="mb-4">
                        Estamos dispuestos a firmar Acuerdos de Confidencialidad (NDA) antes de iniciar cualquier conversación detallada sobre su propiedad intelectual o secretos comerciales.
                    </p>
                </div>
            </section>

             <hr className="border-white/5" />

            {/* IP */}
            <section id="ip" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-primary/50 text-sm font-mono">04.</span> Propiedad Intelectual
                </h2>
                <div className="prose prose-invert prose-zinc max-w-none">
                    <p className="leading-relaxed mb-4">
                        Salvo que se especifique lo contrario en el contrato del proyecto (SOW), todos los derechos de propiedad intelectual del software desarrollado a medida ("Work for Hire") son transferidos al cliente tras el pago total de los honorarios acordados.
                    </p>
                    <p className="leading-relaxed mb-4">
                        Brainware se reserva el derecho de utilizar fragmentos de código genérico, librerías open-source y su propio "know-how" en múltiples proyectos, siempre que esto no infrinja la confidencialidad específica del negocio del cliente.
                    </p>
                </div>
            </section>

            <hr className="border-white/5" />

            {/* Contact */}
            <section id="contact" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-primary/50 text-sm font-mono">05.</span> Contacto Legal
                </h2>
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-8">
                    <p className="text-zinc-400 mb-6">
                        Para consultas relacionadas con términos legales, privacidad o disputas de propiedad intelectual, por favor contacte a nuestro equipo legal directamente.
                    </p>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div>
                            <span className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">Email Legal</span>
                            <a href="mailto:legal@brainware.com" className="text-white hover:text-primary transition-colors font-medium">legal@brainware.com</a>
                        </div>
                        <div>
                            <span className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">Oficina Principal</span>
                            <span className="text-white font-medium">Bogatá, Colombia (Remote First)</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
}
