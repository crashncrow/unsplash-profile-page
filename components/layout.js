import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'Unsplash Profile Nextjs'

export default function Layout({ children, username, avatar, bio, img }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta property="og:image" content={img}/>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* PINTEREST */}
        <script async defer data-pin-hover="true" data-pin-tall="true" src="//assets.pinterest.com/js/pinit.js"></script>
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a>
            <img
              src={avatar}
              className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              alt={username}
            />
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{username}</a>
          </Link>
        </h2>
        <p>
          {bio}
        </p>
      </header>
      <main>{children}</main>
    </div>
  )
}