import useSWR from 'swr'
import fetcher from "../../libs/fetcher"
import Link from 'next/link'
import styles from './Collections.module.css'

interface CollectionProps {
    id?: number
}

const Collections  = ({ id } : CollectionProps ) => {
    const { data, error } = useSWR('/api/collection' + (id ? `/${id}` : ''), fetcher)

    if (error) return <div>failed to load</div>

    if (!data) return <div>loading...</div>

    return (
        <div className={styles.chips}>
            {data.map((col) => (

                (id > 1) ?

                    <Link
                        href="/"
                        key={`collection_${col.slug}`}>
                        <a className={styles.chip}>
                            {col.title}

                            <Link href="/">
                                <button type="button" className={styles.chip_remove} aria-label="Return to home"></button>
                            </Link>
                        </a>
                    </Link>

                    :
                    <Link
                        href="/collection/[slug]"
                        as={`/collection/${col.slug}?id=${col.id}`}
                        key={`collection_${col.slug}`}>

                        <a className={styles.chip}>
                            {col.title}
                        </a>
                    </Link>

            ))}
        </div>
    )
}

export default Collections
