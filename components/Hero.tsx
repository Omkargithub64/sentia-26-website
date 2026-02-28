"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Parallax from "parallax-js";
import "./Hero.css";

export default function Hero() {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const parallaxInstance = new Parallax(sceneRef.current);
      return () => parallaxInstance.disable();
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-container">

          {/* Parallax Scene */}
          <div ref={sceneRef} className="parallax-scene">

            {/* Background Layer */}
            <div data-depth="0.2" className="parallax-layer">
              <img
                src="/images/herobg.png"
                alt="Background"
                className="hero-bg"
              />
            </div>

            {/* Foreground Layer */}
            <div data-depth="0.6" className="parallax-layer">
              <img
                src="/images/herofg.png"
                alt="Foreground"
                className="hero-fg"
              />
            </div>

          </div>

          {/* Overlay */}
          <div className="hero-overlay" />

          {/* Description */}
          <div className="hero-description">
            <p>
              Experience the ultimate fusion of talent and creativity at Sentia
              2026. Join us for a celebration of art, culture, and innovation
              like never before.
            </p>
          </div>

          {/* Logo */}
          <div className="hero-title">
            <Image
              alt="logo"
              src="/Sentia26.png"
              width={250}
              height={250}
            />
          </div>

        </div>
      </div>
    </section>
  );
}