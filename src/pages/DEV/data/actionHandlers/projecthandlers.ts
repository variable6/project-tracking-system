import storage from '../../../../config/localStorageConfig'
import { appStorageKey } from '../../../../constants/storageKeys/appStorageKey'
import { InitialStateType, ProjectPMType, TLProjectType } from '../../../../types'


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

const setProjectsTL = (state: InitialStateType, payload: TLProjectType[]): InitialStateType => {

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

const setProjectsDEV = (state: InitialStateType, payload: TLProjectType[]): InitialStateType => {

  let newState = {
    ...state,
    projects: {
      ...state.projects,
      DEV: payload
    }
  }

  storage.add(appStorageKey, newState)

  return newState
}


const projectHandlers = {
  setProjectsPM, setProjectsTL, setProjectsDEV
}

export default projectHandlers