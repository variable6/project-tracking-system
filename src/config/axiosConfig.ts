import axios from 'axios'
import dbURL from '../constants/databaseURL'
import tokenName from '../constants/storageKeys/tokenName'
import storage from './localStorageConfig'

const axiosConfig = () => {

  const token = storage.get(tokenName)

  return axios.create({
    baseURL: dbURL,
    headers: {
      'content-type': 'application/json',
      [tokenName]: token ? token.token : ''
    }
  })
}

export default axiosConfig