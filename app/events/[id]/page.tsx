import Link from "next/link"
import { events } from "@/lib/eventsData"
import { notFound } from "next/navigation"
import styles from "./EventPage.module.css"

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
      ? event.rules.split("\n").map(r => r.trim()).filter(Boolean)
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

              <div className={styles.chip}>
                VENUE: {event.venue}
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
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
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

            <div className={styles.mobileTitle}>
              <h3>Coordinators</h3>

              <span>{event.eventcoordinator1}</span>
              <br />

              <span>{event.eventcoordinator2}</span>
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

        </div>

        {/* Organizer Info */}
        <div className={styles.organizerInfo}>
          <p>Event Coordinators</p>

          <span>{event.eventcoordinator1}</span>
          <br />

          <span>{event.eventcoordinator2}</span>
        </div>

      </div>

    </main>
  )
}