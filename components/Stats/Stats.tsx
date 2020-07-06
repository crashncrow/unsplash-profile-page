import styles from './Stats.module.css'

const Stats = ({ stats }) => {
    return (
        <div className={styles.stats_container}>
          <strong>Stats</strong> downloads: {stats.downloads.total} | views: {stats.views.total} | likes: {stats.likes.total}
        </div>
    )
}

export default Stats