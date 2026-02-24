import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import Link from 'next/link'
import styles from './User.module.css'
import Social from 'components/Social'

interface UserData {
  name: string
  bio?: string
  profile_image: {
    large: string
  }
}

const User = () => {
  const { data, error } = useSWR<UserData>('/api/user', fetcher)
  const isLoading = !data && !error

  return (
    <header className={styles.header}>
      <Link href="/">
        {data ? (
          <img
            src={data.profile_image.large}
            className={`${styles.headerImage} ${styles.borderCircle}`}
            alt={data.name}
            width={96}
            height={96}
            decoding="async"
          />
        ) : (
          <span
            className={`${styles.headerImage} ${styles.borderCircle} ${styles.avatarSkeleton}`}
            aria-hidden="true"
          />
        )}
      </Link>
      <h2 className={styles.headingLg}>
        <Link href="/">
          {data ? (
            data.name
          ) : (
            <span className={styles.nameSkeleton} aria-hidden="true" />
          )}
        </Link>
      </h2>

      {data ? (
        <Social user={data} />
      ) : (
        <div className={styles.socialSkeletonRow} aria-hidden="true">
          <span className={styles.socialSkeleton} />
          <span className={styles.socialSkeleton} />
          <span className={styles.socialSkeleton} />
        </div>
      )}

      <p className={styles.bio}>
        {error ? (
          'Profile unavailable'
        ) : data ? (
          data.bio || ''
        ) : (
          <span className={styles.bioSkeleton} aria-hidden="true" />
        )}
      </p>
    </header>
  )
}

export default User
