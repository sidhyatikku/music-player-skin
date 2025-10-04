// Comprehensive Spotify + YouTube data fetcher - BATCH VERSION
// Processes 10 artists at a time to avoid timeouts

const SPOTIFY_CLIENT_ID = "4aeae79857934672bbac8f04dc5682a0"
const SPOTIFY_CLIENT_SECRET = "50351c26b2a8457fb1a7fb1b32d1c08a"
const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"

// All artists - CHANGE THIS BATCH NUMBER to process different groups
const BATCH_NUMBER = 1 // Change to 2, 3, 4, 5, 6 for other batches
const BATCH_SIZE = 10

const ALL_ARTISTS = [
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

// Get artists for this batch
const startIdx = (BATCH_NUMBER - 1) * BATCH_SIZE
const endIdx = startIdx + BATCH_SIZE
const ARTISTS = ALL_ARTISTS.slice(startIdx, endIdx)

console.log(`[v0] Processing Batch ${BATCH_NUMBER}: Artists ${startIdx + 1}-${Math.min(endIdx, ALL_ARTISTS.length)}`)
console.log(`[v0] Artists in this batch: ${ARTISTS.join(", ")}`)

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
    { headers: { Authorization: `Bearer ${token}` } },
  )
  const data = await response.json()
  return data.artists?.items[0] || null
}

// Get ALL albums for an artist
async function getAllAlbums(artistId, token) {
  let allAlbums = []
  let offset = 0
  const limit = 50

  while (true) {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    const data = await response.json()

    if (!data.items || data.items.length === 0) break

    allAlbums = allAlbums.concat(data.items)

    if (data.items.length < limit) break

    offset += limit
    await delay(100)
  }

  return allAlbums
}

// Get ALL tracks for an album
async function getAllTracks(albumId, token) {
  let allTracks = []
  let offset = 0
  const limit = 50

  while (true) {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    const data = await response.json()

    if (!data.items || data.items.length === 0) break

    allTracks = allTracks.concat(data.items)

    if (data.items.length < limit) break

    offset += limit
    await delay(100)
  }

  return allTracks
}

// Search YouTube for a song
async function searchYouTube(artistName, songTitle) {
  try {
    const query = encodeURIComponent(`${artistName} ${songTitle}`)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&maxResults=1&key=${YOUTUBE_API_KEY}`,
    )
    const data = await response.json()
    return data.items?.[0]?.id?.videoId || "placeholder"
  } catch (error) {
    return "placeholder"
  }
}

// Main function
async function fetchBatchData() {
  console.log("[v0] Starting batch music data fetch...")

  const token = await getSpotifyToken()
  console.log("[v0] ✓ Spotify authenticated")

  const musicLibrary = []

  for (let i = 0; i < ARTISTS.length; i++) {
    const artistName = ARTISTS[i]
    console.log(`\n[v0] [${i + 1}/${ARTISTS.length}] ${artistName}`)

    try {
      const artist = await searchArtist(artistName, token)
      if (!artist) {
        console.log(`[v0] ❌ Not found`)
        continue
      }

      const albums = await getAllAlbums(artist.id, token)
      console.log(`[v0] ✓ ${albums.length} albums`)

      const processedAlbums = []

      for (let j = 0; j < Math.min(albums.length, 20); j++) {
        const album = albums[j]

        try {
          const tracks = await getAllTracks(album.id, token)
          const songs = []

          for (const track of tracks) {
            const youtubeId = await searchYouTube(artistName, track.name)
            songs.push({
              id: youtubeId,
              title: track.name,
              duration: `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}`,
            })
            await delay(100)
          }

          processedAlbums.push({
            name: album.name,
            year: album.release_date?.split("-")[0] || "",
            coverUrl: album.images?.[0]?.url || "",
            songs: songs,
          })

          await delay(150)
        } catch (error) {
          console.log(`[v0] ❌ Album error`)
        }
      }

      musicLibrary.push({
        name: artistName,
        photoUrl: artist.images?.[0]?.url || "",
        albums: processedAlbums,
      })

      console.log(`[v0] ✓ Done: ${processedAlbums.length} albums`)
      await delay(200)
    } catch (error) {
      console.log(`[v0] ❌ Artist error`)
    }
  }

  console.log(`\n[v0] ✅ Batch ${BATCH_NUMBER} complete!`)
  console.log(`[v0] Artists: ${musicLibrary.length}`)
  console.log(`[v0] Albums: ${musicLibrary.reduce((sum, a) => sum + a.albums.length, 0)}`)
  console.log(
    `[v0] Songs: ${musicLibrary.reduce((sum, a) => sum + a.albums.reduce((s, al) => s + al.songs.length, 0), 0)}`,
  )

  console.log("\n// Copy this data:")
  console.log(JSON.stringify(musicLibrary, null, 2))
}

fetchBatchData().catch(console.error)
