"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`interactive fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border/70 bg-[#f5efe6]/92 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-sm hover:border-foreground/30 hover:bg-[#f5efe6] hover:shadow-md sm:bottom-6 sm:right-5 md:bottom-8 md:right-8 md:h-16 md:w-16 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />
    </button>
  );
}
