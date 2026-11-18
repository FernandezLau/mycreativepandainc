CREATE TYPE public.app_role AS ENUM ('admin', 'hr');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Company email addresses become HR reviewers automatically on sign-up
CREATE OR REPLACE FUNCTION public.grant_hr_for_company_email()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) LIKE '%@mycreativepanda.com' OR lower(NEW.email) LIKE '%@mycreativepanda.ph' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'hr') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_grant_hr
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.grant_hr_for_company_email();

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
  position text NOT NULL CHECK (char_length(position) BETWEEN 2 AND 120),
  department text,
  portfolio_url text CHECK (portfolio_url IS NULL OR char_length(portfolio_url) <= 500),
  cover_note text CHECK (cover_note IS NULL OR char_length(cover_note) <= 3000),
  resume_path text NOT NULL CHECK (char_length(resume_path) <= 300),
  resume_name text NOT NULL CHECK (char_length(resume_name) <= 255),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','interview','hired','declined')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.job_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application" ON public.job_applications
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "HR can view applications" ON public.job_applications
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'hr') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "HR can update applications" ON public.job_applications
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'hr') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'hr') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "HR can delete applications" ON public.job_applications
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'hr') OR public.has_role(auth.uid(), 'admin'));

CREATE INDEX job_applications_created_at_idx ON public.job_applications (created_at DESC);

-- Resume files
CREATE POLICY "Anyone can upload a resume" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "HR can read resumes" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'resumes' AND (public.has_role(auth.uid(), 'hr') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "HR can delete resumes" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'resumes' AND (public.has_role(auth.uid(), 'hr') OR public.has_role(auth.uid(), 'admin')));