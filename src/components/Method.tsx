import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Reveal from './Reveal'
import './Method.css'

const steps = [
  {
    title: 'On vous écoute',
    text: 'Un échange simple pour comprendre votre activité, vos clients et ce que vous voulez obtenir. Pas de jargon.',
    tag: 'Appel ou rencontre · gratuit',
  },
  {
    title: 'On vous propose',
    text: 'Une solution claire, un prix fixe et un calendrier précis. Vous savez exactement ce que vous aurez et quand.',
    tag: 'Devis détaillé sous 72 h',
  },
  {
    title: 'On construit avec vous',
    text: 'Vous suivez l’avancement chaque semaine et vous testez au fur et à mesure. Pas de surprise à la fin.',
    tag: 'Point d’étape chaque semaine',
  },
  {
    title: 'On lance, on reste là',
    text: 'Mise en ligne, formation de votre équipe, puis un accompagnement pour faire grandir votre outil.',
    tag: 'Suivi et maintenance',
  },
]

export default function Method() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="methode" className="section section--dark method">
      <div className="method__glow" aria-hidden="true" />
      <div className="container method__inner">
        <div className="method__head">
          <Reveal className="section-head">
            <span className="eyebrow">Notre méthode</span>
            <h2 className="section-title">
              Simple, du premier appel <span className="text-gradient">à la mise en ligne.</span>
            </h2>
            <p className="section-lead">
              Quatre étapes claires. Vous restez maître de votre projet, sans avoir à devenir technicien.
            </p>
            <a href="#contact" className="btn btn--primary method__cta">
              Commencer par l’étape 1
            </a>
          </Reveal>
        </div>

        <ol className="steps" ref={ref}>
          <span className="steps__rail" aria-hidden="true">
            <motion.span className="steps__fill" style={{ scaleY }} />
          </span>
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="step"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step__num">0{i + 1}</span>
              <div className="step__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="step__tag">{s.tag}</span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
