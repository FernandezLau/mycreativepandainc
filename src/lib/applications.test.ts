import { describe, expect, it } from "vitest";
import { validateResume } from "./applications";

describe("resume rules", () => {
  it("accepts a PDF under 10 MB", () => {
    expect(validateResume({ name: "cv.pdf", size: 200_000 })).toBeNull();
  });
  it("rejects files that are not PDF or Word", () => {
    expect(validateResume({ name: "cv.exe", size: 200_000 })).not.toBeNull();
  });
  it("rejects files over 10 MB", () => {
    expect(validateResume({ name: "cv.docx", size: 10 * 1024 * 1024 + 1 })).not.toBeNull();
  });
});
