import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import { sendApiError, trackUnsplashDownload, unsplashJson } from 'libs/unsplash'
import { verifySignedId } from 'libs/sign'

export default async function download(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, sig },
  } = req

  if (!verifySignedId(id.toString(), sig)) {
    return sendApiError(res, { status: 403, message: 'Invalid signature' })
  }

  try {
    const json = await unsplashJson(`/photos/${id.toString()}`)
    trackUnsplashDownload(json?.links?.download_location)

    const imageRes = await fetch(json.links.download)

    if (!imageRes.ok || !imageRes.body) {
      throw Object.assign(new Error('Failed to fetch image'), { status: imageRes.status || 502 })
    }

    res.setHeader('content-disposition', `attachment; filename=${id}.jpg`)

    await new Promise<void>((resolve, reject) => {
      const stream = Readable.fromWeb(imageRes.body as any)
      stream.on('error', reject)
      res.on('finish', resolve)
      stream.pipe(res)
    })
  } catch (error) {
    if (res.headersSent) {
      res.end()
      return
    }
    sendApiError(res, error)
  }
}
