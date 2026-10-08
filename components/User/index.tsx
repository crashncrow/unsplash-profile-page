import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import Link from 'next/link'
import Social from 'components/Social'
import { Skeleton } from '@/components/ui/skeleton'

interface UserData {
  name: string
  bio?: string
  username?: string
  twitter_username?: string | null
  instagram_username?: string | null
  profile_image: {
    large: string
  }
}

const User = () => {
  const { data, error } = useSWR<UserData>('/api/user', fetcher)

  return (
    <header className="flex flex-col items-center">
      <Link href="/">
        {data ? (
          <img
            src={data.profile_image.large}
            className="size-24 rounded-full"
            alt={data.name}
            width={96}
            height={96}
            decoding="async"
          />
        ) : (
          <Skeleton className="size-24 rounded-full" aria-hidden="true" />
        )}
      </Link>
      <div className="my-4 flex min-h-[2.1rem] items-center">
        {data ? (
          <h2 className="text-2xl leading-[1.4] font-bold">
            <Link href="/" className="hover:underline">
              {data.name}
            </Link>
          </h2>
        ) : (
          <Skeleton className="h-5 w-[12ch] max-w-[70vw] rounded-full" aria-hidden="true" />
        )}
      </div>

      {data ? (
        <Social user={data} />
      ) : (
        <div
          className="mt-1 mb-2 flex min-h-[60px] items-center justify-center gap-2"
          aria-hidden="true"
        >
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="size-7 rounded-full" />
        </div>
      )}

      <div className="flex min-h-[1.6em] items-center justify-center text-center">
        {error ? (
          <p>Profile unavailable</p>
        ) : data ? (
          <p>{data.bio || ''}</p>
        ) : (
          <Skeleton className="h-4 w-[min(42ch,78vw)] rounded-full" aria-hidden="true" />
        )}
      </div>
    </header>
  )
}

export default User
