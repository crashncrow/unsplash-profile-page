import { createHmac, timingSafeEqual } from 'crypto'

function getSecret() {
  const secret = process.env.UNSPLASH_ACCESS_KEY
  if (!secret) {
    throw new Error('Missing UNSPLASH_ACCESS_KEY')
  }
  return secret
}

export function signId(id: string | number): string {
  return createHmac('sha256', getSecret()).update(id.toString()).digest('hex')
}

export function verifySignedId(id: string | number, signature: unknown): boolean {
  if (typeof signature !== 'string') return false

  const expected = Buffer.from(signId(id))
  const received = Buffer.from(signature)

  if (expected.length !== received.length) return false

  return timingSafeEqual(expected, received)
}

export function withDownloadSignatures(photos: unknown): unknown {
  if (!Array.isArray(photos)) return photos

  return photos.map((photo) =>
    photo?.id ? { ...photo, download_sig: signId(photo.id) } : photo
  )
}
