import styles from './Credits.module.css'

const Credits = () => {
  return (
    <div className={styles.credits}>
      <div className={styles.creditsPrimary}>
        Made with &hearts; by{' '}
        <a href='https://x.com/_nnaro_' target='_blank' rel='noopener noreferrer'>
          @_nnaro_
        </a>
      </div>

      <div className={styles.creditsSecondary}>
        <a
          className={styles.repoLink}
          href='https://github.com/crashncrow/unsplash-profile-page'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='View source on GitHub'
        >
          <span className={styles.repoLinkIcon} aria-hidden='true'>
            <img src='/images/github.svg' alt='' width={16} height={16} decoding='async' />
          </span>
          <span className={styles.repoLinkText}>View source on GitHub</span>
        </a>
      </div>
    </div>
  )
}

export default Credits
