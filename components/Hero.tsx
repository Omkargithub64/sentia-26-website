"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Parallax from "parallax-js";
import "./Hero.css";

export default function Hero() {
  const sceneRef = useRef(null);

useEffect(() => {
  if (sceneRef.current) {
    const parallaxInstance = new Parallax(sceneRef.current, {
      relativeInput: true,
      hoverOnly: true,

      // 👇 Smooth cinematic feel
      scalarX: 3,
      scalarY: 3,

      frictionX: 0.08,
      frictionY: 0.08,

      // 👇 Prevent exaggerated tilt
      // limitX: 20,
      // limitY: 20,
    });

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
            <div data-depth="0.0" className="parallax-layer">
              <img
                src="/images/poseidon2.webp"
                alt="Background"
                className=""
              />
            </div>

            {/* Foreground Layer */}
            {/* <div data-depth="0.3" className="parallax-layer">
              <img
                src="/images/herofg.webp"
                alt="Foreground"
                className="hero-fg"
              />
            </div> */}
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