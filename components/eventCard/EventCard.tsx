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
  index: number
  regionId?: string
}

export default function EventCard({ event }: { event: Event, index: number }) {

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
    <div
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

          <div className={styles.one}>

<Link href={`/events/${event.id}`} className={styles.viewLink}>
  <div className={styles.button}>
    View Details
  </div>
</Link>

<Link href={`/map?region=${event.regionId}`} className={styles.locButton}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className={styles.locIcon}
  >
    <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
  </svg>
</Link>


</div>
      </div>

      </div>

    </div>
  )
}