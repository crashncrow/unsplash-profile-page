import type { ReactNode } from 'react'
import Head from 'next/head'
import User from 'components/User'
import Stats from 'components/Stats'
import Credits from 'components/Credits'
import ThemeToggle from 'components/ThemeToggle'

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
    <div className="relative mx-auto mt-12 mb-24 max-w-[1080px] px-4 max-[790px]:mt-6 max-[790px]:mb-12 max-[790px]:px-3.5">
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

      <ThemeToggle className="absolute top-0 right-4 max-[790px]:right-3.5" />

      <User />

      <Stats />

      <main>{children}</main>

      <Credits />
    </div>
  )
}

export default Layout
