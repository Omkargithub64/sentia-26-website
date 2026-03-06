'use client'

import { useRef, useState, MouseEvent } from 'react'

const allImages = [
  { src: "/gallary/2015/1.webp", category: 'UG' },
  { src: "/gallary/2019/4.webp", category: 'UG' },
  { src: "/gallary/2022/5.webp", category: 'UG' },
  { src: "/gallary/2016/4.webp", category: 'UG' },
  { src: "/gallary/2014/3.webp", category: 'UG' },
  { src: "/gallary/2015/4.webp", category: 'UG' }, 
  { src: "/gallary/2023/6.webp", category: 'UG' },
  { src: "/gallary/2023/7.webp", category: 'UG' }
]

export default function About() {

  const scrollRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeCategory, setActiveCategory] = useState<'UG' | 'PG'>('UG')

  const filteredImages = allImages.filter(img => img.category === activeCategory)

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
    setScrollLeft(scrollRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <section className="flex justify-center">

      <div className="w-[96%] max-w-[1600px] rounded-[3rem] px-6 md:px-12 py-12 relative overflow-hidden">

        {/* subtle background gradient */}
        <div className="absolute  pointer-events-none"/>

        <div className="relative z-10 flex flex-col align-items-center items-start w-full">

          {/* Text Section */}
          <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-12">

            {/* Left */}
            <div>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[0.95]">
                3 Days.<br/>
                30+ Events.<br/>
                One Vision.
              </h3>

            </div>

            {/* Right */}
            <div className="flex flex-col gap-5 max-w-xl">

              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-zinc-900 rounded-sm"/>
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
                  The Essence
                </span>
              </div>

              <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
                Every participant is a creator, endowed with potential waiting
                to be unleashed. Sentia is the canvas where physics, code, and
                culture collide representing our pillars of
                <span className="text-blue-600 font-medium"> Innovation</span>,
                <span className="text-blue-600 font-medium"> Inclusion</span>,
                and
                <span className="text-blue-600 font-medium"> Imagination</span>.
              </p>

            </div>

          </div>

          {/* Gallery */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-center gap-6 w-full py-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >

            {filteredImages.map((img, i) => (

              <div
                key={i}
                className="relative flex-shrink-0 w-52 md:w-72 aspect-[4/5] rounded-2xl overflow-hidden shadow-md transition-all duration-500  group"
              >

                <img
                  src={img.src}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"/>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  )
}