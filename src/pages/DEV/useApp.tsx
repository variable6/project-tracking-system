import React, {
  createContext,
  useContext
} from 'react'

// importing hooks
import useDispatch, { UseDispatchType } from '../../data/useDispatch'

// inporting contexts
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'
import { TokenContext } from '../../context/TokenContext'
import { Store } from '../../data/useStore'

// importing Types
import { UserType, InitialStateType } from '../../types'

interface PropsType {
  children: React.ReactNode
}

interface AppType {
  auth: {
    user: UserType,
    isLogoutOpen: boolean
  }
  token: string
  store: InitialStateType
}

interface DispatchType extends UseDispatchType {
  openAlert: (val: {
    message: string;
    type: "message" | "error";
  }) => void
  setToken: (...args: any) => any
  auth: {
    addUser: (user: UserType) => void;
    logout: () => void;
    clearUser: () => void;
    quitLogout: () => void;
  }
}

interface AppContextType {
  app: AppType
  dispatch: DispatchType
}

const useAppContext = () => {

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const tokenContext = useContext(TokenContext)
  const { state } = useContext(Store)

  const storeDispatch = useDispatch()

  const app = {
    auth: {
      user: authContext.user,
      isLogoutOpen: authContext.openPopup
    },
    token: tokenContext.token,
    store: state
  }

  const dispatch = {
    ...storeDispatch,
    openAlert: alertContext.openAlert,
    setToken: tokenContext.setToken,
    auth: {
      addUser: authContext.addUser,
      logout: authContext.logout,
      clearUser: authContext.clearUser,
      quitLogout: authContext.quitLogout
    }
  }

  const AppContext = createContext<AppContextType>({ app, dispatch })

  const AppContextProvider = ({ children }: PropsType) => (
    <AppContext.Provider value={{ app, dispatch }}>
      {children}
    </AppContext.Provider>
  )

  return { AppContext, AppContextProvider }

}

export default useAppContext;