import Hero from '@/components/Hero'
import ThemeReveal from '@/components/ThemeReveal'
import Reveal from '@/components/Reveal'
import Events from '@/components/Events'
import About from '@/components/About'
import Footer from '@/components/Footer'
import { getArtist, getArtistTopTracks } from '@/lib/spotify'


const ARTIST_ID = '19LIHDDSHBD5NyYHI3gpzB' // Shilpa Rao

function msToTime(duration: number) {
  const minutes = Math.floor(duration / 60000)
  const seconds = Math.floor((duration % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

async function getSpotifyData() {
  try {
    const [artist, tracksData] = await Promise.all([
      getArtist(ARTIST_ID),
      getArtistTopTracks(ARTIST_ID),
    ])

    const tracks = tracksData.tracks?.slice(0, 6).map((t: any) => ({
      id: t.id,
      title: t.name,
      album: t.album.name,
      duration: msToTime(t.duration_ms),
      popularity: t.popularity,
      albumArt: t.album.images?.[0]?.url ?? null,
      spotifyUrl: t.external_urls?.spotify ?? null,
    }))

    return {
      artist: {
        name: artist.name,
        image: artist.images?.[0]?.url ?? null,
        followers: artist.followers?.total ?? 0,
        genres: artist.genres ?? [],
        spotifyUrl: artist.external_urls?.spotify ?? null,
      },
      tracks: tracks ?? [],
    }
  } catch (e) {
    console.error('Failed to fetch Spotify data', e)
    return null
  }
}

export default async function Home() {
  const spotifyData = await getSpotifyData()

  return (

  <div className="bg-white text-black">
    <Hero />
    <ThemeReveal />
    <Reveal spotifyData={spotifyData} />
    <div id="events">
      <Events />
    </div>
    <About />
    <Footer />
  </div>

  )
}

