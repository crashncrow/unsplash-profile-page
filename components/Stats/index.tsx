import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import styles from './Stats.module.css'

interface StatsData {
  downloads: { total: number }
  views: { total: number }
}

const Stats = () => {
  const { data, error } = useSWR<StatsData>('/api/stats', fetcher)

  if (error) return <div>failed to load</div>

  return (
    <div className={styles.stats_container}>
      <strong>Stats </strong>
      downloads: {data ? data.downloads.total : '...'} | 
      views:{' '}{data ? data.views.total : '...'} 
    </div>
  )
}

export default Stats
