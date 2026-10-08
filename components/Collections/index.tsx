import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface CollectionProps {
  id_collection?: number
}

interface CollectionItem {
  id: number
  title: string
  slug: string
}

const containerClass = 'mt-1.5 mb-3 px-3 py-2.5 text-center max-[480px]:px-2.5'
const titleClass =
  'mb-2 text-xs leading-none font-bold tracking-[0.08em] text-muted-foreground uppercase'
const listClass = 'flex flex-wrap justify-center gap-1.5'
const chipClass = 'h-7 bg-card px-3 text-[13px] font-normal shadow-xs'

const Collections = ({ id_collection }: CollectionProps) => {
  // Always list every collection so the pills stay in place between pages
  const { data, error } = useSWR<CollectionItem[]>('/api/collection', fetcher)
  const title = 'Collections'

  if (error) {
    return (
      <div className={containerClass} aria-label="Collections unavailable">
        <p className={titleClass}>{title}</p>
        <div className={listClass}>
          <Badge variant="outline" className={`${chipClass} text-muted-foreground shadow-none`}>
            Collections unavailable
          </Badge>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={containerClass} aria-label="Loading collections">
        <p className={titleClass}>{title}</p>
        <div className={listClass} aria-hidden="true">
          <Skeleton className="h-7 w-32 rounded-full" />
          <Skeleton className="h-7 w-32 rounded-full" />
          <Skeleton className="h-7 w-[92px] rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <p className={titleClass}>{title}</p>
      <div className={listClass}>
        {data.map(({ id, title, slug }) => {
          const selected = String(id) === String(id_collection)

          return (
            <Badge
              asChild
              variant={selected ? 'default' : 'outline'}
              className={`${chipClass} transition-all hover:-translate-y-px hover:shadow-md ${selected ? 'bg-primary' : ''}`}
              key={`collection_${slug}`}
            >
              {/* Clicking the selected pill again goes back to the home */}
              <Link
                href={selected ? '/' : `/collection/${id}`}
                aria-current={selected ? 'page' : undefined}
              >
                {title}
              </Link>
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

export default Collections
