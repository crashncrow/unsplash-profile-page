import { NextApiRequest, NextApiResponse } from 'next'
import Unsplash, { toJson } from "unsplash-js"
import request from "request";
import fetch from 'node-fetch'
global.fetch = fetch

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  const u = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY })

  return u.photos.getPhoto(id.toString())
    .then(toJson)
    .then(json => {
      u.photos.downloadPhoto(json)

      // path to file
      const filePath = json.links.download;

      // filename only
      const fileName = id + ".jpg";

      // set header
      res.setHeader("content-disposition", "attachment; filename=" + fileName);

      // send request to the original file
      request
        .get(filePath) // download original image
        .on("error", function (err) {
          res.writeHead(404, { "Content-Type": "text/html" })
          res.write(err)
          res.end()
          return
        })
        .pipe(res); // pipe converted image to HTTP response

      // res.status(200).end()
    })
    .catch(error => {
      res.json(error)
      res.status(405).end()
    })
};