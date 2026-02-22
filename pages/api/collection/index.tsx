import { NextApiRequest, NextApiResponse } from 'next'
import slug from 'libs/slug'
import { getUnsplashUser, sendCachedJson, unsplashJson } from 'libs/unsplash'

export default async function getCollections(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const json = await unsplashJson(
      `/users/${getUnsplashUser()}/collections?page=1&per_page=15&order_by=updated`
    )

    if (Array.isArray(json)) {
      json.forEach((c) => {
        if (c?.title) c.slug = slug(c.title)
      })
    }

    sendCachedJson(res, json)
  } catch (error) {
    res.status(405).json(error)
  }
}
