import fs from "fs"

const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"
const RESULTS_PER_ARTIST = 15 // Number of songs to fetch per artist

const artists = [
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

// Helper function to parse ISO 8601 duration to seconds
function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0

  const hours = Number.parseInt(match[1] || 0)
  const minutes = Number.parseInt(match[2] || 0)
  const seconds = Number.parseInt(match[3] || 0)

  return hours * 3600 + minutes * 60 + seconds
}

// Helper function to format seconds to MM:SS
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function extractMetadata(video) {
  const title = video.snippet.title
  const description = video.snippet.description
  const publishedAt = video.snippet.publishedAt

  const yearMatch = (title + " " + description).match(/[([\-\s](19\d{2}|20\d{2})[)\]\s]/)
  const year = yearMatch ? Number.parseInt(yearMatch[1]) : new Date(publishedAt).getFullYear()

  // Try to extract album name from description (often in format "Album: Name" or "From the album 'Name'")
  let album = null
  const albumMatch = description.match(/(?:album|from|off)[\s:]+["']?([^"'\n]+)["']?/i)
  if (albumMatch) {
    album = albumMatch[1].trim().split("\n")[0].substring(0, 100) // Limit length
  }

  return { year, album }
}

// Search YouTube for an artist's songs
async function searchArtistSongs(artistName) {
  console.log(`[v0] Searching for ${artistName}...`)

  try {
    // Search for videos
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(artistName + " official audio")}&type=video&videoCategoryId=10&maxResults=${RESULTS_PER_ARTIST}&key=${YOUTUBE_API_KEY}`

    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json()

    if (searchData.error) {
      console.error(`[v0] Error searching for ${artistName}:`, searchData.error.message)
      return []
    }

    if (!searchData.items || searchData.items.length === 0) {
      console.log(`[v0] No results found for ${artistName}`)
      return []
    }

    // Get video IDs
    const videoIds = searchData.items.map((item) => item.id.videoId).join(",")

    // Fetch video details to get duration
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`

    const detailsResponse = await fetch(detailsUrl)
    const detailsData = await detailsResponse.json()

    if (detailsData.error) {
      console.error(`[v0] Error fetching details for ${artistName}:`, detailsData.error.message)
      return []
    }

    // Process and format the results
    const songs = detailsData.items.map((video) => {
      const durationSeconds = parseDuration(video.contentDetails.duration)
      // Enhanced function to extract year and album metadata
      const { year, album } = extractMetadata(video)
      const albumArt =
        video.snippet.thumbnails.maxres?.url ||
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.default.url

      return {
        id: video.id,
        title: video.snippet.title,
        artist: artistName,
        album: album || `${artistName} Singles`,
        year: year,
        albumArt: albumArt,
        duration: formatDuration(durationSeconds),
        youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: albumArt, // Keep for backwards compatibility
        publishedAt: video.snippet.publishedAt,
      }
    })

    console.log(`[v0] Found ${songs.length} songs for ${artistName}`)
    return songs
  } catch (error) {
    console.error(`[v0] Error processing ${artistName}:`, error.message)
    return []
  }
}

function groupSongsByAlbum(songs) {
  const albumMap = {}

  songs.forEach((song) => {
    const albumKey = `${song.album}_${song.year}`

    if (!albumMap[albumKey]) {
      albumMap[albumKey] = {
        name: song.album,
        year: song.year,
        artwork: song.albumArt,
        tracks: [],
      }
    }

    albumMap[albumKey].tracks.push({
      number: albumMap[albumKey].tracks.length + 1,
      title: song.title,
      duration: song.duration,
      youtubeId: song.id,
      youtubeUrl: song.youtubeUrl,
      albumArt: song.albumArt,
    })
  })

  return Object.values(albumMap)
}

// Main function to fetch all artists
async function fetchAllArtists() {
  console.log(`[v0] Starting to fetch songs for ${artists.length} artists...`)

  const allSongs = []
  const artistAlbums = {}

  // Process artists one by one to avoid rate limiting
  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i]
    console.log(`[v0] Processing ${i + 1}/${artists.length}: ${artist}`)

    const songs = await searchArtistSongs(artist)

    if (songs.length > 0) {
      allSongs.push(...songs)

      artistAlbums[artist] = {
        artist: artist,
        albums: groupSongsByAlbum(songs),
      }
    }

    // Add a small delay to avoid hitting rate limits
    if (i < artists.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // Save the results
  const outputData = {
    generatedAt: new Date().toISOString(),
    totalArtists: Object.keys(artistAlbums).length,
    totalSongs: allSongs.length,
    artists: artistAlbums,
  }

  fs.writeFileSync("music-library-youtube.json", JSON.stringify(outputData, null, 2))
  console.log(`[v0] ✓ Successfully fetched ${allSongs.length} songs from ${Object.keys(artistAlbums).length} artists`)
  console.log(`[v0] ✓ Data saved to music-library-youtube.json`)

  // Also save a flat list of all songs
  fs.writeFileSync("all-songs-flat.json", JSON.stringify(allSongs, null, 2))
  console.log(`[v0] ✓ Flat song list saved to all-songs-flat.json`)
}

// Run the script
fetchAllArtists().catch((error) => {
  console.error("[v0] Fatal error:", error)
  process.exit(1)
})
