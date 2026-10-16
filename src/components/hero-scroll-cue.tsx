"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroScrollCue({ targetId }: { targetId: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to next section"
      onClick={() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className={`interactive absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-foreground/60 hover:text-foreground md:bottom-10 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ChevronDown className="scroll-cue-bounce h-8 w-8 md:h-11 md:w-11" strokeWidth={1.15} />
    </button>
  );
}
