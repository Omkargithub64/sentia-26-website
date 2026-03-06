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
  type: string
  location?: string
}

export default function EventCard({ event }: { event: Event }) {

  function capitalizeWords(text: string) {
    return text
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())
  }

  const tagColors: Record<string, string> = {
    "Open to All": "#ffc400",
    "Under Graduate": "#00e1ff",
    "MBA": "#3d8bff",
    "MCA": "#a179ff"
  }

  return (
    <Link
      href={`/events/${event.id}`}
      className={styles.card}
      style={{
        "--boxColor": `#${event.color}`,
        "--gradientColor": `#${event.border}`
      } as React.CSSProperties}
    >

      <div className={styles.inner}>

        <div className={styles.imageBox}></div>

        <div className={styles.character}>
          <Image
            src={event.image}
            alt="character"
            fill
            className={styles.characterImg}
          />
        </div>

        <div className={styles.content}>

          {/* Tag + Location Row */}
          <div className={styles.metaRow}>
            <span
              className={styles.tag}
              style={{ background: tagColors[event.type] }}
            >
              {event.type}
            </span>
          </div>

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