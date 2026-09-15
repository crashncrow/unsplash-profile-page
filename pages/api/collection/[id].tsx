import { NextApiRequest, NextApiResponse } from 'next'
import { sendApiError, sendCachedJson, unsplashJson } from 'libs/unsplash'

export default async function getCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req

  try {
    const json = await unsplashJson(`/collections/${id.toString()}`)
    sendCachedJson(res, [json])
  } catch (error) {
    sendApiError(res, error)
  }
}
