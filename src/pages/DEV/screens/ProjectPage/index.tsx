
import {
  makeStyles, AppBar,
  Toolbar, Typography
} from '@material-ui/core'
import {
  ToggleButtonGroup,
  ToggleButton
} from '@material-ui/lab'

import { useContext, useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import {
  FiList as ListIcon,
  FiLayout as TableIcon,
  FiGrid as GridIcon
} from 'react-icons/fi'

import Card from './../../../../components/Card'
import { ProjectPMType } from './../../../../types'

import ProjectCard, { ProjectCardFilter } from './ProjectCards'
import ProjectTable from './ProjectTable'
import ProjectList from './ProjectList'

import { DataContext } from '../../DataContext'
import BreadCrumbs from '../../../../components/Breadcrumbs'
import PageContainer from '../../layouts/PageContainer'
import useFetch from '../../useFetch'
// import components


const PAGENAME = 'Projects'


const ProjectPage = () => {

  const history = useHistory()
  const { data, dispatch } = useContext(DataContext)
  if (data.role === 'DEV')
    history.replace('/')
  const { fetchProjectsPM, fetchProjectTL, fetchProjectsDEV } = useFetch()
  const css = useCSS()

  useEffect(() => {
    fetchProjectsPM()
    fetchProjectTL()
    fetchProjectsDEV()
    document.title = `WorkSpace | ${data.role} - Projects`
  }, [])

  const [filteredProjects, setFilteredProjects] = useState<any[]>([])

  const viewHandler = (val: string) => {
    if (val === 'GRID')
      dispatch.changeProjectView('GRID')
    else if (val === 'LIST')
      dispatch.changeProjectView('LIST')
    else if (val === 'TABLE')
      dispatch.changeProjectView('TABLE')
  }

  if (data.role === 'DEV')
    return (
      <Typography variant="h5" color="textPrimary">Access Denied</Typography>
    )

  return (
    <PageContainer>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h5">
            {PAGENAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={css.root}>
        <BreadCrumbs currentPage={PAGENAME} links={[{ label: 'Dashboard', path: '/' }]} />
        <Card title="Projects">
          <div className={css.toolbox}>
            <Typography variant="subtitle1" component="h6" color="textPrimary" >
              Filters
          </Typography>
            <ToggleButtonGroup exclusive value={data.projectView}
              onChange={(e, newLayout) => { viewHandler(newLayout) }}>
              <ToggleButton value="LIST" aria-label="List Layout">
                <ListIcon className={css.icon} />
              </ToggleButton>
              <ToggleButton value="GRID" aria-label="Grid Layout">
                <GridIcon className={css.icon} />
              </ToggleButton>
              <ToggleButton value="TABLE" aria-label="Table Layout">
                <TableIcon className={css.icon} />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {data.projectView === 'GRID' && <ProjectCardFilter setRecords={setFilteredProjects} />}
          {data.projectView === 'TABLE' && <ProjectTable />}
          {data.projectView === 'LIST' && <ProjectList />}
        </Card>
        {data.projectView === 'GRID' && <ProjectCard projects={filteredProjects} />}
      </div>
    </PageContainer>
  )
}

export default ProjectPage


const useCSS = makeStyles(({ spacing, breakpoints, palette }) => ({
  root: {
    padding: spacing(3),
    [breakpoints.down('xs')]: {
      padding: spacing(2)
    }
  },
  icon: {
    color: palette.secondary.light,
    fontSize: spacing(2.5)
  },
  toolbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(1.5),
    '& > h6': {
      fontWeight: 600,
      fontSize: '1.25rem'
    }
  }
}))