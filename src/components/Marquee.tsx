import './Marquee.css'

const items = [
  'Sites vitrines',
  'Boutiques en ligne',
  'Applications mobiles',
  'Plateformes métiers',
  'Billetterie en ligne',
  'Paiement Mobile Money',
  'Tableaux de bord',
  'Applications web (PWA)',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-label="Ce que nous construisons">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item" aria-hidden={i >= items.length}>
            {t}
            <span className="marquee__sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
