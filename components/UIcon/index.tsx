import styles from './UIcon.module.css'

const UIcon = ({ url, name }) => {
  return (
    <a
      className={styles.icon}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
    >
      <img
        className={styles.icon_svg}
        src={`/images/${name}.svg`}
        alt=""
        width={20}
        height={20}
        decoding="async"
      />
    </a>
  )
}

export default UIcon
