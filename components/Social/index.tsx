import styles from './Social.module.css'
import UIcon from 'components/UIcon'

interface SocialUser {
  twitter_username?: string | null
  instagram_username?: string | null
  username?: string | null
}

interface SocialProps {
  user: SocialUser
}

const Social = ({ user }: SocialProps) => {
  return (
    <div className={styles.social_container}>
      {user.twitter_username && (
        <UIcon
          url={'https://x.com/' + user.twitter_username}
          name="x"
        />
      )}
      {user.instagram_username && (
        <UIcon
          url={'https://www.instagram.com/' + user.instagram_username}
          name="instagram"
        />
      )}
      {user.username && (
        <UIcon
          url={'https://www.unsplash.com/@' + user.username}
          name="unsplash"
        />
      )}
    </div>
  )
}

export default Social
