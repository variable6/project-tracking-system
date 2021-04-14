import {
  AES,
  enc
} from 'crypto-js'
import key from './../constants/secureKey'

const { decrypt, encrypt } = AES

const add = (storageKey: string, data: object) => {

  localStorage.setItem(
    storageKey,
    encrypt(
      JSON.stringify(data),
      key
    ).toString()
  )

}

const get = (storageKey: string) => {

  const data = localStorage.getItem(storageKey)

  return data
    ? JSON.parse(decrypt(data, key).toString(enc.Utf8))
    : null

}

const clear = (storagekey: string) => {
  localStorage.removeItem(storagekey)
}

const clearAll = () => {
  localStorage.clear()
}

const operations = { add, get, clearAll, clear }

export default operations