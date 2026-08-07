# Lista de super

App PWA para gestionar el catálogo permanente de productos. Marcás lo que
falta durante la semana, la lista de compras se arma sola.

## 1. Supabase

1. Creá un proyecto gratis en https://supabase.com
2. En el SQL Editor, pegá y corré el contenido de `supabase/schema.sql`.
3. En Project Settings → API, copiá `Project URL` y `anon public key`.

## 2. Configuración local

```bash
npm install
cp .env.example .env
```

Completá `.env` con las dos variables de Supabase.

```bash
npm run dev
```

Abrí lo que te muestre la terminal (normalmente `http://localhost:5173`).

## 3. Cargar el catálogo inicial

`supabase/seed.sql` tiene el catálogo completo (~144 productos en 9
categorías). Pegalo en el SQL Editor de Supabase y corré, después de
haber corrido `schema.sql`. Se carga todo de una sola vez.

## 4. Deploy (para tenerla en el celular)

1. Subí este proyecto a un repo de GitHub.
2. Entrá a https://vercel.com, importá el repo.
3. Agregá las mismas dos variables de entorno (`VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY`) en la configuración del proyecto en Vercel.
4. Deploy. Te da una URL con HTTPS, necesaria para poder instalarla.

## 5. Instalarla en el celular

- **Android (Chrome)**: abrí la URL, menú (⋮) → "Instalar app" o "Agregar a
  pantalla de inicio".
- **iPhone (Safari)**: abrí la URL, botón compartir → "Agregar a pantalla
  de inicio".

Queda como un ícono más, sin barra de navegador. Para compartirla con
amigos, alcanza con mandarles la URL — cada uno la instala en su celular
de la misma forma.

## Sobre compartir la lista entre varios usuarios

El MVP es de un solo usuario (una sola base de Supabase, sin login). Si
más adelante querés que vos y un amigo vean la misma lista en tiempo
real, el cambio es agregar una columna `household_id` a `productos` y un
código de invitación simple — no hace falta un sistema de autenticación
completo para eso. Quedó afuera del MVP a propósito, para no
complicarlo ahora.

## Íconos faltantes

Faltan `public/icon-192.png` y `public/icon-512.png` para que el manifest
de la PWA quede completo — cualquier ícono cuadrado simple (el logo que
quieras) exportado en esos dos tamaños sirve.
