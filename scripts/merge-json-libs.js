import { readFileSync, readdirSync } from "fs"

// Extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

// Normalize artist name for comparison
function normalizeArtistName(name) {
  return name.toLowerCase().trim().replace(/\s+/g, " ")
}

console.log("[v0] Starting JSON to music library merge...")

try {
  const libraryPath = "../lib/music-library.ts"
  const jsonDir = "../lib/metadata-json-enriched"

  console.log("[v0] Reading music library from:", libraryPath)
  const libraryContent = readFileSync(libraryPath, "utf-8")

  // Extract existing song IDs to avoid duplicates
  const existingSongIds = new Set()
  const songIdMatches = libraryContent.matchAll(/id:\s*["']([^"']+)["']/g)
  for (const match of songIdMatches) {
    existingSongIds.add(match[1])
  }
  console.log("[v0] Found", existingSongIds.size, "existing songs in library")

  console.log("[v0] Reading JSON files from:", jsonDir)
  const jsonFiles = readdirSync(jsonDir).filter((f) => f.endsWith(".json"))
  console.log("[v0] Found", jsonFiles.length, "JSON files to process")

  // Parse existing library to find artists
  const artistMatches = libraryContent.matchAll(/{\s*name:\s*["']([^"']+)["'],\s*(?:photoUrl:[^,]*,\s*)?albums:/g)
  const existingArtists = new Map()
  for (const match of artistMatches) {
    existingArtists.set(normalizeArtistName(match[1]), match[1])
  }
  console.log("[v0] Found", existingArtists.size, "existing artists in library")

  // Process each JSON file
  let newSongsAdded = 0
  let newAlbumsAdded = 0
  const artistsToAppend = []

  for (const jsonFile of jsonFiles) {
    console.log("[v0] Processing:", jsonFile)
    const jsonPath = `${jsonDir}/${jsonFile}`
    const jsonData = JSON.parse(readFileSync(jsonPath, "utf-8"))

    const artistName = jsonData.artist
    const normalizedArtistName = normalizeArtistName(artistName)

    // Check if artist exists in library
    if (existingArtists.has(normalizedArtistName)) {
      console.log("[v0]   Artist exists:", artistName, "- will add new songs only")

      // Process albums and songs
      const newAlbums = []
      for (const album of jsonData.albums) {
        const songsWithYoutube = album.songs
          .filter((song) => song.youtube)
          .map((song) => {
            const videoId = extractYouTubeId(song.youtube)
            return videoId && !existingSongIds.has(videoId) ? { id: videoId, title: song.title } : null
          })
          .filter((song) => song !== null)

        if (songsWithYoutube.length > 0) {
          newAlbumsAdded++
          newSongsAdded += songsWithYoutube.length
          newAlbums.push({
            name: album.album,
            year: album.year || undefined,
            coverUrl: album.albumArt,
            songs: songsWithYoutube,
          })
          console.log("[v0]     Album:", album.album, "-", songsWithYoutube.length, "new songs")
        }
      }

      if (newAlbums.length > 0) {
        // Generate TypeScript code for new albums
        const albumsCode = newAlbums
          .map((album) => {
            const songsCode = album.songs
              .map((song) => `          { id: "${song.id}", title: "${song.title.replace(/"/g, '\\"')}" }`)
              .join(",\n")

            return `      {
        name: "${album.name.replace(/"/g, '\\"')}",${album.year ? `\n        year: "${album.year}",` : ""}
        coverUrl: "${album.coverUrl}",
        songs: [
${songsCode}
        ],
      }`
          })
          .join(",\n")

        console.log("[v0]   Generated code for", newAlbums.length, "new albums")
        console.log("[v0]   MANUAL STEP REQUIRED: Add these albums to", artistName, "in music-library.ts:")
        console.log("---START---")
        console.log(albumsCode)
        console.log("---END---")
      }
    } else {
      console.log("[v0]   New artist:", artistName, "- will add complete discography")

      // Process all albums for new artist
      const albums = []
      for (const album of jsonData.albums) {
        const songsWithYoutube = album.songs
          .filter((song) => song.youtube)
          .map((song) => {
            const videoId = extractYouTubeId(song.youtube)
            return videoId ? { id: videoId, title: song.title } : null
          })
          .filter((song) => song !== null)

        if (songsWithYoutube.length > 0) {
          newSongsAdded += songsWithYoutube.length
          albums.push({
            name: album.album,
            year: album.year || undefined,
            coverUrl: album.coverUrl,
            songs: songsWithYoutube,
          })
        }
      }

      if (albums.length > 0) {
        newAlbumsAdded += albums.length
        artistsToAppend.push({
          name: artistName,
          albums: albums,
        })
        console.log(
          "[v0]     Added",
          albums.length,
          "albums with",
          albums.reduce((sum, a) => sum + a.songs.length, 0),
          "songs",
        )
      }
    }
  }

  // Generate code for new artists to append
  if (artistsToAppend.length > 0) {
    console.log("[v0] Generating code for", artistsToAppend.length, "new artists...")

    const newArtistsCode = artistsToAppend
      .map((artist) => {
        const albumsCode = artist.albums
          .map((album) => {
            const songsCode = album.songs
              .map((song) => `          { id: "${song.id}", title: "${song.title.replace(/"/g, '\\"')}" }`)
              .join(",\n")

            return `      {
        name: "${album.name.replace(/"/g, '\\"')}",${album.year ? `\n        year: "${album.year}",` : ""}
        coverUrl: "${album.coverUrl}",
        songs: [
${songsCode}
        ],
      }`
          })
          .join(",\n")

        return `  {
    name: "${artist.name}",
    albums: [
${albumsCode}
    ],
  }`
      })
      .join(",\n")

    console.log("[v0] MANUAL STEP REQUIRED: Add these new artists to the end of musicLibrary array:")
    console.log("---START---")
    console.log(newArtistsCode)
    console.log("---END---")
  }

  console.log("[v0] Summary:")
  console.log("[v0]   New albums:", newAlbumsAdded)
  console.log("[v0]   New songs:", newSongsAdded)
  console.log("[v0]   New artists:", artistsToAppend.length)
  console.log("[v0] NOTE: This script generates code that needs to be manually added to music-library.ts")
  console.log("[v0] The script does not automatically modify the file to prevent accidental data loss.")
} catch (error) {
  console.error("[v0] Error:", error.message)
  process.exit(1)
}
