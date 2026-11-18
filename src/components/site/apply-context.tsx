import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ApplyModal } from "./ApplyModal";

type ApplyContextValue = { openApply: (jobId?: string) => void };

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState<string | undefined>();

  const openApply = useCallback((id?: string) => {
    setJobId(id);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openApply }), [openApply]);

  return (
    <ApplyContext.Provider value={value}>
      {children}
      <ApplyModal open={open} onOpenChange={setOpen} initialJobId={jobId} />
    </ApplyContext.Provider>
  );
}

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used inside ApplyProvider");
  return ctx;
}
