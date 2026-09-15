import { NextApiRequest, NextApiResponse } from 'next'
import { sendApiError, trackUnsplashDownload, unsplashJson } from 'libs/unsplash'
import { verifySignedId } from 'libs/sign'

export default function download(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, sig },
  } = req

  if (!verifySignedId(id.toString(), sig)) {
    return sendApiError(res, { status: 403, message: 'Invalid signature' })
  }

  return new Promise<void>((resolve) => {
    unsplashJson(`/photos/${id.toString()}`)
      .then((json) => {
        trackUnsplashDownload(json?.links?.download_location)

        const filePath = json.links.download
        const fileName = id + '.jpg'

        res.setHeader('content-disposition', 'attachment; filename=' + fileName)

        fetch(filePath)
          .then(async (r) => Buffer.from(await r.arrayBuffer()))
          .then((buff) => {
            res.end(buff)
            resolve()
          })
          .catch((error) => {
            sendApiError(res, error)
            resolve()
          })
      })
      .catch((error) => {
        sendApiError(res, error)
        resolve()
      })
  })
}
