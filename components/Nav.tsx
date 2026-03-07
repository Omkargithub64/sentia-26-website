"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Nav.css";

export default function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "auto";
}, [open]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-right">
            <Link href="/">
          <img
            src="/MITE.png"
            alt="MITE Logo"
            className="nav-logo"
            />
            </Link>

          {}

          <a target="_blank" 
  rel="noopener noreferrer" href="https://bcqthgtmknxsyjzbqfya.supabase.co/storage/v1/object/public/sentia/Sentia%202026%20Brochure.pdf" download className="download-btn mobileBrochure">
  <svg className="download-icon" viewBox="0 0 24 24">
    <path d="M12 16L7 11H10V4H14V11H17L12 16Z"/>
    <path d="M5 20H19V18H5V20Z"/>
  </svg>
  Brochure
</a>

          <button
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {}
        <nav className="nav-links">

          <a target="_blank" 
  rel="noopener noreferrer" href="https://bcqthgtmknxsyjzbqfya.supabase.co/storage/v1/object/public/sentia/Sentia%202026%20Brochure.pdf" download className="download-btn">
  <svg className="download-icon" viewBox="0 0 24 24">
    <path d="M12 16L7 11H10V4H14V11H17L12 16Z"/>
    <path d="M5 20H19V18H5V20Z"/>
  </svg>
  Brochure
</a>
          <Link href="/">Home</Link>
          <Link href="/allevents">
  Events
</Link>
          <Link
            href="https://mite.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About MITE
          </Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/map">Map</Link>
        </nav>

        {}
        
      </div>

      {}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/allevents" onClick={() => setOpen(false)}>Events</Link>
        <Link
          href="https://mite.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          About MITE
        </Link>
        <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
        <Link href="/map" onClick={() => setOpen(false)}>Map</Link>
      </div>
    </header>
  );
}