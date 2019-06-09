import { LocalStorage } from './storage'

const ARTWORK_KEY = '__PIXEL_PAINT_ARTWORK__'

const insertArray = (arr, val, compare, max) => {
  const index = arr.findIndex(compare)

  if (index >= 0) {
    arr[index] = Object.assign({}, arr[index], val)
  } else {
    arr.unshift(val)
  }

  if (max && arr.length > max) {
    arr.pop()
  }
}

const deleteFromArray = (arr, compare) => {
  const index = arr.findIndex(compare)

  if (index > -1) {
    arr.splice(index, 1)
  }
}

export const loadArtwork = () => {
  return LocalStorage.get(ARTWORK_KEY)
}

export const saveArtwork = artwork => {
  let artworks = LocalStorage.get(ARTWORK_KEY, [])

  insertArray(artworks, artwork, item => {
    return artwork.id === item.id
  })

  return LocalStorage.set(ARTWORK_KEY, artworks)
}

export const deleteArtwork = artwork => {
  let artworks = LocalStorage.get(ARTWORK_KEY, [])

  deleteFromArray(artworks, item => {
    return item.id === artwork.id
  })

  return LocalStorage.set(ARTWORK_KEY, artworks)
}
