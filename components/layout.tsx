import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Social from './Social/Social'

export const siteTitle = 'Unsplash Profile Nextjs'

export default function Layout({children, user, img }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta property="og:image" content={img}/>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        
        <link rel="canonical" href="https://ge.nnaro.com" />

        {/* PINTEREST */}
        <script async defer data-pin-hover="true" data-pin-tall="true" src="//assets.pinterest.com/js/pinit.js"></script>
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a>
            <img
              src={user.profile_image.large}
              className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              alt={user.name}
            />
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{user.name}</a>
          </Link>
        </h2>
        
        <Social user={user}/>
        
        <p>{user.bio}</p>
      </header>

      <main>{children}</main>

      <div id="credits">Made with &hearts; by <a href="https://twitter.com/_nnaro_" target="_blank">@_nnaro_</a></div>
    </div>
  )
}