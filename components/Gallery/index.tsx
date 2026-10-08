import UImage from 'components/UImage'

interface Photo {
  id: string
  urls: { small: string }
  alt_description?: string | null
  description?: string | null
  blur_hash?: string | null
  height: number
  width: number
  download_sig?: string
}

interface GalleryProps {
  data: unknown
}

const normalizePhotos = (payload: unknown): Photo[] => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray((payload as { data?: unknown })?.data)) return (payload as { data: Photo[] }).data
  if (Array.isArray((payload as { response?: unknown })?.response)) return (payload as { response: Photo[] }).response
  return []
}

const Gallery = ({ data }: GalleryProps) => {
  const photos = normalizePhotos(data)

  return (
    <section className="mt-2 columns-3 gap-4 max-[990px]:columns-2 max-[990px]:gap-3.5 max-[790px]:columns-1 max-[790px]:gap-3">
      {photos.map(({ id, urls, alt_description, description, blur_hash, height, width, download_sig }) => (
        <UImage
          id={id}
          height={height * 790 / width}
          width={"790"}
          urls={urls}
          blurHash={blur_hash}
          altDescription={alt_description ? alt_description : description}
          downloadSig={download_sig}
          key={`${id}_uimage_component`}
        />
      ))}
    </section>
  )
}

export default Gallery
