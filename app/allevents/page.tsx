"use client"

import { useState, useEffect } from "react"
import { events } from "@/lib/eventsData"
import EventCard from "@/components/eventCard/EventCard"
import { Filter } from "lucide-react"

export default function AllEventsPage(){

  const [search,setSearch] = useState("")
  const [openFilter,setOpenFilter] = useState(false)
  const [searchTop, setSearchTop] = useState(90) // navbar height

  const categories = [
    "Razzle (Dance Events)",
    "Chords (Musical Events)",
    "Captcha & Pixel",
    "Mask (Theatre Events)",
    "Speakers & Literally",
    "Pallet (Art events)",
    "Technical Events",
    "MCA Events",
    "MBA Events",
    "General"
  ]

  useEffect(() => {
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 80) {
      // scrolling down → navbar hidden
      setSearchTop(10)
    } else {
      // scrolling up → navbar visible
      setSearchTop(10)
    }

    lastScroll = currentScroll
  }

  window.addEventListener("scroll", handleScroll)

  return () => window.removeEventListener("scroll", handleScroll)
}, [])

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  )

  function scrollToCategory(category:string){

    const id = category.replace(/\s+/g,"-")

    const element = document.getElementById(id)

    if(element){
      element.scrollIntoView({ behavior:"smooth", block:"start" })
    }

    setOpenFilter(false)
  }

  return(

    <main className="py-24 px-6">

      <div className="max-w-[1400px] mx-auto ">

        {/* Header */}
        <div className="text-center space-y-2">

          <h1 className="text-5xl font-bold">
            All Events
          </h1>

          <p className="text-slate-500">
            Explore the full lineup of competitions.
          </p>

        </div>


        {/* Controls */}
        <div
  className="sticky z-40 py-5 transition-all duration-300"
  style={{ top: `${searchTop}px` }}
>
<div className="max-w-[1400px] mx-auto flex items-center justify-center gap-3 mt-0 md:mt-10">

  {/* Search */}
  <div className="relative w-full md:w-[420px]">
    <input
      type="text"
      placeholder="Search events"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="w-full px-6 py-3 rounded-full border border-zinc-200 bg-white shadow-sm 
      focus:outline-none focus:border-zinc-300 focus:ring-2 focus:ring-black/10
      transition-all duration-200"
    />
  </div>

  {/* Filter Button */}
  <button
    onClick={()=>setOpenFilter(true)}
    className="w-11 h-11 flex items-center justify-center rounded-full 
    border border-zinc-200 bg-white shadow-sm
    hover:bg-zinc-50 transition"
  >
    <Filter size={18} className="text-zinc-700" />
  </button>

</div>
<br />
<br />
</div>

        {/* Category Sections */}
        <div className="space-y-24">

          {categories.map(category=>{

            const categoryEvents = filteredEvents.filter(
              e => e.category === category
            )

            if(categoryEvents.length === 0) return null

            const sectionId = category.replace(/\s+/g,"-")

            return(

              <section
                key={category}
                id={sectionId}
                className="space-y-10 scroll-mt-32 "
              >

                <div className="flex items-center gap-6">

                  <h2 className="text-3xl font-semibold">
                    {category}
                  </h2>

                  <div className="h-px flex-1 bg-black"></div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">

                  {categoryEvents.map((event,index)=>(
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                    />
                  ))}

                </div>

              </section>

            )

          })}

        </div>

      </div>


      {/* FILTER POPUP */}
      {openFilter && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md space-y-6">

            <h3 className="text-xl font-bold text-center">
              Select Category
            </h3>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">

              {categories.map(category=>(
                <button
                  key={category}
                  onClick={()=>scrollToCategory(category)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 transition"
                >
                  {category}
                </button>
              ))}

            </div>

            <button
              onClick={()=>setOpenFilter(false)}
              className="w-full py-3 rounded-full bg-zinc-100 hover:bg-zinc-200"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </main>
  )
}