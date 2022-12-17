export const resizeImage = (src, width) => {
  let imageUrl = new URL(src)

  // only supports unsplash
  if (!imageUrl.hostname.includes('unsplash')) {
    return src
  }
  let params = new URLSearchParams(imageUrl.search)
  params.set('w', width)
  imageUrl.search = params
  return imageUrl.toString()
}
