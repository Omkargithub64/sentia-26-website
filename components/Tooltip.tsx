"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type TooltipProps = {
  visible: boolean;
  x?: number;
  y?: number;
  title?: string;
  info?: string;
};

export default function Tooltip({
  visible,
  x = 0,
  y = 0,
  title,
  info,
}: TooltipProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent SSR crash
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      id="tooltip"
      style={{
        position: "fixed",
        left: x + 15,
        top: y + 15,
        pointerEvents: "none", // important for hover tooltips
        zIndex: 9999,
      }}
    >
      {title && <strong>{title}</strong>}
      {info && (
  <div>
    {info
      .split(/(?=\d+\.)/) // split before each number
      .map((item, index) => {
        const cleaned = item.trim();

        // remove numbering
        const nameOnly = cleaned.replace(/^\d+\.\s*/, "");

        // convert to Proper Case
        const formatted = nameOnly
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <p key={index}>
            {index + 1}. {formatted}
          </p>
        );
      })}
  </div>
)}
    </div>,
    document.body
  );
}