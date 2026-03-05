'use client'

import { useState } from 'react'
import { Calendar, Music, Code, Gamepad, Award, Shield, Mic, Camera, Video, Palette, Zap, Cpu, Users, DollarSign, Briefcase, Aperture, Terminal, Shirt, BookOpen, Radio } from 'lucide-react'

import Link from 'next/link'
import { events } from '@/lib/eventsData'
import EventCard from "@/components/eventCard/EventCard"

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<'General'|'UG' | 'PG'>('General')
  
  const filteredEvents = events.filter(event => event.category === activeCategory)

  return (
    <section className="py-24 text-slate-900 md:px-8 relative overflow-hidden p-5">
       
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
            <div className="flex items-center gap-3 mb-3 md:mb-0">
                <div className="grid grid-cols-3 bg-slate-100 rounded-full p-1 border border-slate-200 shadow-sm">
                    <button 
                        onClick={() => setActiveCategory('General')}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${activeCategory === 'General' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        General
                    </button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredEvents.map((event, i) => (
            // <Link
            //   href={`/events/${event.id}`}
            //   key={event.id}
            //   className="group flex flex-col gap-3 p-3 rounded-[2rem] bg-zinc-50 border border-black/5"
            // >
                <EventCard
            key={event.id}
            event={event}
            index={i}
          />

          ))}
        </div>
      </div>
    </section>
  )
}
