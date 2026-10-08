import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlurImg } from 'components/BlurImg'

interface UImageProps {
  id: string
  urls: { small: string }
  altDescription?: string | null
  blurHash?: string | null
  height: number | string
  width: number | string
  downloadSig?: string
}

const Uimage = ({ id, urls, altDescription, blurHash, height, width, downloadSig }: UImageProps) => {
  return (
    <div className="relative mb-4 grid w-full break-inside-avoid max-[990px]:mb-3.5 max-[790px]:mb-3">
      <BlurImg
          loading = {"lazy"}
          blurhash={blurHash}
          width={width}
          height={height}
          className="inline-block h-auto w-full"
          src={urls.small}
          alt={altDescription || ''}
        />
      <div className="absolute right-3 bottom-3 z-1 flex items-center justify-end">
        <Button
          asChild
          size="icon-lg"
          className="rounded-xl bg-background/90 text-foreground shadow-md hover:-translate-y-px hover:bg-background hover:shadow-lg active:translate-y-0 [&_svg:not([class*='size-'])]:size-5"
        >
          <a
            href={`/api/photo/download/${id}?sig=${downloadSig}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="download"
          >
            <Download />
          </a>
        </Button>
      </div>
    </div>
  )
}

export default Uimage
