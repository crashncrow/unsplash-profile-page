import Unsplash, { toJson } from "unsplash-js";
import fetch from 'node-fetch'
global.fetch = fetch;

export async function getUserPhotos({ unsplash_access_key, unsplash_user }) {

  const u = new Unsplash({ accessKey: unsplash_access_key })

  const photos = await u.users.photos(unsplash_user, 1, 50, "latest")
    .then(toJson)
    .then(json => {
      return json
    });

  return photos;
}