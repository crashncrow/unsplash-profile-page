import Head from 'next/head'
import Layout, { siteTitle } from 'components/Layout'
import Gallery from 'components/Gallery'
import Collections from 'components/Collections'
import { useRouter } from 'next/router'

const Collection = ({ query }) => {
  const router = useRouter()
  const slug = router.query.slug.toString().replace(/\-+/g, ' ')
  const collection_id = parseInt(router.query.id.toString())
  return (
    <Layout>

      <Head>
        <title>{slug} - {siteTitle}</title>
      </Head>

      <Collections id_collection={collection_id} />

      <Gallery id_collection={collection_id} />

    </Layout>
  )
}

export default Collection