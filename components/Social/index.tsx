import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { InstagramIcon, UnsplashIcon, XIcon } from 'components/Icons'

interface SocialUser {
  twitter_username?: string | null
  instagram_username?: string | null
  username?: string | null
}

interface SocialProps {
  user: SocialUser
}

interface SocialLinkProps {
  url: string
  name: string
  children: ReactNode
}

const SocialLink = ({ url, name, children }: SocialLinkProps) => (
  <Button asChild variant="ghost" size="icon" className="rounded-full [&_svg:not([class*='size-'])]:size-5">
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
      {children}
    </a>
  </Button>
)

const Social = ({ user }: SocialProps) => {
  return (
    <div className="mt-1 mb-2 flex min-h-[60px] items-center justify-center gap-1">
      {user.twitter_username && (
        <SocialLink url={'https://x.com/' + user.twitter_username} name="x">
          <XIcon />
        </SocialLink>
      )}
      {user.instagram_username && (
        <SocialLink
          url={'https://www.instagram.com/' + user.instagram_username}
          name="instagram"
        >
          <InstagramIcon />
        </SocialLink>
      )}
      {user.username && (
        <SocialLink
          url={'https://www.unsplash.com/@' + user.username}
          name="unsplash"
        >
          <UnsplashIcon />
        </SocialLink>
      )}
    </div>
  )
}

export default Social
