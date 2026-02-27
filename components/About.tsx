'use client'

import { useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils' // Assuming you have a utils file, or I'll inline the class logic if not available, but standard practice. I will inline safely.

// Mock Data with Categories
const allImages = [
  { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop", category: 'UG' },
  { src: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=1964&auto=format&fit=crop", category: 'UG' },
  { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop", category: 'PG' },
  { src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop", category: 'UG' },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop", category: 'PG' }, 
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", category: 'UG' },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop", category: 'PG' },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop", category: 'UG' },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop", category: 'PG' },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop", category: 'UG' },
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
    <section className="bg-white py-4 flex justify-center">
       <div className="w-[98%] max-w-[1800px] bg-zinc-100 rounded-[3rem] py-20 px-4 md:px-8 relative overflow-hidden border border-black/5">
            {/* Background Decorative */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#ffffff_0%,_transparent_50%)] pointer-events-none opacity-60" />

            <div className="relative z-10 flex flex-col items-center w-full">
                
                <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-4 items-start">
                    {/* Left Column */}
                    <div className="relative pl-2 md:pl-0">
                        <span className="font-mono text-[10px] md:text-xs text-zinc-400 absolute -top-6 left-2 md:left-0 tracking-widest">01 / OVERVIEW</span>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black leading-[0.9] uppercase">
                            3 Days.<br />
                            50+ Events.<br />
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
                                Every participant is a creator, endowed with potential waiting to be unleashed. Sentia is the canvas where physics, code, and culture collide—representing our foundational pillars of <span className="text-black underline decoration-1 underline-offset-4">Innovation</span>, <span className="text-black underline decoration-1 underline-offset-4">Inclusion</span>, and <span className="text-black underline decoration-1 underline-offset-4">Imagination</span>.
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
                                    className="w-full h-full object-cover rounded-2xl bg-white border border-white/20 block filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                                 />
                                 {/* Category Label (Optional, for visual confirmation) */}
                                 <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {img.category}
                                 </div>
                            </div>
                        )
                    })}
                </div>

            </div>
       </div>
    </section>
  )
}
