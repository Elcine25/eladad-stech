type Props = { light?: boolean }

/**
 * Logotype officiel Eladad's Tech (icône « E » + point, Space Grotesk 700/300).
 * Version claire : couleurs de icon.svg (barres crème, point menthe).
 */
export default function Logo({ light = false }: Props) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <svg className="logo__mark" viewBox="4 15 46 34" aria-hidden="true">
        <g className="logo__bars">
          <rect x="4" y="15" width="36" height="7" rx="3.5" />
          <rect x="4" y="28.5" width="22" height="7" rx="3.5" />
          <rect x="4" y="42" width="36" height="7" rx="3.5" />
        </g>
        <circle cx="35" cy="32" r="5" className="logo__dot" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">Eladad’s</span>
        <span className="logo__tech">tech</span>
      </span>
    </span>
  )
}
