const SPOTIFY_CLIENT_ID = "4aeae79857934672bbac8f04dc5682a0"
const SPOTIFY_CLIENT_SECRET = "50351c26b2a8457fb1a7fb1b32d1c08a"
const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"

// Artists from the current library
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

// Rate limiting helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Get Spotify access token using Client Credentials flow
async function getSpotifyAccessToken() {
  console.log("Getting Spotify access token...")

  const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  })

  if (!response.ok) {
    throw new Error(`Failed to get Spotify token: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

// Search for artist on Spotify
async function searchSpotifyArtist(artistName, accessToken) {
  const encodedName = encodeURIComponent(artistName)
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedName}&type=artist&limit=1`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    console.error(`Failed to search for artist ${artistName}: ${response.status}`)
    return null
  }

  const data = await response.json()
  if (data.artists.items.length === 0) {
    console.error(`No Spotify results for artist: ${artistName}`)
    return null
  }

  return data.artists.items[0]
}

// Get artist's albums from Spotify
async function getSpotifyArtistAlbums(artistId, accessToken) {
  const albums = []
  let offset = 0
  const limit = 50

  while (true) {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single,compilation&market=US&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      console.error(`Failed to get albums: ${response.status}`)
      break
    }

    const data = await response.json()
    albums.push(...data.items)

    if (data.items.length < limit) {
      break
    }

    offset += limit
    await delay(100) // Rate limiting
  }

  return albums
}

// Get album tracks from Spotify
async function getSpotifyAlbumTracks(albumId, accessToken) {
  const tracks = []
  let offset = 0
  const limit = 50

  while (true) {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      console.error(`Failed to get tracks: ${response.status}`)
      break
    }

    const data = await response.json()
    tracks.push(...data.items)

    if (data.items.length < limit) {
      break
    }

    offset += limit
    await delay(100) // Rate limiting
  }

  return tracks
}

