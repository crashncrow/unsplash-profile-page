import styles from './Social.module.css'
import UIcon from 'components/UIcon'

const Social = ({ user }) => {
  const xUsername = user.twitter_username

  return (
    <div className={styles.social_container}>
      {xUsername && (
        <UIcon
          url={'https://x.com/' + xUsername}
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
