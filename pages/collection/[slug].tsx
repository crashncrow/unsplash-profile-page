import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { GetServerSideProps } from 'next'

// Components
import Gallery from '../../components/Gallery/Gallery'
import Collections from '../../components/Collections/Collections'


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

	return {
		props: {
			query: query
		}
	}
}

const Collection = ({ query }) => {
	
	return (
		<Layout>

			<Head>
				<title>{query.slug.replace(/\-+/g, ' ')} - {siteTitle}</title>
			</Head>

			<Collections id={query.id} />

			<Gallery id_collection={query.id} />

		</Layout>
	)
}


export default Collection