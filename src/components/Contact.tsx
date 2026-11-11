import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { site, whatsappLink } from '../config'
import { WhatsAppIcon } from './icons'
import Reveal from './Reveal'
import './Contact.css'

const types = ['Site web', 'Application', 'Plateforme', 'Je ne sais pas encore'] as const
const budgets = ['Je ne sais pas encore', 'Moins de 500 000 FCFA', '500 000 – 1 500 000 FCFA', '1 500 000 – 5 000 000 FCFA', 'Plus de 5 000 000 FCFA']

type Fields = { name: string; contact: string; type: string; budget: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'whatsapp' | 'error'

const empty: Fields = { name: '', contact: '', type: '', budget: budgets[0], message: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Indiquez votre nom.'
  const c = f.contact.trim()
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)
  const isPhone = /^\+?[\d\s.-]{8,}$/.test(c)
  if (!isEmail && !isPhone) e.contact = 'Un e-mail ou un numéro valide, pour qu’on puisse vous répondre.'
  if (!f.type) e.type = 'Choisissez une option.'
  if (f.message.trim().length < 10) e.message = 'Dites-nous en quelques mots ce que vous souhaitez.'
  return e
}

function buildText(f: Fields) {
  return [
    `Bonjour Eladad's Tech,`,
    ``,
    `Je m'appelle ${f.name.trim()}.`,
    `Projet : ${f.type}`,
    `Budget : ${f.budget}`,
    ``,
    f.message.trim(),
    ``,
    `Me recontacter : ${f.contact.trim()}`,
  ].join('\n')
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof Fields, v: string) => {
    const next = { ...fields, [k]: v }
    setFields(next)
    if (touched) setErrors(validate(next))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = document.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)
      first?.focus()
      return
    }

    // Sans service d'envoi configuré : on ouvre WhatsApp avec le message prêt.
    if (!site.formEndpoint) {
      window.open(whatsappLink(buildText(fields)), '_blank', 'noopener,noreferrer')
      setStatus('whatsapp')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setFields(empty)
    setErrors({})
    setTouched(false)
    setStatus('idle')
  }

  const done = status === 'sent' || status === 'whatsapp'

  return (
    <section id="contact" className="section section--dark contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <Reveal className="contact__intro">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">
            Parlons de <span className="text-gradient">votre projet.</span>
          </h2>
          <p className="section-lead">
            Racontez-nous votre idée, même si elle n’est pas encore très claire. On vous répond sous 24 h avec des
            premières pistes concrètes.
          </p>

          <ul className="contact__channels">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <span className="contact__chIcon contact__chIcon--wa">
                  <WhatsAppIcon width={20} height={20} />
                </span>
                <span>
                  <small>WhatsApp</small>
                  {site.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
                <span className="contact__chIcon">
                  <Mail size={19} />
                </span>
                <span>
                  <small>E-mail</small>
                  {site.email}
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:+${site.whatsapp}`}>
                <span className="contact__chIcon">
                  <Phone size={19} />
                </span>
                <span>
                  <small>Téléphone</small>
                  {site.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <span className="contact__static">
                <span className="contact__chIcon">
                  <MapPin size={19} />
                </span>
                <span>
                  <small>Basés à</small>
                  {site.city} · on travaille partout
                </span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="contact__formWrap">
          <div className="form-card">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="ok"
                  className="form-done"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    className="form-done__icon"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 15 }}
                  >
                    <CheckCircle2 size={44} />
                  </motion.span>
                  {status === 'sent' ? (
                    <>
                      <h3>Merci {fields.name.split(' ')[0]}, message bien reçu !</h3>
                      <p>On revient vers vous sous 24 h au {fields.contact}.</p>
                    </>
                  ) : (
                    <>
                      <h3>Votre message est prêt dans WhatsApp.</h3>
                      <p>
                        Il ne reste qu’à appuyer sur <strong>Envoyer</strong>. On vous répond sous 24 h.
                      </p>
                      <a className="form-done__link" href={whatsappLink(buildText(fields))} target="_blank" rel="noopener noreferrer">
                        WhatsApp ne s’est pas ouvert ? Cliquez ici
                      </a>
                    </>
                  )}
                  <button type="button" className="btn btn--ghost" onClick={reset}>
                    Écrire un autre message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <div className="form__row">
                    <Field label="Votre nom" error={errors.name}>
                      <input
                        name="name"
                        autoComplete="name"
                        placeholder="Ex. Aïcha Dossou"
                        value={fields.name}
                        onChange={(e) => set('name', e.target.value)}
                        aria-invalid={!!errors.name}
                      />
                    </Field>
                    <Field label="E-mail ou téléphone" error={errors.contact}>
                      <input
                        name="contact"
                        autoComplete="email"
                        placeholder="Pour vous répondre"
                        value={fields.contact}
                        onChange={(e) => set('contact', e.target.value)}
                        aria-invalid={!!errors.contact}
                      />
                    </Field>
                  </div>

                  <fieldset className="field">
                    <legend className="field__label">Vous avez besoin de…</legend>
                    <div className="chips" role="radiogroup">
                      {types.map((t) => (
                        <label key={t} className={`chip ${fields.type === t ? 'is-on' : ''}`}>
                          <input
                            type="radio"
                            name="type"
                            value={t}
                            checked={fields.type === t}
                            onChange={() => set('type', t)}
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                    <FieldError msg={errors.type} />
                  </fieldset>

                  <Field label="Budget envisagé (facultatif)">
                    <select name="budget" value={fields.budget} onChange={(e) => set('budget', e.target.value)}>
                      {budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Votre projet en quelques mots" error={errors.message}>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Ex. Je veux que mes clients puissent commander et payer en ligne."
                      value={fields.message}
                      onChange={(e) => set('message', e.target.value)}
                      aria-invalid={!!errors.message}
                    />
                  </Field>

                  {status === 'error' && (
                    <p className="form__alert" role="alert">
                      <AlertCircle size={18} /> L’envoi n’a pas abouti. Réessayez, ou{' '}
                      <a href={whatsappLink(buildText(fields))} target="_blank" rel="noopener noreferrer">
                        envoyez-le sur WhatsApp
                      </a>
                      .
                    </p>
                  )}

                  <button className="btn btn--primary btn--block" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="spin" /> Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer ma demande <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <p className="form__note">Gratuit et sans engagement. Vos informations restent entre nous.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.span
          className="field__error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="field__label">{label}</span>
      {children}
      <FieldError msg={error} />
    </label>
  )
}
