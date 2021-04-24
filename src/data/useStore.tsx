import { useReducer, createContext, ReactNode } from 'react'
import reducer from './reducer'
import initialState from './initialState'
import { InitialStateType } from '../types'

interface ContextType {
  state: InitialStateType | undefined
  dispatch: any
}

const Store = createContext<ContextType>({
  state: initialState,
  dispatch: {}
})
interface Props {
  children: ReactNode
}
const useStore = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const StoreProvider = ({ children }: Props) => (
    <Store.Provider value={{ state, dispatch }} >
      {children}
    </Store.Provider>
  )

  return ({
    StoreProvider
  });
}

export { Store }

export default useStore;