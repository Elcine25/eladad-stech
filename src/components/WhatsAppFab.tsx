import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { whatsappLink } from '../config'
import { WhatsAppIcon } from './icons'
import './WhatsAppFab.css'

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          className="wa-fab"
          href={whatsappLink("Bonjour Eladad's Tech, j'aimerais parler d'un projet.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous écrire sur WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <WhatsAppIcon />
          <span className="wa-fab__label">Une question ?</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
