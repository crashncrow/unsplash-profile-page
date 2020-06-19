import styles from './UImage.module.css'
import UIcon from '../UIcon/UIcon'

export default function Uimage({ id, urls, links, alt_description }) {
    return (
        <div key={"uimg_container_" + id} >
            <img className={styles.img} src={urls.small} key={id + '_img'} alt={alt_description} />
            <div className={styles.actions}>
                <UIcon url={links.download} name="download" />
            </div> 
        </div>
    )
}