CREATE TABLE public.gym_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  plan text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.gym_registrations TO anon, authenticated;
GRANT ALL ON public.gym_registrations TO service_role;

ALTER TABLE public.gym_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register" ON public.gym_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);