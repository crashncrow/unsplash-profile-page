import { NextApiRequest, NextApiResponse } from 'next'
import { getUnsplashUser, sendCachedJson, unsplashJson } from 'libs/unsplash'

export default async function getStats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const json = await unsplashJson(
      `/users/${getUnsplashUser()}/statistics?resolution=days&quantity=30`
    )
    sendCachedJson(res, json)
  } catch (error) {
    res.status(405).json(error)
  }
}
