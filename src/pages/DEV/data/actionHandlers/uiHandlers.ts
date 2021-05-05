import storage from '../../../../config/localStorageConfig'
import { appStorageKey } from '../../../../constants/storageKeys/appStorageKey'
import { InitialStateType as State } from '../../../../types'

const setRole = (state: State, payload: 'DEV' | 'TL' | 'PM'): State => {

  const newState = {
    ...state,
    role: payload
  }

  storage.add(appStorageKey, newState)

  return newState
}
const getRole = (state: State, roleList: {
  isPM: boolean,
  isTL: boolean,
  isDev: boolean
}): State => {

  const newState = ({ ...state, roleList: roleList })

  storage.add(appStorageKey, newState)

  return newState
}

const openRoleModal = (state: State): State => {

  const newState = { ...state, showRolePopup: true }

  storage.add(appStorageKey, newState)

  return newState
}

const closeRoleModal = (state: State): State => {

  const newState = { ...state, showRolePopup: false }

  storage.add(appStorageKey, newState)

  return newState
}

const changeProjectView = (state: State, view: "LIST" | "GRID" | "TABLE"): State => {

  const newState = {
    ...state,
    projectView: view
  }

  storage.add(appStorageKey, newState)

  return newState
}



const handleUI = {
  setRole,
  getRole,
  openRoleModal,
  closeRoleModal,
  changeProjectView
}

export default handleUI