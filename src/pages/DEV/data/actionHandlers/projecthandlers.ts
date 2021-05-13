import storage from '../../../../config/localStorageConfig'
import { appStorageKey } from '../../../../constants/storageKeys/appStorageKey'
import { InitialStateType, ProjectPMType } from '../../../../types'


const setProjectsPM = (state: InitialStateType, payload: ProjectPMType[]): InitialStateType => {

  let newState = {
    ...state,
    projects: {
      ...state.projects,
      PM: payload
    }
  }

  storage.add(appStorageKey, newState)

  return newState
}

const setProjectsTL = (state: InitialStateType, payload: ProjectPMType[]): InitialStateType => {

  let newState = {
    ...state,
    projects: {
      ...state.projects,
      TL: payload
    }
  }

  storage.add(appStorageKey, newState)

  return newState
}


const projectHandlers = {
  setProjectsPM, setProjectsTL
}

export default projectHandlers