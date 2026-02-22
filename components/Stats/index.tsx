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

const Stats = () => {
  const { data, error } = useSWR<StatsData>('/api/stats', fetcher)

  if (error) return <div>failed to load</div>

  return (
    <div className={styles.stats_container}>
      <strong>Stats </strong>
      downloads: {data ? compactNumber.format(data.downloads.total) : '...'} | 
      views:{' '}
      {data ? compactNumber.format(data.views.total) : '...'} 
    </div>
  )
}

export default Stats
