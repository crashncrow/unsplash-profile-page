import UIcon from '../UIcon/UIcon'
import styles from './Social.module.css'

export default function Social({ user }) {
    return (
        <div className={styles.social_container}>
          {
            user.twitter_username ?
            <UIcon url={ "https://www.twitter.com/" + user.twitter_username } name="twitter" />
            :
            ''
          }
          {
            user.instagram_username ?
            <UIcon url={ "https://www.instagram.com/" + user.instagram_username } name="instagram" />
            :
            ''
          }
          { user.username ?
            <UIcon url={ "https://www.unsplash.com/@" + user.username } name="unsplash" />
            :
            ''
          }
        </div>
    )
}