import styles from './UIcon.module.css'

export default function Uicon({ url, name }) {
    return (
        <a className={styles.icon} href={url} target="_blank">
            <img className={styles.icon_svg} src={"images/" + name +".svg"} />
        </a>
    )
}