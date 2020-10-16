// import useSWR from 'swr'
// import fetcher from 'libs/fetcher'
import styles from './Gallery.module.css'
import UImage from 'components/UImage'

const Gallery = ({ data }) => {
  return (
    <section className={styles.gallery_container}>
      {data.data.map(({ id, urls, alt_description, description, blur_hash, height, width }) => (
        <UImage
          id={id}
          height={height * 340 / width} 
          width={"340"} 
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
