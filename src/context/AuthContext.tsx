import { createContext, useState, ReactNode } from 'react'
import storage from '../config/localStorageConfig'
import keys from '../constants/storageKeys'
import {
  UserType
} from '../types'

interface ContextType {
  user: UserType,
  addUser: (user: UserType) => void
  clearUser: () => void
  logout: () => void
  openPopup: boolean
  quitLogout: () => void
}


const AuthContext = createContext<ContextType>({
  user: {
    date: '',
    designation: "DEV",
    email: "",
    employeeId: "",
    name: "",
    status: "IN-ACTIVE",
    _id: '',
    __v: 0,
  },
  addUser: () => null,
  clearUser: function () { },
  logout: function () { },
  openPopup: false,
  quitLogout: function () { }
})

const ACProvider = (props: { children: ReactNode }) => {

  const userLS = storage.get(keys.user)

  const [user, setUser] = useState<UserType>(userLS ? userLS : {
    date: '',
    designation: "DEV",
    email: "",
    employeeId: "",
    name: "",
    status: "IN-ACTIVE",
    _id: ''
  })

  const clearUser = () => {
    storage.clear(keys.user)
    setUser({
      date: '',
      designation: "DEV",
      email: "",
      employeeId: "",
      name: "",
      status: "IN-ACTIVE",
      _id: '',
      __v: 0,
    })
  }

  const addUser = (val: UserType) => {
    storage.add(keys.user, val)
    setUser(val)
  }

  const [open, setOpen] = useState(false)

  const logout = () => {
    setOpen(true)
  }
  const quitLogout = () => {
    setOpen(false)
  }

  return (
    <AuthContext.Provider value={{ user, addUser, clearUser, logout, openPopup: open, quitLogout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
export default ACProvider