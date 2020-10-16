import Head from 'next/head'
import Layout, { siteTitle } from 'components/Layout'
import Gallery from 'components/Gallery'
import Stats from 'components/Stats'
import Collections from 'components/Collections'

export async function getStaticProps() {
  
  const res = await fetch(`${process.env.NEXT_API_URL}/api/photo`)
  const json = await res.json()
  if (res.status !== 200) {
    console.error(json)
    throw new Error('Failed to fetch API')
  }

  const data = JSON.parse(JSON.stringify(json))

  return {
    props: {
      data
    },
    revalidate: 86400
  }
}

const Home = (data) => {
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
