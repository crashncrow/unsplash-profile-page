import { NextApiRequest, NextApiResponse } from 'next'
import { getUnsplashUser, sendCachedJson, unsplashJson } from 'libs/unsplash'

export default async function getPhotos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const json = await unsplashJson(
      `/users/${getUnsplashUser()}/photos?page=1&per_page=50&order_by=latest`
    )
    sendCachedJson(res, json)
  } catch (error) {
    res.status(405).json(error)
  }
}
