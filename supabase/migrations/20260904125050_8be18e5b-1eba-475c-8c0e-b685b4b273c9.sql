CREATE TABLE public.concert_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.concert_subscribers TO anon, authenticated;
GRANT ALL ON public.concert_subscribers TO service_role;
ALTER TABLE public.concert_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.concert_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);