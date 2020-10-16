import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from 'components/Layout'
import Gallery from 'components/Gallery'
import Collections from 'components/Collections'
import { useRouter } from 'next/router'

// This function gets called at build time
export async function getStaticPaths() {
  
  // Call an external API endpoint to get collections
  const res = await fetch(`${process.env.NEXT_API_URL}/api/collection`)
  const collections = await res.json()

  // Get the paths we want to pre-render based on collections
  const paths = collections.map((col) => ({
    params: { id: col.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps( {params} ) {
  
  const res = await fetch(`${process.env.NEXT_API_URL}/api/photo/${params.id}`)

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

const Collection = (data) => {
  const router = useRouter()
  const collection_id = router.query.id
    ? parseInt(router.query.id.toString())
    : null
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Collections id_collection={collection_id} />

      <Gallery data={data} />
    </Layout>
  )
}

export default Collection
