const fs = require('fs')
const _ = require('lodash')
const argv = require('optimist').argv
const sharp = require('sharp')
const getPixels = require('get-pixels')

if (!argv.p || !argv.s) return

const uuid = () => {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

sharp(argv.p)
  .extract({
    left: 0,
    top: 169,
    width: 1080,
    height: 1080
  })
  .resize(argv.s, argv.s, {
    kernel: 'nearest'
  })
  .toBuffer((_err, data, info) => {
    console.log(info)
    getPixels(data, 'image/png', function (err, pixels) {
      if (err) {
        console.log(err)
        return
      }

      let canvasData = []

      for (let y = 0; y < pixels.shape[1]; y++) {
        for (let x = 0; x < pixels.shape[0]; x++) {
          const r = pixels.get(x, y, 0).toString(16)
          const g = pixels.get(x, y, 1).toString(16)
          const b = pixels.get(x, y, 2).toString(16)
          const rgb = `#${r}${g}${b}`
          canvasData.push(rgb)
        }
      }

      let result = {
        id: uuid(),
        title: '',
        author: '',
        size: argv.size,
        created: Date.now(),
        updated: Date.now(),
        canvasData: _.chunk(canvasData, argv.s),
        brush: {
          title: 'Brush',
          colors: [...new Set(canvasData)]
        }
      }

      // console.log(result)
      fs.writeFileSync(`./artwork_${argv.s}.json`, JSON.stringify(result), 'utf-8')
    })
  })
