/*
      ->>>>>>>>>> Import statements
*/
import initialState from './initialState'
import {
  project,
  task
} from './actionTypes'
import projectHandlers from './actionHandlers/projecthandlers'

// --------->>>>> TYpes
interface ActionType {
  type: string
  payload: any
}

/*
 -------------> reducer Function
*/
const reducer = (state = initialState, { type, payload }: ActionType) => {
  switch (type) {
    /*
      -------->>>>> actions on project
    */
    // fetching projects
    case project.fetch: return projectHandlers.fetch(state)


    /*
      ------>>>>>> actions on task
    */
    // fetching tasks
    case task.fetch: return

    // default case
    default: return state
  }
}

export default reducer