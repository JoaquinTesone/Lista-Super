// Custom, no existe en lucide-react tal como lo definimos: grid 2x2 con
// el cuadrado arriba-derecha relleno (representa "categoría seleccionada").
// Mismas convenciones que lucide (viewBox 24x24, stroke currentColor) para
// que se vea consistente al lado de los otros íconos de la barra.
export default function CategoriasIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  )
}