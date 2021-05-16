import {
  createContext, useReducer, ReactNode
} from 'react'

import reducer from './data/reducer'
import initialState from './data/initialState'
import { project, role, view, employees } from './data/actionTypes'

import { InitialStateType, ProjectPMType, EmployeeType, TLProjectType } from '../../types'

interface DataContxtType {
  data: InitialStateType
  dispatch: {
    setProjectsPM: (payload: ProjectPMType) => void,
    setProjectsDEV: (payload: TLProjectType) => void,
    setProjectsTL: (payload: TLProjectType) => void,
    getRoles: (payload: {
      isPM: boolean,
      isTL: boolean,
      isDev: boolean
    }) => void,
    setRole: (payload: 'DEV' | 'TL' | 'PM') => void,
    openRoleModal: () => void,
    closeRoleModal: () => void,
    changeProjectView: (view: "LIST" | "GRID" | "TABLE") => void,
    setEmployees: (employees: EmployeeType[]) => void
  }
}

export const DataContext = createContext<DataContxtType>({
  data: initialState,
  dispatch: {
    setProjectsPM: (payload: ProjectPMType) => { },
    setProjectsDEV: (payload: TLProjectType) => { },
    setProjectsTL: (payload: TLProjectType) => { },
    getRoles: (payload: {
      isPM: boolean,
      isTL: boolean,
      isDev: boolean
    }) => { },
    setRole: (payload: 'DEV' | 'TL' | 'PM') => { },
    openRoleModal: () => { },
    closeRoleModal: () => { },
    changeProjectView: (view) => { },
    setEmployees: (employees) => { }
  }
})

const DataContextProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(reducer, initialState)


  const dispathHandler = {
    /*
          =------[>>>>>>>>> Fetching projects]
    */
    // PM
    setProjectsPM: (payload: ProjectPMType) => { dispatch({ type: project.SET_PM_PROJECTS, payload }) },
    // DEV
    setProjectsDEV: (payload: TLProjectType) => { dispatch({ type: project.SET_DEV_PROJECTS, payload }) },
    // TL
    setProjectsTL: (payload: TLProjectType) => { dispatch({ type: project.SET_TL_PROJECTS, payload }) },

    /*
      =================> Role
    */
    // getRole
    getRoles: (payload: {
      isPM: boolean,
      isTL: boolean,
      isDev: boolean
    }) => { dispatch({ type: role.get, payload }) },
    // setRole
    setRole: (payload: 'DEV' | 'TL' | 'PM') => { dispatch({ type: role.set, payload }) },
    // open role modal
    openRoleModal: (payload = null) => { dispatch({ type: role.openModal, payload }) },
    // close role modal
    closeRoleModal: (payload = null) => { dispatch({ type: role.closeModal, payload }) },
    /*
      -------->>>>> View
    */
    // project view
    changeProjectView: (payload: "LIST" | "GRID" | "TABLE") => {
      dispatch({ type: view.CHANGE_PROJECT_VIEW, payload })
    },
    /*
      === -------->>>>> Employees
    */
    // set employees
    setEmployees: (payload: EmployeeType[]) => {
      dispatch({ type: employees.SET_EMPLOYEES, payload })
    }
  }

  return (
    <DataContext.Provider value={{
      data: state,
      dispatch: dispathHandler
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider;