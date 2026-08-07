export default function Categoria({ categoria, productos, onToggle, onVolver }) {
  return (
    <div className="screen">
      <div className="top-bar">
        <button className="back-btn" onClick={onVolver} aria-label="Volver">←</button>
        <h1>{categoria}</h1>
      </div>

      {productos.length === 0 ? (
        <div className="empty-state">Todavía no hay productos en esta categoría.</div>
      ) : (
        <div>
          {productos.map(p => (
            <div key={p.id} className="product-row">
              <button
                className={`checkbox ${p.necesito_comprar ? 'checked' : ''}`}
                onClick={() => onToggle(p.id, !p.necesito_comprar)}
                aria-label={p.necesito_comprar ? 'Marcado' : 'Sin marcar'}
              >
                {p.necesito_comprar ? '✓' : ''}
              </button>
              <span className="product-name">{p.nombre}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
