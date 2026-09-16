import { describe, expect, it } from 'vitest'
import slug from './slug'

describe('slug', () => {
  it('lowercases the string', () => {
    expect(slug('Drone Photography')).toBe('drone-photography')
  })

  it('replaces spaces with dashes', () => {
    expect(slug('street photos')).toBe('street-photos')
  })

  it('strips accents', () => {
    expect(slug('Fotografía Área')).toBe('fotografia-area')
  })

  it('only replaces single whitespace runs, not consecutive spaces', () => {
    expect(slug('a  b')).toBe('a--b')
  })
})
