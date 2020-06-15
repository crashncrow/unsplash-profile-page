import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

import Uimage from '../components/uimage'
import Uicon from '../components/uicon'
import utilStyles from '../styles/utils.module.css'

import { getUserInfo } from '../lib/user'
import { getUserPhotos } from '../lib/photos'

export async function getStaticProps() {

  const userInfo   = await getUserInfo( { 
    unsplash_access_key: process.env.UNSPLASH_ACCESS_KEY,
    unsplash_user: process.env.UNSPLASH_USER
  } )

  const userPhotos = await getUserPhotos( { 
    unsplash_access_key: process.env.UNSPLASH_ACCESS_KEY,
    unsplash_user: process.env.UNSPLASH_USER
  } )

  return {
    props: {
      userInfo,
      userPhotos
    }
  }
}

export default function Home ({ userInfo, userPhotos }) {
  return (
    <Layout username={userInfo.name} avatar={userInfo.profile_image.large} bio={userInfo.bio} img={userPhotos[0].urls.regular}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} key="social_icons_container">
        <div className={utilStyles.social_container}>
          {
            userInfo.twitter_username ?
            <Uicon url={ "https://www.twitter.com/" + userInfo.twitter_username } name="twitter" />
            :
            ''
          }
          {
            userInfo.instagram_username ?
            <Uicon url={ "https://www.instagram.com/" + userInfo.instagram_username } name="instagram" />
            :
            ''
          }
          { userInfo.username ?
            <Uicon url={ "https://www.unsplash.com/@" + userInfo.username } name="unsplash" />
            :
            ''
          }
        </div>
      </section>
    
      <section className={utilStyles.headingPhotos} key="photos_from_unsplash">
        {userPhotos.map(({ id, urls, links, alt_description }) => (
            <Uimage id={id} urls={urls} links={links} alt_description={alt_description} key={id + '_component'}/>
          ))}
      </section>

    </Layout>
  )
}