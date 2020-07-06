import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/layout'
import { GetServerSideProps } from 'next'

// Components
import Gallery from '../../components/Gallery/Gallery'
import Collections from '../../components/Collections/Collections'

// Clients
import unsplashSetup from '../../clients/unsplash'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const {...unsplashClient } = await unsplashSetup()
    const userInfo   = await unsplashClient.getUser()
    const userPhotos = await unsplashClient.getCollectionPhotos(query.id)
    const collection = await unsplashClient.getCollection(query.id)
  
    return { 
      props: { 
        photos: userPhotos, 
        user: userInfo,
        collection: collection
      } 
    }
}

const Collection = ({ photos, user, collection }) => {
  
    return (
        <Layout user={user} img={photos[0].urls.regular}>
      
          <Head>
              <title>{collection.title}</title>
          </Head>

          <Collections collections={[collection]} />

          <Gallery photos={photos} />

        </Layout>
    )
    
}

export default Collection