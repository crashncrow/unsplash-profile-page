import useSWR from 'swr'
import Unsplash, { toJson } from "unsplash-js";
import fetch from 'node-fetch'
global.fetch = fetch;


const slug = (str:string) => {
  // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  return str.toLowerCase().replace(/\s/g , "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

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

    const stats = () =>
      u.users.statistics(process.env.UNSPLASH_USER, "days", 30)
      .then(toJson)
      .then(json => {
        return json
      });

    const collection = (id: number) =>
      u.collections.getCollection(id)
      .then(toJson)
      .then(json => {
        return json
      });

    const collections = () =>
      u.users.collections(process.env.UNSPLASH_USER, 1, 15, "updated")
      .then(toJson)
      .then(json => {
        json.map((c)=>(
          c.slug = slug(c.title)
        ))
        return json
      });

    const collectionPhotos = (id: number) =>
      u.collections.getCollectionPhotos(id)
      .then(toJson)
      .then(json => {
        return json
      });

    const getPhotos = () => photos()
    const getUser = () => user()
    const getStats = () => stats()

    const getCollection = (id) => collection(id)
    const getCollections = () => collections()
    const getCollectionPhotos = (id) => collectionPhotos(id)


    return { getPhotos, getUser, getStats, getCollection, getCollections, getCollectionPhotos }
}

export default unsplash