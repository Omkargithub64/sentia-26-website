'use client'

import { useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils' // Assuming you have a utils file, or I'll inline the class logic if not available, but standard practice. I will inline safely.

// Mock Data with Categories
const allImages = [
  { src: "/gallary/2015/1.webp", category: 'UG' },
  { src: "/gallary/2019/4.webp", category: 'UG' },
  { src: "/gallary/2022/5.webp", category: 'UG' },
  { src: "/gallary/2016/4.webp", category: 'UG' },
  { src: "/gallary/2014/3.webp", category: 'UG' },
  { src: "/gallary/2015/4.webp", category: 'UG' }, 
  { src: "/gallary/2023/6.webp", category: 'UG' },
  { src: "/gallary/2023/7.webp", category: 'UG' },
  { src: "/gallary/2022/1.webp", category: 'UG' },
  { src: "/gallary/2016/2.webp", category: 'UG' },
  { src: "/gallary/2022/3.webp", category: 'UG' },
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

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5 
    if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }
  
  const toggleCategory = (category: 'UG' | 'PG') => {
      setActiveCategory(category)
      // Reset scroll position when changing category
      if(scrollRef.current) {
          scrollRef.current.scrollLeft = 0
      }
  }

  return (
    <section className="py-4 flex justify-center">
       <div className="w-[98%] max-w-[1800px] rounded-[3rem] py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60" />

            <div className="relative z-10 flex flex-col items-center w-full">
                
                <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-4 items-start">
                    {/* Left Column */}
                    <div className="relative pl-2 md:pl-0">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black leading-[0.9] uppercase">
                            3 Days.<br />
                            30+ Events.<br />
                            One Vision.
                        </h3>
                    </div>

                    {/* Right Column */}
                    <div className="pt-2 md:pt-4 flex flex-col justify-between h-full pl-2 md:pl-0">
                         <div className="flex flex-col gap-4">
                             <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-black rounded-sm" />
                                <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black">The Essence</span>
                             </div>
                             <p className="text-base md:text-lg font-medium text-black/60 leading-relaxed max-w-xl text-balance">
                                Every participant is a creator, endowed with potential waiting to be unleashed. Sentia is the canvas where physics, code, and culture collide—representing our foundational pillars of <span className="text-blue-500 underline decoration-1 underline-offset-4">Innovation</span>, <span className="text-blue-500 underline decoration-1 underline-offset-4">Inclusion</span>, and <span className="text-blue-500 underline decoration-1 underline-offset-4">Imagination</span>.
                             </p>
                        </div>
                    </div>
                </div>

                
                {/* Horizontal Scroll Image Strip */}
                <div 
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex items-center gap-4 w-full py-8 overflow-x-auto cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {filteredImages.map((img, i) => {
                        return (
                            <div 
                                key={i} 
                                className="relative flex-shrink-0 transition-transform duration-500 ease-out hover:scale-[1.02] w-48 md:w-64 aspect-square rounded-2xl shadow-sm hover:shadow-xl group"
                            >
                                 <img 
                                    src={img.src} 
                                    alt={`Gallery image ${i + 1}`} 
                                    className="w-full h-full object-cover rounded-2xl border border-white/20 block filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                                 />
                                 {/* Category Label (Optional, for visual confirmation)
                                 <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {img.category}
                                 </div> */}
                            </div>
                        )
                    })}
                </div>

            </div>
       </div>
    </section>
  )
}
