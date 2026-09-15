import Layout from 'components/Layout'
import Gallery from 'components/Gallery'
import Stats from 'components/Stats'
import Collections from 'components/Collections'
import { getUnsplashUser, unsplashJson } from 'libs/unsplash'
import { withDownloadSignatures } from 'libs/sign'

export async function getStaticProps() {
  const [photosJson, userJson] = await Promise.all([
    unsplashJson(`/users/${getUnsplashUser()}/photos?page=1&per_page=50&order_by=latest`),
    unsplashJson(`/users/${getUnsplashUser()}`)
  ])

  const data = withDownloadSignatures(JSON.parse(JSON.stringify(photosJson)))
  const ogImage = data?.[0]?.urls?.regular ?? null
  const title = userJson?.name ? `${userJson.name} · Unsplash Profile` : null
  const description = userJson?.bio ?? null

  return {
    props: {
      data,
      ogImage,
      title,
      description
    },
    revalidate: 86400
  }
}

const Home = ({ data, ogImage, title, description }) => {
  return (
    <Layout ogImage={ogImage} title={title} description={description}>
      <Stats />

      <Collections />

      <Gallery data={data}/>
    </Layout>
  )
}

export default Home
