import useSWR from 'swr'
import fetcher from "../../libs/fetcher"
import Link from 'next/link'
import Social from '../Social/Social'

import styles from './User.module.css'
import utilStyles from '../../styles/utils.module.css'

const Collections = () => {
    const { data, error } = useSWR('/api/user', fetcher)

    if (error) return <div>failed to load</div>

    if (!data) return <div>loading...</div>

    return (
        <header className={styles.header}>
            <Link href="/">
            <a>
                <img
                src={data.profile_image.large}
                className={`${styles.headerImage} ${styles.borderCircle}`}
                alt={data.name}
                />
            </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
            <Link href="/">
                <a className={utilStyles.colorInherit}>{data.name}</a>
            </Link>
            </h2>
            
            <Social user={data}/>
            
            <p>{data.bio}</p>
        </header>
    )
}

export default Collections