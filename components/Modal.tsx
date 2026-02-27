"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  text?: string;
  onClose: () => void;
};

export default function Modal({
  open,
  title,
  text,
  onClose,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay show"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-box">
        {title && <h2 id="modal-title">{title}</h2>}
        {text && <p>{text}</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}