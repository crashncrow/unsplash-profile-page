import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import Gallery from 'components/Gallery'
import Collections from 'components/Collections'
import { useRouter } from 'next/router'
import slug from 'libs/slug'
import { getUnsplashUser, unsplashJson } from 'libs/unsplash'
import { signId, withDownloadSignatures } from 'libs/sign'

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
  const [photosJson, userJson] = await Promise.all([
    unsplashJson(`/collections/${params.id}/photos`),
    unsplashJson(`/users/${getUnsplashUser()}`)
  ])

  const data = withDownloadSignatures(JSON.parse(JSON.stringify(photosJson)))
  const collectionSig = signId(params.id)
  const ogImage = data?.[0]?.urls?.regular ?? null
  const title = userJson?.name ? `${userJson.name} · Unsplash Profile` : null
  const description = userJson?.bio ?? null

  return {
    props: {
      data,
      collectionSig,
      ogImage,
      title,
      description
    },
    revalidate: 86400
  }
}

const Collection = ({ data, collectionSig, ogImage, title, description }) => {
  const router = useRouter()
  const collection_id = router.query.id
    ? parseInt(router.query.id.toString())
    : null
  return (
    <Layout ogImage={ogImage} title={title} description={description}>
      <Collections id_collection={collection_id} sig={collectionSig} />

      <Gallery data={data} />
    </Layout>
  )
}

export default Collection
