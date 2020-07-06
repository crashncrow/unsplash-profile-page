import Link from 'next/link'
import styles from './Collections.module.css'

const Collections = ({ collections }) => {
    return (
        <div className={styles.chips}>
        {collections.map(( col ) => (
            
            (collections.length == 1) ?

            <Link 
                href="/" 
                key={`collection_${col.slug}`}>
                <a className={styles.chip}>
                    {col.title}
                    {
                    (collections.length == 1) ?
                        <Link href="/">
                        <button type="button" className={styles.chip_remove}></button>
                        </Link>
                    : ''
                    }
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
