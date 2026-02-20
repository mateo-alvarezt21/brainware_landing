import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { getServices, getProjects } from "@/app/actions";
import { TechStack } from "@/components/tech-stack";
import { Process } from "@/components/process";
import { FAQ } from "@/components/faq";

export default async function Home() {
  const services = await getServices();
  const projects = await getProjects();

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <TechStack />
      <Services services={services} />
      <Process />
      <Portfolio projects={projects} />
      <FAQ />
    </main>
  );
}
