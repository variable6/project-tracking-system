import {
  useContext,
  useEffect,
  useState
} from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import {
  ToggleButtonGroup,
  ToggleButton
} from '@material-ui/lab'
import {
  FiLayout as TableIcon,
  FiList as ListIcon
} from 'react-icons/fi'

import { RouteContext } from '../../../../context/RouteContext'

import ProjectCard from './ProjectAccordion'
import Card from '../../../../components/Card'

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
  projectTitle: string
  projectDesc: string
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
  projectTitle: project.projectTitle,
  projectDesc: project.projectDesc,
  startDate: project.startDate,
  endDate: project.endDate,
  manager: {
    _id: project.managerId._id,
    name: project.managerId.name
  }
}))

const Project = () => {

  const route = useContext(RouteContext)
  const css = useCSS()

  const projectLS = storage.get(storageKeys.projectsBDM)
  const [projects, setProjects] = useState<ProjectType[]>(projectLS ? projectLS : [])

  const [layout, setLayout] = useState<'LIST' | 'TABLE'>('LIST')

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
    <Card title="All Projects" >
      <div className={css.toolBar}>
        <Typography variant="h5" color="textPrimary">
          Filters
        </Typography>
        <ToggleButtonGroup exclusive value={layout} onChange={(e, newLayout) => { setLayout(newLayout) }}>
          <ToggleButton value="LIST" aria-label="List Layout">
            <ListIcon className={css.icon} />
          </ToggleButton>
          <ToggleButton value="TABLE" aria-label="Table Layout">
            <TableIcon className={css.icon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <ProjectCard projects={projects} />
    </Card>
  );
}

export default Project;


const useCSS = makeStyles(({ palette, spacing }) => ({
  icon: {
    color: palette.secondary.light,
    fontSize: spacing(2.5)
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(1.5)
  }
}))