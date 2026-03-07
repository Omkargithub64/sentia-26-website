'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from "next/image"

const timeline = [
  {
    year: '2024 - 2023',
    images: [
      '/gallary/2023/1.webp',
      '/gallary/2023/2.webp',
      '/gallary/2023/3.webp',
      '/gallary/2023/4.webp',
      '/gallary/2023/5.webp',
      '/gallary/2023/6.webp',
      '/gallary/2023/7.webp',
    ],
  },
  {
    year: '2022',
    images: [
      '/gallary/2022/3.webp',
      '/gallary/2022/1.webp',
      '/gallary/2022/2.webp',
      '/gallary/2022/4.webp',
      '/gallary/2022/5.webp'
    ],
  },
  {
    year: '2019',
    images: [
      '/gallary/2019/1.webp',
      '/gallary/2019/2.webp',
      '/gallary/2019/3.webp',
      '/gallary/2019/4.webp'
    ],
  },
    {
    year: '2016',
    images: [
      '/gallary/2016/1.webp',
      '/gallary/2016/2.webp',
      '/gallary/2016/3.webp',
      '/gallary/2016/4.webp',
      '/gallary/2016/5.webp'
    ],
  },
    {
    year: '2015',
    images: [
      '/gallary/2015/1.webp',
      '/gallary/2015/2.webp',
      '/gallary/2015/3.webp',
      '/gallary/2015/4.webp',
      '/gallary/2015/5.webp',
      '/gallary/2015/6.webp'
    ],
  },
    {
    year: '2014',
    images: [
      '/gallary/2014/1.webp',
      '/gallary/2014/2.webp',
      '/gallary/2014/3.webp',
      '/gallary/2014/4.webp',
      '/gallary/2014/5.webp'
    ],
  },
    {
    year: '2013',
    images: [
      '/gallary/2013/1.webp',
      '/gallary/2013/2.webp',
      '/gallary/2013/3.webp',
      '/gallary/2013/4.webp',
      '/gallary/2013/5.webp',
      '/gallary/2013/6.webp',
    ],
  },
    {
    year: '2011',
    images: [
      '/gallary/2011/1.webp',
      '/gallary/2011/2.webp',
      '/gallary/2011/3.webp',
      '/gallary/2011/4.webp'
    ],
  },
]

function YearBlock({
  entry,
  index,
  onImageClick,
}: {
  entry: typeof timeline[0]
  index: number
  onImageClick: (src: string) => void
}) {
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
      <div className="flex items-baseline gap-4 mb-1">
        <span className="text-3xl font-black tracking-tighter text-black">
          {entry.year}
        </span>
      </div>

      <p className="text-[10px] font-semibold tracking-[0.3em] text-zinc-300 uppercase mb-5">
      </p>

      {/* Responsive grid with auto height support */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {entry.images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-xl group cursor-pointer bg-zinc-100"
            onClick={() => onImageClick(src)}
          >
            <div className="relative w-full h-60 md:h-56">
              <Image
                src={src}
                alt={`Sentia ${entry.year} photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = activeImage ? "hidden" : "auto"
  }, [activeImage])

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <main className="min-h-screen text-black">

      <div className="max-w-5xl mx-auto px-6 pt-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pb-10"
        >

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-black mb-3">
            A Decade of Memories
          </h1>
          <p className="text-sm text-zinc-400 font-light max-w-lg leading-relaxed">
            Every edition of Sentia — from its humble beginnings to its grandest stages.
            Years of talent, culture, and unforgettable moments.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {timeline.map((entry, i) => (
            <YearBlock
              key={entry.year}
              entry={entry}
              index={i}
              onImageClick={setActiveImage}
            />
          ))}
        </div>

        {/* Ending Section */}

      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.img
              src={activeImage}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}