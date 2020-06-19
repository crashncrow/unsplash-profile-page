import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

// Components
import Gallery from '../components/Gallery/Gallery'
import Stats from '../components/Stats/Stats'

// Clients
import unsplashSetup from '../clients/unsplash'

export const getServerSideProps = async () => {
  const {...unsplashClient } = await unsplashSetup()
  const userPhotos      = await unsplashClient.getPhotos()
  const userInfo        = await unsplashClient.getUser()
  const userStats       = await unsplashClient.getStats()
  const userCollections = await unsplashClient.getCollections()

  // console.log(userCollections);

  return { props: { photos: userPhotos, user: userInfo, stats: userStats, collections: userCollections } }
}

export default function Home ({ photos, user, stats, collections }) {
  return (
    <Layout user={user} img={photos[0].urls.regular}>
      
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Stats stats={stats} />
      
      <Gallery photos={photos} />

    </Layout>
  )
}