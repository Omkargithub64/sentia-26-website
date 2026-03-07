import Link from "next/link"
import { events } from "@/lib/eventsData"
import styles from "./MainEventsSection.module.css"
import EventsPreview from "@/components/eventspreview/EventsPreview"

export default function MainEventsSection(){

 const mainEvents = events.filter(e => e.main)

 return(

    <>

  <section className={styles.section}>

    <div className="max-w-2xl mb-10 md:mb-14">

  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 leading-tight mb-4">
    Spotlight Competitions
  </h2>

  <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
    From thunderous rhythms to striking runway moments, these spotlight
    competitions unleash talent that rivals the power of the sea.
  </p>

</div>
    <div className={styles.posterGrid}>

      {mainEvents.map(event => (
          
          <div
          key={event.id}
          className={styles.posterCard}
          >

          <img
            src={event.image}
            alt={event.title}
            />

        </div>

))}

    </div>

  </section>
  <EventsPreview />
</>

 )
}