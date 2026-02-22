import { NextApiRequest, NextApiResponse } from 'next'
import { getUnsplashUser, sendCachedJson, unsplashJson } from 'libs/unsplash'

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const json = await unsplashJson(`/users/${getUnsplashUser()}`)
    sendCachedJson(res, json)
  } catch (error) {
    res.status(405).json(error)
  }
}
