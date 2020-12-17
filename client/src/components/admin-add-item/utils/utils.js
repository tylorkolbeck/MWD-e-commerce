export function createUrlsForImageFiles(imagesArray) {
  if (imagesArray.length) {
    return Promise.all(
      imagesArray.map(function (imageData) {
        if (imageData.file) {
          return imageData
            .url(imageData.file)
            .then((result) => ({ ...imageData, url: result }))
            .then((finalObject) => {
              delete finalObject.file
              return finalObject
            })
        } else {
          delete imageData.url
          return imageData
        }
      })
    )
  } else {
    return []
  }
}
