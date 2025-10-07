import acdcData from "../user_read_only_context/text_attachments/acdc-FbG05.json"
import americaData from "../user_read_only_context/text_attachments/america-mVu8X.json"
import alabamaData from "../user_read_only_context/text_attachments/alabama-42fXd.json"

interface InputSong {
  title: string
  youtube?: string
}

interface InputAlbum {
  album: string
  year: string
  albumArt: string
  songs: InputSong[]
}

interface InputArtist {
  artist: string
  id: string
  albums: InputAlbum[]
}

interface OutputSong {
  id: string
  title: string
}

interface OutputAlbum {
  name: string
  year: string
  coverUrl: string
  songs: OutputSong[]
}

interface OutputArtist {
  name: string
  photoUrl: string
  albums: OutputAlbum[]
}

function extractVideoId(youtubeUrl: string): string | null {
  try {
    const url = new URL(youtubeUrl)
    return url.searchParams.get("v")
  } catch {
    return null
  }
}

function processArtist(inputArtist: InputArtist): OutputArtist | null {
  const albums: OutputAlbum[] = []

  for (const inputAlbum of inputArtist.albums) {
    const songs: OutputSong[] = []

    for (const inputSong of inputAlbum.songs) {
      // Only include songs with non-empty youtube field
      if (inputSong.youtube && inputSong.youtube.trim() !== "") {
        const videoId = extractVideoId(inputSong.youtube)
        if (videoId) {
          songs.push({
            id: videoId,
            title: inputSong.title,
          })
        }
      }
    }

    // Only include albums that have at least one song with YouTube URL
    if (songs.length > 0) {
      albums.push({
        name: inputAlbum.album,
        year: inputAlbum.year,
        coverUrl: inputAlbum.albumArt,
        songs,
      })
    }
  }

  // Only include artists that have at least one album
  if (albums.length > 0) {
    // Use the first album's cover art as the artist photo
    return {
      name: inputArtist.artist,
      photoUrl: albums[0].coverUrl,
      albums,
    }
  }

  return null
}

// Process all three artists
const artists: InputArtist[] = [acdcData, americaData, alabamaData]
const processedArtists: OutputArtist[] = []

for (const artist of artists) {
  const processed = processArtist(artist)
  if (processed) {
    processedArtists.push(processed)
  }
}

// Output the processed data
console.log("Processed Artists:")
console.log(JSON.stringify(processedArtists, null, 2))

console.log("\n\nTotal Statistics:")
for (const artist of processedArtists) {
  const totalSongs = artist.albums.reduce((sum, album) => sum + album.songs.length, 0)
  console.log(`${artist.name}: ${artist.albums.length} albums, ${totalSongs} songs`)
}
