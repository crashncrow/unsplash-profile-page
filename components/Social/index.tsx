import styles from './Social.module.css'
import UIcon from 'components/UIcon'

const Social = ({ user }) => {
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
