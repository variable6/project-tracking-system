import { useContext } from 'react'

import {
  project,
  task
} from './actionTypes'
import { Store } from './useStore';


const useDispatch = () => {

  const { dispatch } = useContext(Store)

  return ({
    // fetching projects
    fetchProjects: (payload = null) => dispatch({ type: project.fetch, payload }),
  });
}

export default useDispatch;