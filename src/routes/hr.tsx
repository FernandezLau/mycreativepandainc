import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { Download, Loader2, LogOut } from "lucide-react";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/hr")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "HR Portal — My Creative Panda" },
      { name: "description", content: "Private portal for the My Creative Panda HR team to review job applications." },
      { property: "og:title", content: "HR Portal — My Creative Panda" },
      { property: "og:description", content: "Private applicant review portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: HrPortal,
});

const STATUSES = ["new", "reviewing", "interview", "hired", "declined"] as const;

function HrPortal() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6">
      {session === undefined ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
      ) : session ? (
        <Applications session={session} />
      ) : (
        <SignIn />
      )}
    </section>
  );
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/hr` } });
    setBusy(false);
    if (res.error) setMsg(res.error.message);
    else if (mode === "up" && !res.data.session) setMsg("Check your email to confirm your account, then sign in.");
  }

  async function social(provider: "google" | "lovable") {
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (r.error) setMsg(r.error.message);
  }

  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-border bg-card p-8 shadow-card">
      <h1 className="text-2xl font-bold">HR Portal</h1>
      <p className="mt-1 text-sm text-muted-foreground">Use your company email to review applications.</p>
      <div className="mt-6 grid gap-2">
        <Button type="button" variant="outline" onClick={() => social("google")}>
          Continue with Google
        </Button>
        <Button type="button" variant="outline" onClick={() => social("lovable")}>
          <LovableMark /> Continue with Lovable
        </Button>
      </div>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <div>
          <Label className="mb-1.5 block">Email</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1.5 block">Password</Label>
          <Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" variant="ink" className="w-full" disabled={busy}>
          {busy && <Loader2 className="animate-spin" />}
          {mode === "in" ? "Sign in" : "Create account"}
        </Button>
      </form>
      {msg && <p className="mt-3 text-sm text-muted-foreground">{msg}</p>}
      <button
        type="button"
        className="mt-4 text-sm font-medium text-accent-foreground hover:underline"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
      >
        {mode === "in" ? "New here? Create an account" : "Have an account? Sign in"}
      </button>
    </div>
  );
}

function Applications({ session }: { session: Session }) {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["applications", session.user.id],
    queryFn: async () => {
      const roles = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const isHr = (roles.data ?? []).some((r) => r.role === "hr" || r.role === "admin");
      if (!isHr) return { isHr, rows: [] };
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return { isHr, rows: data };
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
  }

  async function download(path: string) {
    const { data } = await supabase.storage.from("resumes").createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  async function setStatus(id: string, status: string) {
    await supabase.from("job_applications").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["applications"] });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Applications</h1>
          <p className="text-sm text-muted-foreground">Signed in as {session.user.email}</p>
        </div>
        <Button variant="pill" onClick={signOut}>
          <LogOut /> Sign out
        </Button>
      </div>

      {isLoading ? (
        <Loader2 className="mt-10 h-6 w-6 animate-spin text-muted-foreground" />
      ) : error ? (
        <p className="mt-10 text-destructive">Couldn't load applications.</p>
      ) : !data?.isHr ? (
        <p className="mt-10 rounded-2xl bg-muted p-6 text-muted-foreground">
          Your account doesn't have HR access. Sign in with a company email address.
        </p>
      ) : data.rows.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-muted p-6 text-muted-foreground">No applications yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Applicant</th>
                <th className="p-4">Position</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Status</th>
                <th className="p-4">Resume</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((a) => (
                <tr key={a.id} className="border-t border-border align-top">
                  <td className="p-4">
                    <p className="font-semibold">{a.full_name}</p>
                    <p className="text-muted-foreground">{a.email} · {a.phone}</p>
                    {a.portfolio_url && (
                      <a href={a.portfolio_url} target="_blank" rel="noreferrer" className="text-accent-foreground hover:underline">
                        Portfolio
                      </a>
                    )}
                    {a.cover_note && <p className="mt-2 max-w-md text-muted-foreground">{a.cover_note}</p>}
                  </td>
                  <td className="p-4">
                    {a.position}
                    {a.department && <p className="text-xs text-muted-foreground">{a.department}</p>}
                  </td>
                  <td className="p-4 whitespace-nowrap text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <select
                      aria-label="Status"
                      value={a.status}
                      onChange={(e) => setStatus(a.id, e.target.value)}
                      className="rounded-md border border-input bg-background px-2 py-1 capitalize"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <Button variant="pill" size="sm" onClick={() => download(a.resume_path)}>
                      <Download /> {a.resume_name.length > 18 ? `${a.resume_name.slice(0, 18)}…` : a.resume_name}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
