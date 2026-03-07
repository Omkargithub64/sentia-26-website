"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Nav.css";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

useEffect(() => {
  let lastScroll = 0;

  const handleScroll = () => {
    if (open) return; // don't hide nav if mobile menu is open

    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 80) {
      setHideNav(true);
      document.body.classList.add("nav-hidden");
    } else {
      setHideNav(false);
      document.body.classList.remove("nav-hidden");
    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.body.classList.remove("nav-hidden");
  };
}, [open]);

  return (
    <header className={`navbar ${hideNav && !open ? "navbar-hide" : ""}`}>
      <div className="navbar-inner">
        <div className="nav-right">
          <Link href="/">
            <img src="/MITE.png" alt="MITE Logo" className="nav-logo" />
          </Link>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1uMj8H-Ed5wO10V-QgxivQxU34puKt26R/view?usp=sharing"
            download
            className="download-btn mobileBrochure"
          >
            <svg className="download-icon" viewBox="0 0 24 24">
              <path d="M12 16L7 11H10V4H14V11H17L12 16Z" />
              <path d="M5 20H19V18H5V20Z" />
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

        <nav className="nav-links">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1uMj8H-Ed5wO10V-QgxivQxU34puKt26R/view?usp=sharing"
            download
            className="download-btn"
          >
            <svg className="download-icon" viewBox="0 0 24 24">
              <path d="M12 16L7 11H10V4H14V11H17L12 16Z" />
              <path d="M5 20H19V18H5V20Z" />
            </svg>
            Brochure
          </a>

          <Link href="/">Home</Link>
          <Link href="/allevents">Events</Link>
          <Link href="https://mite.ac.in/" target="_blank">About MITE</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/map?region=entry">Map</Link>
        </nav>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/allevents" onClick={() => setOpen(false)}>Events</Link>
        <Link href="https://mite.ac.in/" onClick={() => setOpen(false)}>About MITE</Link>
        <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
        <Link href="/map?region=entry" onClick={() => setOpen(false)}>Map</Link>
      </div>
    </header>
  );
}