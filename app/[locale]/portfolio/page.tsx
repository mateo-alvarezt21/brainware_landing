
import { getProjects } from "@/app/actions";
import { Portfolio } from "@/components/portfolio";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Portfolio'});

  return {
    title: `Brainware | ${t('title')}`,
    description: t('description'),
  };
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen pt-24">
      <Portfolio projects={projects} />
    </main>
  );
}
