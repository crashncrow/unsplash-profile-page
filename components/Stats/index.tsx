import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import { Download, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface StatsData {
  downloads: { total: number }
  views: { total: number }
}

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const titleClass =
  'text-xs leading-none font-bold tracking-[0.12em] text-muted-foreground uppercase'
const statCardClass = 'items-center gap-1 rounded-lg px-2 py-2.5 shadow-none'
const labelClass =
  'inline-flex items-center justify-center gap-1 text-[0.7rem] leading-tight tracking-[0.08em] text-muted-foreground uppercase'
const valueClass =
  'flex min-h-6 items-center justify-center text-[1.35rem] leading-none font-bold max-[480px]:text-[1.15rem]'
const valueSkeletonClass = 'h-5 w-[78px] max-w-[70%] rounded-full'

const Stats = () => {
  const { data, error } = useSWR<StatsData>('/api/stats', fetcher)
  const isLoading = !data && !error

  const downloadsValue = error
    ? 'N/A'
    : data
      ? compactNumber.format(data.downloads.total)
      : null

  const viewsValue = error
    ? 'N/A'
    : data
      ? compactNumber.format(data.views.total)
      : null

  return (
    <section className="mx-auto mt-2 mb-3 max-w-[680px]" aria-label="Unsplash stats">
      <Card className="gap-2.5 bg-muted/40 px-3.5 py-3 text-center shadow-none max-[480px]:p-3">
        <p className={titleClass}>Profile Stats</p>

        <div className="grid grid-cols-2 gap-2">
          <Card className={statCardClass}>
            <p className={labelClass}>
              <Download className="size-3.5" aria-hidden="true" />
              Downloads
            </p>
            <div className={valueClass}>
              {isLoading ? <Skeleton className={valueSkeletonClass} aria-hidden="true" /> : downloadsValue}
            </div>
          </Card>

          <Card className={statCardClass}>
            <p className={labelClass}>
              <Eye className="size-3.5" aria-hidden="true" />
              Views
            </p>
            <div className={valueClass}>
              {isLoading ? <Skeleton className={valueSkeletonClass} aria-hidden="true" /> : viewsValue}
            </div>
          </Card>
        </div>
      </Card>
    </section>
  )
}

export default Stats
