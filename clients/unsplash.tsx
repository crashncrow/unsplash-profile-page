import useSWR from 'swr'
import Unsplash, { toJson } from "unsplash-js";
import fetch from 'node-fetch'
global.fetch = fetch;

const unsplash = async () => {

    const u = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY })
  
    const photos = () =>
      u.users.photos(process.env.UNSPLASH_USER , 1, 50, "latest")
      .then(toJson)
      .then(json => {
        return json
      })

    const user = () => 
      u.users.profile(process.env.UNSPLASH_USER)
      .then(toJson)
      .then(json => {
        return json
      });

    const getPhotos = () => photos()
    const getUser = () => user()

    return { getPhotos, getUser }
}

export default unsplash