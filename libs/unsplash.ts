const UNSPLASH_API_BASE = 'https://api.unsplash.com'

function getAccessKey() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    throw new Error('Missing UNSPLASH_ACCESS_KEY')
  }
  return accessKey
}

export function getUnsplashUser() {
  const username = process.env.UNSPLASH_USER
  if (!username) {
    throw new Error('Missing UNSPLASH_USER')
  }
  return username
}

function getAuthHeaders() {
  return {
    Authorization: `Client-ID ${getAccessKey()}`,
    'Accept-Version': 'v1',
  }
}

export async function unsplashJson(path: string, init?: RequestInit) {
  const res = await fetch(`${UNSPLASH_API_BASE}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...(init?.headers || {}),
    },
  })

  const json = await res.json()

  if (!res.ok) {
    const error = new Error(`Unsplash API request failed: ${res.status}`)
    ;(error as Error & { status?: number; payload?: unknown }).status = res.status
    ;(error as Error & { status?: number; payload?: unknown }).payload = json
    throw error
  }

  return json
}

export async function trackUnsplashDownload(downloadLocation?: string | null) {
  if (!downloadLocation) return

  await fetch(downloadLocation, {
    headers: getAuthHeaders(),
  })
}

export function sendCachedJson(res, data: unknown) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'max-age=180000')
  res.end(JSON.stringify(data))
}

