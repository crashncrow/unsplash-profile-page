import { NextApiRequest, NextApiResponse } from 'next'
import { sendCachedJson, unsplashJson } from 'libs/unsplash'

export default function getCollectionPhotos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req

  return unsplashJson(`/collections/${id.toString()}/photos`)
    .then((json) => sendCachedJson(res, json))
    .catch((error) => res.status(405).json(error))
}
