
import styles from './UImage.module.css'
import UIcon from 'components/UIcon'
import * as React from 'react'
import { BlurImg } from 'components/BlurImg'

const Uimage = ({ id, urls, altDescription, blurHash, height, width }) => {
  return (
    <div>
      <BlurImg
          loading = {"lazy"}
          blurhash={blurHash}
          width={width}
          height={height}
          className={styles.img} 
          src={urls.small} 
          alt={altDescription}
        />
      <div className={styles.actions}>
        <UIcon url={`/api/photo/download/${id}`} name="download" />
      </div>
    </div>
  )
}

export default Uimage
