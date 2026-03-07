'use client'

import styles from './styles.module.scss'
import Picture1 from '../public/images/reveal/1.webp'
import Picture3 from '../public/images/reveal/3.jpg'
import Picture2 from '../public/images/reveal/2.jpg'
import Picture4 from '../public/images/reveal/4.jpg'
// import Picture4 from '../public/images/4.jpg'
// import Picture5 from '../public/images/5.jpg'
// import Picture6 from '../public/images/6.jpg'
// import Picture7 from '../public/images/7.jpeg'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function ThemeReveal() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const opacityText = useTransform(scrollYProgress, [0.25,0.55], [0,1])

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const pictures = [
    { src: Picture4, scale: scale4 },
    { src: Picture2, scale: scale5 },
    { src: Picture3, scale: scale6 },
    { src: Picture1, scale: scale5 },
    { src: Picture2, scale: scale6 },
    { src: Picture3, scale: scale8 },
    { src: Picture3, scale: scale9 },
  ]

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => (
          <motion.div key={index} style={{ scale }} className={styles.el}>
            <div className={styles.imageContainer}>
              <Image src={src} fill alt="image" placeholder="blur" />
            </div>
          </motion.div>
        ))}
                <motion.div
          style={{ opacity: opacityText }}
          className={styles.themeText}
        >
          <h2>THEME REVEAL</h2>
          <h1>POSEIDON'S PLAYGROUND</h1>
          <p>
            Dive into Poseidon’s Playground, a realm where the untamed power of the ocean meets boundless creativity. Inspired by the myths of the sea, this year’s fest celebrates waves of talent, energy, and imagination.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
