
import styles from './UImage.module.css'
import UIcon from 'components/UIcon'
import * as React from 'react'
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
    <div className={styles.card}>
      <BlurImg
          loading = {"lazy"}
          blurhash={blurHash}
          width={width}
          height={height}
          className={styles.img}
          src={urls.small}
          alt={altDescription || ''}
        />
      <div className={styles.actions}>
        <UIcon url={`/api/photo/download/${id}?sig=${downloadSig}`} name="download" />
      </div>
    </div>
  )
}

export default Uimage
