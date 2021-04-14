
import {
  createContext,
  useState,
  ReactNode
} from 'react'
import tokenName from '../constants/storageKeys/tokenName'
import storage from '../config/localStorageConfig'


interface ContextType {
  token: string
  setToken: (...args: any) => any
}

const TokenContext = createContext<ContextType>({
  token: '',
  setToken: () => null
})

const TokenCont = (props: { children: ReactNode }) => {

  const tokenLS = storage.get(tokenName)

  const [state, setState] = useState(tokenLS ? tokenLS.token : '')

  const setToken = (token: string) => {
    storage.add(tokenName, {
      token: token
    })
    setState(token)
  }

  return (
    <TokenContext.Provider value={{ token: state, setToken: setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}

export { TokenContext }

export default TokenCont;