import {
  useContext,
  useEffect,
  useState
} from 'react'

import { RouteContext } from '../../../../context/RouteContext'

import axiosFetch from '../../../../config/axiosConfig'
import storage from '../../../../config/localStorageConfig'

import setTitle from '../../../../constants/pageTitle'
import storageKeys from '../../../../constants/storageKeys'

import {
  ProjectType
} from '../../../../types'


const pageName = 'Projects'

interface ProjectTypeParams {
  _id: string
  projectId: string
  startDate: Date
  endDate: Date
  managerId: {
    _id: string,
    name: string
  }
}

const creatProjectList = (val: ProjectTypeParams[]) => val.map(project => ({
  _id: project._id,
  projectId: project.projectId,
  startDate: project.startDate,
  endDate: project.endDate,
  manager: {
    _id: project.managerId._id,
    name: project.managerId.name
  }
}))

const Project = () => {

  const route = useContext(RouteContext)

  const projectLS = storage.get(storageKeys.projectsBDM)
  const [projects, setProjects] = useState<ProjectType>(projectLS ? projectLS : [])

  const fetchProjects = () => {
    axiosFetch()
      .get('/bdm/project')
      .then(({ data }) => {
        console.log(data)
        data = creatProjectList(data)
        setProjects(data)
        storage.add(storageKeys.projectsBDM, data)
      })
      .catch(e => console.error(e))
  }


  useEffect(() => {
    fetchProjects()
    route.setPageTitle(pageName)
    setTitle(pageName)
  }, [])

  return (
    <></>
  );
}

export default Project;