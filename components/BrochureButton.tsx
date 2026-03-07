'use client'

import styles from "./BrochureButton.module.css"

export default function BrochureButton() {
  return (
    <a
      href="/brochure.pdf"
      download
      className={styles.floatingBtn}
    >
      Download Brochure
    </a>
  )
}