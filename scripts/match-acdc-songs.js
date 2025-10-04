// Script to match AC/DC songs from Spotify and YouTube data
// Only adds songs that appear in both JSON files

import fs from "fs"
import path from "path"

// Read the YouTube data
const youtubeDataPath = path.join(process.cwd(), "user_read_only_context/text_attachments/pasted-text-rukZL.txt")
const youtubeData = JSON.parse(fs.readFileSync(youtubeDataPath, "utf-8"))

// Read the Spotify data
const spotifyDataPath = path.join(process.cwd(), "user_read_only_context/text_attachments/ac-dc-wsXXS.json")
const spotifyData = JSON.parse(fs.readFileSync(spotifyDataPath, "utf-8"))

// Normalize song title for matching
function normalizeSongTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove special characters
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/$$.*?$$/g, "") // Remove parentheses content
    .replace(/\[.*?\]/g, "") // Remove brackets content
    .replace(/\s-\slive.*$/i, "") // Remove "- Live" suffix
    .replace(/\sremaster.*$/i, "") // Remove "Remaster" suffix
    .trim()
}

// Create a map of YouTube songs by normalized title
const youtubeSongMap = new Map()
youtubeData.forEach((video) => {
  const normalizedTitle = normalizeSongTitle(video.title)
  youtubeSongMap.set(normalizedTitle, video)
})

console.log(`[v0] Loaded ${youtubeData.length} YouTube videos`)
console.log(`[v0] Loaded ${spotifyData.albums.length} Spotify albums`)

// Match songs and build the new AC/DC data structure
const matchedAlbums = []
let totalMatches = 0

spotifyData.albums.forEach((album) => {
  const matchedSongs = []

  album.tracks.forEach((track) => {
    const normalizedSpotifyTitle = normalizeSongTitle(track.songName)

    // Try to find a match in YouTube data
    if (youtubeSongMap.has(normalizedSpotifyTitle)) {
      const youtubeVideo = youtubeSongMap.get(normalizedSpotifyTitle)
      matchedSongs.push({
        id: youtubeVideo.videoId,
        title: track.songName, // Use Spotify title (cleaner)
        duration: track.duration,
      })
      totalMatches++
      console.log(`[v0] ✓ Matched: "${track.songName}" (${album.albumOrEPName})`)
    }
  })

  // Only add album if it has matched songs
  if (matchedSongs.length > 0) {
    matchedAlbums.push({
      name: album.albumOrEPName,
      year: album.releaseYear,
      coverUrl: `https://i.ytimg.com/vi/${matchedSongs[0].id}/mqdefault.jpg`,
      songs: matchedSongs,
    })
  }
})

console.log(`\n[v0] Total matches found: ${totalMatches}`)
console.log(`[v0] Albums with matches: ${matchedAlbums.length}`)

// Generate the TypeScript code for the AC/DC artist
const acdcArtistCode = {
  name: "AC/DC",
  photoUrl: matchedAlbums.length > 0 ? `https://i.ytimg.com/vi/${matchedAlbums[0].songs[0].id}/default.jpg` : "",
  albums: matchedAlbums,
}

// Write the result to a JSON file for inspection
const outputPath = path.join(process.cwd(), "scripts/matched-acdc-data.json")
fs.writeFileSync(outputPath, JSON.stringify(acdcArtistCode, null, 2))

console.log(`\n[v0] Matched data written to: ${outputPath}`)
console.log(`[v0] You can now update the music library with this data`)
