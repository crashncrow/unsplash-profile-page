import { NextApiRequest, NextApiResponse } from 'next'
import { trackUnsplashDownload, unsplashJson } from 'libs/unsplash'

export default function download(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req

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
            res.json(error)
            res.status(405).end()
            resolve()
          })
      })
      .catch((error) => {
        res.json(error)
        res.status(405).end()
        resolve()
      })
  })
}
