import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { applicationSchema, validateResume } from "./applications";

const formSchema = applicationSchema.extend({
  department: z.string().trim().max(60).optional().default(""),
});

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-120);
}

// Public endpoint: applicants are not signed in. Resumes are uploaded here on the
// server so the private resumes bucket needs no anonymous upload rule.
export const submitApplicationFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Invalid submission");
    const resume = data.get("resume");
    if (!(resume instanceof File)) throw new Error("Please attach your resume (PDF or Word).");
    const fileError = validateResume(resume);
    if (fileError) throw new Error(fileError);
    const fields = formSchema.parse({
      fullName: data.get("fullName") ?? "",
      email: data.get("email") ?? "",
      phone: data.get("phone") ?? "",
      position: data.get("position") ?? "",
      portfolioUrl: data.get("portfolioUrl") ?? "",
      coverNote: data.get("coverNote") ?? "",
      department: data.get("department") ?? "",
    });
    return { fields, resume };
  })
  .handler(async ({ data: { fields, resume } }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const path = `${crypto.randomUUID()}/${safeFileName(resume.name)}`;
    const upload = await supabaseAdmin.storage
      .from("resumes")
      .upload(path, resume, { contentType: resume.type || undefined, upsert: false });
    if (upload.error) {
      console.error("Resume upload failed", upload.error);
      throw new Error("We couldn't upload your resume. Please try again.");
    }

    const { error } = await supabaseAdmin.from("job_applications").insert({
      full_name: fields.fullName,
      email: fields.email,
      phone: fields.phone,
      position: fields.position,
      department: fields.department || null,
      portfolio_url: fields.portfolioUrl || null,
      cover_note: fields.coverNote || null,
      resume_path: path,
      resume_name: resume.name.slice(0, 255),
      status: "new",
    });
    if (error) {
      console.error("Application insert failed", error);
      await supabaseAdmin.storage.from("resumes").remove([path]);
      throw new Error("We couldn't send your application. Please try again.");
    }
    return { ok: true as const };
  });