// Search YouTube for a song
async function searchYouTube(artistName, songTitle) {
  const query = encodeURIComponent(`${artistName} ${songTitle} official`)

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&maxResults=1&key=${YOUTUBE_API_KEY}`,
    )

    if (!response.ok) {
      console.error(`YouTube API error: ${response.status}`)
      return "placeholder"
    }

    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId
    }

    return "placeholder"
  } catch (error) {
    console.error(`Error searching YouTube: ${error.message}`)
    return "placeholder"
  }
}

// Clean song title
function cleanSongTitle(title) {
  return title
    .replace(/\s*$$.*?$$\s*/g, "") // Remove parentheses content
    .replace(/\s*\[.*?\]\s*/g, "") // Remove brackets content
    .replace(/\s*-\s*Remaster.*$/i, "") // Remove remaster info
    .replace(/\s*-\s*\d{4}\s*Remaster.*$/i, "")
    .trim()
}

// Main function to fetch all data
async function fetchAllMusicData() {
  console.log("Starting COMPREHENSIVE music data fetch from Spotify...")
  console.log(`Processing ${ARTISTS.length} artists - fetching ALL albums and ALL songs\n`)

  let accessToken
  try {
    accessToken = await getSpotifyAccessToken()
  } catch (error) {
    console.error("Failed to get Spotify access token:", error.message)
    return
  }

  const musicLibrary = []

  for (const artistName of ARTISTS) {
    console.log(`\n${"=".repeat(60)}`)
    console.log(`Processing: ${artistName}`)
    console.log("=".repeat(60))

    try {
      // Search for artist on Spotify
      const spotifyArtist = await searchSpotifyArtist(artistName, accessToken)
      if (!spotifyArtist) {
        console.log(`Skipping ${artistName} - not found on Spotify`)
        continue
      }

      console.log(`Found artist: ${spotifyArtist.name}`)
      console.log(`Spotify ID: ${spotifyArtist.id}`)

      // Get artist photo
      const artistPhoto =
        spotifyArtist.images && spotifyArtist.images.length > 0 ? spotifyArtist.images[0].url : undefined

      await delay(200)
      const spotifyAlbums = await getSpotifyArtistAlbums(spotifyArtist.id, accessToken)
      console.log(`Found ${spotifyAlbums.length} total releases`)

      // Remove duplicates (same album name)
      const uniqueAlbums = []
      const seenAlbumNames = new Set()

      for (const album of spotifyAlbums) {
        const normalizedName = album.name.toLowerCase().trim()
        if (!seenAlbumNames.has(normalizedName)) {
          seenAlbumNames.add(normalizedName)
          uniqueAlbums.push(album)
        }
      }

      console.log(`Processing ${uniqueAlbums.length} unique albums`)

      const albums = []

      for (const spotifyAlbum of uniqueAlbums) {
        console.log(`\n  Album: ${spotifyAlbum.name} (${spotifyAlbum.release_date?.substring(0, 4) || "Unknown"})`)

        // Get album cover
        const albumCover =
          spotifyAlbum.images && spotifyAlbum.images.length > 0 ? spotifyAlbum.images[0].url : undefined

        await delay(200)
        const spotifyTracks = await getSpotifyAlbumTracks(spotifyAlbum.id, accessToken)
        console.log(`    Found ${spotifyTracks.length} tracks`)

        const songs = []

        for (const track of spotifyTracks) {
          const cleanTitle = cleanSongTitle(track.name)
          console.log(`    - ${cleanTitle}`)

          // Search YouTube for video ID
          await delay(100)
          const youtubeId = await searchYouTube(artistName, cleanTitle)

          songs.push({
            id: youtubeId,
            title: cleanTitle,
            duration: track.duration_ms
              ? `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}`
              : undefined,
          })
        }

        if (songs.length > 0) {
          albums.push({
            name: spotifyAlbum.name,
            year: spotifyAlbum.release_date?.substring(0, 4),
            songs: songs,
            coverUrl: albumCover,
          })
        }
      }

      if (albums.length > 0) {
        musicLibrary.push({
          name: artistName,
          photoUrl: artistPhoto,
          albums: albums,
        })

        console.log(
          `\n✓ Completed ${artistName}: ${albums.length} albums, ${albums.reduce((sum, a) => sum + a.songs.length, 0)} songs`,
        )
      }
    } catch (error) {
      console.error(`Error processing ${artistName}: ${error.message}`)
    }

    // Rate limiting between artists
    await delay(500)
  }

  // Generate TypeScript file
  console.log("\n" + "=".repeat(60))
  console.log("Generating comprehensive music library file...")
  console.log("=".repeat(60))

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

  console.log("\n✓ Comprehensive music library generated successfully!")
  console.log(`Total artists: ${musicLibrary.length}`)
  console.log(`Total albums: ${musicLibrary.reduce((sum, a) => sum + a.albums.length, 0)}`)
  console.log(
    `Total songs: ${musicLibrary.reduce((sum, a) => sum + a.albums.reduce((s, al) => s + al.songs.length, 0), 0)}`,
  )

  return tsContent
}

// Fallback: YouTube-only approach (if Spotify fails)
async function fetchYouTubeOnlyData() {
  console.log("Using YouTube-only data fetching approach...")
  console.log("Note: This will search for popular songs but won't have complete album data.\n")

  const musicLibrary = []

  for (const artistName of ARTISTS) {
    console.log(`Processing: ${artistName}`)

    try {
      // Search for artist's channel and popular videos
      const query = encodeURIComponent(`${artistName} official`)
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&maxResults=50&key=${YOUTUBE_API_KEY}`,
      )

      if (!response.ok) {
        console.error(`YouTube API error for ${artistName}: ${response.status}`)
        continue
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        console.log(`No YouTube results for ${artistName}`)
        continue
      }

      // Get artist photo from first video thumbnail
      const artistPhoto = data.items[0].snippet.thumbnails.default.url

      // Group videos into albums (10 songs per album)
      const songs = data.items.map((item) => ({
        id: item.id.videoId,
        title: cleanSongTitle(item.snippet.title.replace(artistName, "").trim()),
      }))

      const albums = []
      for (let i = 0; i < songs.length; i += 10) {
        const albumSongs = songs.slice(i, i + 10)
        albums.push({
          name: `Collection ${Math.floor(i / 10) + 1}`,
          year: new Date().getFullYear().toString(),
          coverUrl: data.items[i].snippet.thumbnails.medium.url,
          songs: albumSongs,
        })
      }

      musicLibrary.push({
        name: artistName,
        photoUrl: artistPhoto,
        albums: albums,
      })

      console.log(`✓ ${artistName}: ${albums.length} albums, ${songs.length} songs`)

      await delay(200) // Rate limiting
    } catch (error) {
      console.error(`Error processing ${artistName}: ${error.message}`)
    }
  }

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

  console.log("\n✓ Music library generated!")
  console.log(`Total artists: ${musicLibrary.length}`)

  return tsContent
}

// Run the script
fetchAllMusicData()
  .then((tsContent) => {
    console.log("\n" + "=".repeat(60))
    console.log("COMPLETE!")
    console.log("=".repeat(60))
    console.log("\nThe music library has been generated.")
    console.log("Copy the output and paste it into lib/music-library.ts")
  })
  .catch((error) => {
    console.error("\n❌ Fatal error:", error)
  })
