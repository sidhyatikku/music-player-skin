// Comprehensive Spotify + YouTube data fetcher
// Fetches ALL albums and ALL songs for every artist

const SPOTIFY_CLIENT_ID = "4aeae79857934672bbac8f04dc5682a0"
const SPOTIFY_CLIENT_SECRET = "50351c26b2a8457fb1a7fb1b32d1c08a"
const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"

// All artists from the music library
const ARTISTS = [
  "AC/DC",
  "Alabama",
  "America",
  "AR Rahman",
  "Black Sabbath",
  "Charles Mingus",
  "Creed",
  "Creedence Clearwater Revival",
  "Dave Brubeck Quartet",
  "Dream Theater",
  "Elvis Presley",
  "Eric Clapton",
  "Etta James",
  "Frank Sinatra",
  "Green Day",
  "Guns N' Roses",
  "Hans Zimmer",
  "Hank Williams",
  "Hoobastank",
  "Iron Maiden",
  "J Dilla",
  "John Coltrane",
  "John Denver",
  "John Mayer",
  "Johnny Cash",
  "Jungle",
  "Korn",
  "Led Zeppelin",
  "Linkin Park",
  "Lou Reed",
  "Lynyrd Skynyrd",
  "M83",
  "Metallica",
  "Miles Davis",
  "Nina Simone",
  "Nujabes",
  "Oasis",
  "Ozzy Osbourne",
  "Patsy Cline",
  "Pink Floyd",
  "Rage Against the Machine",
  "Red Hot Chili Peppers",
  "Sithu Aye",
  "Skrillex",
  "Slowdive",
  "Staind",
  "Swedish House Mafia",
  "System of a Down",
  "Tame Impala",
  "The Beatles",
  "Tom Petty",
  "Tool",
  "U2",
]

// Helper function to delay between API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Get Spotify access token
async function getSpotifyToken() {
  const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

// Search for artist on Spotify
async function searchArtist(artistName, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const data = await response.json()
  return data.artists?.items[0] || null
}

// Get ALL albums for an artist (with pagination)
async function getAllAlbums(artistId, token) {
  let allAlbums = []
  let offset = 0
  const limit = 50
  let hasMore = true

  while (hasMore) {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single,compilation&market=US&limit=${limit}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    const data = await response.json()
    allAlbums = allAlbums.concat(data.items || [])

    hasMore = data.items && data.items.length === limit
    offset += limit

    if (hasMore) {
      await delay(100) // Rate limiting
    }
  }

  return allAlbums
}

// Get ALL tracks for an album (with pagination)
async function getAllTracks(albumId, token) {
  let allTracks = []
  let offset = 0
  const limit = 50
  let hasMore = true

  while (hasMore) {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    const data = await response.json()
    allTracks = allTracks.concat(data.items || [])

    hasMore = data.items && data.items.length === limit
    offset += limit

    if (hasMore) {
      await delay(100) // Rate limiting
    }
  }

  return allTracks
}

// Search YouTube for a song
async function searchYouTube(artistName, songTitle) {
  try {
    const query = encodeURIComponent(`${artistName} ${songTitle} official audio`)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&maxResults=1&key=${YOUTUBE_API_KEY}`,
    )

    const data = await response.json()
    return data.items?.[0]?.id?.videoId || "placeholder"
  } catch (error) {
    console.log(`[v0] YouTube search failed for ${songTitle}: ${error.message}`)
    return "placeholder"
  }
}

// Main function
async function fetchAllMusicData() {
  console.log("[v0] Starting comprehensive music data fetch...")
  console.log(`[v0] Processing ${ARTISTS.length} artists`)

  const token = await getSpotifyToken()
  console.log("[v0] Spotify authentication successful")

  const musicLibrary = []

  for (let i = 0; i < ARTISTS.length; i++) {
    const artistName = ARTISTS[i]
    console.log(`\n[v0] [${i + 1}/${ARTISTS.length}] Processing: ${artistName}`)

    try {
      // Search for artist
      const artist = await searchArtist(artistName, token)
      if (!artist) {
        console.log(`[v0] ❌ Artist not found: ${artistName}`)
        continue
      }

      const artistPhoto = artist.images?.[0]?.url || ""
      console.log(`[v0] ✓ Found artist: ${artist.name}`)

      // Get ALL albums
      const albums = await getAllAlbums(artist.id, token)
      console.log(`[v0] ✓ Found ${albums.length} albums`)

      const processedAlbums = []

      // Process each album
      for (let j = 0; j < albums.length; j++) {
        const album = albums[j]
        console.log(`[v0]   [${j + 1}/${albums.length}] Album: ${album.name}`)

        try {
          // Get ALL tracks for this album
          const tracks = await getAllTracks(album.id, token)
          console.log(`[v0]     ✓ Found ${tracks.length} tracks`)

          const songs = []

          // Process each track
          for (let k = 0; k < tracks.length; k++) {
            const track = tracks[k]

            // Search YouTube for video ID
            const youtubeId = await searchYouTube(artistName, track.name)

            songs.push({
              id: youtubeId,
              title: track.name,
              duration: `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}`,
            })

            // Rate limiting for YouTube API
            await delay(150)
          }

          processedAlbums.push({
            name: album.name,
            year: album.release_date?.split("-")[0] || "",
            coverUrl: album.images?.[0]?.url || "",
            songs: songs,
          })

          await delay(200) // Rate limiting between albums
        } catch (error) {
          console.log(`[v0]     ❌ Error processing album: ${error.message}`)
        }
      }

      musicLibrary.push({
        name: artistName,
        photoUrl: artistPhoto,
        albums: processedAlbums,
      })

      console.log(`[v0] ✓ Completed ${artistName}: ${processedAlbums.length} albums processed`)

      await delay(300) // Rate limiting between artists
    } catch (error) {
      console.log(`[v0] ❌ Error processing artist ${artistName}: ${error.message}`)
    }
  }

  // Generate TypeScript file
  console.log("\n[v0] Generating music library file...")

  const tsContent = `export interface Song {
  id: string // YouTube video ID
  title: string
  duration?: string
}

export interface Album {
  name: string
  year?: string
  songs: Song[]
  coverUrl?: string
}

export interface Artist {
  name: string
  albums: Album[]
  photoUrl?: string
}

export const musicLibrary: Artist[] = ${JSON.stringify(musicLibrary, null, 2)}
`

  console.log("[v0] ✅ Complete! Music library generated successfully")
  console.log(`[v0] Total artists: ${musicLibrary.length}`)
  console.log(`[v0] Total albums: ${musicLibrary.reduce((sum, artist) => sum + artist.albums.length, 0)}`)
  console.log(
    `[v0] Total songs: ${musicLibrary.reduce((sum, artist) => sum + artist.albums.reduce((albumSum, album) => albumSum + album.songs.length, 0), 0)}`,
  )

  return tsContent
}

// Run the script
fetchAllMusicData()
  .then((content) => {
    console.log("\n[v0] === GENERATED MUSIC LIBRARY ===")
    console.log(content)
  })
  .catch((error) => {
    console.error("[v0] Fatal error:", error)
  })
