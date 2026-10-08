import type { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import User from 'components/User'
import Stats from 'components/Stats'
import Credits from 'components/Credits'
import ThemeToggle from 'components/ThemeToggle'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, pageUrl } from 'libs/og'

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
  const router = useRouter()
  // Error pages have no address of their own worth sharing
  const isErrorPage = router.pathname === '/404' || router.pathname === '/500'
  const url = isErrorPage ? null : pageUrl(router.asPath)

  return (
    <div className="relative mx-auto mt-12 mb-24 max-w-[1080px] px-4 max-[790px]:mt-6 max-[790px]:mb-12 max-[790px]:px-3.5">
      <Head>
        <title>{pageTitle}</title>
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <meta name='description' content={pageDescription} />
        <meta property='og:type' content='website' />
        {url && <meta property='og:url' content={url} />}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        {ogImage && <meta property='og:image' content={ogImage} />}
        {ogImage && <meta property='og:image:width' content={String(OG_IMAGE_WIDTH)} />}
        {ogImage && <meta property='og:image:height' content={String(OG_IMAGE_HEIGHT)} />}
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
