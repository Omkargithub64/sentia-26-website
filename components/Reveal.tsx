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
    image: '/images/2.jpeg',
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
    <section className="bg-white py-10 md:py-16 flex flex-col items-center overflow-hidden ">
      <div className="w-[96%] max-w-[1400px] mx-auto">

        {/* Outer dark container */}
        <div className="bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 relative overflow-hidden">

          {/* Header */}
          <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-black uppercase block mb-2">
                The Main Event
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black leading-[0.9]">
                Celebrity Nite
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 md:max-w-xs">
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed text-left md:text-right">
                An unforgettable night of live music featuring Bollywood&apos;s most celebrated voices. Get a taste of what&apos;s coming — listen to her biggest hits before the big night.
              </p>
              {/* <a
                href={artist.spotifyUrl ?? `https://open.spotify.com/artist/${ARTIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954] text-black text-xs font-bold hover:bg-[#1ed760] transition-colors shrink-0"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Open on Spotify
              </a> */}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">

            {/* LEFT: Single Spotify Embed Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">

              {/* The Spotify Embed — this IS the card */}
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  key={embedUri}
                  src={embedUri}
                  width="100%"
                  height={selectedTrackId ? 152 : 352}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block transition-all duration-500"
                  style={{ borderRadius: '16px' }}
                />
              </div>
            </div>

            {/* RIGHT: Artist Photo */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 relative min-h-[320px]">
              <img
                src="/images/2.jpg"
                alt={artist.name}
                className="w-full h-full object-cover object-top absolute inset-0"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
