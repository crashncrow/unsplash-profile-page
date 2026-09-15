import { NextApiRequest, NextApiResponse } from 'next'
import { sendApiError, sendCachedJson, unsplashJson } from 'libs/unsplash'
import { verifySignedId } from 'libs/sign'

export default async function getCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, sig },
  } = req

  if (!verifySignedId(id.toString(), sig)) {
    return sendApiError(res, { status: 403, message: 'Invalid signature' })
  }

  try {
    const json = await unsplashJson(`/collections/${id.toString()}`)
    sendCachedJson(res, [json])
  } catch (error) {
    sendApiError(res, error)
  }
}
