import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

// Components
import Gallery from '../components/Gallery/Gallery'
import Stats from '../components/Stats/Stats'
import Collections from '../components/Collections/Collections'

const Home = () => {
	return (
		<Layout>

			<Head>
				<title>{siteTitle}</title>
			</Head>

			<Stats />

			<Collections />

			<Gallery />

		</Layout>
	)
}

export default Home 