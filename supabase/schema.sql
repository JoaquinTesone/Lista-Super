create extension if not exists "pgcrypto";

create table productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  categoria text not null,
  necesito_comprar boolean not null default false,
  en_carrito boolean not null default false,
  created_at timestamptz not null default now()
);

-- MVP sin auth: acceso público de lectura/escritura.
-- Si en el futuro compartís la lista con amigos, acá es donde se agrega
-- una columna household_id y políticas por usuario.
alter table productos enable row level security;

create policy "Acceso público MVP" on productos
  for all using (true) with check (true);
