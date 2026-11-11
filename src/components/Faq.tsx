import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Reveal from './Reveal'
import './Faq.css'

const faqs = [
  {
    q: 'Combien coûte un site ou une application ?',
    a: 'Ça dépend de ce dont vous avez besoin. Un site vitrine et une plateforme de gestion n’ont pas le même prix. Après un premier échange gratuit, on vous envoie un devis clair, à prix fixe, sans frais cachés. Le paiement peut se faire en plusieurs fois.',
  },
  {
    q: 'Combien de temps faut-il pour que ce soit prêt ?',
    a: 'Comptez en général 2 à 4 semaines pour un site vitrine, et 6 à 12 semaines pour une application ou une plateforme. Le calendrier exact est fixé dans le devis, avec des étapes que vous validez au fur et à mesure.',
  },
  {
    q: 'Je n’y connais rien en technique. Est-ce un problème ?',
    a: 'Pas du tout, c’est justement notre rôle. Vous nous parlez de votre activité et de vos objectifs, on s’occupe du reste. On vous explique tout simplement et on vous forme pour que vous soyez autonome.',
  },
  {
    q: 'Mes clients pourront-ils payer par Mobile Money ?',
    a: 'Oui. On intègre les solutions de paiement locales (Mobile Money, cartes bancaires) pour que vos clients paient comme ils en ont l’habitude.',
  },
  {
    q: 'Que se passe-t-il après la mise en ligne ?',
    a: 'On ne disparaît pas. On propose un suivi avec maintenance, mises à jour de sécurité, sauvegardes et ajout de nouvelles fonctionnalités quand votre activité grandit.',
  },
  {
    q: 'Est-ce que le site ou l’application m’appartient ?',
    a: 'Oui. Une fois le projet payé, vous êtes propriétaire de votre nom de domaine, de vos contenus et de votre code. Vous gardez la main.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section section--white">
      <div className="container faq">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="section-title">Vous vous posez sûrement ces questions.</h2>
        </Reveal>

        <Reveal className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq__icon">
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
