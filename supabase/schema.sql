-- Corenelius Technologies & Construction
-- Run this once in the Supabase SQL editor, then create a public storage bucket named "media"
-- or let the first image upload create it from the admin panel.

create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text default '',
  organization text default '',
  service text default '',
  message text not null,
  created_at timestamptz not null default now(),
  is_read boolean not null default false
);

alter table public.site_content enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view media" on storage.objects;
create policy "Public can view media"
  on storage.objects
  for select
  to public
  using (bucket_id = 'media');
