'use client'

import Link from "next/link"
import styles from "./EventCard.module.css"
import Image from "next/image"

type Event = {
    id: string
    title: string
    description: string
    image: string
    category: string
    color: string
    border: string
}

export default function EventCard({ event, index }: { event: Event, index: number }) {
    function capitalizeWords(text:string){
  return text
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}
    return (
    <Link href={`/events/${event.id}`} className={styles.card} style={{
        "--boxColor": `#${event.color}`,
        "--gradientColor": `#${event.border}`
      } as React.CSSProperties}
      >

      <div className={styles.inner}>

        {/* Top Image Container */}
        <div className={styles.imageBox}>
        </div>

        {/* Character Image */}
        <div className={styles.character}>
          <Image
            src={event.image}
            alt="character"
            fill
            className={styles.characterImg}
          />
        </div>

        {/* Bottom Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>
  {capitalizeWords(event.title)}
</h3>

          <div className={styles.button}>
            View Details
          </div>
        </div>

      </div>

    </Link>
  )
}