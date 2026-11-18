import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { CheckCircle2, Clock3, FileText, Loader2, UploadCloud, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS, JOBS } from "@/lib/jobs";
import { applicationSchema, submitApplication, validateResume } from "@/lib/applications";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; initialJobId?: string | undefined };

const empty = { fullName: "", email: "", phone: "", position: "", portfolioUrl: "", coverNote: "" };

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

export function ApplyModal({ open, onOpenChange, initialJobId }: Props) {
  const [values, setValues] = useState(empty);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const job = JOBS.find((j) => j.id === initialJobId);
      setValues({ ...empty, position: job?.title ?? "" });
      setFile(null);
      setErrors({});
      setStatus("idle");
      setSubmitError(null);
    }
  }, [open, initialJobId]);

  const set = (k: keyof typeof empty) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  function pickFile(f: File | undefined | null) {
    if (!f) return;
    const err = validateResume(f);
    setErrors((e) => ({ ...e, resume: err ?? "" }));
    setFile(err ? null : f);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const parsed = applicationSchema.safeParse(values);
    const next: Record<string, string> = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
    }
    const fileErr = validateResume(file);
    if (fileErr) next["resume"] = fileErr;
    setErrors(next);
    if (Object.keys(next).length || !file) return;

    setStatus("sending");
    try {
      const job = JOBS.find((j) => j.title === values.position);
      await submitApplication(values, file, job?.department);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl p-0 sm:max-w-xl">
        {status === "done" ? (
          <div className="flex flex-col items-center px-8 py-12 text-center">
            <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-mint-gradient shadow-glow">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Application received!</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Thanks, {values.fullName.split(" ")[0]}. Your application for{" "}
              <span className="font-semibold text-foreground">{values.position}</span> is now with our HR team.
            </p>
            <div className="mt-6 flex w-full items-center gap-3 rounded-2xl bg-accent p-4 text-left">
              <Clock3 className="h-5 w-5 shrink-0 text-accent-foreground" />
              <p className="text-sm text-accent-foreground">
                <span className="font-semibold">48h Review Guarantee.</span> We'll reply to{" "}
                {values.email} within 48–72 business hours.
              </p>
            </div>
            <Button variant="ink" size="lg" className="mt-8" onClick={() => onOpenChange(false)}>
              Back to careers
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <DialogHeader className="border-b border-border px-6 pt-6 pb-4 text-left sm:px-8">
              <span className="font-mono text-xs font-medium tracking-widest text-accent-foreground uppercase">
                Quick Apply · 2 minutes
              </span>
              <DialogTitle className="text-2xl font-bold">Join the Panda team</DialogTitle>
              <DialogDescription>Fill in a few details and drop your resume. That's it.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-8">
              <Field label="Full name" error={errors["fullName"]} className="sm:col-span-2">
                <Input value={values.fullName} onChange={(e) => set("fullName")(e.target.value)} placeholder="Juan Dela Cruz" autoComplete="name" />
              </Field>
              <Field label="Email" error={errors["email"]}>
                <Input type="email" value={values.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@email.com" autoComplete="email" />
              </Field>
              <Field label="Phone" error={errors["phone"]}>
                <Input type="tel" value={values.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="0917 123 4567" autoComplete="tel" />
              </Field>
              <Field label="Position" error={errors["position"]} className="sm:col-span-2">
                <Select value={values.position} onValueChange={set("position")}>
                  <SelectTrigger aria-label="Position">
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectGroup key={d}>
                        <SelectLabel>{d}</SelectLabel>
                        {JOBS.filter((j) => j.department === d).map((j) => (
                          <SelectItem key={j.id} value={j.title}>
                            {j.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                    <SelectGroup>
                      <SelectLabel>Other</SelectLabel>
                      <SelectItem value="Open Application">Open / speculative application</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Portfolio or LinkedIn (optional)" error={errors["portfolioUrl"]} className="sm:col-span-2">
                <Input value={values.portfolioUrl} onChange={(e) => set("portfolioUrl")(e.target.value)} placeholder="https://linkedin.com/in/you" />
              </Field>

              <div className="sm:col-span-2">
                <Label className="mb-1.5 block">Resume</Label>
                {file ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-primary bg-accent p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card">
                      <FileText className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatSize(file.size)} · ready to send</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" aria-label="Remove file" onClick={() => setFile(null)}>
                      <X />
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                      "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
                      dragging ? "border-primary bg-accent" : "border-input hover:border-primary hover:bg-accent/50",
                    )}
                  >
                    <UploadCloud className="h-8 w-8 text-accent-foreground" />
                    <p className="mt-2 text-sm font-semibold">Drag & drop your resume</p>
                    <p className="text-xs text-muted-foreground">or click to browse · PDF or Word · max 10 MB</p>
                  </button>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => {
                    pickFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
                {errors["resume"] && <p className="mt-1.5 text-xs text-destructive">{errors["resume"]}</p>}
              </div>

              <Field label="Cover note (optional)" error={errors["coverNote"]} className="sm:col-span-2">
                <Textarea rows={3} value={values.coverNote} onChange={(e) => set("coverNote")(e.target.value)} placeholder="Tell us what excites you about this role…" />
              </Field>
            </div>

            <div className="flex flex-col gap-3 border-t border-border bg-muted/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-4 w-4 text-accent-foreground" /> Reply within 48–72 business hours
              </p>
              <Button type="submit" variant="hero" size="lg" disabled={status === "sending"}>
                {status === "sending" ? <Loader2 className="animate-spin" /> : null}
                {status === "sending" ? "Sending…" : "Submit application"}
              </Button>
            </div>
            {submitError && <p className="px-8 pb-5 text-sm text-destructive">{submitError}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
