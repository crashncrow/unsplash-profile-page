import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ErrorStateProps {
  code: string
  title: string
  description: string
}

const ErrorState = ({ code, title, description }: ErrorStateProps) => {
  return (
    <section className="mx-auto my-12 max-w-[480px]">
      <Card className="items-center gap-2 bg-muted/40 px-6 py-10 text-center shadow-none">
        <p className="text-xs leading-none font-bold tracking-[0.12em] text-muted-foreground uppercase">
          Error {code}
        </p>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mb-3 text-muted-foreground">{description}</p>
        <Button asChild className="rounded-full font-semibold">
          <Link href="/">Back to home</Link>
        </Button>
      </Card>
    </section>
  )
}

export default ErrorState
