import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

// Components
import Gallery from '../components/Gallery/Gallery'

// Styles
import utilStyles from '../styles/utils.module.css'

// Clients
import unsplashSetup from '../clients/unsplash'

export const getServerSideProps = async () => {
  const {...unsplashClient } = await unsplashSetup()
  const userPhotos = await unsplashClient.getPhotos()
  const userInfo   = await unsplashClient.getUser()

  return { props: { photos: userPhotos, user: userInfo } }
}

export default function Home ({ photos, user }) {
  return (
    <Layout user={user} img={photos[0].urls.regular}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    
      <section className={utilStyles.headingPhotos} key="photos_container">
        <Gallery photos={photos} />
      </section>
    </Layout>
  )
}