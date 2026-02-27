
import React from 'react'
import Link from 'next/link'
import { events } from '@/lib/eventsData'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Users, Calendar, Trophy, AlertCircle, ExternalLink } from 'lucide-react'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventPage({ params }: PageProps) {
  const resolvedParams = await params
  const eventId = parseInt(resolvedParams.id)
  const event = events.find(e => e.id === eventId)

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Navbar / Back Button */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <Link 
            href="/#events" 
            className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 group"
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* 2. Hero Header Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden bg-zinc-900">
         <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
         />
         {/* Minimal overlay for back button contrast if needed, but keeping it clean as requested */}
         <div className="absolute inset-0 bg-black/10" /> 
      </section>

      {/* 2b. Title & Description & Meta (Minimal Spacing) */}
      <div className="max-w-3xl mx-auto px-4 md:px-0 pt-2 pb-2 text-left flex flex-col items-start w-full">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-[0.1em] uppercase mb-3 border border-blue-100">
                {event.category} Event
            </span>
            <h1 className="w-full text-left text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-2 leading-none">
                {event.title}
            </h1>
            <p className="w-full text-left text-base md:text-lg text-slate-500 font-medium leading-relaxed mb-4">
                {event.description}
            </p>

            {/* Event Meta Data Row */}
            <div className="flex flex-wrap justify-start gap-5 md:gap-8 text-xs md:text-sm font-medium text-slate-500 mb-4 w-full">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-900" />
                    <span>March 15, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-900" />
                    <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-900" />
                    <span>Open to All</span>
                </div>
            </div>
            
            <div className="w-full h-px bg-slate-100 mb-8" />
      </div>

      {/* 3. Main Content (Refined Spacing) */}
      <section className="px-4 md:px-0 pb-24">
         <div className="max-w-3xl mx-auto space-y-10 text-left">
            
            {/* About */}
            <div className="space-y-3">
                 <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-slate-900" />
                    About the Event
                 </h2>
                 <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal text-justify md:text-left">
                    Prepare yourself for an exhilarating experience as you compete against the best. 
                    Showcase your skills, push your limits, and claim your glory at {event.title}. 
                    This event is designed to test your abilities in the most creative and challenging ways possible.
                 </p>
            </div>

            {/* Rules */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-slate-900" />
                    Rules & Regulations
                </h2>
                <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-100">
                    <ul className="space-y-2">
                        {event.rules?.map((rule: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-slate-900 mt-0.5 shadow-sm">
                                    {idx + 1}
                                </span>
                                <span className="flex-1 leading-relaxed">{rule}</span>
                            </li>
                        )) || (
                            <p className="text-slate-500 italic">No specific rules listed.</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Coordinator & Action */}
            <div className="pt-6 border-t border-slate-100 flex flex-col items-start gap-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Event Coordinator</p>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                        <p className="text-base font-bold text-slate-900">
                            Sanath Kumar
                        </p>
                        <p className="text-slate-500 font-mono text-xs">
                            +91 98765 43210
                        </p>
                    </div>
                </div>

                <Link 
                    href={event.registerLink || '#'} 
                    target="_blank"
                    className="w-full md:w-auto"
                >
                    <button className="w-full md:w-auto px-6 py-3.5 rounded-lg bg-black text-white font-bold text-base hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group">
                        Register Now
                        <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
         </div>
      </section>
    </main>
  )
}
