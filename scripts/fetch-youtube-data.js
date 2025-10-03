const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"

// Artists from the current library
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

// Rate limiting helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch with retry logic
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (response.status === 403) {
        console.log("⚠️  YouTube API quota exceeded. Please try again tomorrow.")
        throw new Error("API quota exceeded")
      }
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      console.log(`Retry ${i + 1}/${retries} after error: ${error.message}`)
      await delay(2000 * (i + 1))
    }
  }
}

// Search for artist's official channel
async function findArtistChannel(artistName) {
  console.log(`🔍 Searching for ${artistName}'s channel...`)
  const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(artistName + " official")}&maxResults=5&key=${YOUTUBE_API_KEY}`

  const data = await fetchWithRetry(searchUrl)

  if (data.items && data.items.length > 0) {
    // Prefer channels with "Official" or "VEVO" in the title
    const officialChannel = data.items.find(
      (item) =>
        item.snippet.title.toLowerCase().includes("official") ||
        item.snippet.title.toLowerCase().includes("vevo") ||
        item.snippet.title.toLowerCase().includes(artistName.toLowerCase()),
    )

    const channel = officialChannel || data.items[0]
    console.log(`✓ Found channel: ${channel.snippet.title}`)
    return {
      channelId: channel.id.channelId,
      channelTitle: channel.snippet.title,
      thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default.url,
    }
  }

  return null
}

// Get all videos from a channel
async function getChannelVideos(channelId, maxResults = 50) {
  console.log(`📹 Fetching videos from channel...`)

  // First, get the uploads playlist ID
  const channelUrl = `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
  const channelData = await fetchWithRetry(channelUrl)

  if (!channelData.items || channelData.items.length === 0) {
    return []
  }

  const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

  // Get videos from uploads playlist
  const videos = []
  let nextPageToken = null

  do {
    const playlistUrl = `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ""}&key=${YOUTUBE_API_KEY}`
    const playlistData = await fetchWithRetry(playlistUrl)

    if (playlistData.items) {
      videos.push(
        ...playlistData.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default.url,
          publishedAt: item.snippet.publishedAt,
        })),
      )
    }

    nextPageToken = playlistData.nextPageToken

    if (videos.length >= maxResults) break

    await delay(100) // Rate limiting
  } while (nextPageToken)

  console.log(`✓ Found ${videos.length} videos`)
  return videos.slice(0, maxResults)
}

