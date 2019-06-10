import { JSONC } from './jsonc'

class Storage {
  get (key, def) {
    let result = this.drive.getItem(key)
    if (result) {
      return deserialize(result)
    } else {
      return def
    }
  }

  set (key, val) {
    if (val === undefined) {
      return this.remove(key)
    }
    this.drive.setItem(key, serialize(val))
    return val
  }

  has (key) {
    return this.get(key) !== undefined
  }

  remove (key) {
    this.drive.removeItem(key)
  }

  clear () {
    this.drive.clear()
  }
}

class Local extends Storage {
  constructor () {
    super()
    this.drive = window.localStorage
  }
}

class Session extends Storage {
  constructor () {
    super()
    this.drive = window.sessionStorage
  }
}

export const LocalStorage = new Local()
export const SessionStorage = new Session()

function serialize (val) {
  return JSONC.pack(val)
}

function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSONC.unpack(val)
  } catch (e) {
    return val || undefined
  }
}
