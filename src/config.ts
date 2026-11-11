/**
 * Coordonnées de l'entreprise.
 * ⚠️ À remplacer par les vraies informations avant la mise en ligne.
 */
export const site = {
  name: "Eladad's Tech",
  slogan: 'Le digital, simplement.',
  city: 'Cotonou, Bénin',
  email: 'contact@eladadstech.com',
  /** Numéro WhatsApp au format international, sans + ni espaces (ex. 2290100000000). */
  whatsapp: '2290100000000',
  phoneDisplay: '+229 01 00 00 00 00',
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
