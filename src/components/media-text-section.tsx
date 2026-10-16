"use client";

import { useEffect, useRef, type ReactNode } from "react";

const TEXT_MAX_RATIO = 1.5;

/**
 * Media + text row. Desktop: media keeps aspect (no crop), height capped at maxRatio× text.
 * natural: skip height cap — image takes full column width at intrinsic aspect.
 * ponytail: ResizeObserver — CSS cannot do sibling×N + uncropped scale.
 */
export function MediaTextSection({
  className,
  mediaClassName = "flex items-start justify-center overflow-hidden",
  textClassName,
  media,
  children,
  mediaFirst = true,
  natural = false,
  maxRatio = TEXT_MAX_RATIO,
}: {
  className?: string;
  mediaClassName?: string;
  textClassName?: string;
  media: ReactNode;
  children: ReactNode;
  mediaFirst?: boolean;
  natural?: boolean;
  maxRatio?: number;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const media = mediaRef.current;
    if (!text || !media) return;

    const imgs = () => [...media.querySelectorAll("img")];

    const apply = () => {
      const list = imgs();
      if (!window.matchMedia("(min-width: 1024px)").matches || natural) {
        for (const img of list) {
          img.style.width = "";
          img.style.height = "";
          img.style.maxWidth = "";
          img.style.maxHeight = "";
          img.style.objectFit = "";
        }
        return;
      }

      const textH = text.getBoundingClientRect().height;
      const cap = textH * maxRatio;
      const colW = media.getBoundingClientRect().width;

      for (const img of list) {
        const nw = img.naturalWidth || img.width;
        const nh = img.naturalHeight || img.height;
        if (!nw || !nh || !colW) continue;

        const fullH = colW * (nh / nw);
        const displayH = Math.min(fullH, cap);
        const displayW = displayH * (nw / nh);

        img.style.width = `${displayW}px`;
        img.style.height = `${displayH}px`;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "";
        img.style.objectFit = "contain";
      }
    };

    const onReady = () => {
      const pending = imgs().filter((img) => !img.complete);
      if (pending.length === 0) {
        apply();
        return;
      }
      let left = pending.length;
      for (const img of pending) {
        img.addEventListener(
          "load",
          () => {
            left -= 1;
            if (left === 0) apply();
          },
          { once: true },
        );
      }
    };

    onReady();
    const ro = new ResizeObserver(apply);
    ro.observe(text);
    ro.observe(media);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [natural, maxRatio]);

  const mediaEl = (
    <div ref={mediaRef} className={mediaClassName}>
      {media}
    </div>
  );
  const textEl = (
    <div ref={textRef} className={["self-start", textClassName].filter(Boolean).join(" ")}>
      {children}
    </div>
  );

  return (
    <div className={className}>
      {mediaFirst ? (
        <>
          {mediaEl}
          {textEl}
        </>
      ) : (
        <>
          {textEl}
          {mediaEl}
        </>
      )}
    </div>
  );
}
