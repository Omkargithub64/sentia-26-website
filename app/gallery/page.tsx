'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const img = (seed: number) =>
  `https://picsum.photos/seed/${seed}/400/400`

const timeline = [
  { year: '2012', theme: 'The Beginning',  images: [img(10), img(11), img(12), img(13)] },
  { year: '2013', theme: 'Rising Stars',   images: [img(20), img(21), img(22), img(23)] },
  { year: '2014', theme: 'New Horizons',   images: [img(30), img(31), img(32), img(33)] },
  { year: '2015', theme: 'Breakthrough',   images: [img(40), img(41), img(42), img(43)] },
  { year: '2016', theme: 'Ignite',         images: [img(50), img(51), img(52), img(53)] },
  { year: '2017', theme: 'Momentum',       images: [img(60), img(61), img(62), img(63)] },
  { year: '2018', theme: 'Ascend',         images: [img(70), img(71), img(72), img(73)] },
  { year: '2019', theme: 'Euphoria',       images: [img(80), img(81), img(82), img(83)] },
  { year: '2020', theme: 'Resilience',     images: [img(90), img(91), img(92), img(93)] },
  { year: '2021', theme: 'Reborn',         images: [img(100), img(101), img(102), img(103)] },
  { year: '2022', theme: 'Surge',          images: [img(110), img(111), img(112), img(113)] },
  { year: '2023', theme: 'Illuminate',     images: [img(120), img(121), img(122), img(123)] },
  { year: '2024', theme: 'Zenith',         images: [img(130), img(131), img(132), img(133)] },
  { year: '2025', theme: 'Legacy',         images: [img(140), img(141), img(142), img(143)] },
]

function YearBlock({ entry, index }: { entry: typeof timeline[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-zinc-100 pt-8 pb-10"
    >
      {/* Year row */}
      <div className="flex items-baseline gap-4 mb-1">
        <span className="text-3xl font-black tracking-tighter text-black">{entry.year}</span>
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">—&nbsp;{entry.theme}</span>
      </div>

      {/* Edition label */}
      <p className="text-[10px] font-semibold tracking-[0.3em] text-zinc-300 uppercase mb-5">
        Sentia Edition {String(index + 1).padStart(2, '0')}
      </p>

      {/* 4 square images in a single horizontal row */}
      <div className="grid grid-cols-4 gap-3">
        {entry.images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-square overflow-hidden rounded-xl group cursor-pointer bg-zinc-100"
          >
            <img
              src={src}
              alt={`Sentia ${entry.year} photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-400 hover:text-black transition-colors uppercase tracking-widest"
          >
            ← Back
          </Link>
          <span className="text-xs font-bold tracking-[0.3em] text-zinc-300 uppercase">
            Sentia Gallery
          </span>
          <span className="text-xs text-zinc-300 font-medium tracking-widest">2012 – 2025</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pt-14 pb-10"
        >
          <p className="text-[10px] font-bold tracking-[0.35em] text-zinc-400 uppercase mb-4">
            Mangalore Institute of Technology &amp; Engineering
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-black mb-3">
            A Decade of Memories
          </h1>
          <p className="text-sm text-zinc-400 font-light max-w-lg leading-relaxed">
            Every edition of Sentia — from its humble beginnings to its grandest stages.
            Fourteen years of talent, culture, and unforgettable moments.
          </p>
        </motion.div>

        {/* Timeline list */}
        <div>
          {timeline.map((entry, i) => (
            <YearBlock key={entry.year} entry={entry} index={i} />
          ))}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-zinc-100 py-16 text-left"
        >
          <p className="text-[10px] font-bold tracking-[0.35em] text-zinc-300 uppercase mb-3">
            The story continues
          </p>
          <p className="text-3xl font-black tracking-tighter text-black">Sentia 2026</p>
          <p className="text-xs text-zinc-400 mt-1 tracking-wide">Coming soon — stay tuned.</p>
        </motion.div>

      </div>
    </main>
  )
}
