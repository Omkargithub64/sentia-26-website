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
        
        {}
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#events">
  Events
</Link>
          <a
            href="https://mite.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About MITE
          </a>
          <Link href="/gallery">Gallery</Link>
          <Link href="/map">Map</Link>
        </nav>

        {}
        <div className="nav-right">
            <Link href="/">
          <img
            src="./MITE.png"
            alt="MITE Logo"
            className="nav-logo"
            />
            </Link>

          {}
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
      </div>

      {}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <a href="#events" onClick={() => setOpen(false)}>Events</a>
        <a
          href="https://mite.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          About MITE
        </a>
        <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
        <Link href="/map" onClick={() => setOpen(false)}>Map</Link>
      </div>
    </header>
  );
}