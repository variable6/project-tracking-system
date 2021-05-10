import storage from '../../../../config/localStorageConfig'
import { appStorageKey } from '../../../../constants/storageKeys/appStorageKey'
import { InitialStateType, EmployeeType } from '../../../../types'


const setEmployees = (state: InitialStateType, payload: EmployeeType[]): InitialStateType => {

  const newState = {
    ...state,
    employees: payload
  } // updating state
  // storing to localStorage
  storage.add(appStorageKey, newState)
  // returning new state
  return newState
}

const employeeHandler = {
  setEmployees
}

export default employeeHandler