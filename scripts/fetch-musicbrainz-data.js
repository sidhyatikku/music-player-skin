// Script to fetch complete artist, album, and song data from MusicBrainz API
// and YouTube video IDs using YouTube Data API

const MUSICBRAINZ_API = "https://musicbrainz.org/ws/2"
const COVER_ART_API = "https://coverartarchive.org"
const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"
const YOUTUBE_API = "https://www.googleapis.com/youtube/v3"
const RATE_LIMIT_DELAY = 1000 // MusicBrainz requires 1 request per second
const YOUTUBE_DELAY = 100 // YouTube API is more lenient

// Helper to delay between API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch with user agent (required by MusicBrainz)
async function fetchMB(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "iPodClassicInterface/1.0.0 (https://v0.dev)",
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`MusicBrainz API error: ${response.status}`)
  }

  return response.json()
}

// Search YouTube for a song and return the video ID
async function searchYouTubeVideo(songTitle, artistName) {
  try {
    const query = encodeURIComponent(`${artistName} ${songTitle} official audio`)
    const url = `${YOUTUBE_API}/search?part=snippet&q=${query}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`

    console.log(`[v0] Searching YouTube for: ${artistName} - ${songTitle}`)

    const response = await fetch(url)

    if (!response.ok) {
      console.log(`[v0] YouTube API error: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId
      console.log(`[v0] Found YouTube video: ${videoId}`)
      return videoId
    }

    return null
  } catch (error) {
    console.log(`[v0] YouTube search failed for: ${songTitle} - ${error.message}`)
    return null
  }
}

// Search for artist by name
async function searchArtist(artistName) {
  console.log(`[v0] Searching for artist: ${artistName}`)
  const query = encodeURIComponent(artistName)
  const url = `${MUSICBRAINZ_API}/artist?query=artist:${query}&fmt=json&limit=1`

  const data = await fetchMB(url)

  if (data.artists && data.artists.length > 0) {
    return data.artists[0]
  }

  return null
}

// Get all release groups (albums) for an artist
async function getArtistReleaseGroups(artistId) {
  console.log(`[v0] Fetching release groups for artist ID: ${artistId}`)
  const url = `${MUSICBRAINZ_API}/release-group?artist=${artistId}&type=album|ep&fmt=json&limit=100`

  const data = await fetchMB(url)

  return data["release-groups"] || []
}

// Get recordings (tracks) for a release group
async function getReleaseGroupRecordings(releaseGroupId, artistName) {
  console.log(`[v0] Fetching recordings for release group: ${releaseGroupId}`)

  // First get releases in this release group
  const releaseUrl = `${MUSICBRAINZ_API}/release?release-group=${releaseGroupId}&fmt=json&limit=1`
  const releaseData = await fetchMB(releaseUrl)

  if (!releaseData.releases || releaseData.releases.length === 0) {
    return []
  }

  const releaseId = releaseData.releases[0].id
  await delay(RATE_LIMIT_DELAY)

  // Get recordings
  const recordingUrl = `${MUSICBRAINZ_API}/release/${releaseId}?inc=recordings&fmt=json`
  const recordingData = await fetchMB(recordingUrl)

  const tracks = []

  if (recordingData.media) {
    for (const medium of recordingData.media) {
      if (medium.tracks) {
        for (const track of medium.tracks) {
          const recording = track.recording

          // Search YouTube for this song
          await delay(YOUTUBE_DELAY)
          const youtubeId = await searchYouTubeVideo(recording.title, artistName)

          tracks.push({
            title: recording.title,
            id: youtubeId || "placeholder",
            duration: track.length ? Math.floor(track.length / 1000) : undefined,
          })
        }
      }
    }
  }

  return tracks
}

// Get cover art for a release group
async function getCoverArt(releaseGroupId) {
  try {
    console.log(`[v0] Fetching cover art for release group: ${releaseGroupId}`)
    const url = `${COVER_ART_API}/release-group/${releaseGroupId}`

    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    // Get the front cover or first available image
    if (data.images && data.images.length > 0) {
      const frontCover = data.images.find((img) => img.front) || data.images[0]
      return frontCover.thumbnails?.large || frontCover.image
    }
  } catch (error) {
    console.log(`[v0] No cover art found for release group: ${releaseGroupId}`)
  }

  return null
}

// Get artist photo from YouTube thumbnail
async function getArtistPhoto(artistName) {
  try {
    const query = encodeURIComponent(`${artistName} official`)
    const url = `${YOUTUBE_API}/search?part=snippet&q=${query}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.thumbnails.default.url
    }

    return null
  } catch (error) {
    console.log(`[v0] Failed to get artist photo for: ${artistName}`)
    return null
  }
}

// Process a single artist
async function processArtist(artistName, existingArtistData) {
  console.log(`\n[v0] ========== Processing: ${artistName} ==========`)

  try {
    // Search for artist
    const artist = await searchArtist(artistName)

    if (!artist) {
      console.log(`[v0] Artist not found: ${artistName}, keeping existing data`)
      return existingArtistData
    }

    console.log(`[v0] Found artist: ${artist.name} (ID: ${artist.id})`)
    await delay(RATE_LIMIT_DELAY)

    // Get artist photo
    const artistPhoto = await getArtistPhoto(artist.name)
    await delay(YOUTUBE_DELAY)

    // Get release groups
    const releaseGroups = await getArtistReleaseGroups(artist.id)
    console.log(`[v0] Found ${releaseGroups.length} release groups`)
    await delay(RATE_LIMIT_DELAY)

    const albums = []

    // Process each release group (limit to first 15 albums to keep it manageable)
    for (const rg of releaseGroups.slice(0, 15)) {
      console.log(`[v0] Processing album: ${rg.title}`)

      // Get recordings
      const recordings = await getReleaseGroupRecordings(rg.id, artist.name)
      await delay(RATE_LIMIT_DELAY)

      // Get cover art
      const coverUrl = await getCoverArt(rg.id)
      await delay(RATE_LIMIT_DELAY)

      if (recordings.length > 0) {
        albums.push({
          name: rg.title,
          year: rg["first-release-date"] ? rg["first-release-date"].substring(0, 4) : undefined,
          coverUrl: coverUrl,
          songs: recordings.slice(0, 20), // Limit to 20 songs per album
        })
      }
    }

    return {
      name: artist.name,
      albums: albums.length > 0 ? albums : existingArtistData?.albums || [],
      photoUrl: artistPhoto || existingArtistData?.photoUrl,
    }
  } catch (error) {
    console.error(`[v0] Error processing ${artistName}:`, error.message)
    return existingArtistData
  }
}

// Main execution
async function main() {
  // Import the current music library
  const { musicLibrary } = await import("../lib/music-library.ts")

  const allArtists = musicLibrary.map((a) => a.name)

  console.log(`[v0] Starting to fetch data for ${allArtists.length} artists...`)
  console.log(
    `[v0] This will take approximately ${Math.ceil((allArtists.length * 20) / 60)} minutes due to rate limiting\n`,
  )

  const results = []

  for (const artistName of allArtists) {
    const existingData = musicLibrary.find((a) => a.name === artistName)
    const artistData = await processArtist(artistName, existingData)

    if (artistData) {
      results.push(artistData)
    }

    // Extra delay between artists
    await delay(RATE_LIMIT_DELAY)
  }

  console.log(`\n[v0] ========== RESULTS ==========`)
  console.log(`[v0] Successfully processed ${results.length} artists`)

  // Count total albums and songs
  const totalAlbums = results.reduce((sum, artist) => sum + artist.albums.length, 0)
  const totalSongs = results.reduce(
    (sum, artist) => sum + artist.albums.reduce((s, album) => s + album.songs.length, 0),
    0,
  )
  const songsWithYouTube = results.reduce(
    (sum, artist) =>
      sum + artist.albums.reduce((s, album) => s + album.songs.filter((song) => song.id !== "placeholder").length, 0),
    0,
  )

  console.log(`[v0] Total albums: ${totalAlbums}`)
  console.log(`[v0] Total songs: ${totalSongs}`)
  console.log(
    `[v0] Songs with YouTube IDs: ${songsWithYouTube} (${Math.round((songsWithYouTube / totalSongs) * 100)}%)`,
  )

  // Generate TypeScript code for the new library
  console.log(`\n[v0] ========== GENERATED LIBRARY CODE ==========\n`)
  console.log(`export const musicLibrary: Artist[] = ${JSON.stringify(results, null, 2)}`)

  console.log(`\n[v0] ========== INSTRUCTIONS ==========`)
  console.log(`[v0] 1. Copy the generated code above`)
  console.log(`[v0] 2. Replace the musicLibrary array in lib/music-library.ts`)
  console.log(`[v0] 3. Songs with 'placeholder' YouTube IDs will need manual updates or can be re-run`)
}

main().catch(console.error)
