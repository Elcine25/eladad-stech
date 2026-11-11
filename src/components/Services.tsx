import { motion } from 'framer-motion'
import { ArrowUpRight, Globe, LayoutDashboard, LifeBuoy, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Reveal from './Reveal'
import './Services.css'

type Service = {
  icon: LucideIcon
  title: string
  benefit: string
  points: string[]
  tech: string
}

const services: Service[] = [
  {
    icon: Globe,
    title: 'Sites web',
    benefit: 'Soyez trouvé, inspirez confiance et recevez des demandes, même pendant que vous dormez.',
    points: ['Site vitrine ou boutique en ligne', 'Rapide, même avec une petite connexion', 'Bien placé sur Google'],
    tech: 'React · Next.js · WordPress',
  },
  {
    icon: Smartphone,
    title: 'Applications',
    benefit: 'Restez dans la poche de vos clients avec une application simple et agréable à utiliser.',
    points: ['Android, iPhone et web', 'Notifications et mode hors ligne', 'Paiement Mobile Money intégré'],
    tech: 'React Native · Expo · PWA',
  },
  {
    icon: LayoutDashboard,
    title: 'Plateformes',
    benefit: 'Gagnez du temps chaque jour : vos process passent du papier et d’Excel à un outil clair.',
    points: ['Gestion, réservation, billetterie, RH', 'Tableaux de bord en temps réel', 'Accès sécurisé par rôle'],
    tech: 'Laravel · Node.js · PostgreSQL',
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Ce qu’on construit</span>
          <h2 className="section-title">Une solution pensée pour votre activité, pas un modèle tout fait.</h2>
          <p className="section-lead">
            On commence par ce que vous voulez obtenir. La technique vient après, et c’est notre affaire.
          </p>
        </Reveal>

        <div className="services">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.article className="service" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                <div className="service__top">
                  <span className="service__icon">
                    <s.icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="service__num">0{i + 1}</span>
                </div>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__benefit">{s.benefit}</p>
                <ul className="service__points">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="service__foot">
                  <code>{s.tech}</code>
                  <a href="#contact" className="service__link" aria-label={`Parler d’un projet : ${s.title}`}>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="after">
            <span className="after__icon">
              <LifeBuoy size={22} strokeWidth={1.8} />
            </span>
            <p>
              <strong>Et après la mise en ligne ?</strong> On reste là : maintenance, mises à jour, nouvelles
              fonctionnalités et formation de votre équipe.
            </p>
            <a href="#contact" className="after__link">
              En savoir plus <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
