/*
      ->>>>>>>>>> Import statements
*/
import initialState from './initialState'
import {
  project,
  task,
  role, view
} from './actionTypes'
// ------------->>>>>>>>>>>>>>>>> Handlers
import projectHandlers from './actionHandlers/projecthandlers'
import handleUI from './actionHandlers/uiHandlers'

// --------->>>>> TYpes
import { InitialStateType } from '../../../types'

interface ActionType {
  type: string
  payload: any
}

/*
 -------------> reducer Function
*/
const reducer = (state: InitialStateType, { type, payload }: ActionType): InitialStateType => {
  switch (type) {
    /*
      -------->>>>> actions on project
    */
    // fetching projects
    case project.SET_PM_PROJECTS: return projectHandlers.setProjectsPM(state, payload)


    /*
      ------>>>>>> actions on task
    */
    // fetching tasks
    case task.fetch: return state

    /*
    * -------->>>>>>> actions on role
    */
    // setting roles
    case role.set: return handleUI.setRole(state, payload)
    // get roles
    case role.get: return handleUI.getRole(state, payload)
    // open role modal
    case role.openModal: return handleUI.openRoleModal(state)
    // cclose role modal
    case role.closeModal: return handleUI.closeRoleModal(state)

    /*
        --------->>>>>>>>>> Views
    */
    // Project view
    case view.CHANGE_PROJECT_VIEW: return handleUI.changeProjectView(state, payload)

    // default case
    default: return state
  }
}

export default reducer