// Define el orden de agrupamiento dentro de cada categoría.
// No es un campo de navegación: solo se usa para clusterizar visualmente
// (ej. que las especias queden juntas dentro de Despensa). Un producto
// sin subcategoría, o con una que no está en esta lista, cae en "Otros"
// al final del grupo.
//
// A propósito, no todas las categorías tienen subcategorías: en las que
// la lista ya es corta y se lee de un vistazo (Limpieza, Baño, Cocina,
// Farmacia, Otros/hogar, Congelados) no aporta agruparlas más.
export const SUBCATEGORIAS = {
  'Despensa': [
    'Granos y legumbres',
    'Harinas y panificación',
    'Enlatados y conservas',
    'Condimentos y especias',
    'Aceites y vinagres',
    'Infusiones y endulzantes',
    'Snacks y golosinas',
    'Salsas y aderezos',
    'Suplementos'
  ],
  'Frutas y verduras': ['Frutas', 'Verduras'],
  'Lácteos y huevos': ['Leche y derivados', 'Quesos', 'Huevos'],
  'Carnes y fiambres': ['Carnes', 'Fiambres'],
  'Bebidas': ['Con alcohol', 'Sin alcohol', 'Hielo'],
  'Cocina y hogar': ['Descartables', 'Varios']
}