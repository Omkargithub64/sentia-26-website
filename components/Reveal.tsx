'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

interface Track {
  id: string
  title: string
  album: string
  duration: string
  popularity: number
  albumArt: string | null
  spotifyUrl: string | null
}

interface Artist {
  name: string
  image: string | null
  followers: number
  genres: string[]
  spotifyUrl: string | null
}

interface SpotifyData {
  artist: Artist
  tracks: Track[]
}

interface RevealProps {
  spotifyData?: SpotifyData | null
}

const ARTIST_ID = '19LIHDDSHBD5NyYHI3gpzB'

const fallbackData: SpotifyData = {
  artist: {
    name: 'Shilpa Rao',
    image: '/images/2.webp',
    followers: 4100000,
    genres: ['bollywood'],
    spotifyUrl: `https://open.spotify.com/artist/${ARTIST_ID}`,
  },
  tracks: [
    { id: '1', title: 'Khuda Jaane', album: 'Bachna Ae Haseeno', duration: '5:33', popularity: 88, albumArt: null, spotifyUrl: null },
    { id: '2', title: 'Chaleya', album: 'Jawan', duration: '3:20', popularity: 85, albumArt: null, spotifyUrl: null },
    { id: '3', title: 'Tumhare Hi Rahenge Hum', album: 'Stree 2', duration: '3:50', popularity: 82, albumArt: null, spotifyUrl: null },
    { id: '4', title: 'Kalank - Duet', album: 'Kalank', duration: '5:11', popularity: 79, albumArt: null, spotifyUrl: null },
    { id: '5', title: 'Subhanallah', album: 'Yeh Jawaani Hai Deewani', duration: '4:09', popularity: 76, albumArt: null, spotifyUrl: null },
    { id: '6', title: 'Chuttamalle', album: 'Devara Part 1', duration: '3:42', popularity: 74, albumArt: null, spotifyUrl: null },
  ],
}

export default function Reveal({ spotifyData }: RevealProps) {
  const data = spotifyData ?? fallbackData
  const { artist, tracks } = data

  // Default: show the artist embed. When a track is clicked, switch to track embed.
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

  const handleTrackClick = (id: string) => {
    // Toggle off if clicking the same track
    setSelectedTrackId(prev => (prev === id ? null : id))
  }

  // Build the embed URI: track if selected, otherwise artist
  const embedUri = selectedTrackId
    ? `https://open.spotify.com/embed/track/${selectedTrackId}?utm_source=generator&theme=0`
    : `https://open.spotify.com/embed/artist/${ARTIST_ID}?utm_source=generator&theme=0`

  return (
    <section className="py-16 md:py-24 flex flex-col items-center overflow-hidden">

  <div className="w-[96%] max-w-[1400px] mx-auto">

    <div className="rounded-[2rem] md:rounded-[2rem] p-6 md:p-6 relative overflow-hidden backdrop-blur-xl border border-blue-200">

      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/shilparao.webp"
          alt=""
          className="w-full h-full object-cover blur-3xl scale-110 opacity-60"
        />
      </div>

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-zinc-500 uppercase block mb-2">
            The Main Event
          </span>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-[0.9]">
            Celebrity Nite
          </h2>
        </div>

        <div className="md:max-w-sm">
          <p className="text-zinc-600 text-sm leading-relaxed md:text-right">
            An unforgettable night of live music featuring Bollywood's most
            celebrated voices. Listen to the biggest hits before the big night.
          </p>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Spotify */}
        <div className="lg:col-span-5 flex">

          <div className="rounded-2xl overflow-hidden shadow-md border border-zinc-200 w-full">

            <iframe
              key={embedUri}
              src={embedUri}
              width="100%"
              height={selectedTrackId ? 152 : 352}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full"
            />

          </div>

        </div>

        {/* Artist Image */}
        <div className="lg:col-span-7 overflow-hidden  relative min-h-[352px]">

          {/* Desktop */}
          <img
            src="/images/2.webp"
            alt={artist.name}
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-top md:rounded-[1rem]"
          />

          {/* Mobile vertical */}
          <img
            src="/images/shilparao.webp"
            alt={artist.name}
            className="block md:hidden w-full object-contain object-top"
          />

          

        </div>

      </div>

    </div>

  </div>

</section>
  )
}
