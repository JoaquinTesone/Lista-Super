import { ShoppingCart, Pencil } from 'lucide-react'
import CategoriasIcon from './icons/CategoriasIcon.jsx'

export default function BottomNav({ activo, onIrHome, onIrLista, onIrAdmin }) {
  return (
    <div className="bottom-nav">
      <div className="bottom-nav-inner">
        <button className={activo === 'home' ? 'active' : ''} onClick={onIrHome}>
          <CategoriasIcon />
          <span>Categorías</span>
        </button>
        <button className={activo === 'lista' ? 'active' : ''} onClick={onIrLista}>
          <ShoppingCart size={22} strokeWidth={2} />
          <span>Lista de compras</span>
        </button>
        <button className={activo === 'admin' ? 'active' : ''} onClick={onIrAdmin}>
          <Pencil size={22} strokeWidth={2} />
          <span>Administración</span>
        </button>
      </div>
    </div>
  )
}