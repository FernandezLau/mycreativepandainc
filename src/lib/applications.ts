import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const MAX_RESUME_BYTES = 10 * 1024 * 1024;
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

export function validateResume(file: { name: string; size: number } | null): string | null {
  if (!file) return "Please attach your resume (PDF or Word).";
  const lower = file.name.toLowerCase();
  if (!RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext)))
    return "Resume must be a PDF or Word file (.pdf, .doc, .docx).";
  if (file.size > MAX_RESUME_BYTES) return "Resume must be 10 MB or smaller.";
  if (file.size === 0) return "That file looks empty. Please choose another.";
  return null;
}

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(30)
    .regex(/^[0-9+()\-\s]+$/, "Use digits, spaces, + ( ) or - only"),
  position: z.string().trim().min(2, "Please choose a position").max(120),
  portfolioUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || /^https?:\/\/\S+\.\S+/.test(v), "Use a full link starting with https://")
    .optional()
    .default(""),
  coverNote: z.string().trim().max(3000, "Keep your note under 3,000 characters").optional().default(""),
});

export type ApplicationInput = z.input<typeof applicationSchema>;

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-120);
}

export async function submitApplication(input: ApplicationInput, resume: File, department?: string) {
  const data = applicationSchema.parse(input);
  const fileError = validateResume(resume);
  if (fileError) throw new Error(fileError);

  const path = `${crypto.randomUUID()}/${safeFileName(resume.name)}`;
  const upload = await supabase.storage
    .from("resumes")
    .upload(path, resume, { contentType: resume.type || undefined, upsert: false });
  if (upload.error) throw new Error("We couldn't upload your resume. Please try again.");

  const { error } = await supabase.from("job_applications").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    position: data.position,
    department: department ?? null,
    portfolio_url: data.portfolioUrl || null,
    cover_note: data.coverNote || null,
    resume_path: path,
    resume_name: resume.name.slice(0, 255),
  });
  if (error) throw new Error("We couldn't send your application. Please try again.");
}
