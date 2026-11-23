import { z } from "zod";

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

export async function submitApplication(input: ApplicationInput, resume: File, department?: string) {
  const data = applicationSchema.parse(input);
  const fileError = validateResume(resume);
  if (fileError) throw new Error(fileError);

  const form = new FormData();
  form.set("fullName", data.fullName);
  form.set("email", data.email);
  form.set("phone", data.phone);
  form.set("position", data.position);
  form.set("portfolioUrl", data.portfolioUrl);
  form.set("coverNote", data.coverNote);
  form.set("department", department ?? "");
  form.set("resume", resume);

  const { submitApplicationFn } = await import("./applications.functions");
  await submitApplicationFn({ data: form });
}
