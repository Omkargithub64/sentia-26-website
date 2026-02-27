const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Timeout wrapper using Promise.race — avoids AbortController conflicts with Next.js fetch
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

export const getAccessToken = async () => {
  if (!client_id || !client_secret) {
    throw new Error('Spotify credentials not configured');
  }
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const response = await withTimeout(
    fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    }),
    5000
  );
  if (!response.ok) throw new Error(`Token fetch failed: ${response.status}`);
  return response.json();
};

export const getArtist = async (artistId: string) => {
  const { access_token } = await getAccessToken();
  const response = await withTimeout(
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 3600 },
    } as RequestInit),
    5000
  );
  if (!response.ok) throw new Error(`getArtist failed: ${response.status}`);
  return response.json();
};

export const getArtistTopTracks = async (artistId: string) => {
  const { access_token } = await getAccessToken();
  const response = await withTimeout(
    fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IN`, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 3600 },
    } as RequestInit),
    5000
  );
  if (!response.ok) throw new Error(`getArtistTopTracks failed: ${response.status}`);
  return response.json();
};
