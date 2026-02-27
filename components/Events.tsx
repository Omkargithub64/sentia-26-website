'use client'

import { useState } from 'react'
import { Calendar, Music, Code, Gamepad, Award, Shield, Mic, Camera, Video, Palette, Zap, Cpu, Users, DollarSign, Briefcase, Aperture, Terminal, Shirt, BookOpen, Radio } from 'lucide-react'

import Link from 'next/link'
import { events } from '@/lib/eventsData'

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<'UG' | 'PG'>('UG')
  
  const filteredEvents = events.filter(event => event.category === activeCategory)

  return (
    <section className="py-24 bg-white text-slate-900 md:px-8 relative overflow-hidden">
       
      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        {/* Header Section */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
                 <span className="text-blue-600 font-mono tracking-widest text-sm uppercase block mb-3">
                    Compete & Create
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900">
                  Flagship Events
                </h2>
            </div>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
                <div className="grid grid-cols-2 bg-slate-100 rounded-full p-1 border border-slate-200 shadow-sm">
                    <button 
                        onClick={() => setActiveCategory('UG')}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${activeCategory === 'UG' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        UG
                    </button>
                    <button 
                        onClick={() => setActiveCategory('PG')}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${activeCategory === 'PG' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        PG
                    </button>
                </div>
            </div>
         </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event, i) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="group flex flex-col gap-3 p-3 rounded-[2rem] bg-zinc-50 border border-black/5"
            >
               {/* 1. Image Section */}
                <div className="w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden relative">
                     <img 
                         src={event.image} 
                         alt={event.title}
                         className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 " />
                     {/* Category Tag */}
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm">
                        {event.category}
                     </div>
                </div>

               {/* 2. Number & Title Section */}
               <div className="flex flex-col gap-1 mt-1">
                    <div className="flex items-baseline gap-2">
                        <span className="font-mono text-blue-600 text-xs font-bold tracking-widest">0{i + 1}</span>
                        <h3 className="text-lg font-bold tracking-tight text-slate-900 transition-colors">
                            {event.title}
                        </h3>
                    </div>
                    <p className="text-slate-500 text-xs pl-6 line-clamp-2 leading-relaxed">{event.description}</p>
               </div>

               {/* 3. Button Section */}
               <div className="mt-auto px-1 pb-1">
                   <div className="w-full py-3.5 rounded-[1.2rem] bg-black text-white hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">View Event</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300 text-xs">→</span>
                   </div>
               </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
