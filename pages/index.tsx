import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { GetServerSideProps } from 'next'

// Components
import Gallery from '../components/Gallery/Gallery'
import Stats from '../components/Stats/Stats'
import Collections from '../components/Collections/Collections'

// Clients
import unsplashSetup from '../clients/unsplash'

export const getServerSideProps: GetServerSideProps = async () => {
	const { ...unsplashClient } = await unsplashSetup()
	const userPhotos = await unsplashClient.getPhotos()

	return {
		props: {
			photos: userPhotos,
		}
	}
}

const Home = ({ photos }) => {
	return (
		<Layout img={photos[0].urls.regular}>

			<Head>
				<title>{siteTitle}</title>
			</Head>

			<Stats />

			<Collections id="0" />

			<Gallery id_collection="0" />

		</Layout>
	)
}

export default Home 