import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Check, CheckCircle2, Smartphone, Sparkles } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { site } from '../config'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1] as const
const words = ['site web', 'application', 'plateforme', 'boutique en ligne']

function Rotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="rotator" aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.4 }}
        >
          '{words[i]}'
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function HeroVisual() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-7, 7])
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const phoneX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const chipY = useTransform(sy, [-0.5, 0.5], [-12, 12])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      className="hv"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease }}
      aria-hidden="true"
    >
      <motion.div className="hv__stage" style={{ rotateX: rotX, rotateY: rotY }}>
        {/* Navigateur */}
        <div className="hv__browser">
          <div className="hv__bar">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="hv__url">
              <span className="hv__lock" />
              votre-entreprise.com
            </span>
          </div>
          <div className="hv__page">
            <div className="hv__nav">
              <span className="sk sk--logo" />
              <span className="hv__navlinks">
                <span className="sk sk--xs" />
                <span className="sk sk--xs" />
                <span className="sk sk--xs" />
              </span>
            </div>
            <div className="hv__heroblock">
              <div className="hv__heroText">
                <motion.span className="sk sk--title" initial={{ width: 0 }} animate={{ width: '86%' }} transition={{ delay: 1, duration: 0.9, ease }} />
                <motion.span className="sk sk--title" initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ delay: 1.15, duration: 0.9, ease }} />
                <span className="sk sk--line" />
                <span className="sk sk--line short" />
                <motion.span className="hv__btn" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 16 }} />
              </div>
              <div className="hv__chart">
                {[38, 56, 44, 72, 64, 90].map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.8, ease }}
                    className={i === 5 ? 'is-hot' : ''}
                  />
                ))}
              </div>
            </div>
            <div className="hv__cards">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="hv__card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.12, duration: 0.6, ease }}
                >
                  <span className={`hv__icon hv__icon--${i}`} />
                  <span className="sk sk--line" />
                  <span className="sk sk--line short" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Téléphone */}
        <motion.div className="hv__phone" style={{ x: phoneX }}>
          <div className="hv__notch" />
          <div className="hv__screen">
            <span className="hv__phoneTitle">Commande #2048</span>
            <span className="hv__amount">25 000 FCFA</span>
            <span className="hv__method">
              <Smartphone size={13} /> Mobile Money
            </span>
            <motion.span
              className="hv__paid"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, type: 'spring', stiffness: 300, damping: 18 }}
            >
              <CheckCircle2 size={15} /> Paiement reçu
            </motion.span>
            <span className="sk sk--line" />
            <span className="sk sk--line short" />
          </div>
        </motion.div>

        {/* Puce code */}
        <motion.div className="hv__chip" style={{ y: chipY }}>
          <span className="hv__prompt">&gt;</span> construire(<Rotator />)
        </motion.div>

        {/* Notification */}
        <motion.div
          className="hv__toast"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.7, duration: 0.7, ease }}
        >
          <span className="hv__toastIcon">
            <Sparkles size={16} />
          </span>
          <span>
            <strong>Nouveau client</strong>
            <small>« Je voudrais réserver pour samedi »</small>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const title1 = ['Le', 'digital,']
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--orange" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.span
            className="hero__pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="hero__pulse" />
            Studio digital · {site.city}
          </motion.span>

          <h1 className="hero__title">
            <span className="hero__line">
              {title1.map((w, i) => (
                <motion.span
                  key={w}
                  className="hero__word"
                  initial={{ opacity: 0, y: '0.6em' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="hero__line">
              <motion.span
                className="hero__word text-gradient"
                initial={{ opacity: 0, y: '0.6em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease }}
              >
                simplement.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            On transforme vos besoins en solutions digitales qui marchent vraiment : sites, applications,
            plateformes. <strong>Vous avez l’idée, on s’occupe du reste.</strong>
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
          >
            <a href="#contact" className="btn btn--primary">
              Parlons de votre projet <ArrowRight size={18} />
            </a>
            <a href="#realisations" className="btn btn--ghost">
              Voir nos réalisations
            </a>
          </motion.div>

          <motion.ul
            className="hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            {['Devis gratuit', 'Réponse sous 24 h', 'Suivi après la mise en ligne'].map((t) => (
              <li key={t}>
                <Check size={15} strokeWidth={3} /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </div>

      <a href="#services" className="hero__scroll" aria-label="Défiler vers les services">
        <span />
      </a>
    </section>
  )
}
