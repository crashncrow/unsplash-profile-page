import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import Link from 'next/link'
import styles from './Collections.module.css'

interface CollectionProps {
  id_collection?: number
}

interface CollectionItem {
  id: number
  title: string
  slug: string
}

const Collections = ({ id_collection }: CollectionProps) => {
  const { data, error } = useSWR<CollectionItem[]>(
    '/api/collection' + (id_collection ? `/${id_collection}` : ''),
    fetcher
  )
  const title = id_collection ? 'Collection' : 'Collections'

  if (error) {
    return (
      <div className={styles.chips} aria-label="Collections unavailable">
        <p className={styles.chips_title}>{title}</p>
        <span className={`${styles.chip} ${styles.chip_muted}`}>Collections unavailable</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={styles.chips} aria-label="Loading collections">
        <p className={styles.chips_title}>{title}</p>
        <span className={`${styles.chip} ${styles.chip_skeleton}`} aria-hidden="true" />
        <span className={`${styles.chip} ${styles.chip_skeleton}`} aria-hidden="true" />
        <span className={`${styles.chip} ${styles.chip_skeleton} ${styles.chip_skeleton_sm}`} aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={styles.chips}>
      <p className={styles.chips_title}>{title}</p>
      {data.map(({ id, title, slug }) =>
        id_collection ? (
          <span className={`${styles.chip} ${styles.chip_selected}`} key={`collection_${slug}`}>
            {title}
            <Link
              href="/"
              className={styles.chip_remove}
              aria-label="Return to home"
            />
          </span>
        ) : (
          <Link
            href={`/collection/${id}`}
            key={`collection_${slug}`}
            className={styles.chip}
          >
            {title}
          </Link>
        )
      )}
    </div>
  )
}

export default Collections
