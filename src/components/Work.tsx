import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, QrCode, Ticket } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import Reveal from './Reveal'
import './Work.css'

type Project = {
  id: string
  kind: string
  title: string
  summary: string
  results: string[]
  tags: string[]
  link?: { href: string; label: string }
  visual: ReactNode
}

function SereineVisual() {
  return (
    <div className="mock-phone">
      <div className="mock-phone__screen sereine">
        <span className="sereine__hello">Bonsoir 🌙</span>
        <span className="sereine__q">Comment vous sentez-vous aujourd’hui ?</span>
        <div className="sereine__moods">
          {['😔', '😐', '🙂', '😊', '🤩'].map((m, i) => (
            <span key={m} className={i === 3 ? 'is-on' : ''}>
              {m}
            </span>
          ))}
        </div>
        <div className="sereine__card">
          <span className="sereine__breath" />
          <span>
            <strong>Respiration 4-7-8</strong>
            <small>3 min · apaisant</small>
          </span>
        </div>
        <div className="sereine__card sereine__card--soft">
          <strong>Article</strong>
          <small>Gérer le stress au travail</small>
        </div>
      </div>
    </div>
  )
}

function GcafVisual() {
  return (
    <div className="mock-ticket">
      <div className="mock-ticket__head">
        <Ticket size={16} /> Pass officiel
      </div>
      <strong className="mock-ticket__title">RDV GCAF 2026</strong>
      <span className="mock-ticket__meta">Pass Standard · 1 personne</span>
      <div className="mock-ticket__qr">
        <QrCode size={78} strokeWidth={1.4} />
      </div>
      <div className="mock-ticket__foot">
        <span>Payé · KKiaPay</span>
        <span className="mock-ticket__ok">Valide ✓</span>
      </div>
    </div>
  )
}

const projects: Project[] = [
  {
    id: 'sereine',
    kind: 'Application mobile & web',
    title: 'Sereine',
    summary:
      'Une application de soutien émotionnel pour les femmes : se poser, suivre son humeur et trouver de l’aide en cas de détresse, simplement et en toute confidentialité.',
    results: ['Disponible sur Android et sur le web', 'Comptes sécurisés, données retrouvées sur tout appareil', 'Exercices guidés, journal et ressources'],
    tags: ['React Native', 'Expo', 'Supabase', 'PWA'],
    link: { href: 'https://sereine.expo.app', label: 'Voir l’application' },
    visual: <SereineVisual />,
  },
  {
    id: 'gcaf',
    kind: 'Plateforme événementielle',
    title: 'RDV GCAF 2026',
    summary:
      'Le site officiel d’un événement, avec une billetterie complète : achat du pass en ligne, paiement local et entrée contrôlée le jour J.',
    results: ['Paiement Mobile Money et carte via KKiaPay', 'Pass PDF avec QR code envoyé par e-mail', 'Scanner d’entrée pour l’équipe'],
    tags: ['React', 'Laravel', 'KKiaPay', 'Resend'],
    visual: <GcafVisual />,
  },
]

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <article className={`project project--${p.id} ${index % 2 ? 'project--flip' : ''}`}>
      <Reveal className="project__visualWrap">
        <div className="project__visual" ref={ref}>
          <div className="project__pattern" aria-hidden="true" />
          <motion.div style={{ y }} className="project__float">
            {p.visual}
          </motion.div>
        </div>
      </Reveal>

      <Reveal className="project__text" delay={0.1}>
        <span className="project__kind">{p.kind}</span>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__summary">{p.summary}</p>
        <ul className="project__results">
          {p.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="project__tags">
          {p.tags.map((t) => (
            <code key={t}>{t}</code>
          ))}
        </div>
        {p.link && (
          <a className="project__link" href={p.link.href} target="_blank" rel="noopener noreferrer">
            {p.link.label} <ArrowUpRight size={17} />
          </a>
        )}
      </Reveal>
    </article>
  )
}

export default function Work() {
  return (
    <section id="realisations" className="section section--white">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Réalisations</span>
          <h2 className="section-title">Des projets concrets, utilisés tous les jours.</h2>
          <p className="section-lead">
            Chaque projet part d’un vrai besoin. Voici deux exemples de ce qu’on a construit avec nos clients.
          </p>
        </Reveal>

        <div className="projects">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} p={p} index={i} />
          ))}
        </div>

        <Reveal>
          <a href="#contact" className="next-project">
            <span className="next-project__label">Le prochain projet</span>
            <span className="next-project__title">
              Et si c’était le vôtre ? <ArrowRight className="next-project__arrow" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
