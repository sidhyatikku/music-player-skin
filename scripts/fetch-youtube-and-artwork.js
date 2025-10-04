import fs from "fs"
import path from "path"

const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"

// Read the AC/DC JSON file
const acDcData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "user_read_only_context/text_attachments/ac-dc-X5UYM.json"), "utf-8"),
)

async function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query,
  )}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId
      return `https://www.youtube.com/watch?v=${videoId}`
    }
  } catch (error) {
    console.error(`[v0] Error searching YouTube for "${query}":`, error.message)
  }

  return null
}

function getSpotifyAlbumArt(spotifyAlbumId) {
  // Spotify album art URL format
  return `https://i.scdn.co/image/${spotifyAlbumId}`
}

async function enhanceSongLibrary() {
  console.log("[v0] Starting to enhance song library...")
  const artistName = acDcData.artist.name
  let processedCount = 0
  let totalTracks = 0

  // Count total tracks
  for (const album of acDcData.albums) {
    totalTracks += album.tracks.length
  }

  console.log(`[v0] Processing ${totalTracks} tracks from ${acDcData.albums.length} albums...`)

  // Process each album
  for (const album of acDcData.albums) {
    console.log(`[v0] Processing album: ${album.albumOrEPName}`)

    // Get album artwork from Spotify
    const albumArtUrl = `https://i.scdn.co/image/${album.spotifyAlbumId}`
    album.albumArtUrl = albumArtUrl

    // Process each track
    for (const track of album.tracks) {
      processedCount++
      const searchQuery = `${artistName} ${track.songName} official`

      console.log(`[v0] [${processedCount}/${totalTracks}] Searching YouTube for: ${track.songName}`)

      // Search YouTube for the song
      const youtubeUrl = await searchYouTube(searchQuery)

      if (youtubeUrl) {
        track.youtubeUrl = youtubeUrl
        console.log(`[v0] ✓ Found: ${youtubeUrl}`)
      } else {
        console.log(`[v0] ✗ No YouTube video found for: ${track.songName}`)
      }

      // Add album art URL to each track
      track.albumArtUrl = albumArtUrl

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  // Write the enhanced data to a new file
  const outputPath = path.join(process.cwd(), "public/ac-dc-enhanced.json")
  fs.writeFileSync(outputPath, JSON.stringify(acDcData, null, 2))

  console.log(`[v0] ✓ Enhanced song library saved to: ${outputPath}`)
  console.log(`[v0] Processed ${processedCount} tracks successfully!`)

  return acDcData
}

// Run the script
enhanceSongLibrary().catch((error) => {
  console.error("[v0] Script failed:", error)
  process.exit(1)
})
