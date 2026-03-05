import Link from "next/link"
import { events } from "@/lib/eventsData"
import styles from "./MainEventsSection.module.css"
import EventsPreview from "@/components/eventspreview/EventsPreview"

export default function MainEventsSection(){

 const mainEvents = events.filter(e => e.main)

 return(

    <>

  <section className={styles.section}>

    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black leading-[0.9]">
      Spotlight Competitions
    </h2>
    <br />
    <p className="text-gray-600 text-xs md:text-sm leading-relaxed text-left md:text-right pb-8">
      From thunderous rhythms to striking runway moments, these spotlight competitions unleash talent that rivals the power of the sea.
    </p>

    <div className={styles.posterGrid}>

      {mainEvents.map(event => (
          
          <Link
          key={event.id}
          href={`/events/${event.id}`}
          className={styles.posterCard}
          >

          <img
            src={event.image}
            alt={event.title}
            />

          <div className={styles.overlay}>
            <h3>{event.title}</h3>
          </div>

        </Link>

))}

    </div>

  </section>
  <EventsPreview />
</>

 )
}