import { SUBCATEGORIAS } from '../data/subcategorias.js'

// Agrupa los productos de una categoría por subcategoría, en el orden
// definido en SUBCATEGORIAS (no alfabético). Dentro de cada grupo, los
// productos sí van alfabéticos. Lo que no tiene subcategoría asignada
// (ej. productos agregados a mano) cae en "Otros" al final.
export function agruparPorSubcategoria(productos, categoria) {
  const orden = SUBCATEGORIAS[categoria] || []
  const mapa = {}

  for (const p of productos) {
    const sub = p.subcategoria && orden.includes(p.subcategoria) ? p.subcategoria : 'Otros'
    if (!mapa[sub]) mapa[sub] = []
    mapa[sub].push(p)
  }

  const claves = [...orden.filter(s => mapa[s]), ...(mapa['Otros'] ? ['Otros'] : [])]

  return claves.map(sub => ({
    subcategoria: sub,
    items: mapa[sub].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }))
}
