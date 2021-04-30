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
import ProjectTable from './ProjectTable'
import Card from '../../../../components/Card'
import Breadcrumbs from '../../../../components/Breadcrumbs'

import axiosFetch from '../../../../config/axiosConfig'
import storage from '../../../../config/localStorageConfig'

import setTitle from '../../../../constants/pageTitle'
import storageKeys from '../../../../constants/storageKeys'

import {
  ProjectType, ProjectType2
} from '../../../../types'
import Loader from '../../../../components/Loader'




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

  const [isLoading, setIsLoading] = useState(false)

  const projectLS = storage.get(storageKeys.projectsBDM)
  const [projects, setProjects] = useState<ProjectType[]>(projectLS ? projectLS : [])


  let records: ProjectType2[] = []

  if (projects.length !== 0)
    records = projects.map(project => ({
      projectDesc: project.projectDesc,
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      _id: project._id,
      startDate: project.startDate,
      endDate: project.endDate,
      managerName: project.manager.name,
      manager_id: project.manager._id
    }))


  const [layout, setLayout] = useState<'LIST' | 'TABLE'>('LIST')

  const fetchProjects = () => {
    setIsLoading(true)
    axiosFetch()
      .get('/hr/projects')
      .then(({ data }) => {
        data = creatProjectList(data)
        setProjects(data)
        storage.add(storageKeys.projectsBDM, data)
        setIsLoading(false)
      })
      .catch(e => {
        console.log('Error occured while fetching projects', e)
        setIsLoading(false)
      })
  }


  useEffect(() => {
    fetchProjects()
    route.setPageTitle(pageName)
    setTitle(pageName)
  }, [])


  return (
    <>
      <Breadcrumbs currentPage={pageName} links={[{ label: 'Dashboard', path: '/' }]} />
      <Card title="All Projects" >
        <div style={{ position: 'relative' }}>
          {(isLoading && projects.length === 0) && <div className={css.loaderContainer}><Loader /></div>}
          <div className={css.toolBar}>
            <Typography variant="h6" color="textPrimary">
              Filters
          </Typography>
            <div className={css.cont}>
              <ToggleButtonGroup exclusive value={layout}
                onChange={(e, newLayout) => { setLayout(newLayout) }}>
                <ToggleButton value="LIST" aria-label="List Layout">
                  <ListIcon className={css.icon} />
                </ToggleButton>
                <ToggleButton value="TABLE" aria-label="Table Layout">
                  <TableIcon className={css.icon} />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          {(layout === 'LIST' && records.length !== 0) && (<ProjectCard projects={records} />)}
          {(layout === 'TABLE' && projects.length !== 0) && <ProjectTable projects={records} />}
          {projects.length === 0 && (
            <Typography variant="body1" className={css.noData} color="textPrimary">No projects exists</Typography>
          )}
        </div>
      </Card>
    </>
  );
}

export default Project;


const useCSS = makeStyles(({ palette, spacing, mixins, shape }) => ({
  icon: {
    color: palette.secondary.light,
    fontSize: spacing(2.5)
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(1.5),
  },
  cont: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing(2)
  },
  addBtn: {
    height: '100%',
    backgroundColor: palette.common.white,
    color: palette.secondary.main,
    fontWeight: 600,
    paddingTop: spacing(1.25),
    paddingBottom: spacing(1.25),
    '&:hover': {
      backgroundColor: palette.common.white
    }
  },
  fab: {
    zIndex: 999,
    position: 'fixed',
    bottom: mixins.toolbar.minHeight,
    marginBottom: spacing(2.5),
    right: spacing(2.5),
    backgroundColor: palette.primary.main,
    color: palette.secondary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: palette.primary.dark
    },
    boxShadow: 'none',
    filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25))'
  },
  fix: {
    height: spacing(8)
  },
  loaderContainer: {
    backgroundColor: palette.background.paper,
    borderRadius: shape.borderRadius,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99
  },
  noData: {
    textAlign: 'center',
    margin: spacing(2)
  }
}))