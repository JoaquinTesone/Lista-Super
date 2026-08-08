import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabaseClient'
import Home from './screens/Home.jsx'
import Categoria from './screens/Categoria.jsx'
import ListaCompras from './screens/ListaCompras.jsx'
import Administracion from './screens/Administracion.jsx'
import BottomNav from './components/BottomNav.jsx'

export default function App() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState({ name: 'home' })

  const cargar = useCallback(async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true })
    if (!error) setProductos(data)
    setLoading(false)
  }, [])

  useEffect(() => { cargar() }, [cargar])

  // Mantiene el array siempre ordenado por nombre, sin importar si un
  // producto se agregó, se editó o vino de la carga inicial.
  const ordenar = (lista) => [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))

  // Marca/desmarca "necesito comprar" desde la pantalla de Categoría o el buscador
  const toggleNecesito = async (id, valor) => {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, necesito_comprar: valor } : p))
    await supabase.from('productos').update({ necesito_comprar: valor }).eq('id', id)
  }

  // Marca/desmarca "en el carrito" durante el modo compra
  const toggleCarrito = async (id, valor) => {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, en_carrito: valor } : p))
    await supabase.from('productos').update({ en_carrito: valor }).eq('id', id)
  }

  // Alta rápida desde el buscador (sin subcategoría) o completa desde Administración
  const agregarProducto = async (nombre, categoria, subcategoria = null) => {
    const { data, error } = await supabase
      .from('productos')
      .insert({ nombre, categoria, subcategoria, necesito_comprar: true })
      .select()
      .single()
    if (!error) setProductos(prev => ordenar([...prev, data]))
    return data
  }

  const editarProducto = async (id, campos) => {
    setProductos(prev => ordenar(prev.map(p => p.id === id ? { ...p, ...campos } : p)))
    await supabase.from('productos').update(campos).eq('id', id)
  }

  const eliminarProducto = async (id) => {
    setProductos(prev => prev.filter(p => p.id !== id))
    await supabase.from('productos').delete().eq('id', id)
  }

  // Solo se resetean los productos que efectivamente llegaron al carrito.
  // Lo que quedó marcado como "necesito comprar" pero no se compró, sigue en la lista.
  const finalizarCompra = async () => {
    const comprados = productos.filter(p => p.en_carrito)
    setProductos(prev => prev.map(p =>
      p.en_carrito ? { ...p, necesito_comprar: false, en_carrito: false } : p
    ))
    await Promise.all(comprados.map(p =>
      supabase.from('productos').update({ necesito_comprar: false, en_carrito: false }).eq('id', p.id)
    ))
  }

  if (loading) return null

  const irHome = () => setScreen({ name: 'home' })
  const irLista = () => setScreen({ name: 'lista' })
  const irAdmin = () => setScreen({ name: 'admin' })

  let contenido
  let tabActivo

  if (screen.name === 'categoria') {
    contenido = (
      <Categoria
        categoria={screen.categoria}
        productos={productos.filter(p => p.categoria === screen.categoria)}
        onToggle={toggleNecesito}
        onVolver={irHome}
        onAgregar={agregarProducto}
      />
    )
    tabActivo = 'home'
  } else if (screen.name === 'lista') {
    contenido = (
      <ListaCompras
        productos={productos.filter(p => p.necesito_comprar)}
        onToggleCarrito={toggleCarrito}
        onFinalizar={finalizarCompra}
        onVolver={irHome}
      />
    )
    tabActivo = 'lista'
  } else if (screen.name === 'admin') {
    contenido = (
      <Administracion
        productos={productos}
        onEditar={editarProducto}
        onEliminar={eliminarProducto}
        onAgregar={agregarProducto}
        onVolver={irHome}
      />
    )
    tabActivo = 'admin'
  } else {
    contenido = (
      <Home
        productos={productos}
        onAbrirCategoria={(categoria) => setScreen({ name: 'categoria', categoria })}
        onToggle={toggleNecesito}
        onAgregar={agregarProducto}
      />
    )
    tabActivo = 'home'
  }

  return (
    <>
      {contenido}
      <BottomNav activo={tabActivo} onIrHome={irHome} onIrLista={irLista} onIrAdmin={irAdmin} />
    </>
  )
}