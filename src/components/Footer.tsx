import { ArrowUp } from 'lucide-react'
import { site, whatsappLink } from '../config'
import { FacebookIcon, InstagramIcon, LinkedInIcon } from './icons'
import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="weave" aria-hidden="true" />
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo light />
            <p className="footer__slogan">{site.slogan}</p>
            <p className="footer__about">
              Sites, applications et plateformes sur mesure, pour celles et ceux qui veulent avancer vite.
            </p>
          </div>

          <nav className="footer__col" aria-label="Plan du site">
            <span className="footer__title">Explorer</span>
            <a href="#services">Services</a>
            <a href="#methode">Méthode</a>
            <a href="#realisations">Réalisations</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="footer__col">
            <span className="footer__title">Contact</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp · {site.phoneDisplay}
            </a>
            <span>{site.city}</span>
          </div>

          <div className="footer__col">
            <span className="footer__title">Suivez-nous</span>
            <div className="footer__socials">
              <a href={site.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon width={18} height={18} />
              </a>
              <a href={site.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon width={18} height={18} />
              </a>
              <a href={site.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon width={18} height={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {site.name}. Tous droits réservés.
          </span>
          <a href="#top" className="footer__up">
            Haut de page <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
