import useSWR from 'swr'
import fetcher from "../../libs/fetcher"
import UImage from '../UImage/UImage'
import styles from './Gallery.module.css'

const Gallery = ({ id_collection }) => {
    const { data, error } = useSWR('/api/photo' + (id_collection > 0 ? `/${id_collection}`: ''), fetcher)

    if (error) return <div>failed to load</div>

    if (!data) return <div>loading...</div>

    return (
    <section className={styles.gallery_container} key="photos_container">
        {data.map(({ id, urls, links, alt_description, description }) => (
            <UImage 
                id={id} 
                urls={urls} 
                alt_description={alt_description ? alt_description : description} 
                key={id + '_component'}
                />
        ))}
    </section>
    )
}

export default Gallery