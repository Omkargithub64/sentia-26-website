"use client";

import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-container">

          {}
          <img
            src="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/poseidon.jpeg"
            alt="Sentia Hero"
            className="hero-bg"
          />

          {}
          <div className="hero-overlay" />

          {}
          <div className="hero-description">
            <p>
              Experience the ultimate fusion of talent and creativity at Sentia
              2026. Join us for a celebration of art, culture, and innovation
              like never before.
            </p>
          </div>

          {}
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