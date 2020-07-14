import Head from 'next/head'
import User from './User/User'

import styles from './layout.module.css'

export const siteTitle = 'Unsplash Profile with Nextjs'

const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={siteTitle} />
				{/* <meta property="og:image" content={img} /> */}
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="robots" content="noindex" />

				{/* PINTEREST */}
				<script async defer data-pin-hover="true" data-pin-tall="true" src="//assets.pinterest.com/js/pinit.js"></script>
			</Head>

			<User />

			<main>{children}</main>

			<div id="credits">Made with &hearts; by <a href="https://twitter.com/_nnaro_" target="_blank" rel="noopener">@_nnaro_</a></div>
		</div>
	)
}

export default Layout