import Head from 'next/head'
import Layout, { siteTitle } from 'components/Layout'
import Gallery from 'components/Gallery'
import Stats from 'components/Stats'
import Collections from 'components/Collections'
import { getUnsplashUser, unsplashJson } from 'libs/unsplash'

export async function getStaticProps() {
  const json = await unsplashJson(
    `/users/${getUnsplashUser()}/photos?page=1&per_page=50&order_by=latest`
  )

  const data = JSON.parse(JSON.stringify(json))

  return {
    props: {
      data
    },
    revalidate: 86400
  }
}

const Home = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Stats />

      <Collections />

      <Gallery data={data}/>
    </Layout>
  )
}

export default Home
