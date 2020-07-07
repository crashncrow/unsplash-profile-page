import useSWR from 'swr'
import fetcher from "../../libs/fetcher"

import styles from './Stats.module.css'

const Stats = () => {
	const { data, error } = useSWR('/api/stats', fetcher)

	if (error) return <div>failed to load</div>

	if (!data) return <div>loading...</div>

	return (
		<div className={styles.stats_container}>
			<strong>Stats</strong> downloads: {data.downloads.total} | views: {data.views.total} | likes: {data.likes.total}
		</div>
	)
}

export default Stats