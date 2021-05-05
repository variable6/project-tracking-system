import {
  createContext, useReducer, ReactNode
} from 'react'

import reducer from './data/reducer'
import initialState from './data/initialState'
import { project, role, view } from './data/actionTypes'

import { InitialStateType, ProjectPMType } from '../../types'

interface DataContxtType {
  data: InitialStateType
  dispatch: {
    setProjectsPM: (payload: ProjectPMType) => void,
    getRoles: (payload: {
      isPM: boolean,
      isTL: boolean,
      isDev: boolean
    }) => void,
    setRole: (payload: 'DEV' | 'TL' | 'PM') => void,
    openRoleModal: () => void,
    closeRoleModal: () => void,
    changeProjectView: (view: "LIST" | "GRID" | "TABLE") => void
  }
}

export const DataContext = createContext<DataContxtType>({
  data: initialState,
  dispatch: {
    setProjectsPM: (payload: ProjectPMType) => { },
    getRoles: (payload: {
      isPM: boolean,
      isTL: boolean,
      isDev: boolean
    }) => { },
    setRole: (payload: 'DEV' | 'TL' | 'PM') => { },
    openRoleModal: () => { },
    closeRoleModal: () => { },
    changeProjectView: (view) => { }
  }
})

const DataContextProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(reducer, initialState)


  const dispathHandler = {
    // fetching projects
    setProjectsPM: (payload: ProjectPMType) => { dispatch({ type: project.SET_PM_PROJECTS, payload }) },

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