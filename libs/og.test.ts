import { describe, expect, it } from 'vitest'
import ogImage, { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, pageUrl } from './og'

describe('ogImage', () => {
  it('replaces the size params with the card size', () => {
    const url = new URL(
      ogImage('https://images.unsplash.com/photo-1?ixid=abc&fit=max&q=80&w=1080')
    )

    expect(url.searchParams.get('w')).toBe(String(OG_IMAGE_WIDTH))
    expect(url.searchParams.get('h')).toBe(String(OG_IMAGE_HEIGHT))
    expect(url.searchParams.get('fit')).toBe('crop')
    expect(url.searchParams.getAll('w')).toHaveLength(1)
  })

  it('keeps the other params', () => {
    const url = new URL(
      ogImage('https://images.unsplash.com/photo-1?ixid=abc&fit=max&q=80&w=1080')
    )

    expect(url.searchParams.get('ixid')).toBe('abc')
    expect(url.searchParams.get('q')).toBe('80')
  })

  it('returns null without a url', () => {
    expect(ogImage(null)).toBeNull()
    expect(ogImage(undefined)).toBeNull()
  })

  it('returns null for an invalid url', () => {
    expect(ogImage('not a url')).toBeNull()
  })
})

describe('pageUrl', () => {
  it('joins the path with the site url', () => {
    expect(pageUrl('/collection/1', 'https://example.com')).toBe(
      'https://example.com/collection/1'
    )
  })

  it('drops the query string and hash', () => {
    expect(pageUrl('/?utm_source=x#top', 'https://example.com')).toBe(
      'https://example.com/'
    )
  })

  it('returns null when the site url is unknown or invalid', () => {
    expect(pageUrl('/', undefined)).toBeNull()
    expect(pageUrl('/', 'not a url')).toBeNull()
  })
})
