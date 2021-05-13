import {
  useContext,
  useEffect,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button, makeStyles, Hidden, Fab } from '@material-ui/core'
import {
  ToggleButtonGroup,
  ToggleButton
} from '@material-ui/lab'
import {
  FiLayout as TableIcon,
  FiList as ListIcon,
  FiPlus as AddIcon
} from 'react-icons/fi'

import { RouteContext } from '../../../../context/RouteContext'

import ProjectCard from './ProjectAccordion'
import ProjectTable from './ProjectTable'
import ProjectDelete from './ProjectDelete'
import Form from './ProjectForm'
import EditFrom from './EditForm'
import Card from '../../../../components/Card'
import Breadcrumbs from '../../../../components/Breadcrumbs'

import axiosFetch from '../../../../config/axiosConfig'
import storage from '../../../../config/localStorageConfig'

import setTitle from '../../../../constants/pageTitle'
import storageKeys from '../../../../constants/storageKeys'

import {
  ProjectType, ProjectType2, EmployeeType
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
  manager: project.managerId ? {
    _id: project.managerId._id,
    name: project.managerId.name
  } : {
    _id: 'None',
    name: 'None'
  }
}))
interface DeleteType {
  open: boolean
  data: {
    projectId: string,
    projectTitle: string
  }
}

const Project = () => {

  const history = useHistory()
  const route = useContext(RouteContext)
  const css = useCSS()

  const empLS = storage.get(storageKeys.employeeBDM)
  const [employees, setEmployees] = useState<EmployeeType[]>(empLS ? empLS : [])
  const [isLoading, setIsLoading] = useState(false)

  const fetchEmployees = () => {
    axiosFetch()
      .get('/bdm/emp')
      .then(({ data }) => {
        setEmployees(data)
        storage.add(storageKeys.employeeBDM, data)
      })
      .catch(e => console.error(e))
  }

  const projectLS = storage.get(storageKeys.projectsBDM)
  const [projects, setProjects] = useState<ProjectType[]>(projectLS ? projectLS : [])
  const [openForm, setOpenForm] = useState(false)


  const [editForm, setEditForm] = useState(false)

  const [curProject, setCurProject] = useState<ProjectType2 | null>(null)

  const addCurProject = (project: ProjectType2) => {
    setCurProject(project)
  }
  const clearCurProject = () => {
    setCurProject(null)
  }

  const toggleForm = () => {
    setOpenForm(!openForm)
  }

  useEffect(() => {
    if (curProject !== null) {
      history.push(history.location.pathname)
      setEditForm(true)
    }
    else
      setEditForm(false)
  }, [curProject])

  const openProjectFrom = () => {
    history.push(history.location.pathname)
    toggleForm()
  }

  const [deleteProject, setDeleteProject] = useState<DeleteType>({
    open: false,
    data: {
      projectTitle: '',
      projectId: ''
    }
  })

  const setDelete = (id: string, title: string) => {
    setDeleteProject(c => ({
      open: true,
      data: {
        projectTitle: title,
        projectId: id
      }
    }))
  }
  const closeDelete = () => {
    setDeleteProject({
      open: false,
      data: {
        projectTitle: '',
        projectId: ''
      }
    })
  }

  let records: ProjectType2[] = []

  if (projects.length !== 0)
    records = projects.map(project => ({
      projectDesc: project.projectDesc,
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      _id: project._id,
      isCompleted: project.isCompleted,
      last_update: project.last_update,
      startDate: project.startDate,
      endDate: project.endDate,
      managerName: project.manager ? project.manager.name : 'None',
      manager_id: project.manager ? project.manager._id : 'None'
    }))


  const [layout, setLayout] = useState<'LIST' | 'TABLE'>('LIST')

  const fetchProjects = () => {
    setIsLoading(true)
    axiosFetch()
      .get('/bdm/project')
      .then(({ data }) => {
        data = creatProjectList(data)
        setProjects(data)
        storage.add(storageKeys.projectsBDM, data)
        setIsLoading(false)
      })
      .catch(e => {
        console.log(e, 'Error occured while fetching projects')
        setIsLoading(false)
      })
  }


  useEffect(() => {
    fetchProjects()
    fetchEmployees()
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
            <Hidden smDown implementation="css">
              <Button disableElevation variant="contained"
                onClick={openProjectFrom} className={css.addBtn}>
                <AddIcon />&nbsp;&nbsp;Add Project
              </Button>
            </Hidden>
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
          {layout === 'LIST' && (
          <ProjectCard projects={records} setDelete={setDelete} addCurProject={addCurProject} />
        )}
          {layout === 'TABLE' && <ProjectTable projects={records} setDelete={setDelete} addCurProject={addCurProject} />}
        <ProjectDelete projectDetails={deleteProject.data} fetchProjects={fetchProjects}
          isOpen={deleteProject.open} closeDelete={closeDelete} />
        <Form toggleForm={toggleForm} isOpen={openForm} employees={employees} fetchProjects={fetchProjects} />
        {curProject && <EditFrom fetchProjects={fetchProjects} isOpen={editForm} clearCurProject={clearCurProject} employees={employees} curProject={curProject} />}
        </div>
      </Card>
      <Hidden mdUp implementation="css" >
        <Fab variant="extended" aria-label="Add Project"
          className={css.fab} onClick={openProjectFrom} >
          <AddIcon />
          <Hidden xsDown implementation="css">
            &nbsp;Add Project
          </Hidden>
        </Fab>
        <div className={css.fix} />
      </Hidden>
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
  }
}))