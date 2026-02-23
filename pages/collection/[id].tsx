import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from 'components/Layout'
import Gallery from 'components/Gallery'
import Collections from 'components/Collections'
import { useRouter } from 'next/router'
import slug from 'libs/slug'
import { getUnsplashUser, unsplashJson } from 'libs/unsplash'

// This function gets called at build time
export async function getStaticPaths() {
  const collections = await unsplashJson(
    `/users/${getUnsplashUser()}/collections?page=1&per_page=15&order_by=updated`
  )

  if (Array.isArray(collections)) {
    collections.forEach((c) => {
      if (c?.title) c.slug = slug(c.title)
    })
  }

  // Get the paths we want to pre-render based on collections
  const paths = collections.map((col) => ({
    params: { id: col.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps( {params} ) {
  const json = await unsplashJson(`/collections/${params.id}/photos`)

  const data = JSON.parse(JSON.stringify(json))

  return {
    props: {
      data
    },
    revalidate: 86400
  }
}

const Collection = ({ data }) => {
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
