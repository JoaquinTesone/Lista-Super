import { useMemo, useState } from 'react'

export default function ListaCompras({ productos, onToggleCarrito, onFinalizar, onVolver }) {
  const [modoCompra, setModoCompra] = useState(false)
  const [mostrarToast, setMostrarToast] = useState(false)

  const agrupados = useMemo(() => {
    const mapa = {}
    for (const p of productos) {
      if (!mapa[p.categoria]) mapa[p.categoria] = []
      mapa[p.categoria].push(p)
    }
    return Object.keys(mapa).sort().map(categoria => ({ categoria, items: mapa[categoria] }))
  }, [productos])

  const handleFinalizar = () => {
    onFinalizar()
    setMostrarToast(true)
    setTimeout(() => setMostrarToast(false), 3000)
  }

  return (
    <div className="screen">
      <div className="top-bar">
        <button className="back-btn" onClick={onVolver} aria-label="Volver">←</button>
        <h1>Lista de compras</h1>
      </div>

      {productos.length === 0 ? (
        <div className="empty-state">No hay nada marcado todavía. Andá a una categoría y marcá lo que falta.</div>
      ) : (
        <>
          <div className="mode-toggle">
            <button className={!modoCompra ? 'active' : ''} onClick={() => setModoCompra(false)}>Necesito comprar</button>
            <button className={modoCompra ? 'active' : ''} onClick={() => setModoCompra(true)}>En el súper</button>
          </div>

          {agrupados.map(({ categoria, items }) => (
            <div key={categoria}>
              <div className="section-label">{categoria}</div>
              {items.map(p => (
                <div key={p.id} className="product-row">
                  {modoCompra ? (
                    <button
                      className={`checkbox ${p.en_carrito ? 'checked' : ''}`}
                      onClick={() => onToggleCarrito(p.id, !p.en_carrito)}
                      aria-label={p.en_carrito ? 'En el carrito' : 'Falta poner en el carrito'}
                    >
                      {p.en_carrito ? '✓' : ''}
                    </button>
                  ) : (
                    <span className="checkbox checked">✓</span>
                  )}
                  <span className={`product-name ${modoCompra && p.en_carrito ? 'done' : ''}`}>{p.nombre}</span>
                </div>
              ))}
            </div>
          ))}

          <button className="primary-btn" onClick={handleFinalizar}>Finalizar compra</button>
        </>
      )}

      {mostrarToast && (
        <div className="toast">
          Compra finalizada
        </div>
      )}
    </div>
  )
}
