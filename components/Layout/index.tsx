import type { ReactNode } from 'react'
import Head from 'next/head'
import User from 'components/User'
import Credits from 'components/Credits'

import styles from './layout.module.css'

export const siteTitle = 'Unsplash Profile with Nextjs'

interface LayoutProps {
  children: ReactNode
  title?: string | null
  description?: string | null
  ogImage?: string | null
}

const Layout = ({ children, title, description, ogImage }: LayoutProps) => {
  const pageTitle = title || siteTitle
  const pageDescription = description || siteTitle

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content={pageDescription} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        {ogImage && <meta property='og:image' content={ogImage} />}
        <meta name='twitter:card' content='summary_large_image' />
        {ogImage && <meta name='twitter:image' content={ogImage} />}
        <meta name='robots' content='noindex' />
      </Head>

      <User />

      <main>{children}</main>

      <Credits />
    </div>
  )
}

export default Layout
