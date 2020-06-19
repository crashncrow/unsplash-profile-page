// import styles from './UImage.module.css'
import Uicon from '../UIcon/UIcon'
import utilStyles from '../../styles/utils.module.css'

export default function Social({ user }) {
    return (
        <div className={utilStyles.social_container}>
          {
            user.twitter_username ?
            <Uicon url={ "https://www.twitter.com/" + user.twitter_username } name="twitter" />
            :
            ''
          }
          {
            user.instagram_username ?
            <Uicon url={ "https://www.instagram.com/" + user.instagram_username } name="instagram" />
            :
            ''
          }
          { user.username ?
            <Uicon url={ "https://www.unsplash.com/@" + user.username } name="unsplash" />
            :
            ''
          }
        </div>
    )
}