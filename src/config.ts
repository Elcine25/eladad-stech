/**
 * Coordonnées de l'entreprise.
 */
export const site = {
  name: "Eladad's Tech",
  slogan: 'Le digital, simplement.',
  city: 'Abomey-Calavi, Bénin',
  email: 'eladadstech@gmail.com',
  /** Numéro WhatsApp au format international, sans + ni espaces. */
  whatsapp: '2290152995370',
  phoneDisplay: '+229 01 52 99 53 70',
  /**
   * Point d'envoi du formulaire (ex. https://formspree.io/f/xxxxxx).
   * Laissé vide : le formulaire ouvre WhatsApp avec le message pré-rempli.
   */
  formEndpoint: '',
  socials: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
}

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
