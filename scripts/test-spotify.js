const SPOTIFY_CLIENT_ID = "4aeae79857934672bbac8f04dc5682a0"
const SPOTIFY_CLIENT_SECRET = "50351c26b2a8457fb1a7fb1b32d1c08a"
const YOUTUBE_API_KEY = "AIzaSyDcIfUZQ6DIxfsqXw6Qz5nbvt1PNG6Izfg"

async function testSpotify() {
  try {
    console.log("Testing Spotify API connection...")

    // Get access token
    const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials",
    })

    const tokenData = await tokenResponse.json()
    console.log("✓ Got Spotify access token")

    // Search for one artist
    const artistName = "The Beatles"
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    )

    const searchData = await searchResponse.json()
    const artist = searchData.artists.items[0]
    console.log(`✓ Found artist: ${artist.name}`)
    console.log(`  Spotify ID: ${artist.id}`)

    // Get albums
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&market=US&limit=5`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    )

    const albumsData = await albumsResponse.json()
    console.log(`✓ Found ${albumsData.items.length} albums:`)

    for (const album of albumsData.items) {
      console.log(`  - ${album.name} (${album.release_date?.substring(0, 4)})`)
    }

    console.log("\n✓ Test successful! Spotify API is working.")
  } catch (error) {
    console.error("❌ Error:", error.message)
    console.error(error.stack)
  }
}

testSpotify()
