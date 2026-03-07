import Link from "next/link"
import { events } from "@/lib/eventsData"
import { notFound } from "next/navigation"
import styles from "./EventPage.module.css"


export function generateStaticParams() {
  return events.map((event) => ({
    id: String(event.id),
  }))
}



export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const event = events.find(e => String(e.id) === id)

  if (!event) notFound()

  const rules: string[] =
    typeof event.rules === "string"
      ? event.rules.split("\n").map((r: string) => r.trim()).filter(Boolean)
      : Array.isArray(event.rules)
      ? event.rules
      : []

  return (
    <main className={styles.pageBackground} style={{ 
        backgroundImage: `url('${event.image}')`,
        "--boxColor": `#${event.color}`,
        "--gradientColor": `#${event.border}`
      } as React.CSSProperties}>
      <div className={styles.bgOverlay}></div>

      

      <div className={styles.mainLayout}>

                <div className={`${styles.infoFooter} ${styles.desktopTitle}`}>

          <div className={styles.chip}>
            TIME: {event.time}
          </div>

          <div className={styles.chip}>
            DATE: {event.date}
          </div>

          <div className={styles.chip}>
            VENUE: {event.venue}
          </div>
              <Link
      href={`/map?region=${event.regionId}`}
      className={styles.locButton}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className={styles.locIcon}
        >
        <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
      </svg>
    </Link>

        </div>

        {/* Mobile Title */}
        <h2 className={styles.mobileMainTitle}>
          {event.title}
        </h2>

        {/* Glass Card */}
        <div className={styles.glassCard}>

          <h2 className={styles.desktopTitle}>
            {event.title}
          </h2>

          <ul className={styles.rulesList}>

            <h3 className={styles.mobileTitle}>
              Event Details
            </h3>
<div className={`${styles.infoFooter} ${styles.mobileTitle}`}>
  <div className={styles.chip}>
    TIME: {event.time}
  </div>

  <div className={styles.chip}>
    DATE: {event.date}
  </div>

<div className={styles.chip2}>

  <div className={styles.chip}>
    VENUE: {event.venue}


  </div>
    <Link
      href={`/map?region=${event.regionId}`}
      className={styles.locButton}
    >
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
            

            <div className={styles.line}></div>


  {(() => {
    if (!event.rules) {
      return (
        <p className="text-white italic">
          No specific rules listed.
        </p>
      );
    }

    // 🔹 Normalize rules into string[]
    const lines: string[] =
      typeof event.rules === "string"
        ? event.rules
            .split("\n")
            .map((l: string) => l.trim())
            .filter(Boolean)
        : Array.isArray(event.rules)
        ? event.rules
        : [];

    if (lines.length === 0) {
      return (
        <p className="text-white italic">
          No specific rules listed.
        </p>
      );
    }

    const hasHeadings = lines.some((line: string) =>
      line.endsWith(":")
    );

    // 🟢 Simple Bullet List (No Headings)
    if (!hasHeadings) {
      return (
        <ul className="space-y-3">
          {lines.map((line: string, idx: number) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-white"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      );
    }

    // 🟣 Structured Sections
    type Section = {
      title: string | null;
      items: string[];
    };

    const sections: Section[] = [];
    let currentSection: Section | null = null;

    lines.forEach((line: string) => {
      if (line.endsWith(":")) {
        currentSection = { title: line, items: [] };
        sections.push(currentSection);
      } else {
        if (!currentSection) {
          currentSection = { title: null, items: [] };
          sections.push(currentSection);
        }
        currentSection.items.push(line);
      }
    });

    return sections.map((section: Section, idx: number) => (
      <div key={idx} className="space-y-3">
        {section.title && (
          <h3 className="text-sm font-bold text-white uppercase tracking-wide md:mt-8">
            {section.title}
          </h3>
        )}

        <ul className="space-y-2">
          {section.items.map((item: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-white"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ));
  })()}


            <div className={styles.line}></div>

<div>
  <h3 className="text-lg font-semibold mb-0 text-white">Coordinators</h3>

  <span className="whitespace-pre-line text-sm text-white">
    {event.contacts}
  </span>
</div>
          </ul>

          <Link
            href={event.registerLink || "#"}
            target="_blank"
          >
            <button className={styles.registerBtn}>
              Register for this Event
            </button>
          </Link>

        </div>

        {/* Floating Character Image */}
        <div className={styles.imageContainer}>
          <img
            src={event.image}
            alt={event.title}
            className={styles.floatingImg}
          />
        </div>

        {/* Footer Info Chips */}

      </div>

    </main>
  )
}