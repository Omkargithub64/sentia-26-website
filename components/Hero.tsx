'use client'

import React from 'react'
import Link from 'next/link'
import StaggeredMenu from './StaggeredMenu'
import Image from 'next/image'

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
]

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
]

export default function Hero() {
  return (
    <section className="h-screen w-full bg-white flex flex-col">
      <div className="flex-1 w-full p-2 overflow-hidden">
        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-zinc-900">

          {/* Background Image */}
          <img
            src="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/poseidon.jpeg"
            alt="Sentia Hero"
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/50" />

          {/* Top Navigation Bar — flush at top */}
          <div className="absolute top-0 left-0 right-0 px-8  z-20 flex items-center justify-between pointer-events-none">

            {/* Left: Navigation Links */}
            <nav className="pointer-events-auto flex items-center gap-1 p-1.5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/5 shadow-lg shadow-black/5">
              <a
                href="#events"
                className="px-4 py-2 text-xs font-medium text-white/90 hover:bg-white/10 rounded-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
              >
                Events
              </a>
              <a
                href="https://mite.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-medium text-white/90 hover:bg-white/10 rounded-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
              >
                About MITE
              </a>
              <Link
                href="/gallery"
                className="px-4 py-2 text-xs font-medium text-white/90 hover:bg-white/10 rounded-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
              >
                Gallery
              </Link>
              <Link
                href="/map"
                className="px-4 py-2 text-xs font-medium text-white/90 hover:bg-white/10 rounded-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
              >
                Map
              </Link>

            </nav>

            

            {/* Right: MITE Logo */}
            <div className="pointer-events-auto">
              {/* <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials
                displayItemNumbering={true}
                menuButtonColor="#ffffff"
                openMenuButtonColor="#fff"
                changeMenuColorOnOpen={true}
                colors={['#B19EEF', '#5227FF']}
                logoUrl="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/MITE%20Header%20Transparent.png"
                accentColor="#5227FF"
              /> */}
              <img
                src="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/MITE%20Header%20Transparent.png"
                alt="MITE Logo"
                className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Top Left: Event Description */}
          <div className="absolute top-24 left-8 md:top-32 md:left-12 z-10 max-w-xs md:max-w-md pointer-events-none text-left">
            <p className="text-sm md:text-lg font-medium text-white/90 leading-relaxed drop-shadow-md">
              Experience the ultimate fusion of talent and creativity at Sentia 2026. Join us for a celebration of art, culture, and innovation like never before.
            </p>
          </div>

          {/* Bottom Right: Title */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex flex-col items-end pointer-events-none">
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[0.8] drop-shadow-2xl select-none">
              <Image alt='logo' src="/Sentia26.png" width={250} height={250}></Image>
            </h1>
          </div>

        </div>
      </div>
    </section>
  )
}
