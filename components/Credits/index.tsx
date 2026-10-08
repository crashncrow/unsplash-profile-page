import { GithubIcon } from 'components/Icons'

const Credits = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-12 text-center max-[480px]:gap-1.5">
      <div>
        Made with &hearts; by{' '}
        <a
          className="font-medium"
          href='https://nnaro.dev?utm_source=unsplash-profile-page'
          target='_blank'
          rel='noopener noreferrer'
        >
          nnaro.dev
        </a>
      </div>

      <div className="flex w-full justify-center text-sm text-muted-foreground">
        <a
          className="inline-flex max-w-full items-center justify-center gap-1.5 whitespace-nowrap transition-colors hover:text-foreground"
          href='https://github.com/crashncrow/unsplash-profile-page'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='View source on GitHub'
        >
          <GithubIcon className="size-4 shrink-0" />
          <span>View source on GitHub</span>
        </a>
      </div>
    </div>
  )
}

export default Credits
