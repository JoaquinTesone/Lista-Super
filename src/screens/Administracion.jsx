import { useMemo, useState } from 'react'
import { CATEGORIAS } from '../data/categorias.js'
import { SUBCATEGORIAS } from '../data/subcategorias.js'

export default function Administracion({ productos, onEditar, onEliminar, onAgregar, onVolver }) {
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [categoriaNueva, setCategoriaNueva] = useState('Despensa')
  const [subcategoriaNueva, setSubcategoriaNueva] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const opcionesSubNueva = SUBCATEGORIAS[categoriaNueva] || []

  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productos
    const q = busqueda.trim().toLowerCase()
    return productos.filter(p => p.nombre.toLowerCase().includes(q))
  }, [productos, busqueda])

  const handleCategoriaNueva = (valor) => {
    setCategoriaNueva(valor)
    setSubcategoriaNueva('') // la categoría cambió, la subcategoría anterior ya no aplica
  }

  const handleAgregar = async () => {
    if (!nombreNuevo.trim()) return
    await onAgregar(nombreNuevo.trim(), categoriaNueva, subcategoriaNueva || null)
    setNombreNuevo('')
    setSubcategoriaNueva('')
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
          onChange={e => handleCategoriaNueva(e.target.value)}
        >
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {opcionesSubNueva.length > 0 && (
          <select
            className="search-input"
            style={{ marginBottom: 10 }}
            value={subcategoriaNueva}
            onChange={e => setSubcategoriaNueva(e.target.value)}
          >
            <option value="">Sin subcategoría</option>
            {opcionesSubNueva.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
        <button className="primary-btn" style={{ marginTop: 0 }} onClick={handleAgregar}>
          Agregar producto
        </button>
      </div>

      <input
        className="search-input"
        placeholder="Buscar producto para editar…"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {productosFiltrados.length === 0 ? (
        <div className="empty-state">No hay productos que coincidan con "{busqueda}".</div>
      ) : (
        productosFiltrados.map(p => (
          <FilaAdmin key={p.id} producto={p} onEditar={onEditar} onEliminar={onEliminar} />
        ))
      )}
    </div>
  )
}

// Fila con estado local para el nombre: mientras escribís, la posición en la
// lista no cambia. El guardado (y el reordenamiento alfabético) se dispara
// recién al salir del campo o al presionar Enter.
function FilaAdmin({ producto, onEditar, onEliminar }) {
  const [nombre, setNombre] = useState(producto.nombre)
  const opcionesSub = SUBCATEGORIAS[producto.categoria] || []

  const confirmar = () => {
    const limpio = nombre.trim()
    if (limpio && limpio !== producto.nombre) onEditar(producto.id, { nombre: limpio })
    else setNombre(producto.nombre)
  }

  const handleCategoria = (valor) => {
    // Si cambia de categoría, la subcategoría anterior probablemente ya no
    // aplique (son listas distintas por categoría), así que se limpia.
    onEditar(producto.id, { categoria: valor, subcategoria: null })
  }

  return (
    <div className="admin-row">
      <div className="admin-row-top">
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          onBlur={confirmar}
          onKeyDown={e => { if (e.key === 'Enter') e.target.blur() }}
        />
        <button className="delete-btn" onClick={() => onEliminar(producto.id)}>Eliminar</button>
      </div>
      <div className="admin-row-bottom">
        <select value={producto.categoria} onChange={e => handleCategoria(e.target.value)}>
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {opcionesSub.length > 0 && (
          <select
            value={producto.subcategoria || ''}
            onChange={e => onEditar(producto.id, { subcategoria: e.target.value || null })}
          >
            <option value="">Sin subcategoría</option>
            {opcionesSub.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </div>
    </div>
  )
}