// Search for specific songs by artist
async function searchArtistSongs(artistName, maxResults = 50) {
  console.log(`🎵 Searching for ${artistName}'s songs...`)

  const allVideos = []
  let nextPageToken = null

  do {
    const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(artistName)}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ""}&key=${YOUTUBE_API_KEY}`
    const data = await fetchWithRetry(searchUrl)

    if (data.items) {
      const videos = data.items
        .filter((item) => {
          const title = item.snippet.title.toLowerCase()
          const channelTitle = item.snippet.channelTitle.toLowerCase()
          const artistLower = artistName.toLowerCase()

          // Filter for music videos from official channels
          return (
            (channelTitle.includes(artistLower) ||
              channelTitle.includes("vevo") ||
              channelTitle.includes("official") ||
              title.includes(artistLower)) &&
            !title.includes("reaction") &&
            !title.includes("cover") &&
            !title.includes("tutorial")
          )
        })
        .map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
        }))

      allVideos.push(...videos)
    }

    nextPageToken = data.nextPageToken

    if (allVideos.length >= maxResults) break

    await delay(100) // Rate limiting
  } while (nextPageToken && allVideos.length < maxResults)

  // Remove duplicates
  const uniqueVideos = Array.from(new Map(allVideos.map((v) => [v.id, v])).values())

  console.log(`✓ Found ${uniqueVideos.length} unique songs`)
  return uniqueVideos.slice(0, maxResults)
}

// Organize videos into albums based on title patterns and release dates
function organizeIntoAlbums(videos, artistName) {
  console.log(`📚 Organizing videos into albums...`)

  // Common album keywords in video titles
  const albumKeywords = ["album", "full album", "complete album", "official audio", "official video", "music video"]

  // Group by year
  const videosByYear = {}
  videos.forEach((video) => {
    const year = new Date(video.publishedAt).getFullYear()
    if (!videosByYear[year]) {
      videosByYear[year] = []
    }
    videosByYear[year].push(video)
  })

  // Create albums
  const albums = []
  const years = Object.keys(videosByYear).sort((a, b) => b - a) // Most recent first

  // Group videos into albums of 8-12 songs each
  const songsPerAlbum = 10
  const albumNumber = 1

  for (const year of years) {
    const yearVideos = videosByYear[year]

    for (let i = 0; i < yearVideos.length; i += songsPerAlbum) {
      const albumSongs = yearVideos.slice(i, i + songsPerAlbum)

      if (albumSongs.length >= 3) {
        // Only create albums with at least 3 songs
        albums.push({
          name: `${artistName} Collection ${year} Vol. ${Math.ceil((i + 1) / songsPerAlbum)}`,
          year: year.toString(),
          coverUrl: albumSongs[0].thumbnail,
          songs: albumSongs.map((video) => ({
            id: video.id,
            title: cleanSongTitle(video.title, artistName),
          })),
        })
      }
    }
  }

  // If we have too many albums, consolidate
  if (albums.length > 10) {
    const consolidatedAlbums = []
    const allSongs = albums.flatMap((album) => album.songs)

    for (let i = 0; i < allSongs.length; i += 12) {
      const albumSongs = allSongs.slice(i, i + 12)
      const year = albums[Math.floor(i / 12)]?.year || new Date().getFullYear().toString()

      consolidatedAlbums.push({
        name: `${artistName} Greatest Hits Vol. ${consolidatedAlbums.length + 1}`,
        year: year,
        coverUrl: albumSongs[0] ? videos.find((v) => v.id === albumSongs[0].id)?.thumbnail : "",
        songs: albumSongs,
      })
    }

    return consolidatedAlbums.slice(0, 10) // Max 10 albums
  }

  console.log(`✓ Created ${albums.length} albums`)
  return albums.slice(0, 10) // Max 10 albums
}

// Clean song title by removing common patterns
function cleanSongTitle(title, artistName) {
  let cleaned = title
    .replace(/$$Official.*?$$/gi, "")
    .replace(/\[Official.*?\]/gi, "")
    .replace(/Official Video/gi, "")
    .replace(/Official Audio/gi, "")
    .replace(/Music Video/gi, "")
    .replace(/Lyric Video/gi, "")
    .replace(/HD/gi, "")
    .replace(/HQ/gi, "")
    .replace(/VEVO/gi, "")
    .replace(new RegExp(artistName, "gi"), "")
    .replace(/\s*-\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  // Remove leading/trailing special characters
  cleaned = cleaned.replace(/^[^\w\s]+|[^\w\s]+$/g, "")

  return cleaned || title
}

// Main function to fetch all data
async function fetchAllArtistsData() {
  console.log("🎸 Starting YouTube data fetch for all artists...\n")

  const musicLibrary = []

  for (let i = 0; i < artists.length; i++) {
    const artistName = artists[i]
    console.log(`\n[${i + 1}/${artists.length}] Processing ${artistName}...`)
    console.log("=".repeat(50))

    try {
      // Try to find artist's channel first
      let videos = []
      let artistPhoto = ""

      const channel = await findArtistChannel(artistName)

      if (channel) {
        artistPhoto = channel.thumbnail
        videos = await getChannelVideos(channel.channelId, 50)
        await delay(1000)
      }

      // If channel doesn't have enough videos, search directly
      if (videos.length < 20) {
        console.log("📝 Supplementing with direct search...")
        const searchVideos = await searchArtistSongs(artistName, 50)
        videos = [...videos, ...searchVideos]

        // Remove duplicates
        videos = Array.from(new Map(videos.map((v) => [v.id, v])).values())

        await delay(1000)
      }

      // Use first video thumbnail as artist photo if we don't have one
      if (!artistPhoto && videos.length > 0) {
        artistPhoto = videos[0].thumbnail
      }

      // Organize into albums
      const albums = organizeIntoAlbums(videos, artistName)

      musicLibrary.push({
        name: artistName,
        photoUrl: artistPhoto,
        albums: albums,
      })

      console.log(
        `✅ Completed ${artistName}: ${albums.length} albums, ${albums.reduce((sum, a) => sum + a.songs.length, 0)} songs`,
      )

      // Rate limiting between artists
      await delay(2000)
    } catch (error) {
      console.error(`❌ Error processing ${artistName}:`, error.message)

      // Add artist with empty data to maintain structure
      musicLibrary.push({
        name: artistName,
        photoUrl: "",
        albums: [],
      })
    }
  }

  console.log("\n" + "=".repeat(50))
  console.log("✨ Fetch complete!")
  console.log(
    `📊 Total: ${musicLibrary.length} artists, ${musicLibrary.reduce((sum, a) => sum + a.albums.length, 0)} albums, ${musicLibrary.reduce((sum, a) => sum + a.albums.reduce((s, al) => s + al.songs.length, 0), 0)} songs`,
  )

  return musicLibrary
}

// Generate TypeScript file
function generateMusicLibraryFile(musicLibrary) {
  const output = `export interface Song {
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

  return output
}

// Run the script
console.log("🚀 YouTube Music Library Fetcher")
console.log("================================\n")

fetchAllArtistsData()
  .then((musicLibrary) => {
    const fileContent = generateMusicLibraryFile(musicLibrary)
    console.log("\n📝 Generated music library file!")
    console.log("\n" + "=".repeat(50))
    console.log("Copy the output below to lib/music-library.ts:")
    console.log("=".repeat(50) + "\n")
    console.log(fileContent)
  })
  .catch((error) => {
    console.error("💥 Fatal error:", error)
  })
