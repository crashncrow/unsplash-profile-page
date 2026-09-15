import styles from './UIcon.module.css'

interface UIconProps {
  url: string
  name: string
}

const UIcon = ({ url, name }: UIconProps) => {
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
