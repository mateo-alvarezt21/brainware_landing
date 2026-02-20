import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-black/50 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Brainware
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className="text-zinc-400 hover:text-primary transition-colors">
                  {useTranslations('Navbar')('services')}
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="text-zinc-400 hover:text-primary transition-colors">
                  {useTranslations('Navbar')('portfolio')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">{t('contact')}</h3>
            <ul className="space-y-3 text-zinc-400">
              <li>contact@brainware.com.co</li>
              <li>+1 (555) 123-4567</li>
            </ul>
             <div className="mt-6">
                <Link href="/legal" className="text-zinc-500 hover:text-white text-xs transition-colors">
                  Términos y Privacidad
                </Link>
             </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} {t('rights')}
        </div>
      </div>
    </footer>
  );
}
