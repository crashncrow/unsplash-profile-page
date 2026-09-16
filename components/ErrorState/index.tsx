import Link from 'next/link'
import styles from './ErrorState.module.css'

interface ErrorStateProps {
  code: string
  title: string
  description: string
}

const ErrorState = ({ code, title, description }: ErrorStateProps) => {
  return (
    <section className={styles.error_container}>
      <p className={styles.error_code}>Error {code}</p>
      <h1 className={styles.error_title}>{title}</h1>
      <p className={styles.error_description}>{description}</p>
      <Link href="/" className={styles.error_link}>
        Back to home
      </Link>
    </section>
  )
}

export default ErrorState
