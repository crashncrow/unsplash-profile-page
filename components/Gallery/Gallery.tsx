import UImage from '../UImage/UImage'
import styles from './Gallery.module.css'

const Gallery = ({ photos }) => {
    return (
    <section className={styles.gallery_container} key="photos_container">
        {photos.map(({ id, urls, links, alt_description }) => (
            <UImage 
                id={id} 
                urls={urls} 
                links={links} 
                alt_description={alt_description} 
                key={id + '_component'}
                />
        ))}
    </section>
    )
}

export default Gallery