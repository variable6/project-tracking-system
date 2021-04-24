import axiosConfig from '../../config/axiosConfig'
import { InitialStateType } from '../../types'


const fetchProjects = (state: InitialStateType): InitialStateType => {

  let newState = state

  axiosConfig()
    .get('')
    .then(({ data }) => {

    })
    .catch(e => console.log('Error while fetching Projects'))

  return newState
}


const projectHandlers = {
  fetch: fetchProjects
}

export default projectHandlers