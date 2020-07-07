import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/layout'
import { GetServerSideProps } from 'next'

// Components
import Gallery from '../../components/Gallery/Gallery'
import Collections from '../../components/Collections/Collections'

// Clients
import unsplashSetup from '../../clients/unsplash'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

	const { ...unsplashClient } = await unsplashSetup()
	const userPhotos = await unsplashClient.getCollectionPhotos(query.id)
	const collection = await unsplashClient.getCollection(query.id)

	return {
		props: {
			photos: userPhotos,
			collection: collection,
			query: query
		}
	}
}

const Collection = ({ query, photos, collection }) => {

	return (
		<Layout img={photos[0].urls.regular}>

			<Head>
				<title>{collection.title}</title>
			</Head>

			<Collections id={[query.id]} />

			<Gallery id_collection={[query.id]} />

		</Layout>
	)

}

export default Collection