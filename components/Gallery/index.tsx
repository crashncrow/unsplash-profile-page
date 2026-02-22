// import useSWR from 'swr'
// import fetcher from 'libs/fetcher'
import styles from './Gallery.module.css'
import UImage from 'components/UImage'

const normalizePhotos = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.response)) return payload.response
  return []
}

const Gallery = ({ data }) => {
  const photos = normalizePhotos(data)

  return (
    <section className={styles.gallery_container}>
      {photos.map(({ id, urls, alt_description, description, blur_hash, height, width }) => (
        <UImage
          id={id}
          height={height * 790 / width} 
          width={"790"} 
          urls={urls}
          blurHash={blur_hash}
          altDescription={alt_description ? alt_description : description}
          key={`${id}_uimage_component`}
        />
      ))}
    </section>
  )
}

export default Gallery
