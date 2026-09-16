import { beforeAll, describe, expect, it } from 'vitest'
import { signId, verifySignedId, withDownloadSignatures } from './sign'

beforeAll(() => {
  process.env.UNSPLASH_ACCESS_KEY = 'test-secret'
})

describe('signId', () => {
  it('returns the same signature for the same id', () => {
    expect(signId('photo-1')).toBe(signId('photo-1'))
  })

  it('returns different signatures for different ids', () => {
    expect(signId('photo-1')).not.toBe(signId('photo-2'))
  })

  it('accepts numeric ids', () => {
    expect(signId(123)).toBe(signId('123'))
  })
})

describe('verifySignedId', () => {
  it('accepts a valid signature', () => {
    const sig = signId('photo-1')
    expect(verifySignedId('photo-1', sig)).toBe(true)
  })

  it('rejects a signature for a different id', () => {
    const sig = signId('photo-1')
    expect(verifySignedId('photo-2', sig)).toBe(false)
  })

  it('rejects a garbage signature', () => {
    expect(verifySignedId('photo-1', 'not-a-real-signature')).toBe(false)
  })

  it('rejects a missing signature', () => {
    expect(verifySignedId('photo-1', undefined)).toBe(false)
  })

  it('rejects a non-string signature without throwing', () => {
    expect(verifySignedId('photo-1', ['photo-1'])).toBe(false)
  })
})

describe('withDownloadSignatures', () => {
  it('adds a download_sig to every photo with an id', () => {
    const photos = [{ id: 'a' }, { id: 'b' }]
    const signed = withDownloadSignatures(photos) as Array<{ id: string; download_sig: string }>

    expect(signed[0].download_sig).toBe(signId('a'))
    expect(signed[1].download_sig).toBe(signId('b'))
  })

  it('leaves entries without an id untouched', () => {
    const photos = [{ title: 'no id here' }]
    const signed = withDownloadSignatures(photos) as Array<Record<string, unknown>>

    expect(signed[0]).toEqual({ title: 'no id here' })
  })

  it('returns non-array input unchanged', () => {
    const payload = { data: 'not an array' }
    expect(withDownloadSignatures(payload)).toBe(payload)
  })
})
