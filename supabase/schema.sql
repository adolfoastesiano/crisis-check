-- =============================================
--  Crisis Check — Schema de base de datos
--  Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================

-- Tabla de evaluaciones
create table if not exists public.evaluaciones (
  id            uuid default gen_random_uuid() primary key,
  user_id       uuid references auth.users(id) on delete cascade not null,
  titulo        text not null default 'Evaluación sin título',
  cliente       text,
  created_at    timestamptz default now() not null,
  answers       jsonb not null,
  crisis_score  integer not null check (crisis_score >= 0 and crisis_score <= 100),
  prep_score    integer not null check (prep_score >= 0 and prep_score <= 100),
  appear_decision text not null check (appear_decision in ('si', 'esperar', 'no')),
  verdict       text not null check (verdict in ('crisis', 'alerta', 'ok')),
  notas         text
);

-- Índice para listar evaluaciones por usuario (más rápido)
create index if not exists evaluaciones_user_id_created_at_idx
  on public.evaluaciones(user_id, created_at desc);

-- Row Level Security: cada usuario solo ve sus propias evaluaciones
alter table public.evaluaciones enable row level security;

create policy "Usuarios ven solo sus evaluaciones"
  on public.evaluaciones
  for select
  using (auth.uid() = user_id);

create policy "Usuarios insertan sus propias evaluaciones"
  on public.evaluaciones
  for insert
  with check (auth.uid() = user_id);

create policy "Usuarios actualizan sus propias evaluaciones"
  on public.evaluaciones
  for update
  using (auth.uid() = user_id);

create policy "Usuarios eliminan sus propias evaluaciones"
  on public.evaluaciones
  for delete
  using (auth.uid() = user_id);
