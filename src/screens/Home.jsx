import { useMemo, useState } from 'react'
import { CATEGORIAS } from '../data/categorias.js'

export default function Home({ productos, onAbrirCategoria, onAbrirLista, onAbrirAdmin, onToggle, onAgregar }) {
  const [busqueda, setBusqueda] = useState('')

  const categorias = useMemo(() => {
    const mapa = {}
    for (const p of productos) {
      mapa[p.categoria] = (mapa[p.categoria] || 0) + (p.necesito_comprar ? 1 : 0)
    }
    return Object.keys(mapa).sort().map(nombre => ({ nombre, marcados: mapa[nombre] }))
  }, [productos])

  const resultados = useMemo(() => {
    if (!busqueda.trim()) return null
    const q = busqueda.trim().toLowerCase()
    return productos.filter(p => p.nombre.toLowerCase().includes(q))
  }, [busqueda, productos])

  return (
    <div className="screen">
      <h1>Categorías</h1>
      <p className="subtitle">Marcá lo que falta, la lista se arma sola.</p>

      <input
        className="search-input"
        placeholder="Buscar producto…"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {resultados !== null ? (
        <BuscadorResultados
          resultados={resultados}
          termino={busqueda}
          onToggle={onToggle}
          onAgregar={onAgregar}
          onLimpiar={() => setBusqueda('')}
        />
      ) : (
        <>
          <div className="category-grid">
            {categorias.map(c => (
              <button key={c.nombre} className="category-card" onClick={() => onAbrirCategoria(c.nombre)}>
                {c.nombre}
                <span className="count">{c.marcados > 0 ? `${c.marcados} marcados` : 'sin marcar'}</span>
              </button>
            ))}
          </div>

          <div className="nav-row">
            <button className="nav-btn" onClick={onAbrirLista}>Lista de compras</button>
            <button className="nav-btn" onClick={onAbrirAdmin}>Administración</button>
          </div>
        </>
      )}
    </div>
  )
}

function BuscadorResultados({ resultados, termino, onToggle, onAgregar, onLimpiar }) {
  const [categoriaNueva, setCategoriaNueva] = useState('Despensa')

  if (resultados.length > 0) {
    return (
      <div>
        {resultados.map(p => (
          <div key={p.id} className="product-row">
            <button
              className={`checkbox ${p.necesito_comprar ? 'checked' : ''}`}
              onClick={() => onToggle(p.id, !p.necesito_comprar)}
              aria-label={p.necesito_comprar ? 'Marcado' : 'Sin marcar'}
            >
              {p.necesito_comprar ? '✓' : ''}
            </button>
            <span className="product-name">{p.nombre}</span>
            <span className="subtitle" style={{ margin: 0 }}>{p.categoria}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="quick-add">
      <p>No encontramos "{termino}"</p>
      <select
        className="search-input"
        style={{ marginBottom: 10 }}
        value={categoriaNueva}
        onChange={e => setCategoriaNueva(e.target.value)}
      >
        {CATEGORIAS.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        className="primary-btn"
        style={{ marginTop: 0 }}
        onClick={async () => { await onAgregar(termino, categoriaNueva); onLimpiar() }}
      >
        Agregar "{termino}" a {categoriaNueva}
      </button>
    </div>
  )
}
