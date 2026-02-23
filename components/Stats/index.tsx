import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import styles from './Stats.module.css'

interface StatsData {
  downloads: { total: number }
  views: { total: number }
}

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3v10m0 0 4-4m-4 4-4-4M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const Stats = () => {
  const { data, error } = useSWR<StatsData>('/api/stats', fetcher)

  if (error) return <div>failed to load</div>

  return (
    <section className={styles.stats_container} aria-label="Unsplash stats">
      <p className={styles.stats_title}>Profile Stats</p>

      <div className={styles.stats_grid}>
        <div className={styles.stat_card}>
          <p className={styles.stat_label}>
            <span className={styles.stat_icon}>
              <DownloadIcon />
            </span>
            Downloads
          </p>
          <p className={styles.stat_value}>
            {data ? compactNumber.format(data.downloads.total) : '...'}
          </p>
        </div>

        <div className={styles.stat_card}>
          <p className={styles.stat_label}>
            <span className={styles.stat_icon}>
              <EyeIcon />
            </span>
            Views
          </p>
          <p className={styles.stat_value}>
            {data ? compactNumber.format(data.views.total) : '...'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Stats
