import { useState } from 'react'
import { CATEGORIAS } from '../data/categorias.js'

export default function Administracion({ productos, onEditar, onEliminar, onAgregar, onVolver }) {
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [categoriaNueva, setCategoriaNueva] = useState('Despensa')

  const handleAgregar = async () => {
    if (!nombreNuevo.trim()) return
    await onAgregar(nombreNuevo.trim(), categoriaNueva)
    setNombreNuevo('')
  }

  return (
    <div className="screen">
      <div className="top-bar">
        <button className="back-btn" onClick={onVolver} aria-label="Volver">←</button>
        <h1>Administración</h1>
      </div>
      <p className="subtitle">Editá el catálogo completo. Esto no afecta lo que ya marcaste.</p>

      <div className="quick-add" style={{ marginBottom: 20 }}>
        <input
          className="search-input"
          style={{ marginBottom: 10 }}
          placeholder="Nombre del producto"
          value={nombreNuevo}
          onChange={e => setNombreNuevo(e.target.value)}
        />
        <select
          className="search-input"
          style={{ marginBottom: 10 }}
          value={categoriaNueva}
          onChange={e => setCategoriaNueva(e.target.value)}
        >
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="primary-btn" style={{ marginTop: 0 }} onClick={handleAgregar}>
          Agregar producto
        </button>
      </div>

      {productos.map(p => (
        <div key={p.id} className="admin-row">
          <input
            type="text"
            value={p.nombre}
            onChange={e => onEditar(p.id, { nombre: e.target.value })}
          />
          <select
            value={p.categoria}
            onChange={e => onEditar(p.id, { categoria: e.target.value })}
          >
            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="delete-btn" onClick={() => onEliminar(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}
