import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import User from './User/User'

export const siteTitle = 'Unsplash Profile with Nextjs'

const Layout = ({ children, img }) => {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={siteTitle} />
				<meta property="og:image" content={img} />
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />

				<link rel="canonical" href="https://ge.nnaro.com" />

				{/* PINTEREST */}
				<script async defer data-pin-hover="true" data-pin-tall="true" src="//assets.pinterest.com/js/pinit.js"></script>
			</Head>

			<User />

			<main>{children}</main>

			<div id="credits">Made with &hearts; by <a href="https://twitter.com/_nnaro_" target="_blank">@_nnaro_</a></div>
		</div>
	)
}

export default Layout