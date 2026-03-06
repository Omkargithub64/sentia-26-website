"use client"

import { useState } from "react"
import { events } from "@/lib/eventsData"
import EventCard from "@/components/eventCard/EventCard"
import Link from "next/link"

export default function EventsPreview(){

  const INITIAL_COUNT = 8

  const [visibleCount,setVisibleCount] = useState(INITIAL_COUNT)

  const visibleEvents = events.slice(0,visibleCount)

  return(

    <section className="py-20 px-5">

      <div className="max-w-[1400px] mx-auto">

 <div className="max-w-2xl mb-10 md:mb-14">

  <span className="text-[11px] font-bold tracking-[0.25em] text-zinc-500 uppercase block mb-2">
    Explore
  </span>

  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 leading-tight mb-4">
    Event Lineup
  </h2>

  <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
    Step into the arena of creativity, skill, and performance as the playground
    of Poseidon comes alive with unforgettable events.
  </p>

</div>
        {/* Horizontal Scroll Container */}
        <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible pb-4 scroll-smooth pl-3 lg:pl-0">

          {visibleEvents.map((event,index)=>(
            <div
              key={event.id}
              className="min-w-[280px] lg:min-w-0 flex-shrink-0"
            >
              <EventCard event={event} index={index}/>
            </div>
          ))}

        </div>

        {/* View More Button */}
        {visibleCount < events.length && (

          <div className="flex justify-center mt-10">

  <Link
    href="/allevents"
    className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-zinc-800 transition text-center"
  >
    View All Events
  </Link>

          </div>

        )}

      </div>

    </section>

  )
}