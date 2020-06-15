import Unsplash, { toJson } from "unsplash-js";
import fetch from 'node-fetch'
global.fetch = fetch;

export async function getUserInfo({ unsplash_access_key, unsplash_user }) {

  const u = new Unsplash({ accessKey: unsplash_access_key })

  const user = await u.users.profile(unsplash_user)
    .then(toJson)
    .then(json => {
      return json
    });

  return user;
}