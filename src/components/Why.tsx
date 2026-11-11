import { motion } from 'framer-motion'
import { CalendarCheck, Globe2, MessagesSquare, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import './Why.css'

const reasons = [
  {
    icon: MessagesSquare,
    title: 'On parle votre langue',
    text: 'Des explications claires, sans jargon. Vous comprenez chaque décision et ce qu’elle vous apporte.',
  },
  {
    icon: Globe2,
    title: 'Pensé pour nos réalités',
    text: 'Mobile d’abord, rapide sur les petites connexions, Mobile Money intégré. Conçu ici, pour ici et pour le monde.',
  },
  {
    icon: ShieldCheck,
    title: 'Fiable dans la durée',
    text: 'Un code propre, des sauvegardes et une sécurité sérieuse. Votre outil tient la route et grandit avec vous.',
  },
  {
    icon: CalendarCheck,
    title: 'Des délais tenus',
    text: 'Un planning précis et un point chaque semaine. Vous savez toujours où en est votre projet.',
  },
]

export default function Why() {
  return (
    <section id="pourquoi" className="section why">
      <div className="container why__inner">
        <div className="why__left">
          <Reveal>
            <span className="eyebrow">Pourquoi Eladad’s tech</span>
            <h2 className="section-title why__title">
              Un partenaire de confiance, <br className="hide-sm" />
              pas un prestataire distant.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="manifesto">
              <div className="weave" aria-hidden="true" />
              <blockquote>
                L’Afrique ne manque pas d’idées. On construit les outils qui leur permettent d’aller loin.
              </blockquote>
              <figcaption>Notre ambition</figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="reasons">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              className="reason"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="reason__icon">
                <r.icon size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
